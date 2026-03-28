

This guideline it for measuring luminance (cd/m²) of visual stimuli for reporting purposes.

## Step 0- (Only if needed) Update firmware (Mac/Windows)
If somehow your computer doesnt recognize the tool you might need to update firmware. For me it automatically recognized and I think if you are connected to internet your computer would probably recognize the tool.

## **1. Manual Method (Simple)**

This method is manual measurement of luminance. It is easy and fast. If your stimulus consists of only a few components (e.g., background and a disk), and you are not planning to calibrate but only to report luminance values in your article, this method is sufficient.

### **Setup**

- Use the same display and settings as in the experiment
- Present stimuli full-screen

### **Connection (Mac or laptop)**

1. Plug in ColorCAL
2. In Terminal:

```
ls /dev/tty.usb*
```
This command should give you list of the devices connected via usb to your computer.  From the list find sth named like usbmodemXXXX and copy the name.

3. Connect:
```
screen /dev/tty.usbmodemXXXX
```
   
4. Type '?' and this will enter the device menu, which will show  some command that you can use: ![[assets/Pasted image 20260328161220.png]]
Thats it you are in the device and ready to take measurements
### **Measurement**

1. Display the stimulus (e.g., background or target)
2. Place the device flat at screen center
3. 
4. Type: 'M' and press enter.  Dont be confused M will not be visible on terminal.

5. Output will be:

```
OK00, Y, x, y
```
 ![[Pasted image 20260328161441.png]]
4. Use **Y** (cd/m²) as luminance

- Take 5-10 measurements per condition
- Record values and compute mean
---

## **2. Automated Method (PsychoPy or psychtoolbox)**
This is if you want to record values over and over again.
### **Setup**

- Plug ColorCAL into the experiment computer
- Use same display settings as experiment  
### **Example Code** (for psychopy)

```
from psychopy.hardware.crs.colorcal import ColorCAL
from psychopy import visual

win = visual.Window(fullscr=True, color=[0,0,0])
cc = ColorCAL()

# example stimulus
stim = visual.Rect(win, width=2, height=2, fillColor=[0,0,0])

levels = [-1, -0.5, 0, 0.5, 1]

for lvl in levels:
    stim.fillColor = [lvl, lvl, lvl]
    stim.draw()
    win.flip()
    lum = cc.getLum()
    print(lvl, lum)
```

