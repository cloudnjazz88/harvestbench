# HarvestBench editorial rebuild: audit and implementation scope

Audited September 22, 2026 against repository base `20c9ab922c6bc9c5d3896ae4b079958f94bd0afe` and public pages. This branch is a foundation change, not a complete rewrite or an AdSense approval claim. Search retrieval returned different historical versions; the repository and freshly exported HTML were used to confirm implementation findings.

## Findings

- Inventory: 26 guides, 32 crop profiles, 41 pest profiles, 8 calculators. This replaces older inventory estimates.
- Four guide records currently include rendered source sections. Crop templates do not currently offer a source section. Missing citations are an editorial verification gap, not proof that content is incorrect or an automatic AdSense rejection.
- Several pest articles have about 110–120 words in the article element. Counts exclude their header and sidebar and include standard product guidance. Word count is a triage signal, not a Google minimum.
- The About page previously described the format but gave little information about publisher accountability.
- Sitemap lastModified was the same August 27 date for every route regardless of the content revision.
- Fertilizer results multiplied product mass by label percentages but called those amounts elemental P and K. US label values are phosphate and potash equivalents. Corrected labels; arithmetic unchanged.
- Existing fertilizer rates and spoon density assumptions still need substantive agronomic review. Clarifying that they are scenarios is not validation. Prioritize replacing generic feeding presets with label-rate scaling and optional soil-test targets after a product-specific design review.
- The latest product renderer already suppresses placeholder products. Old search extracts showing visible placeholders are not evidence of a current defect.

## Implemented in this branch

1. Rewrite About around publishing responsibility and practical use, without invented qualifications or field trials.
2. Add linked methodology with independently recalculated soil-volume, spacing, and fertilizer examples; distinguish assumptions from prescriptions.
3. Correct fertilizer result units, disclose the origin of preset rates, and cite UMN specifically for label interpretation rather than implying it endorses those presets.
4. Extend the pest data model with optional decision content, sources, and real update dates. Apply to aphids with monitoring, action criteria, follow-up, and two extension/IPM sources.
5. Use stored guide/pest revision dates in sitemap. Omit unknown dates instead of fabricating freshness.
6. Add a sitemap regression test and update an old fixture that assumed fertilizer had no citations.

## Remaining editorial rebuild, in order

### 1. Make the main gardening task complete

Keep existing calculator functionality and visual identity. Organize the main journey around measuring a bed, choosing accessible rooting depth, buying the fill, laying out plants, and maintaining moisture. Each stage needs a worked scenario, an explicit limitation, and a relevant next action. Check the 4×8 bed scenario across all pages for consistent soil and spacing assumptions. No sitewide deletion, noindex sweep, URL changes, or automatic date refresh.

### 2. Review calculator decisions

Audit fertilizer presets, mass-to-volume assumptions, container suitability, and conflicting crop advice before treating the tool as a recommendation engine. Distinguish a crop’s nutrient role from evidence of deficiency. Validate conversions independently and review zero/negative/large inputs. Retain the existing source references for soil and potting mix; verify the supporting sections, not just that links open.

### 3. Upgrade high-use crop and pest pages

Start with tomatoes, peppers, cucumbers, lettuce, and beans; then hornworms, whiteflies, spider mites, blossom-end rot, and powdery mildew. A crop page should let readers choose a variety/support arrangement, plant, water, recognize common failures, and harvest. A pest page should separate lookalikes, harmless presence from damaging infestation, immediate action, reassessment, and when to seek local help. Use topic-specific sources. Do not stamp the same generic extra paragraphs or bibliography onto every page.

### 4. Audit buying guides and operational trust

Keep researched affiliate examples with disclosure. Check current manufacturer specifications and explain meaningful selection trade-offs, rather than merely repeating retailer text. Confirm that the contact mailbox receives messages with the owner; a mailto link alone does not prove delivery. Review privacy text against actual production analytics/advertising behavior and consent configuration. Do not invent a team, testing process, or personal gardening history.

### 5. Pre-submission verification

After substantive editorial revisions, check production mobile layout, internal navigation, links, canonical URLs, robots, sitemap, ads.txt and the actual AdSense site status. Run calculator examples and inspect changes on the live domain after deployment. Obtain the exact rejection text or screenshot to distinguish low-value content from crawler/access or other policy issues. Approval remains Google's decision; no fixed article count, word count, or waiting period guarantees it.

## Validation of this branch

- `npm test`: 122 tests passed.
- Production static build with canonical domain configured: passed, 130 generated pages reported by Next.js.
- ESLint: zero errors; one existing unused-variable warning in crops-more.ts.
- Exported HTML inspected for methodology, source rendering, and corrected fertilizer labels.
- Browser interaction and production deployment are not included in this validation.

## References

- https://support.google.com/adsense/answer/7299563?hl=en
- https://support.google.com/adsense/answer/48182?hl=en
- https://extension.umn.edu/agriculture/specialty-crops/interpreting-soil-tests-for-fruit-and-vegetable-crops
- https://extension.umn.edu/garden-and-home/yard-and-garden/yard-and-garden-insects/aphids
- https://ipm.ucanr.edu/home-and-landscape/aphids/

## Exported content inventory

Approximate article words for guides and pests; main-region words for calculators and crop profiles. These measures are not comparable across different templates and are not approval thresholds. Source column recognizes the standard source heading used in the export.

| URL | Approx. words | Source section |
| --- | ---: | --- |
| /guides/aphids-on-vegetable-plants | 228 | No |
| /guides/best-drip-irrigation | 1088 | No |
| /guides/best-garden-cart | 272 | No |
| /guides/best-garden-hose | 176 | No |
| /guides/best-garden-trellis | 122 | No |
| /guides/best-pruning-shears | 233 | No |
| /guides/best-raised-bed-soil | 203 | No |
| /guides/best-raised-garden-beds | 173 | No |
| /guides/best-soaker-hose | 175 | No |
| /guides/best-soil-mix-for-raised-beds | 612 | Yes |
| /guides/blossom-end-rot | 251 | No |
| /guides/growing-vegetables-in-containers | 1343 | No |
| /guides/how-deep-should-a-raised-bed-be | 738 | Yes |
| /guides/how-far-apart-to-plant-peppers | 274 | No |
| /guides/how-far-apart-to-plant-tomatoes | 326 | No |
| /guides/how-much-soil-does-a-raised-bed-need | 601 | Yes |
| /guides/how-often-to-water-raised-beds | 421 | No |
| /guides/how-to-fertilize-a-raised-bed-garden | 394 | No |
| /guides/how-to-grow-cucumbers-in-raised-beds | 340 | No |
| /guides/how-to-prepare-a-raised-bed | 450 | No |
| /guides/how-to-start-vegetable-seeds-indoors | 438 | No |
| /guides/hugelkultur-in-raised-beds | 1233 | No |
| /guides/potting-mix-vs-garden-soil | 816 | Yes |
| /guides/raised-bed-vs-in-ground-garden | 274 | No |
| /guides/tomato-hornworms | 198 | No |
| /guides/when-to-transplant-seedlings | 310 | No |
| /vegetable-gardening/arugula | 128 | No |
| /vegetable-gardening/asparagus | 196 | No |
| /vegetable-gardening/basil | 157 | No |
| /vegetable-gardening/beans | 203 | No |
| /vegetable-gardening/beets | 138 | No |
| /vegetable-gardening/broccoli | 161 | No |
| /vegetable-gardening/cabbage | 158 | No |
| /vegetable-gardening/carrots | 199 | No |
| /vegetable-gardening/cauliflower | 151 | No |
| /vegetable-gardening/cilantro | 131 | No |
| /vegetable-gardening/collard-greens | 138 | No |
| /vegetable-gardening/corn | 228 | No |
| /vegetable-gardening/cucumbers | 171 | No |
| /vegetable-gardening/eggplant | 173 | No |
| /vegetable-gardening/garlic | 191 | No |
| /vegetable-gardening/kale | 166 | No |
| /vegetable-gardening/lettuce | 198 | No |
| /vegetable-gardening/okra | 165 | No |
| /vegetable-gardening/onions | 173 | No |
| /vegetable-gardening/parsley | 131 | No |
| /vegetable-gardening/peas | 194 | No |
| /vegetable-gardening/peppers | 411 | No |
| /vegetable-gardening/potatoes | 209 | No |
| /vegetable-gardening/radishes | 161 | No |
| /vegetable-gardening/spinach | 160 | No |
| /vegetable-gardening/strawberries | 202 | No |
| /vegetable-gardening/sweet-potatoes | 166 | No |
| /vegetable-gardening/swiss-chard | 148 | No |
| /vegetable-gardening/tomatoes | 642 | No |
| /vegetable-gardening/turnips | 129 | No |
| /vegetable-gardening/winter-squash | 176 | No |
| /vegetable-gardening/zucchini | 196 | No |
| /pest-problems/aphids | 481 | Yes |
| /pest-problems/asparagus-beetle | 132 | No |
| /pest-problems/bean-leaf-beetle | 124 | No |
| /pest-problems/blister-beetle | 123 | No |
| /pest-problems/cabbage-aphid | 117 | No |
| /pest-problems/cabbage-looper | 111 | No |
| /pest-problems/cabbage-maggot | 133 | No |
| /pest-problems/cabbage-worm | 158 | No |
| /pest-problems/carrot-rust-fly | 135 | No |
| /pest-problems/colorado-potato-beetle | 120 | No |
| /pest-problems/corn-earworm | 134 | No |
| /pest-problems/cucumber-beetle | 145 | No |
| /pest-problems/cutworm | 143 | No |
| /pest-problems/diamondback-moth | 122 | No |
| /pest-problems/earwig | 136 | No |
| /pest-problems/european-corn-borer | 133 | No |
| /pest-problems/fall-armyworm | 119 | No |
| /pest-problems/flea-beetle | 128 | No |
| /pest-problems/four-lined-plant-bug | 126 | No |
| /pest-problems/grasshopper | 118 | No |
| /pest-problems/harlequin-bug | 119 | No |
| /pest-problems/japanese-beetle | 126 | No |
| /pest-problems/leaf-footed-bug | 221 | No |
| /pest-problems/leafminer | 123 | No |
| /pest-problems/mealybug | 122 | No |
| /pest-problems/mexican-bean-beetle | 120 | No |
| /pest-problems/onion-maggot | 116 | No |
| /pest-problems/pillbug | 133 | No |
| /pest-problems/potato-leafhopper | 136 | No |
| /pest-problems/root-knot-nematode | 132 | No |
| /pest-problems/slug | 129 | No |
| /pest-problems/spider-mite | 125 | No |
| /pest-problems/spotted-lanternfly | 250 | No |
| /pest-problems/squash-bug | 145 | No |
| /pest-problems/squash-vine-borer | 151 | No |
| /pest-problems/stink-bug | 130 | No |
| /pest-problems/tarnished-plant-bug | 130 | No |
| /pest-problems/thrips | 120 | No |
| /pest-problems/tomato-hornworm | 143 | No |
| /pest-problems/whitefly | 118 | No |
| /pest-problems/wireworm | 127 | No |
| /calculators/compost | 427 | No |
| /calculators/fertilizer | 1596 | Yes |
| /calculators/garden-area | 226 | No |
| /calculators/mulch | 326 | No |
| /calculators/plant-spacing | 855 | No |
| /calculators/potting-mix | 1361 | Yes |
| /calculators/raised-bed-soil | 2361 | Yes |
| /calculators/soil-volume | 266 | No |
