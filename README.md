# Felix's portfolio site — owner's manual

Your site: **https://felixhorobot.github.io**

## The files

| File | What it is | Do you edit it? |
|---|---|---|
| `content.js` | Not used by the current page (kept as a backup of the old site). | No. |
| `assets/` | Your pictures (screenshots, photos). | Yes, drop images in here. |
| `index.html` | The whole page: design, animations and text, all in one file (the design built for Vixia, now the default). | No. Ask Claude for text or design changes. |
| `publish.cmd` | Double-click to put your edits online. | No. |
| `README.md` | This manual. | No. |

## Preview before publishing

Double-click `index.html`. It opens in your browser and works offline.
What you see is exactly what the internet will see.

## Change any text

`index.html` is now one self-contained file (design and text together), not
driven by `content.js` any more. Ask Claude to make text or content changes
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
- Exception, decided 14 Sep 2026: this page is the Vixia case-study design,
  and it does state real numbers (100% OCR, 99% tally, exact latencies).
  Felix chose to publish it as the public default page as-is.
