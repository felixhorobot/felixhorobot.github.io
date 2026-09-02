# Felix's portfolio site — owner's manual

Your site: **https://felixhorobot.github.io**

## The files

| File | What it is | Do you edit it? |
|---|---|---|
| `content.js` | **Every word on your page.** Text, projects, skills, links. | **Yes, this is your file.** |
| `assets/` | Your pictures (screenshots, photos). | Yes, drop images in here. |
| `index.html` | The design and animations. | No. Ask Claude for design changes. |
| `publish.cmd` | Double-click to put your edits online. | No. |
| `README.md` | This manual. | No. |

## Preview before publishing

Double-click `index.html`. It opens in your browser and works offline.
What you see is exactly what the internet will see.

## Change any text

1. Open `content.js` in Notepad (right-click, Open with, Notepad) or any editor.
2. Find the text, change it. Keep the quote marks around it.
3. `**words like this**` show as **bold** on the page.
4. Save, then double-click `index.html` to check it.

If the page shows a red error bar at the top, your last edit broke the file
(usually a missing quote, comma or bracket). Undo the edit, or ask Claude.

## Add a new project

In `content.js` find the `projects:` list. Copy one whole block from `{` to `},`
including the comma, paste it below, and change the words:

```js
{
  name: "My new project",
  link: "https://example.com",      // "" = no link
  badge: "NEW",                     // "" = no badge
  badgeColor: "green",              // "green" or "orange"
  image: "assets/my-screenshot.png",// "" = text-only card
  text: "What it is, what it does, who uses it. **Bold** works.",
  tags: "Python · something · something"
},
```

## Add a picture

1. Copy the image file into the `assets` folder. Simple names, no spaces:
   `loreforge-1.png`, `slim-appstore.jpg`.
2. In `content.js`, put the path in an `image:` field: `"assets/loreforge-1.png"`.
3. Case study visuals work the same way: change `visual: "builtin:..."` to
   `visual: "assets/my-photo.png"` if you prefer a photo over the drawing.

## Add the Slim App Store link

On your phone: App Store → Slim → share icon → Copy Link.
In `content.js`, find the Slim project and paste it into `link: ""`.
The project name becomes clickable.

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
2. Click `content.js`, then the pencil icon, edit, press **Commit changes**.
3. The live site updates itself in about a minute.

## Rules this page follows (so you do not break them by accident)

- No phone number, no street address. Email and LinkedIn only.
- Employer is never named. It stays "a heavy timber processing plant in Australia".
- No dollar figures, pack counts or accuracy percentages from work.
  Engineering numbers (ms, camera counts, the 90% robot story) are fine.
