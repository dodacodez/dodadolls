dodadolls is a personal hobby website about dolls, collectiong and dioramas which comes with a blog, deals/sales page linked to the socials accounts dodadolls.

You work in the ./src folder. The ./docs folder is where the site is built before deployment so don't touch it.

## Tech Stack

This is a pseudo-static website built with xm, a tiny HTML compiler.

### xm syntax

- `<import src="file.html">` - inline external HTML. Paths are relative; prefix with `/` for absolute (relative to --root)
- `<import src="file.md">` - import markdown files (front matter becomes `<fill>` elements)
- `<slot name="x">` - define a named placeholder in a template
- `<fill name="x">` - fill a named slot when importing: `<import src="base.html"><fill name="x">content</fill></import>`
- Unnamed `<slot>` receives any import children that aren't `<fill>` tags

## Project Structure

- `src/_base.html` base template
- `src/*.html` extend base and are pages
- `src/blog/_blogpost.html` extends base and is the template for the blog
- `src/blog/<post_slug>.html` blog posts with index being the blog index.

## Design & Styling

Stick to the current color scheme and styling without introducing new stuff unless strictly necessary, in which case you need to get the user approval first.

### Blog Styling

Blog posts use the `.Blog-article` wrapper class for consistent styling:

- **Width**: 630px max-width, centered
- **Images**: Centered by default via `text-align: center` on container. Side-by-side images work with inline `width` styles (e.g., `width: 45%`)
- **First paragraph**: Uses apercu-pro font (header font), bold, 1.1rem - applies automatically via CSS
- **Fonts**: Header font is `apercu-pro`, body/blog font is `Baloo Tamma 2`

#### Hero Sections

Two hero variants available:

1. **Standard hero** (`.Blog-hero`): Image on right, text on left (on desktop). Use for portrait/square images.
   ```html
   <div class="Blog-hero">
     <div class="Blog-hero-image"><img src="..." alt="..."></div>
     <div class="Blog-hero-content">
       <p class="Blog-hero-subheader"><strong>Date</strong> - Intro text...</p>
     </div>
   </div>
   ```

2. **Stacked hero** (`.Blog-hero--stacked`): Text on top, full-width image below. Use for horizontal/landscape images.
   ```html
   <div class="Blog-hero Blog-hero--stacked">
     <div class="Blog-hero-content">...</div>
     <div class="Blog-hero-image"><img src="..." alt="..."></div>
   </div>
   ```

#### Blog Post Structure

All blog posts must wrap content in `<div class="Blog-article">`:
```html
<fill name="content">
<div class="Blog-article">
  <!-- content here -->
</div>
</fill>
```

For posts without a hero, combine date and intro in the first paragraph:
```
<p><strong>Month Year</strong> - Intro sentence here...</p>
```