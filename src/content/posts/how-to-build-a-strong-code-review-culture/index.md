---
title: How to Build a Strong Code Review Culture
date: 2026-01-02
description: How to review and be reviewed
tags:
  - code-review
  - team-culture
image: "[[katya-ross-4Vg6ez9jaec-unsplash.jpg]]"
imageAlt: ""
imageOG: true
hideCoverImage: false
hideTOC: false
targetKeyword: ""
draft: false
---
When I started my career as a software developer, I had a clear picture of what mattered most: writing code. I imagined spending my days crafting elegant solutions, building features, and watching my commits stack up. Writing code was the skill, and everything else felt secondary.

But as I've gained experience, my perspective has shifted dramatically. I've come to realize that writing code is perhaps the least impactful way I can use my skills to benefit my team. Sure; writing good code matters. But the real multiplier effect comes from somewhere else entirely: code review.

Think about it this way: when I write code, I'm contributing my own work to the codebase. When I review code, I'm helping improve someone else's work, teaching and learning in the process, catching issues before they reach production, and helping maintain the overall health of the system. A single thoughtful review can prevent bugs, spread knowledge across the team, and elevate the skills of everyone involved.

In this post, we'll explore how to make code reviews more effective, collaborative, and valuable for everyone involved.

## What Code Review Really Does

When asked why we do code reviews, most developers immediately think of finding bugs. However, research tells a different story. A [study](https://www.microsoft.com/en-us/research/publication/expectations-outcomes-and-challenges-of-modern-code-review/) at Microsoft examined what developers thought was important in code reviews versus what actually happened during reviews. The results were surprising: bug finding was only a small part of the process.

Instead, code reviews primarily focused on knowledge transfer, finding alternative solutions, and increasing team awareness. More than just mechanically scanning diffs for bugs, code review is fundamentally about improving understanding.

This insight leads to a better definition: **Code review is the discipline of discussing code with your peers.** It's a collaborative process, not gatekeeping or a performance review. It's a discussion among peers with the ultimate goal of improving both the health of the codebase and the skill of the team.

## Authors: Context is Everything

There's a saying in marketing: "If content is king, then context is God." This applies perfectly to code review. The code itself is the content, but it's not enough. There's context surrounding and informing the code that reviewers desperately need.

As the author, you've been immersed in this context for days. Every detail is readily available in your head. Your reviewers, however, might know nothing about the problem you're solving or the code you're changing. **Illuminating that context is your top priority as an author.**

### The Problem with Minimal Descriptions

Consider this pull request:

> **Title:** Change currency option values  
> **Body:** Fixes DEV-XXXX.

As the author, this might feel sufficient. You've stated what changed and linked to the issue. But as a reviewer, this provides almost no useful information. What were the original values? What are they now? Why did they need changing? Sure, there's a JIRA reference, but now the reviewer must read through entire issue threads, descriptions, screenshots, and videos—and might still reach different conclusions.

### A Better Approach: Why, What, and So What

Here's an improved version:

> **Title:** Change currency option values
>
> **Body:**  
> A condition was not evaluating as expected because we stored the currency by its code but were expecting to compare it by its ID. **(Why?)**
>
> We changed the select options so the values are the currency ID, so that currency ID will be stored instead. **(What?)**
>
> This promotes consistency across the app because we can assume we are always comparing currencies based on their ID rather than needing to account for the code. **(So what?)**

This version answers three critical questions:
- **Why** are we making this change? (The condition wasn't working correctly)
- **What** is the change? (Modified select options to use IDs instead of codes)
- **So what?** Why is this the right solution? (Promotes consistency throughout the application)

By answering these questions, you create a path for your reviewer to follow. You provide the background, explain what was done, and articulate the reasoning. Now the reviewer is on the same page and can understand where your decisions came from.

> [!important] Author's Responsibility
> Provide context to aid understanding.

## Reviewers: Foster Collaboration

Reviewers give feedback on code, so their responsibilities revolve around how to deliver that feedback effectively.

### Ask, Don't Tell

When giving feedback, suggesting alternatives, or requesting changes, phrase your comments as questions rather than commands.

Consider these three approaches to the same feedback:

❌ "Don't use raw SQL here."  
❌ "Use the ActiveRecord query DSL here."  
✅ "What do you think about using the ActiveRecord query DSL here?"

The first is a command that doesn't open conversation. If you're the author, your options are to comply, question (which feels like starting an argument), or ignore it. None of these are ideal.

The second is slightly better because it suggests a specific alternative, but it's still one-sided.

The third transforms the dynamic entirely. By leading with "what do you think" and adding a question mark, you've opened a discussion instead of closing it off. If the author agrees, they can follow the suggestion. If they disagree, they've been asked their opinion, so they can explain their reasoning.

**Making a command closes discussion; asking a question opens it.** Other good question starters include "Can you clarify" or "Did you consider."

### Foster Good Vibes

Research shows there's a negativity bias in written communication. Face-to-face conversations include tone of voice, inflection, body language, and facial expressions that help convey attitude. In text, like pull request comments, none of that exists. This makes it much easier for words to be perceived negatively.

As reviewers delivering feedback primarily in writing, we must remember this bias and actively combat it. Think about the most negative way your words could possibly be interpreted. While probably no one will interpret them that way, considering this worst-case scenario helps limit possible negativity.

### Concrete Steps to Maintain Positivity

**Say "we" instead of "you."** This emphasizes collaboration by putting you and the author on the same side. Instead of "can you change this line," try "let's change this line." This shifts the attitude from working against to working with the author.

**Avoid dismissive words like "just" or "simple."** These words trivialize the author's efforts and diminish their skill. Usually, they don't add any content to the feedback. Delete them.

**Clearly mark minor feedback with a tag such as "Nitpick".** If you want to leave feedback but don't think it's a must-fix, make that clear. This clarifies your intentions so the author isn't left guessing what feedback requires attention versus what to keep in mind for the future.

**Celebrate good things.** It's easy to fall into a habit of only pointing out what's wrong. When you see a well-done refactor, good application of object-oriented design, or excellent naming, call it out. This creates positive reinforcement, encouraging more developers to adopt practices that receive praise.

> [!important] Reviewer's Responsibility
> Foster collaborative discussion by asking questions.

## What to Review

Code is complex with many dimensions. As a reviewer, where should you focus your attention?

### Top Priority: Design and Correctness

Check that the code follows good design principles and is functionally correct. Do the interactions of components make sense and fit with the rest of the system? Are there opportunities to apply design patterns or avoid code smells?

Look for obvious bugs just by reading the code. For more complex changes or those with potentially large UX impact, ask for demos, screenshots, videos, or other supporting material to better understand the impact.

Ensure the code has tests and is written in a testable way. Tests usually means unit tests, which are the easiest and most efficient way to ensure every changed line has been exercised. Well-structured code following sound design principles is usually very easily tested, and thorough tests demonstrate functional correctness.

### Still Important: Complexity and Observability

Check that the code isn't more complex than necessary. Complexity is hard to define, but it usually means code is hard for readers to understand, or developers are likely to introduce bugs when calling or changing it. Watch particularly for over-engineering: making code more generic than needed or adding unnecessary functionality. Encourage developers to focus on the problem at hand and leave future problems for when they actually arise.

Look for observability opportunities, including logging, error handling, and metrics. When code is complex, good observability is key for future debugging. If you see an opportunity to add logging that would help with debugging, suggest it.

Check style considerations, including formatters, linters, and static analysis tools. These promote best practices, so ensure authors follow them. If there's disagreement about a rule, note it for future discussion.

### Fit and Finish: The Details Matter

Pay attention to descriptive naming, spelling, and jargon usage. Good names clearly communicate what items are or do, don't require domain-specific knowledge, and use appropriate spelling and vocabulary.

Check correctness and appropriateness of code comments. If comments exist, ensure they're accurate and doing more than just re-explaining the code line by line. Code should be self-explanatory, while comments should contain information about external factors or motivations explaining why the code is the way it is. Suggest deleting irrelevant comments or expanding bare issue links with no context.

Verify the code follows language and framework conventions when applicable.

### Context, Context, Context

Context isn't only important for authors to reveal in pull request descriptions—reviewers must actively seek it out.

Start simple: expand the diff or view the whole file. This can reveal hidden complexity, like stacked if-conditions, that you wouldn't see just looking at changed lines. Reviewing changes in the context of the full method or class provides a better feel for the whole.

Think about hidden connections between this code and code elsewhere in the application. Understand how the code is used by other teams or how users might flow into these modules from elsewhere. Cross-module dependencies often have hidden, implicit assumptions that are easy to break.

## Promote Code Health, Not Perfection

The overarching principle with all these points is promoting code health. We want the codebase to improve over time.

But remember: **there is no perfect code, only better code.** Balance your review against the need to allow developers to continue making progress. After all, code never improves if no changes are merged.

Make good use of the "nitpick" flag to mark things authors don't need to address immediately but should keep in mind for the future. Don't require authors to polish every last piece of a pull request to perfection before approving. Focus on the things that will have the largest impact on code health.

## Conclusion

Strengthening code review culture requires effort from both authors and reviewers. Authors must provide context to aid understanding. Reviewers must foster collaborative discussion by asking questions and maintaining positive communication. Together, by focusing on the right aspects of code quality and remembering that review is fundamentally a discussion among peers, we can create a more effective, educational, and enjoyable code review process for everyone involved.

Cover image by [Katya Ross](https://unsplash.com/@katya?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/photos/person-showing-thumb-4Vg6ez9jaec?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)