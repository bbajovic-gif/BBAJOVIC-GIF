# RDM PlayStudio promotional website

This folder is a standalone static website. It can be hosted on any ordinary
static web host without a database or server-side application.

## Preview locally

Open `index.html` directly, or serve this folder through a local static web
server for the most accurate preview.

## Publish the trial

1. Copy the signed Windows 11 installer to:
   `downloads/RDM-Studio-Trial-Setup.exe`
2. Open `site-config.js`.
3. Change `trialReady: false` to `trialReady: true`.
4. Set `trialVersion` to the published version number.
5. Upload the complete `website` folder to the web host.

Every trial-download button will activate automatically.

## Update the documentation

Replace `downloads/RDM-PlayStudio-User-Manual.docx` with the latest manual while
keeping the same filename.

## Main files

- `index.html` — page structure and promotional copy
- `styles.css` — responsive visual design
- `site.js` — navigation, animations, gallery and download state
- `site-config.js` — release switch and installer path
- `assets/screenshots` — product screenshots
- `downloads` — manual and future signed installer
