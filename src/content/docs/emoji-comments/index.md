---
title: Emoji Comments
description: Lightweight way to communicate intent in code review
category: Best Practices
order: 0
lastModified: 2026-01-07
version: 0.1.0
image: "[[emoji-comments.png]]"
imageAlt: Emoji randomly sprinkled across a white background
hideCoverImage: false
hideTOC: false
draft: false
noIndex: false
featured: false
---
EmojiComments is my term for a lightweight way to signal intent in code review comments on platforms like GitHub.

## How to use EmojiComments

EmojiComments take the form:

```
<INTENT> <EMOJI>: <COMMENT>
```

`<INTENT>` is a human-readable, single-word expression of the intent behind the comment. See the next section for a list of common intents. The purpose of `<INTENT>` is to disambiguate the meaning of the emoji, and to ensure using this system does not lead to more confusion.

`<EMOJI>` is an emoji, intended to playfully communicate the intent behind the comment. See the next section for a list of common emojis and how they can be mapped to intents. The purpose of including an emoji is to add a bit of fun to what is otherwise a dry and impersonal process.

`<COMMENT>` is, finally, the actual body of your comment. This may be multiple lines, include code snippets, etc. No special formatting is required.

### Including multiple comments in one comment

If you would like to make multiple comments on a single diff selection, or in a single PR comment, you are encouraged to tag each separate comment with an appropriate intent and emoji.

To separate multiple comments, you can use a horizontal rule, which in Markdown is encoded as `---`

## Recommended intent and emoji tags

| Intent          | Emoji | Meaning                                                                                                                                                                            |
| --------------- | ----- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Comment         | 💬    | This is comment is off-topic or of low significance. No action is required and I do not expect you must read it.                                                                   |
| Info / Tip      | ℹ️    | I am providing what I believe to be a tip that I believe may help you in the future. I do not expect you to apply this tip to this code, unless you decide to.                     |
| Problem         | ⚠️    | I believe there is a significant issue that warrants attention. I expect you to reply to this comment, to acknowledge my concern.                                                  |
| Question        | 🙋    | I have a question about this code that I expect you to answer.                                                                                                                     |
| Suggestion      | 💁    | I have a suggestion that I believe will make this code better. If you agree, please apply the suggestion. Otherwise, please reply with your reasoning why it is not appropriate.   |
| Danger / Severe | 🙅    | There is a serious problem in this code that I cannot approve. I am leaving this comment as a formality. I expect to have a synchronous discussion about the code to resolve this. |