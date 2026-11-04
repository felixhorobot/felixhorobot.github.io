# Felix's portfolio site — owner's manual

Your site: **https://felixhorobot.github.io**

## The files

| File | What it is | Do you edit it? |
|---|---|---|
| `content.js` | Not used by the current page (kept as a backup of the old site). | No. |
| `assets/` | Your pictures (screenshots, photos). | Yes, drop images in here. |
| `index.html` | The whole portfolio: featured systems, case studies, approach, about and contact. | No. Ask Claude for text or design changes. |
| `portfolio.css` / `portfolio.js` | Design and behaviour (image zoom, project filters, laser readings). | No. |
| `portfolio-data.js` | The "wider work" project cards and laser sample readings. | Yes, to add a project card. |
| `engineering.html` | Redirect only. The old engineering portfolio was merged into `index.html` (Nov 2026); old links land on the case studies. | No. |
| `publish.cmd` | Double-click to put your edits online. | No. |
| `README.md` | This manual. | No. |

## Preview before publishing

Double-click `index.html`. It opens in your browser and works offline.
What you see is exactly what the internet will see.

## Change any text

Text lives in `index.html`; project cards live in `portfolio-data.js`.
`content.js` is no longer used. Ask Claude to make text or content changes
and publish them, the same way it built this page.

## Publish (put it online)

Double-click **`publish.cmd`**. It saves your edits to GitHub and the live site
updates about one minute later.

First time only: GitHub needs to know it is you. In a Claude Code chat, type:

```
! "C:/Program Files/GitHub CLI/gh.exe" auth login --web
```

and follow the browser prompt. After that, publish.cmd works forever.

## Edit from any computer or your phone

1. Go to https://github.com/felixhorobot/felixhorobot.github.io
2. Click `index.html`, then the pencil icon, edit, press **Commit changes**.
3. The live site updates itself in about a minute.

## Rules this page follows (so you do not break them by accident)

- No phone number, no street address. Email and LinkedIn only.
- Employer is never named. It stays "a heavy timber processing plant in Australia".
- Exception, decided 14 Sep 2026: the case studies state real numbers
  (100% OCR, 99% tally, exact latencies). Felix chose to publish them.
- One site, one design: everything lives at https://felixhorobot.github.io.
  Do not add a second page with a different design; add a section to index.html.
