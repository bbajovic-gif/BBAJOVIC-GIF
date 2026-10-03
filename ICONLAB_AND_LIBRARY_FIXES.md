# BBaya.net — IconLab and Library Fixes

## IconLab

IconLab is now a fourth main website branch at the same level as Library, Discogs Toolkit, and RDM Play Studio. The page uses the supplied real screenshots and presents six separate modules:

1. AlphaCut — single image editor
2. GridCut — icon sheet extractor
3. MatchScan — visual duplicate finder
4. Favicon Creator — complete website icon package creator
5. Contact Sheet — image-directory review and export
6. Smart Rename — intelligent batch file renamer

The IconLab page includes the real launcher, module interfaces, workflow explanation, output gallery, responsive navigation, screenshot lightbox, and cross-links to all BBaya branches.

## Cart

The homepage cart icon now opens the same full `cart.html` page used by the Library. Both systems use the same storage key: `bbaya-cart-v1`.

For local testing, use `PREVIEW_BBAYA.bat`. Direct `file://` browsing can isolate browser storage per page, which makes one cart appear as different carts even when the code is correct.

## Duplicate covers

The previous publishing output created a new numbered filename on every publish. That produced 723 cover files for 78 historical pages.

This build now contains:

- 59 active Library records
- 59 active record pages
- 59 cover files
- 59 unique cover-image contents
- one stable filename per record: `assets/covers/<record-slug>.<ext>`

Old numbered cover copies and 19 obsolete record pages were removed. The manifest now documents overwrite/update publishing semantics.

## Required MOD6 publisher behavior

The permanent source-level rule should be:

- overwrite the stable cover path for an existing record instead of appending `-2`, `-3`, and so on;
- rebuild `library.json` and `library-data.js` from the current selected records;
- delete generated record pages and covers that no longer belong to the current publish set;
- use the release ID plus normalized slug as the deterministic record identity.
## Cart badge and saved-cover compatibility

- Anchored the orange cart quantity badge directly to the cart circle instead of the browser viewport.
- Added stable slug-based cover resolution so older saved cart entries can recover after obsolete numbered cover files are removed.

