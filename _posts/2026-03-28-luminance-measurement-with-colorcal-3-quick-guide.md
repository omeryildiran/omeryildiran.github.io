---
layout: default
title: "Luminance Measurement with ColorCAL 3"
date: 2026-03-28
---

This quick guide explains how to measure luminance values in `cd/m^2` for visual stimuli using the CRS ColorCAL 3. It is intended for reporting stimulus luminance in manuscripts, methods sections, and experiment notes.

## When to use this guide

Use this guide when you want to:

- measure the luminance of stimuli shown on your experiment display
- report luminance values for backgrounds, targets, or other visual elements
- collect either a few manual readings or repeated measurements through code

## Step 0: Update firmware only if needed

If your computer does not recognize the device, you may need to update the ColorCAL 3 firmware. In many cases the device is recognized automatically, especially on a machine with the required drivers already installed.

## 1. Manual method

This is the simplest approach. It is useful when your stimulus has only a few components, such as a background and a target, and you mainly want luminance values for reporting rather than full calibration.

### Setup

- Use the same display and display settings as in the experiment.
- Disable HDR, Night Shift, True Tone, and auto-brightness.
- Present the stimulus full-screen.
- Let the display warm up before measuring if you need stable values.

### Connect the device

1. Plug in the ColorCAL 3.
2. In Terminal, list the device:

```bash
ls /dev/tty.usb*
```

3. Connect to the reported device:

```bash
screen /dev/tty.usbmodemXXXX 115200
```

4. Type `?` and press Enter to confirm the connection.

### Measure luminance

1. Display the stimulus you want to measure.
2. Place the device flat against the center of the screen.
3. Type `M` and press Enter.
4. The device returns output in this format:

```text
OK00, Y, x, y
```

Use `Y` as the luminance value in `cd/m^2`.

### Reporting tip

- Take `5` to `10` measurements per condition.
- Record the values and report the mean.
- If relevant, also report the display model and display settings.

## 2. Automated method with PsychoPy

Use this method when you want to measure luminance repeatedly from within an experiment or script.

### Setup

- Plug the ColorCAL 3 into the same computer used for the experiment.
- Keep the same display settings used during data collection.

### Example code

```python
from psychopy.hardware.crs.colorcal import ColorCAL
from psychopy import visual

win = visual.Window(fullscr=True, color=[0, 0, 0])
cc = ColorCAL()

# Example stimulus
stim = visual.Rect(win, width=2, height=2, fillColor=[0, 0, 0])

levels = [-1, -0.5, 0, 0.5, 1]

for level in levels:
    stim.fillColor = [level, level, level]
    stim.draw()
    win.flip()
    luminance = cc.getLum()
    print(level, luminance)
```

This prints the luminance measured for each stimulus level.

## Notes

- Always measure on the exact display used in the experiment.
- Small display setting changes can affect luminance substantially.
- If you are writing a paper, manual measurement is often enough when you only need descriptive luminance values.
