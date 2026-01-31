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