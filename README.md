# TSQ Capital website

Responsive, dependency-free HTML, CSS and JavaScript implementation of the six supplied design boards. Includes Home, About, Services, Approach, Insights, Contact, Privacy and Legal pages. All pages contain native HTML content and work without a JavaScript framework.

## Run

From this directory:

```sh
python -m http.server 8000 --bind 0.0.0.0
```

Open the root page in a browser. You can also open `index.html` directly. Deploy this directory to any static web host; no build step is required.

## Files

- `*.html`: editable page content, titles and descriptions.
- `styles.css`: responsive layouts and shared design tokens.
- `script.js`: mobile navigation, current copyright year and local enquiry download.
- `assets/`: supplied reference photography and SVG favicon.

## Before publication

The supplied PNG photographs are low-resolution visual references, used here to match the handoff. Replace these files with appropriately licensed high-resolution originals before public launch. The wordmark uses accessible HTML and system fonts; exact brand letterforms can be replaced with an approved SVG.

No office addresses, founding date, geographic presence or dated publications have been invented. Insights are discussion topics rather than purported published articles. Confirm company copy, service descriptions, registration and regulatory details. Privacy and legal text are interim descriptions of this static implementation and need operator review.

The contact form validates required fields and downloads an enquiry text file locally. It does **not** transmit or store enquiries, and explicitly tells visitors this. To accept online enquiries, connect an approved backend or form service, implement server-side validation, spam protection and consent handling, and update the form and privacy text. No analytics, external fonts or third-party scripts are loaded.

## Validation

Browser checks cover all pages at desktop, tablet and mobile widths, local links/assets, mobile menu keyboard behavior, enquiry validation, subject preselection and the text-file download. See `scripts/smoke.cjs` for a repeatable Playwright check (requires Playwright and Chromium).
