---
​tags:
  - action
author: Jorge
date: 2020-10-29 10:28
modified: 2025-10-29 10:49
---
# The Problem

Have you ever shot something at **24 fps** or **30 fps** and later wished you had that buttery, dreamy slow‑motion look? If you just duplicate frames or let your editing software blend them, you’ll see jittery jumps or smeared motion. That happens because there simply aren’t enough pictures per second. To slow time gracefully you need to **invent** new pictures between the real ones.

Real‑world footage isn’t ideal though. **Motion blur** from long shutter speeds hides detail, **occlusions** (where one object moves in front of another) confuse the software, and **rolling‑shutter cameras** or heavy **compression** can distort motion. And if your clip was shot at 24 fps and you want to play it back at 96 fps, you’re asking the software to create three brand‑new frames between every pair of originals! The key is to generate plausible “in‑betweens,” not just hold or fade frames.

**What to remember:** _Slow motion looks smooth only when you synthesize new frames instead of repeating existing ones._

# The Core Idea (In Plain English)

Tools like **Twixtor** look at how every pixel in one frame moves to the next. They build a little “map” of motion for each pixel, then **shift** the first frame forward in time and **shift** the second frame backward. After that, they **blend** the two warped frames and fill in any gaps where something gets revealed or disappears. RE:Vision Effects describes Twixtor as using proprietary tracking to calculate motion for each pixel so it can **warp and interpolate frames** of the original sequence[[1]](https://revisionfx.com/products/twixtor/#:~:text=In%20order%20to%20achieve%20unparalleled,frames%20of%20the%20original%20sequence).

Here’s the general recipe no matter what algorithm is used:

1. **Track the motion** – figure out where each pixel is going.
    
2. **Warp the frames** – move the earlier frame forward a bit and the later frame backward a bit.
    
3. **Blend them** – mix the two warped images depending on how far you are between them.
    
4. **Fix holes** – fill in parts that were hidden in one frame but visible in the other.
    

Some methods estimate motion directly (like optical‑flow, used in Twixtor). Others (called **phase‑based methods**) look at how the “phase” of the image changes and modify that, skipping motion estimation[[2]](https://openaccess.thecvf.com/content_cvpr_2015/papers/Meyer_Phase-Based_Frame_Interpolation_2015_CVPR_paper.pdf#:~:text=Standard%20approaches%20to%20computing%20interpolated,any%20form%20of%20explicit%20cor). Newer AI‑driven tools learn to guess what happens between frames. Regardless of the underlying tech, the process is **track → warp → blend → patch**.

**What to remember:** _You’re not just slowing the video; you’re asking the software to imagine what happens between two moments._

# Minimal Intuition (Just Enough Math)

If you like a tiny bit of math, here’s an easy way to picture it. A pixel at position **x** in frame 1 moves at some velocity **v** to its location in frame 2. We assume **it looks roughly the same along its path**, which you might see written as:

I(x, t) ≈ I(x + v⋅Δt, t + Δt)

where **I(x,t)** is the color of a pixel. Once you know **v**, making a halfway frame means shifting frame 0 half a step forward and frame 1 half a step backward, then mixing them. The maths hide all the complexity; in practice the software just tries to keep things looking consistent.

Phase‑based methods skip estimating **v** and instead adjust the **phase** of frequency components to make them look “between”[[2]](https://openaccess.thecvf.com/content_cvpr_2015/papers/Meyer_Phase-Based_Frame_Interpolation_2015_CVPR_paper.pdf#:~:text=Standard%20approaches%20to%20computing%20interpolated,any%20form%20of%20explicit%20cor). That’s why they can work faster and sometimes fail more gracefully when the motion is messy[[3]](https://openaccess.thecvf.com/content_cvpr_2015/papers/Meyer_Phase-Based_Frame_Interpolation_2015_CVPR_paper.pdf#:~:text=yield%20smoother%20transitions%20between%20the,suited%20for%20frame%20interpolation%20and).

**What to remember:** _Motion estimation is an educated guess; errors show up as ghosts or wobbles._

# Sony Vegas + Twixtor: Quick Start (Do This First)

Want to jump straight in? Follow these steps in **Vegas Pro** to get surprisingly smooth slow motion.

1. **Install Twixtor** – Grab the OFX version of Twixtor, run the installer, and restart Vegas so the plug‑in appears in your Video FX list.
    
2. **Match your project to your goal** – In Vegas, set the **Project Properties** to the frame rate you want out (e.g., 96 fps for 4× slow motion). Twixtor reads this project frame rate for its output[[4]](https://help.revisionfx.com/resource/71/#:~:text=Apply%20Twixtor,into%20a%2050fps%20PAL%20sized).
    
3. **Prepare your clip** – Use the cleanest footage you can. The _Plug‑in to After Effects_ guide recommends shooting with very fast shutters (1/240 s if possible) to minimise blur[[5]](https://epdf.pub/plug-in-to-after-effects-third-party-plug-in-mastery.html#:~:text=%C2%ADproduction%20and%20postproduction%3A%201,It%20can%20blur). Right‑click your clip in the timeline and choose **Switches → Disable Resample** so Vegas doesn’t blend frames behind Twixtor’s back.
    
4. **Apply Twixtor** – Select the clip (event), click **Event FX**, and add **Twixtor**. You’ll see Twixtor’s controls.
    
5. **Tell Twixtor about your footage** – Under **Source Control**, set **Input: Frame Rate** to your original frame rate (24.000, 29.97, etc.)[[4]](https://help.revisionfx.com/resource/71/#:~:text=Apply%20Twixtor,into%20a%2050fps%20PAL%20sized). Leave **Input: Fields** at **None** for progressive footage.
    
6. **Choose how to slow**:
    
7. **Speed (%)** – Enter a number like **25 %** to stretch time fourfold. Twixtor lengthens the clip for you.
    
8. **Frame Rate** – Instead of a percentage, you can tell Twixtor to output, say, **96 fps**. This keeps the clip’s length but adds frames so you can slow it later with Vegas’s velocity envelope. **Don’t set both values at once.**
    
9. **Tune motion settings**:
    
10. **Motion Sensitivity** – Think of this as how keen Twixtor is to follow motion. The default (~70) works in many cases; some editors lower it to 20 for smoother results[[6]](https://epdf.pub/plug-in-to-after-effects-third-party-plug-in-mastery.html#:~:text=connect,and%203%20was%20a%20good). Raise the value for subtle movement, lower it if noise is causing jitters.
    
11. **Track Quality** – Use **Medium** while previewing; switch to **Best** when you render.
    
12. **Motion Blur Compensation** – Leave it off for analysis; set it around 2–3 for a bit of natural blur in your final slow motion[[6]](https://epdf.pub/plug-in-to-after-effects-third-party-plug-in-mastery.html#:~:text=connect,and%203%20was%20a%20good).
    
13. **Image Prep** – If your footage is noisy, enable a bit of denoise so Twixtor doesn’t chase grain[[7]](https://borisfx.com/blog/optical-flow-vs-frame-blending-main-difference/#:~:text=The%20more%20data%20your%20video,motion%20effect).
    
14. **Preview & adjust** – Play the clip at a lower quality to check for ghosts or wobbles. Tweak Motion Sensitivity or reduce the slow‑down factor if needed.
    
15. **Render high quality** – For your final export, set Vegas to **Best/Full** quality and use a high‑quality codec (ProRes, DNxHR). Avoid heavy compression until the last step.
    

**What to remember:** _Set the correct input rate, pick_ _Speed_ _or_ _Frame Rate, and don’t forget to disable Vegas’s resampling._

# Vegas Workflow Variations (When You Need Control)

- **Velocity envelope + Twixtor** – Vegas has a Velocity Envelope for speed changes. If you use it with Twixtor, set Twixtor to **Frame Rate mode** and leave the velocity envelope at 100 %. Alternatively, let Twixtor handle all the speed changes by animating its **Speed (%)** parameter.
    
- **Smooth ramps** – You can keyframe Twixtor’s speed: 100 % → 25 % → 100 % to ease into slow motion and out again. This creates nice ramps without the complexity of Vegas’s envelope.
    
- **Per‑shot settings** – Apply Twixtor individually to each event. Copy/paste event attributes to maintain consistency but adjust settings per shot if they need different speeds.
    

**What to remember:** _Don’t double‑retime – pick either Vegas’s tools or Twixtor to control speed._

# Settings Cheatsheet (Start Here, Then Tweak)

  
|Setting|Friendly starting point|Why & when to change|
|---|---|---|
|**Motion Sensitivity**|70–80|Default is OK for most clips. Lower it if Twixtor locks onto noise; some editors like ~20 for extra smoothness[[6]](https://epdf.pub/plug-in-to-after-effects-third-party-plug-in-mastery.html#:~:text=connect,and%203%20was%20a%20good).|
|**Track Quality**|Medium while working; Best when exporting|Higher quality improves the motion estimate but slows down rendering[[8]](https://beverlyboy.com/filmmaking/how-does-twixtor-work/#:~:text=Getting%20the%20most%20out%20of,settings%20that%20increase%20motion%20sensitivity).|
|**Image Prep/Filtering**|Mild denoise|Clean footage gives optical flow more data[[7]](https://borisfx.com/blog/optical-flow-vs-frame-blending-main-difference/#:~:text=The%20more%20data%20your%20video,motion%20effect).|
|**Motion Blur Compensation**|Off for previews; 2–3 for final render|Adds a natural blur over interpolated frames[[6]](https://epdf.pub/plug-in-to-after-effects-third-party-plug-in-mastery.html#:~:text=connect,and%203%20was%20a%20good).|
|**Input: Frame Rate**|Exact frame rate of your footage|Twixtor needs this to know how far apart the originals are[[4]](https://help.revisionfx.com/resource/71/#:~:text=Apply%20Twixtor,into%20a%2050fps%20PAL%20sized).|

**What to remember:** _Start with defaults, adjust gradually, and trust your eyes._

# Troubleshooting Artifacts (Spot & Fix)

  
|What you see|Likely cause|How to tackle it|
|---|---|---|
|**Ghosting/double edges**|Twixtor’s motion guesses disagree|Increase **Track Quality**, reduce the slow‑down (e.g., use 33 % instead of 25 %), stabilize the shot, or mask problem areas.|
|**Tearing at occlusion edges**|Something passes in front of something else|Turn on occlusion detection and, if necessary, mask foreground and background separately.|
|**Rubbery wobble**|Twixtor is confused by textures or noise|Lower **Motion Sensitivity**, denoise or deflicker the footage, or blur the clip slightly before applying Twixtor.|
|**Shimmer in hair/grass**|Fine detail is hard to track|Apply a subtle blur (1–2 pixels) before Twixtor and sharpen afterwards; reduce the slow‑down factor.|

**What to remember:** _Most problems come from tricky input—clean and stabilize your source._

# Shoot So Interpolation Wins (Small but Mighty)

A little planning during shooting makes frame interpolation shine:

- **Fast shutters = crisp frames.** A shutter of **1/240 s** or faster almost eliminates blur and gives Twixtor clean edges to track[[5]](https://epdf.pub/plug-in-to-after-effects-third-party-plug-in-mastery.html#:~:text=%C2%ADproduction%20and%20postproduction%3A%201,It%20can%20blur).
    
- **Plenty of light and low ISO.** More light allows fast shutters and keeps noise down. Clean footage is essential[[7]](https://borisfx.com/blog/optical-flow-vs-frame-blending-main-difference/#:~:text=The%20more%20data%20your%20video,motion%20effect).
    
- **Stable camera.** Lock down your camera or use good stabilization. Rolling‑shutter pans and handheld jitters create warped motion fields.
    
- **Simple scenes.** Avoid busy backgrounds and crossing objects. When characters move in front of each other, occlusion makes interpolation harder.
    
- **Use the highest frame rate you can.** Even if it’s just 60 fps, Twixtor can slow it further with fewer artifacts.
    

**What to remember:** _Great slow motion is born at the shoot – crisp, bright, stable footage makes life easier._

# Quick “Why This Counts as Slow Motion”

When you stretch a 24 fps clip to 96 fps using Twixtor, you’re not just pausing frames; you’re **filling in the gaps**. Optical‑flow tools like Twixtor examine how pixels move and create plausible intermediate frames so motion appears continuous[[1]](https://revisionfx.com/products/twixtor/#:~:text=In%20order%20to%20achieve%20unparalleled,frames%20of%20the%20original%20sequence). That’s why the result feels smooth and not like a flipbook. Just remember that when motion is extreme or details are hidden, the software has to guess, so it might hallucinate.

**What to remember:** _You’re densifying time—not freezing it._

# Science & Practical Uses (Beyond Edits)

Frame interpolation isn’t just for flashy edits. It has real‑world uses:

- **Sports and biomechanics:** Coaches use slow motion to study athletes’ movements. Smooth slow‑mo makes it easier to see precise joint angles.
    
- **Event analysis:** Engineers reviewing accidents or machinery failures can slow down footage that wasn’t shot in high frame rates to better see what happened.
    
- **Multi‑camera sync:** When cameras with different frame rates need to be matched, generating extra frames helps align them.
    
- **Machine‑learning datasets:** Researchers use interpolated frames as extra training examples for AI models.
    
- **Virtual views:** Phase‑based methods can generate novel in‑between views for special effects[[2]](https://openaccess.thecvf.com/content_cvpr_2015/papers/Meyer_Phase-Based_Frame_Interpolation_2015_CVPR_paper.pdf#:~:text=Standard%20approaches%20to%20computing%20interpolated,any%20form%20of%20explicit%20cor).
    

Always be honest about using interpolated frames if precision is required; don’t measure distances or speeds on made‑up data.

**What to remember:** _Interpolation is a useful tool beyond editing—just be transparent when accuracy matters._

# Tiny Hands‑On Check (2 minutes)

Curious what difference interpolation makes? Try this quick test:

1. **Duplicate a short clip** (3–5 seconds) in Vegas so you have two identical tracks.
    
2. **Track A:** Add Twixtor, set **Speed** to 25 %, and disable Vegas’s resample.
    
3. **Track B:** Just slow the clip with the normal time‑stretch tool (hold Ctrl and drag), leaving Vegas to duplicate frames.
    
4. **Play back** at half speed and step through a few frames. On Track A you’ll see smooth movement; on Track B you’ll see jumps. Notice hair, hands, and background edges.
    
5. **Adjust and compare** – try raising Motion Sensitivity or reducing the slow‑down to fix any issues.
    

# 5‑Bullet Checklist: Will My Clip Interpolate Well?

1. **Is it crisp and bright?** Fast shutters (around 1/240 s) and good lighting minimise blur and noise[[5]](https://epdf.pub/plug-in-to-after-effects-third-party-plug-in-mastery.html#:~:text=%C2%ADproduction%20and%20postproduction%3A%201,It%20can%20blur)[[7]](https://borisfx.com/blog/optical-flow-vs-frame-blending-main-difference/#:~:text=The%20more%20data%20your%20video,motion%20effect).
    
2. **Is the camera steady?** Locked‑off or well‑stabilised shots produce cleaner slow motion. Rolling‑shutter pan = bad.
    
3. **Are there few occlusions?** Scenes where people or objects pass in front of each other are harder to interpolate.
    
4. **Is the footage clean?** Less noise and lower compression give the motion‑estimator more information[[7]](https://borisfx.com/blog/optical-flow-vs-frame-blending-main-difference/#:~:text=The%20more%20data%20your%20video,motion%20effect).
    
5. **Is the motion moderate?** If someone is waving their hair or water is splashing everywhere, be prepared for artifacts. Higher native frame rates help.
    

## References & Further Learning

- **Twixtor product page** – Explanation of how Twixtor warps and interpolates frames[[1]](https://revisionfx.com/products/twixtor/#:~:text=In%20order%20to%20achieve%20unparalleled,frames%20of%20the%20original%20sequence).
    
- **How does Twixtor work?** – A plain‑language article describing Twixtor’s motion estimation and settings[[9]](https://beverlyboy.com/filmmaking/how-does-twixtor-work/#:~:text=WHAT%20IS%20TWIXTOR%20AND%20HOW,IT%20ENABLE%20FRAME%20RATE%20CONVERSION)[[10]](https://beverlyboy.com/filmmaking/how-does-twixtor-work/#:~:text=Key%20parameters%20to%20monitor%20include,unique%20demands%20of%20each%20project).
    
- **Optical flow vs. frame blending (Boris FX blog)** – Why optical flow looks better and how extra data helps[[11]](https://borisfx.com/blog/optical-flow-vs-frame-blending-main-difference/#:~:text=will%20look%20at%20the%20whole,create%20new%20frames%20in%20between)[[12]](https://borisfx.com/blog/optical-flow-vs-frame-blending-main-difference/#:~:text=Optical%20flow%2C%20on%20the%20other,it%20can%20distort%20the%20image).
    
- **Plug‑in to After Effects** – Tips on shooting with fast shutters and tuning Motion Sensitivity[[5]](https://epdf.pub/plug-in-to-after-effects-third-party-plug-in-mastery.html#:~:text=%C2%ADproduction%20and%20postproduction%3A%201,It%20can%20blur)[[6]](https://epdf.pub/plug-in-to-after-effects-third-party-plug-in-mastery.html#:~:text=connect,and%203%20was%20a%20good).
    
- **Phase‑Based Frame Interpolation for Video** – A research paper explaining phase‑based alternatives[[2]](https://openaccess.thecvf.com/content_cvpr_2015/papers/Meyer_Phase-Based_Frame_Interpolation_2015_CVPR_paper.pdf#:~:text=Standard%20approaches%20to%20computing%20interpolated,any%20form%20of%20explicit%20cor).
    
- **RE:Vision help article** – Shows that Twixtor uses the composition’s frame rate as output and needs the correct input rate[[4]](https://help.revisionfx.com/resource/71/#:~:text=Apply%20Twixtor,into%20a%2050fps%20PAL%20sized).

_What to remember:_ Learning how to use frame interpolation is like learning a craft: start simple, observe, and tweak. With clean footage and a bit of practice, you can turn ordinary clips into silky slow‑motion stories.