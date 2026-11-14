# Project Content Schema & Management

To add new projects or modify existing courses, edit `data/projects.json` (or `src/data/portfolioData.ts`). Future developers, content authors, or AI tools can follow this exact specification.

## Schema Fields

| Field | Type | Required | Description | Example |
|---|---|---|---|---|
| `id` | `string` | Yes | Unique URL-safe slug | `"carepath-ehr-simulation"` |
| `title` | `string` | Yes | Full course title | `"CarePath Clinical EHR Branching Software Simulation"` |
| `category` | `string` | Yes | Filter key: `'storyline'`, `'rise'`, `'simulation'`, or `'video'` | `"simulation"` |
| `categoryLabel` | `string` | Yes | User-facing badge label | `"Software Simulation"` |
| `client` | `string` | Yes | Client, institution, or industry | `"Healthcare Systems Enterprise"` |
| `year` | `string` | Yes | Year of creation | `"2025"` |
| `thumbnail` | `string` | Yes | Image asset path (16:9 ratio recommended) | `"/src/assets/images/storyline_healthcare_sim_....jpg"` |
| `embedUrl` | `string` | Optional | Direct link to the published module's `index.html` | `"https://tedfinger.us/media/uploads/samples/carepath-sim/index.html"` |
| `demoType` | `string` | Yes | Educational format | `"interactive_simulation"` |
| `description` | `string` | Yes | 1-2 paragraph overview of the course | `"An authentic, branched electronic health record simulation..."` |
| `challenge` | `string` | Yes | The organizational problem or performance gap | `"New clinical staff averaged 14.2 minutes per patient record entry..."` |
| `solution` | `string` | Yes | The instructional design strategy & architecture | `"Architected a responsive interactive EHR sandbox..."` |
| `impact` | `string` | Yes | Measurable business, clinical, or learning outcome | `"Reduced onboarding time by 42%..."` |
| `tools` | `string[]` | Yes | List of software & authoring systems | `["Articulate Storyline 360", "Adobe Audition", "Snagit"]` |
| `role` | `string` | Yes | Ted's role on the project | `"Lead Instructional Designer & Simulation Developer"` |
| `audience` | `string` | Yes | Target learner profile | `"Inpatient Clinical Nurses, Physician Assistants"` |
| `duration` | `string` | Yes | Approximate completion time | `"18 minutes active playtime"` |
| `scormStandard` | `string` | Yes | LMS tracking standard | `"SCORM 2004 4th Edition (CBT Tracked)"` |
| `featured` | `boolean` | Optional | Promotes project to top of gallery | `true` |

## Adding Published Courseware Files
When publishing Articulate Storyline or Rise packages:
1. Export from Storyline/Rise as **Web** or **LMS (SCORM)**.
2. Unzip into a folder (e.g. `/samples/module-name/`).
3. Set the `embedUrl` in the project record to point to that folder's `index.html`.
