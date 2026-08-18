# Replace the logo with your new design

Swap the current code-drawn logo (inline mountain SVG + "Apex"/"Growth" text) for the new image file you upload, everywhere the brand mark appears.

## What changes

1. **Logo component** (`src/components/site/Logo.tsx`)
   - Remove the inline SVG peaks and the two-tone text spans.
   - Render the uploaded artwork as a single `<img>` with `alt="ApexGrowth"`, height driven by the existing `size` prop so all current call sites keep working without edits.
   - Keep the component's export shape and props identical, so Header and Footer need no changes.

2. **Asset handling**
   - Store the uploaded file in `src/assets/` and reference it via a normal import.
   - If it is a transparent PNG, it drops in as-is; if it has a white/solid background, I'll remove the background first so it sits cleanly on both the light header and the footer.

3. **Favicon**
   - Generate a square, padded `public/favicon.png` from the same artwork and point the root route's icon link at it, replacing the current `favicon.svg`/`.ico` entries.

4. **Check pass**
   - Verify header (scrolled and top state), mobile menu, and footer at desktop and mobile widths; confirm the mark is legible at small sizes and no layout shifts.

## Not changing

Routes, SEO metadata, copy, colors, forms, or any other component.

## Next step

Attach the new logo image in chat (PNG or SVG, transparent background preferred) and approve this plan — I'll implement immediately after it lands.
