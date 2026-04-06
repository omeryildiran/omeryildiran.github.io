---
title: "A Reproducible Figure Styling System for Scientific Papers"
description: "What I learned from standardizing figures for my first manuscript — and the simple Python file that fixed it."
slug: "reproducible-figure-styling"
date: 2026-04-06
tags: [python, matplotlib, research, tutorial]
---

One of the most frustrating parts of writing my first paper wasn't the modeling or the analysis. It was figure consistency.

The same issues kept coming back: panel labels slightly different across figures, font sizes not quite matching, small inconsistencies I'd only notice late at night before a deadline. And then — manual fixes in Illustrator that broke reproducibility the next time I regenerated the figure.

None of this affected the science. But it slowed everything down.

I hope the follwing system will help me and others avoid that headache in the future. In theory using this kind of setup should make article publishing much smoother, but as I have only gone through it once, I can't say for sure yet. I will see how it goes with the next paper, otherwise I might have to leave academia and become a barista :)

> Define all figure styling once in code, and never touch it manually again.

---

## The idea

Every figure in the paper should come from the same styling system. Same font hierarchy, same panel label style, same axis and tick formatting, same export settings.

Once that's in place, figure consistency basically stops being a problem.

---

## The setup

I keep a shared file called `plot_style.py`. Every script or notebook starts with:

```python
from plot_style import setup_style, add_panel_labels
setup_style()
```

That's it. No local styling unless there's a very specific reason.

You can grab the full file here: [plot_style.py](/assets/codes/plot_style.py)

Or see the complete code at the bottom of this post.

---

## Font hierarchy

I use four font sizes and nothing else:

```python
FONT_SIZE_LABEL  = 18   # axis labels, tick labels
FONT_SIZE_TITLE  = 20   # subplot titles, panel letters
FONT_SIZE_LEGEND = 18   # legend text
FONT_SIZE_SUPER  = 22   # figure suptitle
```

More font sizes means more inconsistency. Four is enough.

---

## Panel labels

I used to add panel labels manually — typing "A" and "B" in Illustrator, adjusting positions by eye. That was a mistake.

Now everything goes through:

```python
add_panel_labels(axes, ["A", "B"])
```

Uppercase, bold, consistent position, consistent size. If it's generated in code, it can't be inconsistent.

---

## Figure sizes

Instead of guessing dimensions each time, I define a few templates:

```python
def figsize_panel(n_cols=1, n_rows=1):   return (5.0 * n_cols, 4.0 * n_rows)
def figsize_scatter(n_cols=1, n_rows=1): return (6.0 * n_cols, 6.0 * n_rows)
def figsize_matrix(n_cols=1, n_rows=1):  return (4.0 * n_cols, 4.0 * n_rows)
```

Multi-panel figures scale predictably. Proportions stay consistent across the paper.

---

## What gets standardized globally

Everything goes through `rcParams`, set once in `setup_style()`:

**Fonts** — Arial/Helvetica/DejaVu Sans, all at the defined sizes above.

**Axes and ticks** — `linewidth: 1.5`, `major.width: 1.5`, `major.size: 6`. Clean and sharp without being heavy.

**Lines** — `linewidth: 2.0`, `markersize: 8`. Visible at journal column width.

**Legends** — frame on, 80% alpha. Present but not intrusive.

**Saving** — `dpi: 300`, `bbox: tight`. Ready for submission without post-processing.

**Vector export** — `pdf.fonttype: 42` and `ps.fonttype: 42`. This keeps text editable in Illustrator and prevents font substitution issues.

---

## Seaborn

I use seaborn only as a base theme:

```python
sns.set_theme(context='talk', style='white')
```

The rule I follow: seaborn for appearance, matplotlib for control. `rcParams` always wins.

---

## What I stopped doing

**No more manual panel labels.** Adding "A" and "B" in Illustrator introduces drift every time.

**No more per-figure font tuning.** `fontsize=17` in one script and `fontsize=21` in another is how inconsistency happens.

**No more mixing workflows.** If one figure is code-generated and another is manually edited, they will eventually diverge.

---

## Minimal example

```python
from plot_style import setup_style, figsize_panel, add_panel_labels
import matplotlib.pyplot as plt

setup_style()

fig, axes = plt.subplots(1, 2, figsize=figsize_panel(2, 1))

axes[0].plot([1, 2, 3], [2, 3, 1])
axes[0].set_title("Condition 1")
axes[0].set_xlabel("Conflict")
axes[0].set_ylabel("PSE shift")

axes[1].plot([1, 2, 3], [1, 2, 2])
axes[1].set_title("Condition 2")
axes[1].set_xlabel("Conflict")
axes[1].set_ylabel("PSE shift")

add_panel_labels(axes, ["A", "B"])

plt.savefig("figure.pdf")
```

---

## Full plot_style.py

```python
"""
Shared matplotlib / seaborn style configuration.

Usage at the top of any analysis notebook:
    from plot_style import setup_style, add_panel_labels
    setup_style()
"""

import matplotlib.pyplot as plt
import seaborn as sns

# ── Font size constants ────────────────────────────────────────────────────────
FONT_SIZE_LABEL  = 18   # axis labels, tick labels, base font
FONT_SIZE_TITLE  = 20   # subplot titles, panel letters
FONT_SIZE_LEGEND = 18   # legend text
FONT_SIZE_SUPER  = 22   # figure suptitle

# ── Figure size helpers ────────────────────────────────────────────────────────
def figsize_scatter(n_cols=1, n_rows=1): return (6.0 * n_cols, 6.0 * n_rows)
def figsize_panel  (n_cols=1, n_rows=1): return (5.0 * n_cols, 4.0 * n_rows)
def figsize_matrix (n_cols=1, n_rows=1): return (4.0 * n_cols, 4.0 * n_rows)

# ── Panel label helper ─────────────────────────────────────────────────────────
PANEL_LABELS = list("ABCDEFGHIJKLMNOPQRSTUVWXYZ")

def add_panel_labels(axes, labels=None, x=-0.15, y=1.06, fontsize=None, **kwargs):
    """
    Add panel labels (A, B, C …) to a list / array of axes.

    Parameters
    ----------
    axes    : iterable of Axes
    labels  : list of strings, defaults to ['A', 'B', 'C', …]
    x, y    : position in axes-fraction coordinates
    fontsize: int, defaults to FONT_SIZE_TITLE (20 pt)
    """
    if fontsize is None:
        fontsize = FONT_SIZE_TITLE
    if labels is None:
        labels = PANEL_LABELS
    for ax, label in zip(axes, labels):
        ax.text(x, y, label,
                transform=ax.transAxes,
                fontsize=fontsize,
                fontweight='bold',
                va='top',
                **kwargs)

# ── rcParams ───────────────────────────────────────────────────────────────────
_RC = {
    'font.family'       : 'sans-serif',
    'font.sans-serif'   : ['Arial', 'Helvetica', 'DejaVu Sans'],
    'font.size'         : FONT_SIZE_LABEL,
    'font.weight'       : 'normal',

    'axes.labelsize'    : FONT_SIZE_LABEL,
    'axes.labelweight'  : 'normal',
    'axes.titlesize'    : FONT_SIZE_TITLE,
    'axes.titleweight'  : 'normal',
    'axes.linewidth'    : 1.5,

    'xtick.labelsize'   : FONT_SIZE_LABEL,
    'ytick.labelsize'   : FONT_SIZE_LABEL,
    'xtick.major.width' : 1.5,
    'ytick.major.width' : 1.5,
    'xtick.major.size'  : 6,
    'ytick.major.size'  : 6,

    'lines.linewidth'   : 2.0,
    'lines.markersize'  : 8,

    'legend.fontsize'   : FONT_SIZE_LEGEND,
    'legend.frameon'    : True,
    'legend.framealpha' : 0.8,
    'legend.edgecolor'  : 'black',

    'axes.grid'         : False,
    'grid.linewidth'    : 1.0,
    'grid.alpha'        : 0.3,

    'figure.dpi'        : 100,
    'savefig.dpi'       : 300,
    'savefig.bbox'      : 'tight',
    'savefig.pad_inches': 0.1,

    'pdf.fonttype'      : 42,
    'ps.fonttype'       : 42,
}

def setup_style(sns_style='white', sns_context='talk'):
    """Apply rcParams and seaborn theme."""
    sns.set_theme(context=sns_context, style=sns_style, font_scale=1.0)
    plt.rcParams.update(_RC)


# Apply immediately on import
setup_style()
```


Final Takeaway

A good figure styling system is not about aesthetics, it is more about readability and being perfectionist. It is about making sure that the reader can focus on the data and the story, without being distracted by inconsistencies or formatting issues. By defining a clear and consistent style for all figures in a paper, we can enhance the clarity and professionalism of our work, and make it easier for others to understand and reproduce our results.