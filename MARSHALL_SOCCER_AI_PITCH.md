# Marshall Men's Soccer - Program Intelligence Platform

## Summary

We're proposing a two-part system that grows with the program:

**Part 1: Marshall-Specific AI** — A knowledge system trained on all Marshall data (Wyscout, GPS, game plans, meeting recordings, recruitment, financials). Delivers value immediately using data you already have.

**Part 2: Tracking & Decision Engine** — Computer vision system to extract player positions and tactical analysis from match video. Develops in the background over months, eventually feeding richer data into Part 1.

**Key insight:** Part 1 works now. Part 2 makes it better over time.

---

# Part 1: Marshall-Specific AI

## What It Is

A system that connects all your program data and makes it searchable, queryable, and actionable.

Not a chatbot. Not a replacement for Wyscout.

**It's the connective tissue between everything** — the thing that lets you ask questions across systems that don't talk to each other today.

---

## What Data It Uses

| Source | What It Contains |
|--------|------------------|
| Wyscout | Match events, opponent tendencies, player stats |
| GPS | Training load, distances, sprints, fatigue patterns |
| Game Plans | Tactical documents, scouting reports |
| Meeting Recordings | Discussions, decisions, context (transcribed + video) |
| Recruitment | Prospect notes, evaluations, portal tracking |
| Financials | Budget, scholarships, travel costs |
| Medical | Injury history, return-to-play |
| NCAA Rules | Compliance deadlines, limits |
| Schedule | Matches, travel, recovery windows |

**You already have this data.** It's just scattered across systems.

---

## Why It's Valuable

### Questions No Single Tool Can Answer

| Question | Why You Can't Answer It Today |
|----------|------------------------------|
| "When we play high-press teams, do our players fatigue more in the second half?" | Needs Wyscout opponent style + GPS load + match results |
| "What training week structure preceded our best performances?" | Needs GPS + schedule + results |
| "Which of our players performs best against pressing teams?" | Needs opponent data + our performance data |
| "What load patterns came before injuries?" | Needs GPS + medical history |
| "Which recruits are similar to players who succeeded here?" | Needs recruitment profiles + historical outcomes |

---

### Institutional Memory

Knowledge that lives in people's heads and disappears when staff turn over:

- "What did we learn recruiting Player X that applies to similar prospects?"
- "Why did we change the pressing trigger against Team Y last year?"
- "What concerns did we have about this player before signing? Were they valid?"
- "What worked against 4-4-2 teams historically?"

The system remembers what the program has learned.

---

### Preparation That Writes Itself

Before a match, auto-generate one document that pulls:
- Opponent scouting brief (Wyscout)
- What we said about them last time (meeting transcripts)
- Physical state of our squad (GPS + medical)
- Historical results and what worked (past game plans)
- Compliance check (training hours vs NCAA limit)

Currently this is manual assembly from 5 different places.

---

### Proactive Alerts

The system watches and tells you — you don't have to ask:

- "Player X's load pattern matches profile before his last injury"
- "Opponent Y changed their corner routine since you last scouted them"
- "Training hours at 85% of NCAA weekly limit with 2 days left"
- "Budget tracking 20% over projection for travel"
- "Recruit Z just entered transfer portal — matches your fullback criteria"

---

### Meeting Intelligence

Every meeting recorded, transcribed, and searchable:

**Find past decisions:**
- "What did we say about Player X's positioning in September?"
- "When did we decide to change the set piece routine?"
- "What were the concerns about Recruit Y?"

**Track outcomes:**
- "We decided X. Did it work?"
- Which types of decisions led to good outcomes?

**Onboard new staff:**
- Search "what's our philosophy on high press" and get actual discussions, not just a document

---

### Recruitment Intelligence

- "Find prospects whose profile matches players who succeeded here"
- "What's our conversion rate from ID camps to signed players?"
- "Which recruiting channels produced our best players?"
- "What did we say about Recruit Z six months ago? How does current video compare?"

---

## Meeting Capture

### The Setup

Meetings often show content on TV (Wyscout clips, presentations, tactical boards). We capture everything.

**Basic Setup ($30):**
- HDMI capture dongle between laptop and TV
- Phone on tripod for audio
- Transcription with free AI (Whisper)

**What Gets Captured:**
- Everything shown on screen (Wyscout clips, slides, drawings)
- Full audio transcribed and searchable
- Linked together: "Show me when we discussed Team X's press" → returns video + transcript

---

## Example Queries

**Opponent Prep:**
- "What are Team X's corner kick tendencies?"
- "Show me when we discussed Team X in meetings this season"
- "What worked last time we played a team that pressed like this?"

**Performance:**
- "Which players have highest training load this week?"
- "Who's at elevated injury risk based on load + history?"
- "How has Player Y's sprint output changed since September?"

**Compliance:**
- "How many training hours have we logged this week?"
- "Are we compliant on scholarship limits?"

**Recruitment:**
- "List left back prospects we've scouted"
- "What did we say about Recruit X in the last meeting?"

**Institutional Knowledge:**
- "What did we decide about formation against 4-3-3 teams?"
- "What budget do we have remaining for spring travel?"
- "Play the clip where we discussed the pressing adjustment"

---

## Timeline

| Phase | Timeframe | What You Get |
|-------|-----------|--------------|
| Data Ingestion | Weeks 1-3 | All data connected and indexed |
| Core System | Weeks 4-6 | Can ask questions, get sourced answers |
| Specialized Tools | Weeks 7-10 | Scouting assistant, load dashboard, compliance alerts |
| Refinement | Weeks 11-12 | Feedback loop, improved accuracy |

**Week 6: Staff can start asking questions and getting useful answers.**

---

# Part 2: Tracking & Decision Engine

## What It Is

Computer vision system that extracts player positions and tactical data from match video.

This is the longer-term development that eventually feeds richer data into Part 1.

---

## What We Have Today

| Component | Status |
|-----------|--------|
| Player detection | Working |
| Ball detection | Working |
| Manual pitch calibration | Working |
| Automatic pitch calibration | Code exists, needs training |
| Basic tracking | Working (loses players in complex scenarios) |
| Physical metrics from video | Working |
| Decision engine code | Exists, needs validated tracking data |

---

## What It Will Enable (Future)

Once tracking is reliable:
- Physical metrics from video (when GPS isn't available)
- Possession and field tilt statistics
- Formation shape analysis
- Game Model principle measurement
- Pressing trigger detection
- Named run classification (De Bruyne, Bell, etc.)

---

## Development Timeline

| Phase | Timeframe | Goal |
|-------|-----------|------|
| Automatic Calibration | Months 1-2 | Process video without manual setup |
| Tracking Improvements | Months 3-4 | Handle occlusions, camera movement |
| Validation | Months 5-6 | Verify accuracy against GPS |
| Integration | Month 6+ | Tracking data flows into Part 1 |

**This develops in parallel with Part 1.** Part 1 works without it, but gets better when Part 2 is ready.

---

# How They Work Together

```
Part 1 (Marshall AI) - Immediate Value
───────────────────────────────────────
Week 1-3:   Data ingestion
Week 4-6:   System answering questions     ← Value starts here
Week 7-12:  Specialized tools + refinement


Part 2 (Tracking) - Background Development
───────────────────────────────────────
Month 1-2:  Automatic calibration
Month 3-4:  Tracking improvements
Month 5-6:  Validation + integration       ← Feeds into Part 1
```

Part 1 delivers value immediately with existing data.

Part 2 develops in background and eventually makes Part 1 even more powerful.

---

# What We Need From Marshall

### Data Access
- Wyscout export or API access
- GPS data exports
- Game plans and scouting documents
- Permission to record and transcribe meetings
- Recruitment tracking (even spreadsheets)
- Budget information

### Equipment (One-Time, ~$50)
- HDMI capture dongle for meeting recording
- Phone tripod

### Feedback
- Which questions matter most?
- What outputs are useful vs noise?
- Validation that answers make sense

---

# Cost Estimate

## One-Time Setup
- Meeting capture equipment: ~$50

## Monthly Operating

| Usage Level | Monthly Cost |
|-------------|--------------|
| Light | $50-75 |
| Moderate | $150-200 |
| Heavy | $300-400 |

Main cost driver is LLM API usage (scales with query volume).

Storage is minimal — text and transcripts are small. Can use university Google Drive.

---

# Summary

**Part 1 (Marshall AI):**
- Uses data you already have
- Connects siloed systems
- Answers questions across sources
- Preserves institutional memory
- Delivers value in weeks

**Part 2 (Tracking):**
- Develops in background
- Eventually adds match video analysis
- Makes Part 1 more powerful over time

**The approach:** Start getting value now, grow capabilities over time.
