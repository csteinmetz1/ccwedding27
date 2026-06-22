# ccwedding27

Static website for **Courtney & Christian's** wedding — 3 April 2027, Bluffton, SC.
Hosted on GitHub Pages at [ccwedding27.com](https://ccwedding27.com).

No build step, no frameworks — just HTML, CSS, and a little vanilla JS.

## Project structure

```
.
├── index.html          # the single long-scroll page
├── css/styles.css      # design system + layout (colors, fonts, sections)
├── js/main.js          # sticky nav, scroll-spy, countdown
├── assets/
│   ├── couple.jpg            # optimized hero photo
│   └── apple-touch-icon.png  # home-screen icon (gold monogram)
├── CNAME               # custom domain for GitHub Pages (ccwedding27.com)
└── .nojekyll           # serve files as-is (skip Jekyll processing)
```

The full-resolution source photos (`candcedit.png`, `IMG_4388.jpeg`) are kept
locally and git-ignored — only the optimized `assets/couple.jpg` is committed.
To refresh the hero image after editing a source, re-export it:

```bash
sips -s format jpeg -s formatOptions 82 candcedit.png --out assets/couple.jpg
```

## Preview locally

From the repo root, start any static server and open it in a browser:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

(You can also just open `index.html` directly, but a server matches production more closely.)

## Deploy (GitHub Pages)

The site deploys straight from the `main` branch — push and you're done.

One-time setup in the GitHub repo:

1. **Settings → Pages → Build and deployment**
   - Source: **Deploy from a branch**
   - Branch: **`main`**, folder: **`/ (root)`**, then **Save**.
2. **Custom domain:** the `CNAME` file already contains `ccwedding27.com`.
   Point DNS for the domain at GitHub Pages:
   - `A` records for the apex `ccwedding27.com` →
     `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - `CNAME` record for `www` → `csteinmetz1.github.io`
3. Back in **Settings → Pages**, enable **Enforce HTTPS** once the certificate is issued.

## Editing & adding content

- **Names / date / location:** edit the hero in `index.html` and the footer.
- **Countdown:** the target date/time lives at the top of `js/main.js`
  (`WEDDING_DATE`). Adjust the ceremony time when it's set.
- **New sections:** the page ships with ready-made, commented-out section
  templates (Our Story, Wedding Details, Travel & Stay, Things to Do, Registry,
  FAQ) inside `index.html`. To enable one:
  1. Move the section out of the big `STUB SECTIONS` comment block.
  2. Uncomment the matching link in the nav.
  All styling is already in `css/styles.css`.

## Going live with RSVP

RSVP currently shows an "opening soon" placeholder. When the Google Form is
ready, open the RSVP section in `index.html` and replace the disabled button
with **one** of the snippets in the comment there:

- a link button to the form (`https://forms.gle/...`), or
- an inline `<iframe>` embed inside `.rsvp__form`.

## Design notes

Colors and type are drawn from the Save the Date invitation:

- Cream `#f6efe0`, charcoal-green ink `#33342b`, sage `#7c7e63`, gold `#c99a3a`.
- Headings in **Cormorant Garamond**, script accents in **Pinyon Script**
  (loaded from Google Fonts).
