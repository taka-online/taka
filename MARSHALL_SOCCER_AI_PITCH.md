# Marshall Men's Soccer - Program Intelligence Platform

## What This Is

A **layered intelligence system** for the men's soccer program - not a chatbot, not a single AI that "knows everything."

It's a system that:
- Ingests data across the program (training, matches, players, opponents, recruitment, compliance, finances)
- Applies rules (NCAA compliance, institutional constraints)
- Surfaces recommendations with confidence levels
- Learns slowly, under human supervision

Think: **Chief of Staff + Head Analyst + Compliance Officer + Recruitment Director**, augmented by data.

---

## Core Architecture

### Layer 1: Data Ingestion (Single Source of Truth)

All program data flows into one governed system.

| Data Type | Examples |
|-----------|----------|
| Training | GPS, load, wellness, RPE |
| Match | Event data, video tags, (future: tracking) |
| Players | Physical, technical, psychological profiles |
| Opponents | Tactical tendencies, set pieces, scouting |
| Recruitment | Video, metrics, scouting notes |
| Compliance | NCAA rules, institutional constraints |
| Financial | Budget, scholarships, travel, staff time |

**Key requirement:** Everything time-stamped, normalized, and permissioned.

---

### Layer 2: Knowledge & Rules Engine

This prevents the system from making illegal or naive suggestions.

**Hard constraints:**
- NCAA compliance rules
- Scholarship limits
- Contact periods
- Training hour limits
- Medical return-to-play rules
- University policies

This layer answers: **"Is this recommendation even allowed?"**

Without this, the system is unusable.

---

### Layer 3: Domain Models

Instead of one model, several specialized ones:

#### A. Performance & Training Model
- Load vs injury risk
- Positional physical benchmarks
- Readiness forecasting
- Microcycle optimization

*Example output:*
> "Player X should not exceed 78% max sprint exposure this week given hamstring risk and match congestion."

#### B. Tactical & Game Model
- Formation effectiveness vs opponent profiles
- Set-piece expected value
- Pressing vs block tradeoffs
- Substitution timing

*This is where Game Model 2.0 concepts integrate - elimination analysis, defensive physics, etc.*

#### C. Recruitment & Roster Model
- Positional scarcity forecasting
- Development curve projections
- Fit vs system evaluation
- Scholarship cost-benefit

*Example:*
> "A 19-year-old fullback with elite acceleration produces more marginal gain than a senior CB given current roster age curve."

#### D. Financial & Resource Model
- ROI of travel vs recruiting exposure
- Cost per marginal win
- Staff time allocation efficiency

---

### Layer 4: Decision Engine

Combines outputs, applies priorities, surfaces **tradeoffs** - not answers.

It does NOT say: "Do this."

It says:
- Option A: performance gain +0.12 xG, injury risk +8%
- Option B: neutral performance, preserves availability
- Option C: aggressive upside, NCAA risk = high

**Humans choose. AI frames decisions.**

---

### Layer 5: Interfaces

Different stakeholders see different views.

| Role | Interface |
|------|-----------|
| Head Coach | Tactical options, lineup considerations |
| Performance Staff | Load dashboards, alerts |
| Recruiting Director | Target lists, fit scores |
| Compliance Officer | Rule flags |
| AD / Admin | Budget + performance summaries |

One backend. Multiple lenses.

---

## What We Have Today

### Existing Code & Capabilities

| Component | Status | Maps To |
|-----------|--------|---------|
| Player/ball detection | Working | Data ingestion (match) |
| Basic tracking | Working (limitations) | Data ingestion (match) |
| Physical metrics | Working | Performance model inputs |
| Decision engine code | Built, needs validation | Tactical model |
| Training infrastructure | Built, needs data | All models |

### What's Missing

| Gap | Impact |
|-----|--------|
| Central data lake | No single source of truth yet |
| NCAA rules engine | Can't validate compliance automatically |
| Reliable tracking | Tactical model inputs are limited |
| Opponent data pipeline | No systematic scouting ingestion |
| Recruitment data structure | No standardized prospect evaluation |
| Interfaces | No user-facing dashboards |

---

## Phased Build

### Phase 1: Foundation (Spring)
**Goal:** Central data structure + first useful outputs

- Define data schema for all program data
- Build NCAA rules engine (scholarship limits, contact periods, training hours)
- Connect existing GPS/training data if available
- Basic dashboards (descriptive, not predictive)

**Deliverable:** Staff can see program data in one place with compliance flags.

### Phase 2: Advisory (Spring → Summer)
**Goal:** First recommendations

- Training load recommendations (if GPS data available)
- Opponent tendency summaries (from video tags/scouting)
- Recruitment shortlists with fit scores

**Deliverable:** System suggests, humans decide.

### Phase 3: Tracking Integration (Summer → Fall)
**Goal:** Add match tracking as data source

- Automatic pitch calibration (developed in spring)
- Improved player tracking
- Physical metrics from video (distance, speed, sprints)
- Feed into performance and tactical models

**Deliverable:** Match data flows into the platform automatically.

### Phase 4: Simulation & Strategy (Fall → Year 2)
**Goal:** Predictive capabilities

- Tactical simulations
- Set-piece optimization
- Roster planning scenarios
- Game Model principle measurement (longer term)

**Deliverable:** "What if" analysis for decisions.

---

## What Makes This Work

### 1. Start With What You Have
Don't wait for perfect tracking. Use:
- Existing GPS data
- Scouting notes
- Recruitment spreadsheets
- Budget data

The platform grows as data sources improve.

### 2. Rules Before Intelligence
NCAA compliance engine is non-negotiable. Every recommendation must pass compliance check first.

### 3. Humans Override
If coaches don't trust they can override, adoption fails. The system frames decisions, doesn't make them.

### 4. No "Magic AI" Initially
Use:
- Rules and heuristics
- Simple models
- Structured queries

Sophisticated ML comes later, with more data and validated foundations.

---

## Realistic Timeline

| Phase | Timeframe | Output |
|-------|-----------|--------|
| Foundation | Spring | Data lake + compliance engine + dashboards |
| Advisory | Late Spring | Training/recruitment recommendations |
| Tracking Integration | Summer-Fall | Video-based match data flowing in |
| Simulation | Year 2 | Predictive and strategic analysis |

**Game Model tactical analysis** (elimination detection, named runs, position compliance) requires:
- Reliable tracking (Phase 3)
- Validated decision engine
- Coach collaboration for training data

This is Year 2+ work, built on the foundation.

---

## What We Need From Marshall

### Data Access
- GPS/training data (if available)
- Scouting notes/opponent reports
- Recruitment tracking (even spreadsheets)
- Budget/resource information

### Time
- Periodic check-ins to validate outputs
- Input on which decisions matter most
- Feedback on what's useful vs noise

### Realistic Expectations
- Phase 1 is infrastructure, not magic
- Value compounds over time
- Tactical Game Model analysis is a longer horizon

---

## Summary

**The approach:**
1. Build a program-wide intelligence platform, not just tracking
2. Start with data Marshall already has
3. Add tracking as it matures
4. Layer in tactical analysis over time

**Spring delivers:** Data foundation + compliance engine + basic dashboards

**Fall delivers:** Training recommendations + tracking data flowing in

**Year 2+:** Tactical simulations, Game Model measurement, predictive analysis

The tracking and decision engine we've built become **components that plug in** - not the whole system.

---

This is an operating system for the program, not a chatbot. It grows with better data and feedback.
