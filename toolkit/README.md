# BBaya Discogs Toolkit Website

Static multi-page website concept based on the approved BBaya.net Toolkit design.

## Pages
- `index.html` — Toolkit overview hub
- `for-sellers.html`
- `modules.html`
- `workflow.html`
- `automation.html`
- `storefront.html`
- `screenshots.html`
- `documentation.html`
- `contact.html`

## Installation
Upload the whole folder to `/discogs-toolkit/` on BBaya.net. The global navigation uses root-relative links such as `/collection/` and `/rdm-play-studio/`; adjust these if your final routes differ.

## Local preview
Run a local server inside this folder:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`. Root-relative BBaya.net links will only work correctly after deployment or when mirrored locally.

## Assets
All supplied Toolkit screenshots are in `assets/screenshots/`.

## Navigation behavior

The Discogs Toolkit pages intentionally use one navigation row only. The BBaya.net logo in that row links back to the main BBaya.net homepage (`/`). The remaining links navigate within the Toolkit product section.
