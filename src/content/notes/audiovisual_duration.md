---
title: "Duration Judgments with Conflicting Audiovisual Cues"
description: "Experiment overview, figures, and demo videos for audiovisual duration judgments under cue conflict."
slug: "audiovisual-duration"
date: 2026-04-07
tags: [audiovisual, duration, psychophysics, modeling]
---

## Overview

How does the brain integrate conflicting temporal information across sensory modalities? Previous work has shown that observers integrate audiovisual duration cues close to optimally when cue conflict is small. This project asks whether causal inference causes audiovisual integration to break down when the conflict becomes large.

In this task, participants compared the auditory durations of a test and a standard stimulus. Audiovisual durations were matched in the test stimulus, while the standard stimulus contained seven levels of audiovisual conflict spanning `-250 ms` to `+250 ms`. Auditory durations were tested under both low- and high-noise conditions.

The main pattern was a systematic shift in auditory duration judgments toward the visual cue, especially when auditory noise was high. Within the tested conflict range, these shifts were close to linear, making it difficult to clearly separate forced-fusion, causal-inference, and probabilistic switching models.

## Experiment Materials

<div class="project-links">
  <a class="chip" href="/assets/docs/audiovisual-duration/unimodal-tasks-timeline.pdf">Unimodal timeline (PDF)</a>
  <a class="chip" href="/assets/docs/audiovisual-duration/pooled-psychometric-functions.pdf">Psychometric fits (PDF)</a>
  <a class="chip" href="/assets/docs/audiovisual-duration/aggregated-mu-vs-models.pdf">Model comparison (PDF)</a>
</div>

### Unimodal Timeline

<figure class="pdf-figure">
  <div class="pdf-frame">
    <object
      data="/assets/docs/audiovisual-duration/unimodal-tasks-timeline.pdf"
      type="application/pdf"
      class="pdf-object"
    >
      <p>PDF preview is not available in this browser. <a href="/assets/docs/audiovisual-duration/unimodal-tasks-timeline.pdf">Open the figure PDF</a>.</p>
    </object>
  </div>
  <figcaption>Unimodal task structure and trial timeline.</figcaption>
</figure>

### Conflict Design

<figure class="media-figure">
  <img
    src="/assets/images/audiovisual-duration/bimodal_exp_scheme.png"
    alt="Audiovisual conflict design"
    class="project-image"
    loading="lazy"
  />
  <figcaption>Conflict was introduced in the visual component of the standard interval while the auditory signal stayed fixed.</figcaption>
</figure>

Conflicts were introduced only in the visual component of the standard stimulus, while the auditory component remained unchanged. Negative conflicts made the visual standard shorter than the auditory standard; positive conflicts made it longer.

### Crossmodal Reference

<figure class="media-figure">
  <img
    src="/assets/images/audiovisual-duration/crossmodalTimeline_web.png"
    alt="Crossmodal timeline"
    class="project-image"
    loading="lazy"
  />
  <figcaption>Crossmodal calibration task used to estimate participant-specific audiovisual bias.</figcaption>
</figure>

The crossmodal task provided an estimate of audiovisual bias, which was then used to correct visual durations in the bimodal experiment.

### Psychometric Fits

<figure class="pdf-figure">
  <div class="pdf-frame">
    <object
      data="/assets/docs/audiovisual-duration/pooled-psychometric-functions.pdf"
      type="application/pdf"
      class="pdf-object"
    >
      <p>PDF preview is not available in this browser. <a href="/assets/docs/audiovisual-duration/pooled-psychometric-functions.pdf">Open the psychometric figure PDF</a>.</p>
    </object>
  </div>
  <figcaption>Psychometric functions across audiovisual conflict levels under low and high auditory noise.</figcaption>
</figure>

### Model Comparison

<figure class="pdf-figure">
  <div class="pdf-frame">
    <object
      data="/assets/docs/audiovisual-duration/aggregated-mu-vs-models.pdf"
      type="application/pdf"
      class="pdf-object"
    >
      <p>PDF preview is not available in this browser. <a href="/assets/docs/audiovisual-duration/aggregated-mu-vs-models.pdf">Open the model comparison PDF</a>.</p>
    </object>
  </div>
  <figcaption>Observed conflict-dependent bias compared against competing model predictions.</figcaption>
</figure>

## Demo Videos

### Unimodal Auditory

<video controls preload="metadata" class="project-video">
  <source src="/assets/videos/audiovisual-duration/unimodal-auditory.mp4" type="video/mp4" />
</video>

### Visual Demo

<video controls preload="metadata" class="project-video">
  <source src="/assets/videos/audiovisual-duration/visual-demo.mp4" type="video/mp4" />
</video>

### Crossmodal Demo

<video controls preload="metadata" class="project-video">
  <source src="/assets/videos/audiovisual-duration/crossmodal-demo.mp4" type="video/mp4" />
</video>

### Bimodal Demo

<video controls preload="metadata" class="project-video">
  <source src="/assets/videos/audiovisual-duration/bimodal-demo.mp4" type="video/mp4" />
</video>

## Summary

Auditory duration percepts were biased toward visual duration, and that bias increased with cue conflict and auditory uncertainty. A probabilistic cue-switching account was preferred for many participants, but the differences between candidate models remained small because auditory duration encoding was noisy enough to make their predictions overlap strongly in the tested regime.

<style>
  .project-links{
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin: 0 0 1rem;
  }

  .chip{
    border: 1px solid var(--border);
    background: var(--surface);
    padding: 0.35rem 0.65rem;
    border-radius: 999px;
    text-decoration: none;
    color: var(--text);
  }

  .project-video{
    width: 100%;
    max-width: 100%;
    border-radius: 14px;
    border: 1px solid var(--border);
    background: #000;
    box-shadow: var(--shadow);
    margin: 0.35rem 0 1rem;
    display: block;
  }

  .media-figure,
  .pdf-figure{
    margin: 1rem 0 1.25rem;
  }

  .project-image{
    width: 100%;
    max-width: 100%;
    height: auto;
    display: block;
    border: 1px solid var(--border);
    border-radius: 14px;
    background: var(--surface);
    box-shadow: var(--shadow);
  }

  .pdf-frame{
    width: 100%;
    max-width: 100%;
    border: 1px solid var(--border);
    border-radius: 14px;
    overflow: hidden;
    background: var(--surface);
    box-shadow: var(--shadow);
  }

  .pdf-object{
    width: 100%;
    height: min(78vh, 980px);
    display: block;
    background: white;
  }

  figcaption{
    margin-top: 0.5rem;
    color: var(--muted);
    font-size: 0.96rem;
  }
 </style>
