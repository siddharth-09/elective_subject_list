# LY CSD Elective Portal — ODD 2026-27

A small Next.js site where LY CSD (Semester 7) students can look up the elective
subjects and subject codes assigned to them on the GTU portal.

## Run it

```bash
bun install
bun run dev
```

Then open http://localhost:3000

Production build:

```bash
bun run build && bun run start
```

## What's inside

| Path | Purpose |
| --- | --- |
| `app/page.js` | Home — search, subject filters, results, and the support section |
| `app/subjects/page.js` | All six electives with codes and enrolment counts |
| `app/globals.css` | The whole soft-pastel theme (CSS variables in `:root`) |
| `components/Header.js` | Sticky header + nav |
| `components/StudentCard.js` | One student and their four electives |
| `components/DownloadButton.js` | Downloads the original GTU PDF from `public/` |
| `components/SupportButton.js` | Scrolls down to the `#support` section |
| `components/ViewAllButton.js` | The "View all" button and its popup |
| `public/LY-CSD-Elective-List-ODD-2026-27.pdf` | The original GTU list, served for download |
| `data/students.js` | 77 students, extracted from the GTU final elective entry PDF |
| `data/subjects.js` | Subject codes, names, short labels, accent colours |

## How search works

The class list is **never shown by default** — you only see a student once you
search for them specifically:

- **By name** — at least 3 letters, matched anywhere in the name.
- **By enrollment number** — matched against the **end** of the number, minimum
  two digits. So `42` finds `230410149042`, but a prefix like `2304101490`
  matches nobody. This is deliberate: it stops anyone from typing a common
  prefix and dumping the whole class.
- **Subject chips** only narrow an existing search. Tapping a subject on its own
  shows nothing.
- **View all** is a decoy — it opens a popup saying *"Potanu jo ne"*.

## Support flow

The header has a PDF download button, and "Subjects look wrong?" / "Need help?"
scroll down to the `#support` section at the bottom of the home page. That
section tells students to first check their enrollment number in the original
GTU PDF (download button included), and if that is wrong too, to contact
Maheshwari ma'am. The name and file live in `data/meta.js`.

## Subjects

| Code | Subject | Type |
| --- | --- | --- |
| 3170717 | Cloud Computing | Professional Elective |
| 3170725 | Digital Forensics | Professional Elective |
| 3171618 | Blockchain | Professional Elective |
| 3174904 | 3D Animation | Open Elective |
| 3174903 | Advanced Web Programming | Open Elective |
| 3174905 | Game Development | Open Elective |

## Editing data

Everything is static — no database. To fix a name or change an allocation, edit
`data/students.js`. To change who students should contact for corrections, edit
`SUPPORT_CONTACT` in `data/meta.js`. To restyle, change the colour variables at the top of
`app/globals.css`; every component reads from those tokens.

## Deploy

Push to GitHub and import on Vercel (framework: Next.js, install command:
`bun install`). No environment variables needed.
