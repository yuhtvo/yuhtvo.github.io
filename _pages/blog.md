---
layout: default
title: Blog Archive
permalink: /blog/
---

# Archive
### All writings and works can be found here

<div class="home">

  {% assign blog_posts = site.posts 
    | where: "category", "blog" 
    | where_exp: "post", "post.hidden != true" %
    | where:"lang", page.lang %}

  <div class="posts">

    {% if blog_posts.size > 0 %}

        {% for post in blog_posts %}
            <article class="post-item">

                <time
                    class="post-date"
                    datetime="{{ post.date | date_to_xmlschema }}">
                    {{ post.date | date: "%b %d, %Y" }}
                </time>

                {% if post.tags and post.tags.size > 0 %}
                <div class="post-tags">
                    {% for tag in post.tags %}
                        <span class="post-tag">{{ tag }}</span>
                    {% endfor %}
                </div>
                {% endif %}

                <h2 class="post-title">
                    <a href="{{ post.url | relative_url }}">
                        {{ post.title }}
                    </a>
                </h2>

                <p class="post-excerpt">
                    {% if post.summary %}
                        {{ post.summary }}
                    {% else %}
                        {{ post.excerpt | strip_html | truncate: 120 }}
                    {% endif %}
                </p>

            </article>
            
        {% endfor %}

    {% else %}
      <p class="empty-state">Coming soon...</p>
    {% endif %}

  </div>

  {% if blog_posts.size > 0 %}
  <div class="pagination-wrapper">
    <button id="prev" class="nav-btn">← Previous</button>
    <span id="page-number"></span>
        pageNumber.textContent = `${currentPage} / ${totalPages}`;
    <button id="next" class="nav-btn">Next →</button>
  </div>
  {% endif %}

</div>

<script src="/js/main.js"></script>


