# BBaya.net deployment checklist

## Stabilized in this package

- Approved homepage visual layout preserved.
- Library record-page navigation corrected.
- Root cart page added and connected to the existing local-storage cart.
- Cart cover images now resolve correctly from root and Library pages.
- Record-page display currency corrected to CAD.
- 404 page, robots.txt, and sitemap.xml added.
- Internal asset/link scan passes without missing local references.

## Before public commercial launch

- Replace placeholder social links with final accounts or remove them.
- Connect the newsletter form to the chosen mailing service.
- Decide whether Account, Community, Careers, and Sell Your Collection remain visible as future sections.
- Review Terms and Privacy wording with the final hosting, checkout, analytics, and contact setup.
- Connect an actual order/payment workflow, or clearly keep the current contact-to-order process.
- Republish the full Library from MOD6 when the final collection dataset is ready.


## IconLab and Library stabilization update

- IconLab is now the fourth main BBaya.net branch.
- The IconLab page presents all six real modules using supplied screenshots: AlphaCut, GridCut, MatchScan, Favicon Creator, Contact Sheet, and Smart Rename.
- The root cart icon and Library cart now open the same `cart.html` page and use the same `bbaya-cart-v1` storage key.
- For local testing, run `PREVIEW_BBAYA.bat`; opening separate HTML files through `file://` can isolate browser storage and make one cart appear as several carts.
- Library covers now use one deterministic filename per active record. Old numbered copies and obsolete record pages were removed.
- MOD6 should use overwrite/update semantics for `assets/covers/<record-slug>.<ext>` and remove stale generated pages on every publish.
