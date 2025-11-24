---
layout: note
title: Use Zoom's Virtual Background with Discord/Google Meet/Skype/LINE
date: 2023-04-16
tags: [creative, notes, tools, web3]
---

**Problem:**

- How can one use Zoom's superior virtual background options with Discord/Google Meet/Skype/LINE, on a Mac?

**Solution:**

- Download and install [OBS](http://obsproject.com/) (which will provide the "virtual camera" for us here)
- Enable OBS permission to record Zoom:
  - Settings → Security & Privacy → Screen Recording and checking the box for OBS
- Open **Zoom**, set up virtual background as you'd like, and start a meeting by yourself
- Open **OBS** and add "Windows Capture" as an input source
  - Create New → Choose Zoom Meeting as the Window in the dropdown
- Adjust Zoom window as you'd like in OBS (I like to make it larger so that you don't see the Zoom control buttons)
- Click Start Virtual Camera

**Discord:**
- Settings → Voice & Video → Video Settings → Choosse OBS Virtual Camera in Camera dropdown
- If you don't see OBS Virtual Camera as an option, "fix" Discord by entering below in terminal.app:

```shell
sudo codesign --remove-signature /Applications/Discord.app/Contents/Frameworks/Discord\ Helper\ (GPU).app /Applications/Discord.app/Contents/Frameworks/Discord\ Helper\ (Plugin).app /Applications/Discord.app/Contents/Frameworks/Discord\ Helper\ (Renderer).app /Applications/Discord.app/Contents/Frameworks/Discord\ Helper.app
```

**Other Apps:**
- I tested this and it works with **Google Meet, Skype, and LINE**.
- This system should theoretically work with any video chat/conferencing systems that accept virtual cameras.

**[Flow Club](http://flow.club/):**
- Sadly it seems to use too much CPU this way and is unusably laggy [XSplit VCam](http://xsplit.com/) does work but it doesn't render the "edges" as nicely as Zoom...

**Credit:**

- [NeoCryptor's NO GREEN SCREEN NO PROBLEM - OBS LIFE HACK video](https://www.youtube.com/watch?v=88E8yn4PhOw) for the idea of using Zoom and OBS together
- These OBS forum threads for solving Mac-specific problems:
  - [https://obsproject.com/forum/threads/obs-virtual-cam-to-discord.133437/](https://obsproject.com/forum/threads/obs-virtual-cam-to-discord.133437/)
  - [https://obsproject.com/forum/threads/obs-cannot-capture-zoom-window-and-others.137576/](https://obsproject.com/forum/threads/obs-cannot-capture-zoom-window-and-others.137576/)
