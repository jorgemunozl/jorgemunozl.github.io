# Local Graph Parameter Guide

This guide explains how the interactive note graph behaves and how to tune the controls exposed in `LocalGraphView`. The graph is powered by [`react-force-graph-2d`](https://github.com/vasturiano/react-force-graph) with custom physics and rendering hooks layered on top.

## Visual Controls

- **Node Size** – Scales each node’s radius. The active note receives a 1.5× multiplier so it remains easy to spot. Larger nodes are easier to select but contribute slightly more inertia to the layout.
- **Link Thickness** – Sets the uniform stroke width for every edge. Thicker links emphasize relationships; thinner links reduce visual clutter on dense clusters.
- **Text Threshold** – Determines how far you must zoom in before node titles render (`globalScale > threshold`). Larger values hide labels until you are close; smaller values show text sooner but can overlap when zoomed out.

## Physics Controls

All force sliders ultimately feed into D3 forces that shape the layout:

- **Center Force** – Strength of an optional radial attraction toward the origin. Raising this value pulls the entire graph inward and keeps clusters centered. Lower values let the graph drift freely.
- **Repel Force** – The charge strength (negative pushes nodes apart). More negative numbers produce stronger repulsion, spreading nodes out and reducing overlap. Values closer to 0 pack nodes tighter.
- **Link Force** – Multiplier applied to spring strength. Increasing it shortens and stiffens connections so linked nodes stay close. Decreasing it allows links to stretch, which can make communities more distinct.
- **Link Distance** – Target length for every edge. Larger distances expand the layout; smaller distances pull nodes closer together.

Behind the scenes, the simulation also runs with:

- `cooldownTicks = 0` – the engine keeps running so the graph stays responsive to new drags.
- `d3AlphaDecay = 0.018` – slow cooling to preserve gentle motion.
- `d3VelocityDecay = 0.09` – light damping so nodes drift for a moment instead of stopping abruptly.

## Drag Dynamics

Dragging a node temporarily fixes its coordinates (`node.fx/node.fy`) so it tracks your cursor. While dragging, `alphaTarget` rises to `0.4` to “reheat” the simulation and give neighbors enough kinetic energy to react. When you release:

1. The node is unfixed so the forces reclaim it.
2. `alphaTarget` is set to `0.12`, keeping the layout lively.
3. After 2 seconds of idle time, the target relaxes to `0`, letting the simulation slowly cool.

This staggered cooldown is what creates the subtle “living” rebound motion similar to Obsidian’s graph.

### Where the behavior lives

- `src/components/LocalGraphView.tsx` – Every knob is wired here. Key sections:
  - Lines around `30` define the React state for the sliders.
  - The effect at lines `107`–`132` updates D3 forces when the controls move.
  - Drag handlers at lines `174`–`199` manage `fx/fy`, `alphaTarget`, and the cooldown timeout.
  - The `ForceGraph2D` component near lines `345`–`417` receives the renderer/physics props (`nodeCanvasObject`, `d3AlphaDecay`, etc.).
- `src/utils/wikiLinks.ts` – Builds the `nodes`/`links` data structure. Edit this if you want to change which notes appear or how metadata maps to node properties like `size` or `color`.
- `scripts/generate-notes.js` – Generates note content that feeds into the graph. Modify it if you need additional attributes (tags, aliases) surfaced in the data.

To tweak any of these behaviors, adjust the relevant section and run `npm run dev` (for live preview) or `npm run build` to regenerate production assets. If you modify the generation script, remember it rewrites `src/components/data/notes.ts` during builds.

## Tuning Recipes

- **More organic drift** – Lower `d3VelocityDecay` (e.g., 0.06) or raise the post-drag cooldown duration so the graph keeps floating longer.
- **Faster stabilization** – Increase `d3VelocityDecay` (e.g., 0.2) and reduce post-drag cooldown so nodes settle quickly.
- **Tight clusters** – Increase `linkForce` and decrease `linkDistance`. Optionally bring `repelForce` closer to 0 to allow overlap.
- **Spread-out overview** – Lower `linkForce`, reduce the magnitude of `repelForce`, and increase `linkDistance` to let communities breathe.
- **Recentering** – Raise `centerForce` slightly (0.05–0.1) so the graph recenters itself during long sessions.

Experiment with one parameter at a time and give the simulation a moment to respond—small changes can cascade because every force influences the others.
