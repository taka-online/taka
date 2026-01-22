# Marshall Men's Soccer - Program Intelligence Platform

## What This Is

A **layered intelligence system** for the men's soccer program - not a chatbot, not a single AI that "knows everything."

Think: **Chief of Staff + Head Analyst + Compliance Officer + Recruitment Director**, augmented by data.

---

# Platform Sections

The platform has **5 core sections**. Each can be built independently and improves the others.

---

## Section 1: Data Layer

**Purpose:** Single source of truth for all program data.

| Data Type | Examples |
|-----------|----------|
| Training | GPS, load, wellness, RPE |
| Match | Event data, video tags, tracking |
| Players | Physical, technical, psychological profiles |
| Opponents | Tactical tendencies, set pieces, scouting |
| Recruitment | Video, metrics, scouting notes |
| Compliance | NCAA rules, institutional constraints |
| Financial | Budget, scholarships, travel, staff time |

**Status:** Not built yet
**Spring Goal:** Define schema, connect existing data sources

---

## Section 2: Compliance Engine

**Purpose:** Ensure every recommendation is legal and allowed.

**Hard constraints:**
- NCAA compliance rules
- Scholarship limits
- Contact periods
- Training hour limits
- Medical return-to-play rules
- University policies

**What it does:** Flags violations before they happen. Every recommendation passes through compliance check.

**Status:** Not built yet
**Spring Goal:** Core NCAA rules encoded

---

## Section 3: Domain Models

**Purpose:** Specialized intelligence for each area of the program.

### 3A. Performance & Training Model
- Load vs injury risk
- Readiness forecasting
- Microcycle optimization

*Example: "Player X should reduce sprint load this week given hamstring history and upcoming match."*

**Status:** Not built yet
**Depends on:** GPS/training data from Section 1

### 3B. Tactical & Game Model
- Formation effectiveness vs opponents
- Set-piece analysis
- Game Model 2.0 principle measurement

*Example: Pressing trigger detection, elimination analysis, named run classification*

**Status:** Code exists (decision engine), needs validated tracking data
**Depends on:** Reliable tracking from Section 5

### 3C. Recruitment & Roster Model
- Positional need forecasting
- Prospect fit evaluation
- Development projections

*Example: "This recruit's profile matches your fullback needs and system requirements."*

**Status:** Not built yet
**Depends on:** Recruitment data structure from Section 1

### 3D. Financial & Resource Model
- Budget tracking
- ROI analysis
- Resource allocation

**Status:** Not built yet
**Depends on:** Financial data from Section 1

---

## Section 4: Decision Engine

**Purpose:** Synthesize outputs from all models, present tradeoffs.

**Key principle:** Humans choose. AI frames decisions.

It does NOT say: "Do this."

It says:
- Option A: performance gain, higher injury risk
- Option B: conservative, preserves availability
- Option C: aggressive, compliance risk

**Status:** Tactical decision engine code exists, needs integration with other sections
**Depends on:** All domain models feeding in

---

## Section 5: Match Tracking

**Purpose:** Extract player positions and physical data from video.

**Components:**
- Player/ball detection
- Pitch calibration (manual → automatic)
- Player tracking
- Physical metrics (distance, speed, sprints)

**Status:**
| Component | Current State |
|-----------|---------------|
| Detection | Working |
| Manual calibration | Working |
| Automatic calibration | Code exists, needs training |
| Basic tracking | Working (loses players in complex scenarios) |
| Physical metrics | Working |

**Depends on:** Training data for automatic calibration

---

## Section 6: Interfaces

**Purpose:** Different views for different roles.

| Role | What They See |
|------|---------------|
| Head Coach | Tactical options, lineup considerations, opponent tendencies |
| Performance Staff | Load dashboards, injury risk alerts |
| Recruiting Director | Target lists, fit scores, roster projections |
| Compliance Officer | Rule flags, violation alerts |
| AD / Admin | Budget summaries, program health metrics |

**Status:** Not built yet
**Depends on:** Sections 1-5 producing data to display

---

# What We're Building Now

## Currently Working
- Section 5: Match Tracking (core detection and tracking functional)

## Spring Focus
| Section | Goal |
|---------|------|
| Section 1: Data Layer | Define schema, connect GPS/training data |
| Section 2: Compliance | Core NCAA rules encoded |
| Section 5: Tracking | Automatic pitch calibration |

## Summer Focus
| Section | Goal |
|---------|------|
| Section 3A: Performance Model | Training load recommendations |
| Section 5: Tracking | Improved reliability, integration with platform |
| Section 6: Interfaces | Basic dashboards |

---

# Future Vision

## What Becomes Possible (Year 2+)

Once the foundation is solid, advanced capabilities unlock:

### Tactical Analysis (Section 3B)
- Measure Game Model 2.0 principles from video
- Detect pressing triggers (0 vs 1x press)
- Classify named runs (De Bruyne, Bell, Holmes)
- Track elimination events
- Score position-specific principle compliance

**Requires:** Reliable tracking + coach validation + labeled training data

### Predictive Capabilities (Section 4)
- Injury risk forecasting
- Match outcome simulations
- Roster planning scenarios
- Opponent adaptation recommendations

**Requires:** Historical data + validated models

### Real-Time Processing (Section 5)
- Live tracking during matches
- In-game tactical alerts
- Halftime analysis

**Requires:** Significant optimization work

### Full Program Intelligence (All Sections)
- Cross-domain insights (e.g., recruitment decisions informed by tactical needs + budget + compliance)
- Automated scouting summaries
- Season planning optimization

**Requires:** All sections mature and integrated

---

# Realistic Timeline

| Timeframe | Focus | Deliverable |
|-----------|-------|-------------|
| **Spring** | Sections 1, 2, 5 | Data foundation + compliance engine + automatic calibration |
| **Summer** | Sections 3A, 5, 6 | Training recommendations + reliable tracking + basic dashboards |
| **Fall** | Integration | All sections connected, data flowing |
| **Year 2** | Sections 3B, 4 | Tactical analysis + predictive capabilities |

---

# What We Need

### Data Access
- GPS/training data
- Scouting notes/opponent reports
- Recruitment tracking
- Budget information

### Feedback
- Which decisions matter most?
- What outputs are useful vs noise?
- Validation that recommendations make sense

### Expectations
- Spring builds infrastructure
- Fall has basic utility
- Full Game Model analysis is Year 2+

---

# Summary

**6 Sections:**
1. Data Layer - single source of truth
2. Compliance Engine - NCAA rules
3. Domain Models - Performance, Tactical, Recruitment, Financial
4. Decision Engine - synthesize and present tradeoffs
5. Match Tracking - video to data
6. Interfaces - role-specific views

**Building Now:** Sections 1, 2, 5 (foundation)

**Future:** Tactical Game Model analysis, predictive capabilities, real-time processing

The platform grows section by section. Each piece makes the others more valuable.
