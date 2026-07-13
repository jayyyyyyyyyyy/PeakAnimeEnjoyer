# Technical Decisions

---

## 2026-07-07

### Overall Score

Overall score is calculated on the server.

Reason

Prevent frontend manipulation.

---

## 2026-07-07

### Review Categories

Story

Characters

Visuals

Soundtrack

World Building

Pacing

Emotional Impact

Reason

Those categories generate meaningful statistics for Hall of Fame and Profiles.

---

## 2026-07-07

### Visuals

Database column remains animation.

UI shows Visuals.

Reason

Avoid unnecessary database migrations.

---

## 2026-07-07

### Hall Of Fame Rankings

Hall Of Fame rankings are derived from revealed final reviews for finished seasons.

Reason

The rankings must represent only club-visible final results.

---

## 2026-07-07

### Profile Statistics

Profile statistics are derived from existing reviews, proposals and challenge winners.

Reason

Avoid duplicating aggregate data until the product needs cached statistics.
---

## 2026-07-09

### Anime Taste

Anime Taste is derived from review category averages.

Reason

The anime model does not store genres yet, so category-based taste avoids premature schema work.

---

## 2026-07-09

### Notifications

Notifications are currently derived in-app from season state, membership role and review status.

Reason

The product only needs actionable contextual prompts for now. Persistent notification storage can be added later when read/unread history is needed.

