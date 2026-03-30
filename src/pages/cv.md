---
layout: ../layouts/BaseLayout.astro
title: CV
description: Curriculum vitae.
---

## CV

Download the PDF:

- [**omer_yildiran_cv_2026_jan.pdf**](/cv.pdf)

Preview:

<div class="cv-frame">
  <iframe
    title="Omer Yildiran CV"
    src="/cv.pdf"
    loading="lazy"
  ></iframe>
</div>

<style>
  .cv-frame{
    margin-top: 1rem;
    border: 1px solid var(--border);
    border-radius: 14px;
    overflow: hidden;
    background: var(--surface);
  }
  .cv-frame iframe{
    width: 100%;
    height: min(80vh, 1000px);
    border: 0;
    display: block;
  }
  @media (max-width: 760px){
    .cv-frame iframe{ height: 75vh; }
  }
</style>

