---
layout: default
title: Posts
nav_order: 99
has_children: false
---

# Blog Posts

{% for post in site.posts %}
- [{{ post.title }}]({{ post.url }}) — *{{ post.date | date: "%B %d, %Y" }}*
{% endfor %}

