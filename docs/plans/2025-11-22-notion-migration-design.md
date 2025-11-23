# Notion to Jekyll Migration Design

**Date:** 2025-11-22
**Status:** Approved and ready for implementation

## Overview

Complete migration of 122 Notion pages and 364 attachment files (538MB) into existing Jekyll site structure. This design uses a hybrid approach: migrate core pages immediately for structure, then migrate all 91 notes gradually with a tracking system.

## Source Inventory

### Notion Pages (122 files)
- **About/** - 14 pages (Now, 12 Favorite Problems, Word of Year, etc.)
- **Offerings/** - 6 pages (Book, Coaching, Courses)
- **Speaking/** - 6 pages (Companies, Podcasts, Comedy, Media Kit)
- **Writing/Notes/Notes/** - 91 note files
- **Grow your business.../** - Consulting content

### Attachments (364 files, 538MB)
- Mixed formats: PNG, JPEG, PDF, audio files
- No filename conflicts detected
- Need optimization: resize images >1MB to max 1200px width
- Expected final size: ~100-200MB after optimization

## Target Structure

### Jekyll Pages (_pages/)
Existing placeholder pages will be replaced with Notion content:
- About section: `about.md`, `now.md` + 3 new sub-pages
- Offerings: `book.md`, `coaching.md`, + new `courses.md`
- Speaking: `companies.md`, `podcasts.md` + new `comedy.md`, `media-kit.md`
- Consulting: `consulting.md`

### Notes (_notes/)
**Structure:** Pure flat hierarchy with rich tagging (no folders)
- All 91 notes migrated to `_notes/[slug].md`
- Tags for organization: topic, year, content-type, etc.
- No drafts folder - publish everything

### Images (/assets/images/notes/)
- Central directory for all note images
- Resize images >1MB to max 1200px wide
- Update all references from `![[image.jpg]]` to `/assets/images/notes/image.jpg`

## Migration Strategy: Hybrid Approach

### Phase 1: Core Pages (~15 pages)
**Why first:** Establishes site structure, navigation foundation

**About Section:**
- Replace `_pages/about.md` with notion/About/About.md
- Replace `_pages/now.md` with notion/About/Now.md
- Create 3 new sub-pages from other About/ files

**Offerings Section:**
- Replace `_pages/offerings/book.md`
- Replace `_pages/offerings/coaching.md`
- Create new `_pages/offerings/courses.md`

**Speaking Section:**
- Replace `_pages/speaking/companies.md`
- Replace `_pages/speaking/podcasts.md`
- Create new `_pages/speaking/comedy.md`
- Create new `_pages/speaking/media-kit.md`

**Consulting:**
- Replace `_pages/consulting.md`

**Images for Phase 1:** ~10-15 essential images (~20MB after resize)

### Phase 2: Complete Notes Migration (91 notes)
**Why gradual:** Large volume, need tracking to ensure completeness

**Process per note:**
1. Copy from notion/Writing/Notes/Notes/ to _notes/
2. Convert front matter from Notion to Jekyll format
3. Add appropriate tags after reading content
4. Set publication date
5. Clean up Notion artifacts (callouts, wiki links)
6. Update image references
7. Check off in MIGRATION-STATUS.md

**Tracking System:**
- `MIGRATION-STATUS.md` checklist (0/91 → 91/91)
- Preserve notion/ folder until complete
- Simple comparison: `ls notion/Writing/Notes/Notes/ | wc -l` vs `grep -c '\[x\]' MIGRATION-STATUS.md`

### Phase 3: Complete Image Migration (364 images)
**Why after notes:** Migrate images as needed by content

**Process:**
1. Identify images referenced in migrated notes
2. Copy from Attachments/ to /assets/images/notes/
3. Resize if >1MB (max 1200px width, maintain aspect ratio)
4. Update markdown references
5. Verify image loads correctly

**Tools:**
- ImageMagick or sips for resizing
- Find/grep for reference updates

### Phase 5: Navigation Updates
Update `_data/navigation.yml`:
- Add "Courses" under Offerings subnav
- Add "Comedy" and "Media Kit" under Speaking subnav

### Phase 6: Verification
- Test all internal links
- Test all image links
- Verify navigation works
- Check dark mode compatibility
- Test keyboard shortcuts still work

### Phase 7: Cleanup
**Only after 91/91 complete:**
- Delete notion/ folder
- Delete Attachments/ folder
- Delete MIGRATION-STATUS.md
- Commit final state

## Content Transformation Rules

### Front Matter Conversion
**Notion format:**
```yaml
---
title: Page Title
---
```

**Jekyll format:**
```yaml
---
layout: note
title: Page Title
date: YYYY-MM-DD
tags: [tag1, tag2, tag3]
---
```

### Link Syntax
- **Notion:** `[[Page Title]]`
- **Jekyll:** Site already has bidirectional_links_generator.rb plugin
- **Action:** No conversion needed, plugin handles it

### Image References
- **Notion:** `![[Attachments/image-uuid.jpg]]`
- **Jekyll:** `![alt text](/assets/images/notes/image-uuid.jpg)`

### Content Cleanup
Remove Notion-specific artifacts:
- Callout blocks (`> 💡 Note:`)
- Internal Notion links
- Duplicate metadata
- Empty front matter fields

## Tagging Strategy

### Tag Categories
- **Topic:** buddhism, writing, productivity, health, etc.
- **Content Type:** essay, note, guide, reflection
- **Year:** year-2020, year-2021, etc. (for temporal browsing)
- **Status:** evergreen, dated, historical

### Tag Application
- Read each note fully before tagging
- Use 2-5 tags per note
- Prefer existing tags from current _notes/ collection
- Create new tags only when necessary

## Image Optimization

### Resize Criteria
- Images >1MB → resize to max 1200px width
- Maintain aspect ratio
- Use JPEG quality 85 for photos
- Keep PNGs as PNG if they have transparency

### Command Example
```bash
# Using ImageMagick
mogrify -resize '1200>' -quality 85 /assets/images/notes/*.jpg

# Using sips (macOS)
sips --resampleWidth 1200 /assets/images/notes/large-image.jpg
```

## Success Criteria

### Phase 1 Complete When:
- [ ] All 15 core pages replaced with Notion content
- [ ] Navigation updated with new pages
- [ ] Essential images migrated and loading
- [ ] Jekyll builds without errors
- [ ] Site navigation works correctly

### Phase 2 Complete When:
- [ ] MIGRATION-STATUS.md shows 91/91 checked
- [ ] All notes in _notes/ directory
- [ ] All notes have proper front matter
- [ ] All notes tagged appropriately
- [ ] Jekyll build includes all notes

### Phase 3 Complete When:
- [ ] All referenced images copied to /assets/images/notes/
- [ ] Large images resized
- [ ] All image links work
- [ ] No broken image references

### Final Complete When:
- [ ] Navigation updated
- [ ] All links verified
- [ ] All images verified
- [ ] notion/ and Attachments/ deleted
- [ ] Git commit with all changes

## Risks and Mitigations

### Risk: Image link breakage
- **Mitigation:** Test each image reference after migration
- **Fallback:** Keep Attachments/ until all verified

### Risk: Tag inconsistency
- **Mitigation:** Create tag glossary, review existing tags first
- **Fallback:** Can re-tag later, topic page auto-generates

### Risk: Lost content during migration
- **Mitigation:** Keep notion/ folder until verification complete
- **Fallback:** Can always re-copy from preserved source

### Risk: Build time with 91 notes
- **Mitigation:** Jekyll incremental builds, monitor performance
- **Fallback:** If slow, consider pagination plugin

## Timeline Estimate

**Phase 1 (Core Pages):** ~2-3 hours
- Page replacement: 1 hour
- Image migration: 30 min
- Navigation updates: 30 min
- Testing: 30 min

**Phase 2 (Notes Migration):** ~6-10 hours
- Per note: 5-10 minutes × 91 notes
- Includes reading, tagging, formatting
- Can be done in batches

**Phase 3 (Image Migration):** ~2-3 hours
- Depends on number of referenced images
- Resize time varies by image count

**Total:** ~10-16 hours of work

## Open Questions

None - design has been validated with user approval.

## Revision History

- 2025-11-22: Initial design created after brainstorming validation
