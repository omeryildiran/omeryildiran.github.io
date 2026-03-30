---
title: "PsychoPy Experiment Design Workshop"
description: "Build a psychophysics experiment from scratch in PsychoPy (design → test → analyze)."
slug: "psychopy-experiment-design-workshop"
date: 2023-06-01
tags: [psychopy, workshop, experiments]
---

## About workshop

Hi, in this workshop, we are going to create an experiment from scratch, test it on ourselves, and try to analyze our data.

Psychophysics is a branch of psychology that tries to investigate the relation between physical stimuli and psychological responses. In order to do that, we need to create an experiment that will be able to control the stimuli and record the responses, response times and other cognitive behavioral variables.

We will be using PsychoPy, which is a free and open-source software for creating experiments in cognitive science. It is written in Python and uses the library of PyGame. PsychoPy in relative to Matlab Psychtoolbox, is more user-friendly and easy to use. It also has a graphical user interface (GUI), which is called PsychoPy Builder.

However, it is not as flexible as writing your own code. So, we will be mainly using PsychoPy Coder, to include our Python codes in to the experiment.

![PsychoPy Builder screenshot](/assets/images/psychopy-workshop/step.png)

The experiment we are going to create is based on the previous study by Jovanovich and Mamassian (2020) which showed that distractor events that are unrelated to target events can affect the perceived time of target events.

Following up on this; another study of Omer Yildiran & Pascal Mamassian, 2023 tried to investigate effect of expectation on timing of events by creating priming using frequency of target/distractor events proportion.

In this experiment, we will still be investigating the effect of expectation on perceived time, however, in this workshop, we will use only single stimuli. We will try to create priming on the specific timing of the target by having a more frequent appearance of stimuli on a range of specific timing. Also, we will have unexpected conditions in which the timing of stimuli will be in a slightly different range.

---

## Aim

Our aim is to achieve creating an experiment similar to the following video.

<video controls preload="metadata" class="workshop-video">
  <source src="/assets/videos/psychopy-experiment-design-workshop.mp4" type="video/mp4" />
</video>

<style>
  .workshop-video{
    width: 100%;
    border-radius: 14px;
    border: 1px solid var(--border);
    background: #000;
    box-shadow: var(--shadow);
  }
</style>

---

## Time and Place

You choose it, but please select all available times. As we all will have classes I didnt open slots within weeks next week.

- It will approximately take **2 days / 5 hour sessions** (Can be longer or shorter)
- It is long because, although I have all the code, I will not just show you `print("hello world")` and ask you to copy-paste all other functions. I will try to stick to doing all stuff there like a naive coder

---

## Requirements

- Basic knowledge of Python (or any other programming language)
- Installing PsychoPy (essential to do before the workshop)
- Coffee

### Installing PsychoPy

- Install Python (3.8 is recommended) or higher: <https://www.python.org/downloads/>
- Install PsychoPy: <https://www.psychopy.org/download.html>
- For analysis parts we also need Python packages such as NumPy, matplotlib, SciPy, pandas…
  - Easy way: install Anaconda (includes most analysis packages) or use Google Colab
