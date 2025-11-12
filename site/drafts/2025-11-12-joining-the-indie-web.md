# joining the indie web

A few days ago I found out about the [Indie Web](https://indieweb.org/).
It is a community of personal websites that uses your domain as your identity.
A set of [building blocks](https://indieweb.org/Category:building-blocks) allows you to keep your plain simple HTML website and add some hints on what the content is.

This enables to send comments and citations across websites using the [Webmentions](https://indieweb.org/Webmention) standard.
What's more, services like [Bridgy](https://brid.gy) allow to send back replies to your website from Mastodon and the Fediverse!

All of this sounded really cool, so I had to try it.

## Setting it up

I don't have an usual blogging setup, since I'm not using Wordpress or other CMS.
This web uses [soupault](https://soupault.app), a sort of static site generator that works on the HTML tree level.
I'd love to do another post on how I arrived here and other tools I've tried, so stay tuned for that!

The [wiki](https://indieweb.org/Getting_Started) for the Indie Web is very complete though.
Even if we didn't get everything already setup like we would with some CMS, it was a very easy process: add certain classes and links to the HTML generated code, nothing more.

### IndieAuth

First up was getting a domain, which I already had.

> Side note, but _"conflor.es"_ comes from "con flores", which means "with flowers".

After that I needed to set up [IndieAuth](https://indieauth.net), the identity protocol that connects your domain to your personal accounts like GitHub or Mastodon to easily identify yourself in other services.
There are a plethora of options but I went with the simple one of using [indieauth.com](https://indieauth.com).

It was just a matter of registering my domain there, adding two links to the `head` and identifying my personal links with `rel="me"`. All done!

```html
<link rel="authorization_endpoint" href="https://indieauth.com/auth">
<link rel="token_endpoint" href="https://tokens.indieauth.com/token">
...
<a rel="me" href="https://github.com/eerii">github</a>
```

### Adding microformats

The next step was making sure the exisiting contents of my site were correctly identified so they can be read by other websites using the protocol.
This is mostly done using [microformats](https://indieweb.org/microformats), a standardized set of classes that you simply add to your content.

First up was the [`h-card`](https://microformats.org/wiki/h-card), your virtual "business card".
This can contain your name (`p-name`), profile picture (`u-photo`), urls (`u-url`) and even other things like pronouns and a bio.
I added mine to the footer, making it look good but still recognizable.
[Look at it](https://indiewebify.me/validate-h-card/?url=https%3A%2F%2Fconflor.es) parsed by an external website.

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

Then it was time to adapt my posts. Add [`h-entry`](https://indieweb.org/h-entry) to the blog page and annotate the content, like the title (`p-name`),  author (`p-author`), date (`dt-publish`) and summary (`p-summary`).
I actually had classes for many of this things which I ended up replacing.

What's best is that I don't have to manually add any of this, it is handled when building the site from [this plugin](https://github.com/eerii/conflores/blob/55abd2a7b4309264738e6adb5fd9eadca19a9cc1/plugins/set-metadata.lua) I made for soupault.
Here is what the output looks like:

```html
<main class="h-entry">
  <h1 id="..." class="p-name">reviving the devtools support in servo</h1>
  <time class="dt-published">2024-09-20</time>
  <ul class="toc"></ul>
  <section class="e-content">
    <p class="p-summary">
      ...
```

The main page is an [`h-feed`](https://microformats.org/wiki/h-feed), which is a list of `h-entry`.
I have this in the index template in [`soupault.toml`](https://github.com/eerii/conflores/blob/55abd2a7b4309264738e6adb5fd9eadca19a9cc1/soupault.toml#L62), no manual intervention required either.

### Receiving and sending Webmentions

Now we are only missing the magical communication between different sites.
This works using the Webmentions standard.

Since this is an static site, and opting for simplicity again, I decided to use [webmentions.io](https://webmention.io) to receive mentions, at least for now.
To enable it on my site I signed in (using [IndieAuth](#indieauth)!) with my site and added this to the `head`. Then I could try this [tester](https://beatonma.org/webmentions_tester/) to check that everything was working.

```html
<link rel="webmention" href="https://webmention.io/conflor.es/webmention" />
```

This is already enough to add our website to the protocol, but we can go a bit further.
It is nice to be able to display Webmentions on each page.
That way you can see if someone cited you post or left a comment.
I went with this very small and simple [client side library](https://github.com/PlaidWeb/webmention.js) that just adds a few rows at the end of each page with a list of comments and reactions.

<img src="/images/2025/webmentions-comments.webp" class="no-index" alt="Two sections at the end of the blog: Responses, showing a test comment I made; and Reactions, showing a like">

Finally, the promised Mastodon integration.
Go to [Bridgy](https://brid.gy), sign up and connect your social accounts.
Mastodon, Bluesky, Reddit and even GitHub works.
The default configuration will check the **fully public** posts from your account every few minutes, and it will send a Webmention for each **fully public** like or comment it receives.

As far as privacy goes, if a post is unlisted, followers only or private it wont show.
It will also exclude users with `#nobridge` or `#nobot` in their bio, and it removes deleted posts.

To make sure it can find your post, even if a link in the Mastodon toot body is usually enough, edit the HTML page and add a link to the post with `u-syndication`.

## Now what?

I'm really surprised at how easy everything was to set up, and how non intrusive it is for your format.
I'm also very happy at the result.
You can even test it by leaving a comment :P.

There are some improvements planned like adding a comment form directly on the website, and revamping some other parts of the site.
The most important one is **accessibility**.
I have some patches lined up that hopefully make it easier to visit for everyone :)

Until next time, have a great day!

<tag>indie-web</tag>
<!-- <syn>https://todon.eu</syn> -->
