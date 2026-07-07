# Review System

## Goal

The Review System allows every club member to rate and review the selected anime after completing the season.

The objective is not only to collect opinions, but also to build meaningful statistics for the club over time.

---

# Status

Implemented.

Reviews are submitted during REVIEW, locked after confirmation, hidden while waiting, and revealed by the owner when all members have submitted.

Reveal marks reviews visible and moves the season to FINISHED.

---
# Review Categories

Every review contains the following scores:

- 📖 Story
- 👥 Characters
- 🎨 Visuals
- 🎵 Soundtrack
- 🌍 World Building
- ⚡ Pacing
- ❤️ Emotional Impact

Each category is rated from **1 to 10**.

---

# Overall Score

The overall score is automatically calculated.

The user never inserts it manually.

Formula:

Overall = Average of all category scores.

---

# Written Review

The written review is optional.

Maximum length:

1000 characters.

---

# Review Flow

ACTIVE

↓

Owner finishes season

↓

Season becomes REVIEW

↓

Members submit reviews

↓

Reviews become LOCKED

↓

Waiting phase

↓

Owner reveals reviews

↓

Season becomes FINISHED

---

# Locked Reviews

Once a review has been submitted:

- ratings cannot be edited
- written review cannot be edited

Before submission a confirmation dialog is shown.

---

# Reveal

Reviews remain hidden until every member has submitted one.

Only the owner can reveal them.

---

# Reveal Screen

After reveal, every member can see:

- Overall Score
- Average Story
- Average Visuals
- Average Characters
- Average Soundtrack
- Average World Building
- Average Pacing
- Average Emotional Impact

Below the statistics all reviews become visible.

---

# Future Extensions

Possible future additions:

- Spoiler tag

- Like reviews

- Comment reviews

- Review badges

- Best Reviewer

- Most Generous Reviewer

- Most Critical Reviewer

- AI-generated summary of club opinions

