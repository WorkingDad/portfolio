# System Architecture & GitHub Pages Migration

## Overview
This static portfolio site directly modernizes and migrates **Ted Finger's** website from an outdated Django/Python backend onto high-performance **GitHub Pages**. All authentic content models and copy from `https://tedfinger.us/` have been mapped into declarative static structures.

---

## Pre-Defined Content Models (Migrated from Django CMS)

The original site used Django models for 4 primary sections:
1. **Intro ("What I do")**: Banner image and philosophy statement.
2. **Samples**: Pre-defined cards with titles, teasers, thumbnails, modal descriptions, and `data-contentsrc` embed URLs (Vimeo embeds and interactive web modules).
3. **Skills Accordion**: Three core proficiency buckets:
   - `eLearning Authoring Proficiencies`
   - `Media Development Tools`
   - `Additional Technical Skills`
4. **Professional Experience (Work History Accordion)**: 16 authentic employer records with company names, roles, date ranges, lead paragraphs, bullet points, and corporate links.
5. **Contact**: Direct channels (Email: `ted.finger@me.com`, Phone: `262-612-9079`, LinkedIn), resume download (`/assets/aistudio/Ted_Finger_Resume_bfcabe48.pdf`), and client inquiry form.

---

## Technical Upgrades

### 1. Zero-Maintenance Static Hosting
- **Previous State**: Hosted on a Django server with SQLite/Postgres and Django admin. Required Python server maintenance, WSGI process managers, and database backup routines.
- **Modernized State**: 100% static client-side web application. Can be hosted for free with high availability on **GitHub Pages**, Cloudflare Pages, Netlify, or Vercel.

### 2. Ultrawide & 4K Monitor Guard
- **Previous Defect**: When loaded on ultrawide displays (3440x1440px or 4K monitors), the Bootstrap layout stretched across thousands of pixels, distorting the banner and spacing out accordion items.
- **Solution**: Hard container bounds (`max-w-7xl` / 1360px centered with `mx-auto`) ensure balanced optical margins on any monitor resolution.

### 3. Full-Width Responsive Embeds
- **Previous Defect**: In the original site, clicking "View Project" triggered a modal constrained to `min(95%, 640px)`. The Vimeo videos and interactive web packages appeared small and cramped.
- **Solution**: Native accessible modal dialog (`SampleModal.tsx`) with `max-w-5xl`, full 16:9 (`aspect-video`) container scaling, and automatic iframe unmounting to prevent background audio playback after closing.
