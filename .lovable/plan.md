# Replace the logo with your new ApexGrowth mark

Your uploaded artwork is a transparent SVG: a royal-blue double-peak mountain plus the "ApexGrowth" wordmark in navy (#141F35) and royal blue (#1A53DF) — already matching the site's navy/royal-blue system.

## What changes

1. **Logo component** (`src/components/site/Logo.tsx`)
   - Remove the hand-drawn inline SVG peaks and the two "Apex"/"Growth" text spans.
   - Render the new artwork as a single image with `alt="ApexGrowth"`, sized by the existing `size` prop (height-driven, width auto) so Header, mobile menu, and Footer keep working without edits.
   - Keep the component's exports and props identical.

2. **Asset handling**
   - The upload has large empty padding around the mark; I'll tighten its viewBox to the artwork bounds so it doesn't render tiny inside the header.
   - Store the cleaned SVG in the project and reference it from the component.

3. **Favicon**
   - Build a square, padded `public/favicon.png` cropped to the mountain icon (the wordmark is unreadable at 16px) and point the root route's icon link at it, removing the old `favicon.svg` / `favicon.ico` entries.

4. **Check pass**
   - Verify header at top and scrolled state, mobile menu, and footer at desktop and mobile widths; confirm sizing, alignment, and no layout shift.

## Not changing

Routes, SEO metadata, copy, colors/tokens, forms, or any other component.
