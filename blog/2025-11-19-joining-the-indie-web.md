---
title: joining the indie web
tags: [ "indie-web" ]
draft: true
---

A few days ago I found out about the [**Indie Web**](https://indieweb.org/).
It is a community of personal websites that uses **your domain as your identity**,
with a set of [building blocks](https://indieweb.org/Category:building-blocks) that allows you to add some content hints to your plain and simple HTML website.

It enables to send comments and citations across websites using the [Webmentions](https://indieweb.org/Webmention) standard.
With this, services like [Bridgy](https://brid.gy) can send back replies to your website from Mastodon and the Fediverse!

All of this sounds _really cool_, so I had to try it.

## Setting it up

I don't have an usual blogging setup, since I'm not using Wordpress or other CMS.
This web uses [11ty](https://www.11ty.dev), a simple static site generator.
I'd love to do another post on how I arrived here and other tools I've tried, so stay tuned for that!

The [wiki](https://indieweb.org/Getting_Started) for the Indie Web is very complete though.
Even if it wasn't already setup like it would with some CMS, the process was a matter of adding certain classes and links to the generated HTML code.

### IndieAuth

First up was getting a domain, which I already had.

> Side note, but _"conflor.es"_ comes from "con flores", which means "with flowers" ✿.

After that I needed to set up [IndieAuth](https://indieauth.net),
the identity protocol that **connects your domain to your personal accounts** like GitHub or Mastodon.
There are a plethora of options, but I went with the simple one, using [indieauth.com](https://indieauth.com).

Once my domain was registered, I added two links to the `head` and identifying my personal links with `rel="me"`. _That's it!_

```html
<link rel="authorization_endpoint" href="https://indieauth.com/auth">
<link rel="token_endpoint" href="https://tokens.indieauth.com/token">
...
<a rel="me" href="https://github.com/eerii">github</a>
```

### Adding microformats

The next step was making sure the exisiting contents of my site were correctly identified, so that other websites can read them using the protocol.
This is mostly done using [**microformats**](https://indieweb.org/microformats), a standardized set of HTML classes.

First up was [`h-card`](https://microformats.org/wiki/h-card), your virtual "business card".
It can contain your name (`p-name`), profile picture (`u-photo`), links (`u-url`) and even other things like pronouns and a bio.
I added mine to the footer, making it look good but still recognizable.
You can use [this website](https://indiewebify.me/validate-h-card/?url=https%3A%2F%2Fconflor.es) to look at it.

```html
<footer class="h-card" href="https://conflor.es">
  <p>
    <img class="u-photo" src="/images/profile.webp" alt="...">
    <a class="p-name u-url" rel="me" href="https://github.com/eerii">eri</a>
    <span class="p-pronouns" style="font-size: 0.7rem">they/them</span>
  </p>
  ...
  <div hidden>
    <p class="p-note">be gay, do crime c:</p>
  </div>
</footer>
```

Then it was time to adapt my posts.
I added [`h-entry`](https://indieweb.org/h-entry) to the blog page and annotated the content: title (`p-name`),  author (`p-author`), date (`dt-publish`) and summary (`p-summary`).
I actually had some previous classes for styling many of this things which I ended up replacing.

What's best is that I don't have to manually add any of this, it is handled when building the site using the [`blog.vto`](https://github.com/eerii/conflores/blob/main/include/blog.vto) template.
Here is what the output looks like:

```html
<main class="h-entry">
  <h1 class="p-name">title</h1>
  <time class="dt-published">2025-01-01</time>
  <article class="e-content">
    <p class="p-summary">
    ...
```

The main page is an [`h-feed`](https://microformats.org/wiki/h-feed), which is a list of `h-entry`.
This is handled by the [`index.vto`](https://github.com/eerii/conflores/blob/main/index.vto) template, no manual intervention required either.

```html
<main class="h-feed">
  <article class="h-entry">
    <h2 class="p-name"><a class="u-url" href="...">title</a></h2>
    <p class="p-summary">...</p>
    <span>
      <time class="dt-published">2025-01-01</time>
      <span class="p-category">tag</span>
      ...
```

### Receiving and sending Webmentions

We are only missing the _magical_ communication between different sites using the Webmentions standard.

Since this is an static site, and opting for simplicity again, I decided to use [webmentions.io](https://webmention.io) to receive mentions for now.
I signed in with my site (_using [IndieAuth](#indieauth)!_) and added this to the `head`.
Then I used this [tester](https://beatonma.org/webmentions_tester/) to check that everything was working.

```html
<link rel="webmention" href="https://webmention.io/conflor.es/webmention" />
```

This is already enough to add our website to the protocol, but we can go a bit further.
It would be nice to be able to display the receivedWebmentions on each page.
I went with this very small and simple [client side library](https://github.com/PlaidWeb/webmention.js) that adds two rows at the end of the page with a list of comments and reactions.

![Two sections at the end of the blog: Responses, showing a test comment I made; and Reactions, showing a like](/images/2025/webmentions-comments.webp){.no-index}

Finally, the _promised_ Mastodon integration.
Go to [Bridgy](https://brid.gy), sign up and connect your social accounts:
Mastodon, Bluesky, Reddit... even GitHub works!
It will check the **fully public** posts from your account every few minutes, and it will send a Webmention for each **fully public** like or comment it receives.

As far as privacy goes, if a post is unlisted, for followers only or private it wont be send to the site.
It also excludes users with `#nobridge` or `#nobot` in their bio, and deleted posts are also removed from Webmentions.

To make sure it can find your post (_even if linking it in the toot body is usually enough_), edit the HTML page and add a link pointing to Mastodon with `u-syndication`.

## Now what?

I'm really surprised at how easy everything was to set up, and how non intrusive the microformats are.
I'm also quite happy at how it all turned out.
_You can even test it yourself by leaving a comment :P_.

I have more improvements planned, like being able to post a comment form directly on the website
I'm also revamping some other parts of the site.
The most important one is **accessibility**, I'm learning all I can in this area and I have a few patches lined up that hopefully make this site easier to visit for everyone :)

Until next time, have a great day!
