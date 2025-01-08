---
layout: post
title: "halfway point"
date: 2024-07-08
categories: [outreachy, servo]
---

This arrived faster than I expected, but we are already at the halfway point of the Outreachy internship! These past few weeks I have learned a lot, faced some unexpected issues and tackled problems I didn't expect. Let me take you through them!

## The initial timeline

A good way to start is by reviewing what my expectations were when starting the project and what timeline I proposed. Before I even got this internship I asked Martin, my mentor, how could I estimate how much time certain tasks would take. He replied that estimation was perhaps one of the hardest problems when planning work, and he was absolutely right. This was the original timeline I made:

- **Step 1**: Locate the relevant modules that implement the DevTools protocol and analyze existing code.
- **Step 2**: Create a list of previous issues and prs that were open for this area.
- **Step 3**: Ask mentors and relevant community members questions that I have based on the preliminary phase.
- **Step 4**: Implement the new behaviour starting with a small and manageable feature. Ask for feedback.
- **Step 5**: Work through the remaining features one by one.
- **Step 6**: Maybe extend the scope of the project.
- **Step 7**: Final review and report.

While it was not on the wrong path, it starts pretty detailed but it quickly gets too broad to handle. I have been at steps 4 and 5 for most of the internship, and they have many ramifications and hidden work than I could have expected.

## The first weeks

During the first week I tackled steps 1 and 2, creating a [meta issue](https://github.com/servo/servo/issues/32404) gathering all of the previous work on the DevTools server. This also explains what happened and why support was broken, and provides an ever updating project timeline and status. This way the rest of the community can follow the updates on the new fixes. My first [change](https://github.com/servo/servo/pull/32475) was adapting an existing pr from a few months ago for it to run in the current version of the browser. This was a pretty straightforward fix, since most of the code was already there, and I just had to review and update a few things, so it was great to get started.

After that, the hard work began. I was a bit intimidated at this point, since now I had to [create](https://github.com/servo/servo/pull/32509) a brand new actor that Firefox recently added into the protocol, the `Watcher`. There was little documentation and definitely not any examples of how I had to do it. But after looking through Mozilla's source code (which thankfully had comments), the other actor's code in Servo and scratching my head for a while I managed to do it, and it was so rewarding to finally see some visual changes on the screen.

## What I got done

Up until this point everything about the DevTools inspecting was still broken, so even if I was making changes they had no use yet. That's why at this point I decided to tackle the `Console` actor. This is what I would put under _step 4_, so one can see how the initial plan was not representative of what I actually needed to do. Now that the console [is finished](https://github.com/servo/servo/pull/32727) (yay!) you can see page logs, send messages and even evaluate JavaScript on it!

![Console features](https://github.com/servo/servo/assets/22449369/b5ddd302-cfbd-4dfc-b96d-c1175840e692)

Next up is tackling the actual document tree inspector, so that contributors can see the layout of the page interactively as you are testing things.

One of the most important things I have learned is that even if it is great to have an initial plan, you have to be ready to adapt it to the circumstances and everything you discover along the way. I can't wait to share more with you on my next blog!
