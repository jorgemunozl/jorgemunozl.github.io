# Local Graph Parameter Guide

This guide explains how the interactive note graph behaves and how to tune the controls exposed in `LocalGraphView` and `GlobalGraphView`. The graph is powered by [`react-force-graph-2d`](https://github.com/vasturiano/react-force-graph) with custom physics and rendering hooks layered on top, calibrated to feel close to Obsidian's graph.

## Visual Controls

- **Node Size** – Multiplier applied to each node's intrinsic size. Defaults to `5`. The active note in the local graph receives an additional 1.5× multiplier so it stands out. The intrinsic size itself follows `4 + sqrt(degree) * 2.2`, so leaves and hubs differ by area rather than by radius — closer to how Obsidian renders the graph.
- **Link Thickness** – Sets the uniform stroke width for every edge. Thicker links emphasize relationships; thinner links reduce visual clutter on dense clusters.
- **Text Threshold** – Determines how far you must zoom in before node titles render (`globalScale > threshold`). Larger values hide labels until you are close; smaller values show text sooner but can overlap when zoomed out.

## Physics Controls

All force sliders ultimately feed into D3 forces that shape the layout:

- **Center Force** – Strength of an optional radial attraction toward the origin. Raising this value pulls the entire graph inward and keeps clusters centered. Lower values let the graph drift freely. Default is `0`.
- **Repel Force** – The charge strength (negative pushes nodes apart). More negative numbers produce stronger repulsion, spreading nodes out and reducing overlap. Values closer to 0 pack nodes tighter. Default is `-90`.
- **Link Force** – Multiplier applied to spring strength. Increasing it shortens and stiffens connections so linked nodes stay close. Decreasing it allows links to stretch, which can make communities more distinct. Default is `1`.
- **Link Distance** – Target length for every edge. Larger distances expand the layout; smaller distances pull nodes closer together. Default is `40` for the global graph and `50` for the local graph.

Behind the scenes, the simulation runs with:

- `cooldownTicks = Infinity` and `cooldownTime = Infinity` – the engine never auto-stops; alpha governs motion so the graph stays subtly alive.
- `d3AlphaDecay = 0.0228` – the d3-force default; slow enough for smooth easing without endless jitter.
- `d3VelocityDecay = 0.4` – the d3-force default; nodes carry a touch of momentum but don't drift forever.
- `d3AlphaMin = 0.001` – the minimum alpha at which the simulation considers itself "active".
- An idle `alphaTarget = 0.015` is held after settling so the layout never freezes between interactions.

## Drag Dynamics

Dragging a node temporarily fixes its coordinates (`node.fx/node.fy`) so it tracks your cursor. While dragging, `alphaTarget` rises to `0.25` to reheat the simulation and give neighbors enough kinetic energy to react. When you release:

1. `alphaTarget` is held at `0.08` for ~2 seconds so the cluster keeps nudging.
2. The fixed position is released and `alphaTarget` relaxes back to the idle baseline (`0.015`), keeping the graph quietly alive.

This staggered cooldown is what creates the subtle "living" rebound motion similar to Obsidian's graph.

## Smooth Wheel Zoom

Wheel zoom is handled by `useSmoothForceGraphZoom`, which uses a velocity/momentum model rather than a plain lerp:

- Each wheel event injects a velocity proportional to `deltaY` (clamped to avoid touchpad fling jumps).
- Per frame, velocity decays by `momentum` (`0.92`) and integrates into a `target` zoom.
- `current` zoom lerps toward `target` with `damping = 0.18`.
- Mouse position is converted via `screen2GraphCoords` so the point under the cursor remains anchored.
- After ~250 ms of no wheel input the hook reseats itself to the live camera, so manual `centerAt` calls (e.g. `zoomToFit`) don't snap on the next zoom.

### Where the behavior lives

- `src/components/LocalGraphView.tsx` and `src/components/GlobalGraphView.tsx` – every knob is wired here. The drag handlers manage `fx/fy`, `alphaTarget`, and the cooldown timeout; the `ForceGraph2D` component receives the renderer/physics props (`nodeCanvasObject`, `d3AlphaDecay`, etc.).
- `src/hooks/useSmoothForceGraphZoom.ts` – the velocity/momentum wheel-zoom hook used by both graph views.
- `src/utils/wikiLinks.ts` – builds the `nodes`/`links` data structure and computes node sizes from degree (`4 + sqrt(degree) * 2.2`).
- `scripts/generate-notes.js` – generates note content that feeds into the graph and writes `src/components/data/prebuiltGraph.ts`. Mirrors the sizing formula from `wikiLinks.ts`.

To tweak any of these behaviors, adjust the relevant section and run `npm run dev` (for live preview) or `npm run build` to regenerate production assets.

## Tuning Recipes

- **More organic drift** – Raise the idle `alphaTarget` (e.g., 0.03) so the layout breathes more visibly.
- **Faster stabilization** – Increase `d3VelocityDecay` (e.g., 0.5) and reduce post-drag cooldown so nodes settle quickly.
- **Tight clusters** – Increase `linkForce` and decrease `linkDistance`. Optionally bring `repelForce` closer to 0 to allow overlap.
- **Spread-out overview** – Lower `linkForce`, reduce the magnitude of `repelForce`, and increase `linkDistance` to let communities breathe.
- **Recentering** – Raise `centerForce` slightly (0.05–0.1) so the graph recenters itself during long sessions.
- **Heavier zoom feel** – Lower `momentum` (e.g., 0.85) in `useSmoothForceGraphZoom` so the camera coasts less.
- **Lighter zoom feel** – Raise `momentum` (e.g., 0.96) so the camera glides further after each scroll.

Experiment with one parameter at a time and give the simulation a moment to respond—small changes can cascade because every force influences the others.
