# Marshall Men's Soccer - Program Intelligence Platform

## Summary

We're proposing a two-part system that grows with the program:

**Part 1: Marshall-Specific AI** — A knowledge system built on Marshall data. The key is capturing and connecting meeting discussions with your existing data (Wyscout, GPS, recruitment). Delivers value immediately.

**Part 2: Tracking & Decision Engine** — Computer vision to extract tactical data from match video. Develops in background, eventually feeds into Part 1.

**Key insight:** Part 1 works now. Part 2 makes it better over time.

---

# Part 1: Marshall-Specific AI

## The Core Idea

A system that connects all your program data and makes it searchable and queryable.

Not a chatbot. Not a replacement for Wyscout. **It's the connective tissue between everything** — letting you ask questions across systems that don't talk to each other today.

---

## What Data It Connects

| Source | What It Contains |
|--------|------------------|
| Wyscout | Match events, opponent tendencies, player stats |
| GPS | Training load, distances, sprints |
| Game Plans | Tactical documents, scouting reports |
| Meeting Recordings | Discussions, decisions, context |
| Recruitment | Prospect notes, evaluations |
| Medical | Injury history |

**You already have this data.** It's just scattered across different systems.

---

## Why This Matters

### 1. Cross-Source Pattern Recognition

Connecting meetings to data lets you find patterns:

- "What did we discuss about opponents who press high? Pull up those meetings alongside our results against them."
- "Show me every time we talked about Player X's development — what did we say, and how do his GPS numbers compare now?"
- "What load patterns came before injuries? What did we say about those players before they got hurt?"

The value isn't answering complex tactical questions automatically — it's **surfacing the right context** when you need it.

---

### 2. Institutional Memory

This is the biggest value. Knowledge that currently gets lost:

**Decisions and reasoning:**
- "Why did we change our pressing triggers against Team Y?"
- "What were the concerns about Recruit Z before we signed him? Were they valid?"
- "What adjustments did we discuss at halftime in the games we were losing?"

**Player context:**
- "What development priorities did we set for Player X in September?"
- "When did we first talk about moving Player Y to a new position?"

**Opponent history:**
- "What did we say about Team X last time we played them? What worked?"
- "Show me the meeting where we broke down their set pieces"

**System explanations:**
- "When a new player asks about our defensive transition principles, what's the explanation we've given before?"
- "Play the clip where we explained the difference between overlaps and underlaps"

Without this, every conversation starts from scratch. New staff have no context. Past lessons get forgotten and repeated.

---

### 3. Recruitment Intelligence

Connect recruitment discussions to outcomes:

- "What did we say about recruits similar to Player X before we signed them? How did they turn out?"
- "Pull up all discussions about fullback prospects this year"
- "What concerns came up about Recruit Y's positioning? Show me the meeting clips"
- "Which recruiting channels have produced players who succeeded in our system?"

The system connects what you said about prospects to how they actually performed — so you learn what evaluation signals mattered.

---

## Timeline

| Phase | Timeframe | What You Get |
|-------|-----------|--------------|
| Data Ingestion | Weeks 1-2 | All data connected and indexed |
| Core System | Weeks 3-4 | Can query across all data sources |
| Refinement | Weeks 5-6 | Improved accuracy, feedback loop |

**Week 4: Staff can start asking questions and getting useful answers.**

---

# Part 2: Tracking & Decision Engine

## What It Is

Computer vision system that extracts player positions and tactical data from match video.

This is longer-term development that eventually feeds richer data into Part 1.

---

## Current Status

| Component | Status |
|-----------|--------|
| Player detection | Working |
| Ball detection | Working |
| Manual pitch calibration | Working |
| Automatic pitch calibration | Code exists, needs training |
| Basic tracking | Working (limitations in complex scenarios) |
| Physical metrics from video | Working |
| Decision engine code | Exists, needs validated tracking data |

---

## What It Will Enable (Future)

Once tracking is reliable:
- Physical metrics from video (when GPS isn't available)
- Possession and field tilt statistics
- Formation shape analysis
- Eventually: Game Model principle measurement

---

## Development Timeline

| Phase | Timeframe | Goal |
|-------|-----------|------|
| Automatic Calibration | Months 1-2 | Process video without manual setup |
| Tracking Improvements | Months 3-4 | Handle occlusions, camera movement |
| Validation | Months 5-6 | Verify accuracy against GPS |
| Integration | Month 6+ | Tracking data flows into Part 1 |

---

# How They Work Together

```
Part 1 (Marshall AI) - Immediate Value
───────────────────────────────────────
Week 1-2:   Data ingestion
Week 3-4:   System working              ← Value starts here
Week 5-6:   Refinement


Part 2 (Tracking) - Background Development
───────────────────────────────────────
Month 1-2:  Automatic calibration
Month 3-4:  Tracking improvements
Month 5-6:  Validation + integration    ← Feeds into Part 1
```

Part 1 delivers value in weeks. Part 2 makes it more powerful over months.

---

# What We Need

### Data Access
- Wyscout export or API access
- GPS data exports
- Game plans and scouting documents
- Recruitment tracking
- Permission to record and transcribe meetings

---

# Summary

**Part 1:** Capture meetings, connect them to your data, build searchable institutional memory. Value in weeks.

**Part 2:** Tracking and tactical analysis from video. Develops in background over months.

**The key insight:** The most valuable data you have is in your discussions — and right now it disappears. This system keeps it.
