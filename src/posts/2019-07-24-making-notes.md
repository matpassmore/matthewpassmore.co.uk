---
title: "Making notes"
date: "2019-07-24"
noteTags:
  - notes
  - indieweb
  - wordpress
  - workflow
---

It's only recently that I've started paying attention to the [IndieWeb](https://indieweb.org/) movement (is it referred to as a _movement_?). It feels _right_. Though I work with the web every day, I've become so embeded in the coporate web that I lost sight of what else it can be.

To get started making notes, I looked to [Jeremy Keith's website](https://adactio.com) for a blueprint; the mind boggles at the amount of content there. I'm starting as small as I can though because I know if I don't, I'll get bogged down in possibilities and spend my time wading through the 1% instead of just shipping the thing. [IndieWeb.org](https://indieweb.org/) recommends starting with Notes:

> **Simplest post building block**. All posts have a simple text component, whether name, caption, comment, or text equivalent. Build notes first, and then you have a building block you can build upon for every other post type. This is the smallest step you can take to owning the timestamped content you publish.

That's that then. Notes it is.

My notes will initially be a combination of thoughts and links with comment. The link posts needed a little bit of work to get WordPress mimicking the structure of Jeremy Keith's Links post. The main issue was getting the post title to link to the source URL and not my post URL. This is straightforward WordPress custom field territory. However, I'm not keen on opening WordPress, creating a new post, copy-paste quote, copy-paste link into a custom field etc every time I want to share a link. Not keen at all.

Jeremy created a bookmarklet to do the heavy lifting for [his workflow](https://adactio.com/journal/14120):

> there’s also my own home-rolled bookmarklet for posting links to my site. It doesn’t do anything clever—it grabs the title and URL of the currently open page and pre-populates a form in a new window, leaving me to add a short description and some tags.

Inspired to recreate something similar with WordPress, I came to the [Press This plugin](https://wordpress.org/plugins/press-this/); a replacement for the once-native functionality of WordPress. It creates a bookmarklet which mirrors most of the desired functionality — grabbing page title, URL and any selected content whilst also allowing you to tag and categorise the prior to publishing. This is all done via a pop-up window with a WordPress form. The only trouble is that the page URL is only available within the new post's content and not in its own meta field, e.g.:

``` html
<blockquote>there’s also my own home-rolled bookmarklet for posting links to my site. It doesn’t do anything clever—it grabs the title and URL of the currently open page and pre-populates a form in a new window, leaving me to add a short description and some tags.</blockquote>
<p>Source: <em><a href="https://adactio.com/journal/14120">Adactio: Journal—Links, tags, and feeds</a></em></p>
```

With the new post on my website, I want the post title to link to the URL from the Source from the snippet above. This involves a bit of regex (not my strong suit!), to extract the link from the content:

``` php
<?php

// get the post content
$content = wpautop(get_the_content());

// ready an empty array
$matches[] = '';

// populate an array with all links in the content 
preg_match_all('#\bhttps?://[^\s()<>]+(?:\([\w\d]+\)|([^[:punct:]\s]|/))#', $content, $matches);

// display title with link to post
if ( has_category('links') ) {
    // use last link in content as destination
        the_title( '<h3><a href="' . end($matches[0]) . '" rel="bookmark">', '</a></h3>' );
} else {
    ....
}
```

One last thing — to remove the Source paragraph from the content so that the link isn't duplicated. A dirty little CSS `display: none` would do it but feels hacky. I opted for this:

``` php
<?php

// get position of last <p> i.e. start of 'Source: ' block
$end = strrpos($content, '<p>');

// display content, stripped of Press This source i.e. last paragraph
echo $trimmed = substr($content, 0, $end);
```

This is just a toe in the ocean for being all IndieWeb, but it's a start.
