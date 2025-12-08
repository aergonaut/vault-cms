---
title: Lock down SSH on NixOS with Tailscale
date: 2025-08-06
description: Prevent unwanted drive-by connection spam!
tags:
  - tailscale
  - nixos
  - ssh
image: "[[cover.jpg]]"
imageAlt: ""
imageOG: false
hideCoverImage: false
hideTOC: false
targetKeyword: ""
draft: false
---
If you have ever setup a server on the public internet with SSH on port 22, you have undoubtedly witnessed the flood of bots and other automated scanners trying to break in. It starts almost immediately. No sooner is your server online than your `sshd` log is immediately filled with bots trying to break in.

Sure, you can put mitigations in place. Disallowing password authentication. Disallowing root login over SSH. Setting up `fail2ban` to ban IP addresses that repeatedly fail to authenticate. While these steps will keep your server safe, none of them will _stop_ the attacks.

When I deployed a new NixOS server recently, I started seeing the flood of failed authentications and connection attempts stream in through my logs. I had put in place all of the recommended security measures, but I wanted to stop the attacks from even happening in the first place. It seemed like the only way I could stop the attack was to close port 22 on my server, but how could I do that without also losing legitimate access for myself?

## Enter Tailscale

[Tailscale][] is a really great service that allows you to easily connect devices in a secure way. It works a lot like a VPN or VPC, by authenticating connections and allowing devices that may be spread out over different clouds or networks to behave as if they were all part of one network. One really interesting application of Tailscale is that it can even allow access to devices that are otherwise entirely closed off from the public internet!

Tailscale actually has a really [great article](https://tailscale.com/kb/1077/secure-server-ubuntu) in the knowledge base going into detail about how to lock down SSH on an Ubuntu server using UFW. The gist of it is that you use the firewall to close port 22 on all network interfaces, but continue to allow traffic over the `tailscale0` interface. All traffic through this interface is authenticated by Tailscale, so you know that any connection through it is legitimate. By closing off the other interfaces, your server simply stops responding to connections on port 22, and this completely stops the waves of bot traffic.

NixOS, unlike Ubuntu, doesn't use UFW. Instead, NixOS's `networking.firewall` is implemented using `iptables`. This means it's not possible to directly follow Tailscale's guide, but it's still possible to achieve the same result on a NixOS system with just a few configuration options.

[Tailscale]: https://tailscale.com/

## Enable `services.tailscale`

The first thing to do is to enable Tailscale in your NixOS configuration:

```nix
{
  services.tailscale = {
    enable = true;
    openFirewall = true;
  };
}
```

Setting `openFirewall = true` opens Tailscale's UDP port in the firewall.

We also should add the `tailscale0` interface as a trusted interface to the firewall. This will configure the firewall to allow traffic over it, which will be important later.

```nix
{
  networking.firewall.trustedInterfaces = [ "tailscale0" ];
}
```

Since this machine is a server, I used the Tailscale admin panel to create an [auth key](https://tailscale.com/kb/1085/auth-keys), and gave the auth key a tag. Using a tagged auth key automatically disables node key expiration for any nodes that authenticate using the key. It is very important to disable node key expiration, or else your machine will eventually have to re-authenticate with Tailscale. During that time, you won't be able to use Tailscale to access the machine, potentially meaning you will not have any way to access the machine at all!

To use the auth key, we need to set it to the `authKeyFile` option. I use `sops-nix` in my stack to deploy secrets to my servers, but you can use whatever tool you like, as long as it lets you put the auth key in a file with a predictable path.

```nix
{
  services.tailscale.authKeyFile = config.sops.secrets.tailscale_auth_key.path;
}
```

With this configuration, after running `nixos-rebuild` the server should automatically join your Tailnet.

## Locking down SSH

Enabling OpenSSH server on NixOS is easy, but doing so also automatically opens port 22 in the firewall. To enable OpenSSH but close the firewall port, we have to override the `openFirewall` option:

```nix
{
  services.openssh = {
    enable = true;
    openFirewall = false;
  };
}
```

Running `nixos-rebuild` again will update the firewall configuration and reload OpenSSH!

## Verifying configuration

To verify that the configuration is working as expected, you can first try to SSH to your server's public IP. This should hang and give no response, which is expected, as your server is no longer listening to traffic on that port.

Next, authenticate to your Tailnet, and then try to SSH using either your server's Tailnet IP, or its Tailnet hostname. This should connect and log you in!

To further check the configuration, you can verify that your connection is indeed going through the `tailscale0` interface by running this command:

```
ip route get ${SSH_CONNECTION%% *}
```

## Conclusion

With just a little configuration, it was very easy to close the default SSH port on NixOS, while still allowing SSH traffic through Tailscale. After I applied this configuration to my server, I immediately saw a drop off in the failed connection attempts in my `sshd` logs. This gives me much more peace of mind that no bot or attacker will be able to infiltrate my server if I accidentally misconfigure something!

Cover image by [Conny Schneider](https://unsplash.com/@choys_?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/photos/a-blue-background-with-lines-and-dots-xuTJZ7uD7PI?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)