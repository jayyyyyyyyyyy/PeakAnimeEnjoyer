# PeakAnimeEnjoyer

> Architecture Guide
>
> Version 1.0

---

# Vision

PeakAnimeEnjoyer is not just an anime tracker.

It is a platform where groups of friends discover, watch and review anime together.

Every feature must reinforce this philosophy.

---

# Core Principles

## 1. Domain First

Business logic must never live inside React components.

Examples:

✔ calculateOverall()

✔ canFinishSeason()

✔ getMemberStatus()

✘ Huge if/else inside HomeScreen

---

## 2. Small Components

Each component should have one responsibility.

Good:

AnimeCard

ReviewCard

ClubProgressCard

Bad:

HomeScreen with 700+ lines

---

## 3. Server Actions

Every business operation must have its own action.

Examples

startChallenge.ts

finishSeason.ts

submitReview.ts

Never create one huge actions.ts file.

---

## 4. UI is dumb

React components should display data.

They should not contain business rules.

Business logic belongs to:

lib/

hooks/

server actions/

---

## 5. Reusable Components

If a component can be reused twice,

create it.

Examples

ConfirmationDialog

ScoreSelector

LoadingScreen

---

# Folder Structure

app/

actions/

components/

layout/

review/

season/

ui/

hooks/

lib/

review/

season/

types/

---

# Naming

Components

PascalCase

AnimeCard

ReviewScreen

ClubProgressCard

Files

kebab-case

anime-card.tsx

review-screen.tsx

finish-season.ts

Hooks

useReview()

useSeason()

Utilities

calculate-overall.ts

member-status.ts

review-validation.ts

---

# Domain

Season

PROPOSAL

↓

CHALLENGE

↓

INTEREST_VOTING

↓

REVEALED

↓

ACTIVE

↓

REVIEW

↓

FINISHED

---

# Review Flow

REVIEW

↓

User rates

↓

User writes review

↓

Submit

↓

Review locked

↓

Waiting

↓

Owner reveals

↓

Hall of Fame updated

---

# Database Rules

Never trust the frontend.

The backend validates:

authentication

permissions

scores

review length

season state

Overall is calculated on the server.

---

# Code Rules

Avoid any

Avoid duplicated logic

Prefer composition over copy/paste

Prefer pure functions

One responsibility per file

---

# Pull Request Rules

Every PR must have one purpose.

Examples

feat(review): submit reviews

refactor(home): split active season

fix(progress): update completion

Never mix refactoring and features.

---

# UX Rules

The application should always tell the user:

what happened

what happens next

what they can do now

Never leave the user in an empty screen.

---

# Future Roadmap

Release 0.2

Architecture

Release 0.3

Review Flow

Release 0.4

Reveal

Release 0.5

Hall of Fame

Release 0.6

Profiles

Release 0.7

Notifications

Release 0.8

Achievements

Release 1.0

Public Beta

---

# Philosophy

Every line of code should make the project easier to extend.

We optimize for maintainability over speed.

Build features once.

Reuse them forever.
---

# Current Implementation Status

Release 0.2 architecture cleanup is implemented.

Business logic for Hall Of Fame and Profiles lives in lib/ helpers.

Review submission, reveal, Hall Of Fame rankings and Profile statistics are no longer mock-only UI flows.

Remaining architecture work should focus on future Notifications and deeper Home decomposition if the screen grows again.

