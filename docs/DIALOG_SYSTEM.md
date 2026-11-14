# Native Dialog & Responsive Embed Architecture

## Problem Statement
On the legacy Django website:
- Modals had hardcoded fixed pixel dimensions (e.g., 550px wide).
- Embedded Articulate Storyline courses rendered tiny, forcing users to squint or horizontally scroll.
- Mobile devices were unable to pinch-zoom or view slide layers properly.
- Closing the modal left background audio playing because the iframe was merely hidden.

## Implemented Architecture

### 1. Viewport & Aspect Ratio Math
Standard eLearning authoring tools (Articulate Storyline 360, Adobe Captivate, Camtasia) export with a **16:9** aspect ratio (1920x1080 or 1280x720).

We enforce fluid responsiveness via:
\`\`\`css
.embed-container {
  width: 100%;
  aspect-ratio: 16 / 9;
  background-color: #020617; /* slate-950 */
}
\`\`\`

In Tailwind CSS:
\`\`\`html
<div class="w-full aspect-video bg-slate-950 rounded-xl overflow-hidden">
  <iframe src="..." class="w-full h-full border-0" allowfullscreen></iframe>
</div>
\`\`\`

### 2. Modal Sizing Bounds
The dialog is bound by:
- Maximum width: \`max-w-6xl\` (1152px) on desktop.
- Responsive width: \`w-full\` with outer padding on mobile.
- Maximum height: \`max-h-[94vh]\` to prevent edge collisions on landscape mobile devices.

### 3. Accessibility & Keyboard Controls
- Focus trapping inside the active dialog container.
- Keyboard \`Escape\` triggers dialog dismissal.
- Clicking the backdrop dismisses the dialog.
- \`aria-modal="true"\` and \`aria-labelledby\` headers for screen reader compliance.

### 4. Background Audio Lifecycle Cleanliness
\`\`\`typescript
const handleClose = () => {
  setIsPlaying(false);
  // Clear or unmount the iframe src immediately
  setEmbedSrc('');
  onClose();
};
\`\`\`
This halts WebAudio and HTML5 \`<audio>\` elements instantly upon closing.
