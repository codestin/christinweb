# Notion to Jekyll Migration Status

## Progress: 89 / 90 notes migrated

## Migration Checklist

Copy each note from `notion/Writing/Notes/Notes/` to `_notes/`, clean up formatting, add proper front matter, and check the box.

### Notes to Migrate

- [x] A Portfolio of Small Bets.md
- [x] Aging and Dying.md
- [x] AI Generated Art.md
- [x] Alternative Healthcare Access (USA).md
- [x] Animal Emoji Open-Source Decision Maker.md
- [x] Beginner's Meditation Resource.md
- [x] Blogroll.md
- [x] Book Notes Getting Cracked Preparing for Open Heart Surgery.md
- [x] Book Notes Sketch Now, Think Later.md
- [x] Build A Second Brain Cohort 13.md
- [x] Bystander Intervention to stop anti-AsianAmerican and xenophobic harassment.md
- [x] Chaplaincy Resources.md
- [x] Chiwi Journal Podcast.md
- [x] Co-Working with Friends Starter Kit.md
- [x] Coaching Session with Youheum Son.md
- [x] Cozycaster Channel List.md
- [x] Creating Email-Based Courses (EBCs) for Fun and Profit with Will Steiner.md
- [x] Creativity AMA with Salman Ansari.md
- [x] Deep Diversity Class Notes.md
- [x] Evening Drama Rebooted.md
- [x] Expanding Awareness at My First Powerlifting Competition.md
- [x] Exporting from Notion to Joplin.md
- [x] Farcaster Community.md
- [x] Favorite Essays By Others.md
- [x] Fear, Anxiety, and Buddhism.md
- [x] Forrest Prize Coin and NFTs.md
- [x] Fruition Additional Setup Tips.md
- [x] Gell-Mann Amnesia Effect.md
- [x] Greg Lim's Amazon Author Webinar.md
- [x] How To Recover A WiFi Password.md
- [x] How to Take Smart Notes.md
- [x] How to Work with a Personal Assistant.md
- [x] How to Write an Ebook.md
- [x] How to Write Online with David Perell.md
- [x] If You Bought AMZN Stocks Instead.md
- [x] Indieweb.md
- [x] Interfaith Resources.md
- [x] Job Application SOP.md
- [x] Journal Zendo, Meditation for Writers.md
- [x] Just Newsletters! Azul Meeting 2021-10-18.md
- [x] Just Twitter! Azul Meeting 2021-10-18.md
- [x] Kevon Cheung's Build In Public Bootcamp.md
- [x] Kind Camp.md
- [x] La Cocina Orientation Notes.md
- [x] Landing Page template for Product Launch.md
- [x] Legal pads.md
- [x] Magnus Method.md
- [x] Make LinkedIn As Fun As Twitter.md
- [x] Massage Tips.md
- [x] Maven How to Validate Your Course Idea.md
- [x] Maven Webinar 2021-10-19.md
- [x] Melissa Cross Singing Class.md
- [x] Neuroscience.md
- [x] Open Heart, Open Mind, Open Mouth Engaging the Practice of Skillful Speech.md
- [x] Rare Recipes List.md
- [x] Running Tips.md
- [x] Sasha Chapin How to Start a Service Business.md
- [x] SEO Tips.md
- [x] Stripe Payment Integration with Super.md
- [x] Tarot.md
- [x] The Five Lightbulbs Starter Kit.md
- [x] The Writing Studio with Michael Dean.md
- [x] Unsticking Mantras.md
- [x] Visual Media List.md
- [x] WOP Note-taking Show & Tell 2021-10-17.md
- [x] Write of Passage 9 Christin's Mentor Session 1.md
- [x] Write of Passage 9 Christin's Mentor Session 2.md
- [x] Write of Passage 9 Christin's Mentor Session 3.md
- [x] Write of Passage 9 Christin's Mentor Session 4.md
- [x] Write of Passage Cohort 7 Notes.md
- [x] Writing and Spiritual Practice.md
- [x] Zoom Presentation Engagements.md

### Subdirectory: A Portfolio of Small Bets/
- [x] Small Bets Working Out Loud.md

### Subdirectory: Fruition Additional Setup Tips/
- [x] Use Zoom's Virtual Background with DiscordGoogle MeetSkypeLINE.md

### Subdirectory: Evening Drama Rebooted/
- [x] Writing Prompts Practice.md

### Subdirectory: Landing Page template for Product Launch/
- [x] Instructions to Setup.md

### Subdirectory: Relating Between the Lines Your Pop-Up Workshop Hub/
- [x] Pop-Up Workshop 1 On Thin Ice.md
- [x] Pop-Up Workshop 2 Calling the Shots.md
- [x] Pop-Up Workshop 3 Silent Treatment.md

### Subdirectory: The Five Lightbulbs Starter Kit/
- [x] Bellroy slim wallet.md
- [x] Columbia OmniHeat jacket.md
- [x] Duke Cannon Signature Scent Selector.md
- [x] English language learning course.md
- [x] Mindvalley online course.md
- [x] Onnit Alpha Brain supplement.md
- [x] Podia online course software.md
- [x] Quantum coffee-infused energy bars.md
- [x] Ramit Sethi social skills course.md
- [x] The Essential Man fashion course.md

## Migration Instructions

For each note:

1. **Read** the source file from `notion/Writing/Notes/Notes/[filename]`
2. **Create** Jekyll note at `_notes/[slug].md`
3. **Add front matter:**
   ```yaml
   ---
   layout: note
   title: [Title]
   date: YYYY-MM-DD
   tags: [tag1, tag2, tag3]
   ---
   ```
4. **Clean content:**
   - Remove Notion front matter (notion-id, cover, etc.)
   - Remove emoji from titles/headers
   - Remove image embeds `![[image.jpg]]`
   - Remove Notion widgets/embeds
   - Fix internal links from `/uuid` to `[[Title]]` format
5. **Check box** in this file
6. **Update progress** count at top

## Quick Check Command

```bash
# Count migrated notes
grep -c '\[x\]' MIGRATION-STATUS.md

# See what's left
grep '\[ \]' MIGRATION-STATUS.md | head -10
```
