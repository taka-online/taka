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

**Game Model & Tactical:**
- "When we play against a 4-3-3 high press, how often do we successfully build out of the SGZ?"
- "Which opponents forced us out of positional possession and into counter-attack situations?"
- "What's our success rate executing the counter-press after losses in the BGZ vs FGZ?"
- "Against teams that sit in a low block, how many times did we find +1 situations in the half-spaces?"

**Performance & Load:**
- "When we play high-press teams, do our midfielders fatigue more in the second half? Does our pressing intensity drop?"
- "What training week structure preceded our best performances in terms of field tilt and possession?"
- "Which players sustain high-speed running output across 90 minutes vs which ones drop off after 60?"
- "What load patterns came before soft tissue injuries?"

**Patterns Across Games:**
- "Against teams that press our CBs, how often do our pivots successfully drop to create the +1 to break the first line?"
- "When opponents switch to man-marking in transition, which of our players get eliminated most often?"
- "What adjustments did we make at halftime in games we were losing? Which ones worked?"

**Recruitment:**
- "Which recruits have profiles similar to players who succeeded in our system?"
- "What physical benchmarks do our successful fullbacks share?"

---

### Institutional Memory

Knowledge that lives in discussions and disappears when context is lost:

**Game Model Evolution:**
- "Why did we switch from 0-press to 1x-press triggers against Team Y last year? What was the reasoning?"
- "When did we decide to change how the wingers defend in transition — tracking FBs vs staying high?"
- "What were the specific concerns about our set piece defending in September and what did we adjust?"

**Player Development:**
- "What did we identify as Player X's development priorities at the start of the season? How has he progressed?"
- "When did we first discuss moving Player Y into the pivot role? What made us think he could do it?"
- "What were the concerns about Recruit Z's positioning before signing? Were they valid after a season?"

**Opponent Patterns:**
- "What worked against Team X's 4-4-2 mid-block last time we played them?"
- "How did we plan to exploit Team Y's high line? Did it work?"
- "What set piece adjustments did we make for Team Z's zonal marking?"

**System & Philosophy:**
- "What's the reasoning behind our exchange policy in defensive transition?"
- "When a new player asks about De Bruyne runs vs Channel runs, what's the explanation we've given?"
- "What have we said about when to play vertical vs when to keep possession?"

The system remembers what the program has learned — and why.

---

### Preparation That Writes Itself

Before a match, auto-generate one document that pulls:
- Opponent scouting brief (Wyscout) — formation tendencies, set pieces, key players
- What we discussed about them last time (meeting transcripts)
- How they play against our style — do they press? Sit deep? Man-mark in transition?
- Physical state of our squad (GPS + medical)
- Historical results and what tactical adjustments worked
- Suggested rhythm level based on opponent's defensive structure

Currently this is manual assembly from multiple places.

---

### Proactive Alerts

The system watches and tells you — you don't have to ask:

- "Player X's load pattern matches the profile before his last hamstring issue"
- "Player Y's high-speed running has dropped 15% over the last 3 weeks"
- "Opponent Z changed their corner routine since you last scouted them — they're now attacking near post"
- "Recruit A just entered transfer portal — profile matches the fullback characteristics you've been looking for"
- "Team B (upcoming opponent) lost their starting CB to injury last match"

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
- "How does Team X build out of the back? Do they play through or go long under pressure?"
- "What are Team X's corner tendencies — near post, far post, or short?"
- "Show me when we discussed Team X in meetings this season"
- "What rhythm level should we play against Team X's 4-4-2 mid-block?"
- "What worked last time we played a team that man-marked our pivots?"

**Tactical Review:**
- "In games where we struggled to break the first line, what adjustments did we make?"
- "When have we used overload right vs overload left structures this season?"
- "Show me the clip where we discussed the change to our counter-press triggers"

**Performance:**
- "Which players have highest training load this week?"
- "Who's showing signs of fatigue based on load trends?"
- "How has Player Y's sprint output changed since September?"
- "Which players maintain pressing intensity in the final 20 minutes?"

**Recruitment:**
- "List fullback prospects who fit our attacking FB profile — need to join the attack, comfortable 1v1"
- "What did we say about Recruit X's tactical awareness in the last meeting?"
- "Find wingers in the portal who can play inverted and make De Bruyne-type runs"

**Institutional Knowledge:**
- "What's our philosophy on when FBs should overlap vs underlap?"
- "Play the clip where we explained the Bell run to the team"
- "What did we decide about defensive shape against 4-3-3 teams?"

---

## Timeline

| Phase | Timeframe | What You Get |
|-------|-----------|--------------|
| Data Ingestion | Weeks 1-3 | All data connected and indexed |
| Core System | Weeks 4-6 | Can ask questions, get sourced answers |
| Specialized Tools | Weeks 7-10 | Opponent scouting assistant, load dashboard, meeting search |
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
