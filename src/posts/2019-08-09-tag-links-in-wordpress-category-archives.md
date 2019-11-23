---
title: "Tag links in WordPress category archives"
date: "2019-08-09"
tags: 
  - notes
  - timber
  - wordpress
---

### The goal

In a WordPress category archive page, show a list of tags used within those posts. Each tag links to an archive page showing tagged posts with category matching the referring archive. e.g. show all posts tagged _WordPress_ in _Journal_. The page URL needs to be human-friendly e.g. `/[category]/[tag]/`.

### The problem

This site uses the standard WordPress post type for _Journal_ and _Links_. Posts are differentiated by use of a namesake category:

![](/images/Screenshot-2019-08-09-at-11.05.25.png)

WordPress post admin section

It's now straightforward to use the WordPress URL hierarchy to show category archives, splitting out the two content types into their own pages. To show an accompanying list of tags, instinctively I may opt for the WordPress function `get_tags()`. However, this will get tags from all posts regardless of category. In the _Journal_ archive tag list, tags are included that are used by _Links_ but not _Journal_, and visa-versa.

Further to this issue, the tags link to the standard tag archive page. It's likely that a _Links_ post and a _Journal_ post will share tags, which results in the tag archive displaying a mix of content types.

### The solution

1. Use a custom query to get all posts with the same category as the archive.
2. Loop through those posts and extract all the tags used.
3. Populate an array of found tags.
4. Create a new array that removes duplicate tags so we're left with an array of unique tags.
5. Loop through the array of unique tags to output a list of tag links.

I use [Timber](https://www.upstatement.com/timber/) on this website so the code examples are flavoured accordingly. In `archive.php`:

```
<?php

/**
 * List tags used within category
 */
if ( is_category() ) {
    // get category of archive
    $category = get_category( get_query_var( 'cat' ) );

    // query posts with relevant category
    $args = array(
        'posts_per_page' => -1,
        'category_name' => $category->slug,
    );

    $the_query = new WP_Query($args);

    $tags = array();

    // loop through posts and extract all tags found
    if ($the_query->have_posts()) {

        while ($the_query->have_posts()) { 
            $the_query->the_post();

            $post_tags = get_the_tags();
            if ( $post_tags ) {
                foreach( $post_tags as $tag ) {
                    $tags[] = $tag->slug; 
                }
            }

        }
        wp_reset_postdata();

        // extract unique tag IDs
        $unique_tags = array_unique($tags);

        // pass tags used within posts of category archive
        $context['tags'] = $unique_tags;

        // pass slug of archive category
        $context['cat'] = $category->slug;

        if ( $params['tag'] ) {

            // get name of tag using slug in URL 
            $term = get_term_by( 'slug', $params['tag'], 'post_tag');
            $tag = $term->name; 

            // pass page title of category and tag
            $context['title'] = $category->name . ' tag: ' . $tag;
        }
    }
}

```

As well as details of the category in question, an array of unique tags is passed to `archive.twig` for rendering:

```
<h1>{{ title }}</h1>

...


```

Here, the tags are looped through and sorted alphabetically by the Twig `sort` filter. The link is formed from a combination of the archive category and tag name for a custom hierarchical link e.g. `https://matthewpassmore.co.uk/journal/wordpress/`. Timber's [Term class](https://timber.github.io/docs/reference/timber-term/) makes light work of getting the tag's pretty name for display purposes.

The link will 404 as it stands because `/[category]/[tag]/` doesn't appease any WordPress URL structure. This is where Timber's special powers come into play. Through use of Timber routing, we can get Timber to interpret the new URL structure and use our template of choice to display the results:

```
<?php

/**
 * Implement custom URLS with Timber routing
 */
Routes::map('journal/:tag', function($params){
    $query = 'category_name=journal&tag='.$params['tag'];
    Routes::load('archive.php', $params, $query, 200);
});

Routes::map('journal/:tag/page/:pg', function($params){
    $query = 'category_name=journal&tag='.$params['tag'].'&paged='.$params['pg'];
    Routes::load('archive.php', $params, $query);
});

// Do the same for 'Links'...
```

Timber reads the URL segments and enables their use in a new custom query. So, instead of `https://matthewpassmore.co.uk/?category_name=journal&tag=wordpress`, we get to use `https://matthewpassmore.co.uk/journal/wordpress/`. Brilliant! The faux hierarchical relationship between categories and tags is maintained and `archive.php` is used to show the results as normal.
