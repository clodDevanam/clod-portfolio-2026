# Claudio Angga Arthona: Portfolio

Plain HTML, CSS, and JavaScript. No build tools, no dependencies.

## Run locally (VS Code)
1. Install the free **Live Server** extension.
2. File > Open Folder > this folder. Right-click `index.html` > **Open with Live Server**.
(Double-clicking `index.html` also works.)

## Where to edit
- `js/data.js`: ALL project, experience and skills content. Each project has a card summary, overview, contribution, testing coverage (expandable categories), types and tools. Mark a project `featured:true` to show it in the homepage "Selected Work".
- `index.html`: hero text, homepage highlights, contact links.
- `css/style.css`: colors and fonts are in the `:root` block at the top.
- `js/main.js`: behavior (navigation, tabs, project panel). Rarely needs changes.
- CV: replace `assets/documents/Claudio_Angga_Arthona_CV.pdf` (keep the file name). The CV opens in a new tab ("View CV").

## Privacy
The phone number is intentionally NOT on the website. It only exists inside the CV PDF.
To add a GitHub link, add a `<li>` to the contact list in `index.html`.

## Publish free on GitHub Pages
1. Create a public repository (e.g. `YOUR-USERNAME.github.io`) and upload the contents of this folder (`index.html`, `css`, `js`, `assets`).
2. Settings > Pages > Deploy from a branch > `main` / `(root)` > Save.
3. After 1 to 3 minutes the site is live at `https://YOUR-USERNAME.github.io/`.
All paths are relative, so it also works from a project subfolder URL.
