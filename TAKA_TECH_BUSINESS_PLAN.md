# Taka Tech — Business Plan

*Tactical Intelligence Platform for Football*

---

## Executive Summary

Taka Tech is a tactical intelligence platform that moves football analytics from event-level reporting ("pass completed") to decision-level evaluation ("was that the right pass?"). The system extracts player and ball coordinates from match video using computer vision, then applies a decision engine that evaluates every available option, compares it to what actually happened, and learns what works from real outcomes.

The platform is structured as two layers that can be sold together or independently:

1. **Intelligence Hub** — connects a program's scattered data (video analysis, GPS, game plans, meetings, recruitment, medical) into one searchable, queryable knowledge system. Delivers value in weeks.

2. **Tracking + Decision Engine** — proprietary computer vision generates spatial data from match video; a decision engine converts that data into objective measurements of game model execution, player decision quality, and opponent-specific tactical intelligence. Develops over months.

The company sells B2B subscriptions to college programs and professional clubs. An active pilot with Marshall University Men's Soccer (Division I, Sun Belt Conference) is validating the platform.

---

## 1. The Problem

Football analytics is stuck at the event level.

Current tools — Wyscout, StatsBomb, Hudl, Opta, InStat — tell coaches *what happened*: passes completed, shots taken, possession percentage, expected goals. They do not answer the coaching question that matters most: **"Was that the right decision?"**

A midfielder completes a pass. Event data records it as successful. But was it the *best* pass? Was there a through ball that would have created a scoring chance? Was a teammate making a run the midfielder didn't see?

Coaches watch hours of film trying to answer these questions manually. They cannot quantify decision quality. They cannot compare it across games. They cannot give players objective, data-backed feedback on their choices.

### What Exists Today

| Tool | What It Does | What It Doesn't Do |
|------|-------------|-------------------|
| **Hudl** | Video platform, basic tagging | No spatial analysis, no decision evaluation |
| **Wyscout** | Event database, scouting, opponent tendencies | Events only — no continuous tracking, no decision quality |
| **StatsBomb** | Advanced event metrics (xG, xA, OBV) | Still event-level; requires analyst interpretation |
| **Second Spectrum** | Tracking data from broadcast | Raw data provider — no insights, no coaching recommendations |
| **SkillCorner** | Broadcast-based tracking | Data provider only — sells to analysts, not coaches |
| **Opta / InStat** | Event data and match statistics | No spatial analysis, no decision-level evaluation |

The gap: nobody is answering **"given the full picture of the field, what was the best option, and did we take it?"**

---

## 2. The Solution

### Layer 1: Intelligence Hub

A program-specific knowledge system that connects existing data sources into one queryable platform.

**What it connects:**

| Source | Contents |
|--------|----------|
| Wyscout | Match events, opponent tendencies, player stats |
| GPS | 240+ metrics per session — load, distances, sprints, fatigue patterns |
| Game Plans | Tactical documents, scouting reports |
| Meeting Recordings | Discussions, decisions, context (transcribed) |
| Recruitment | Prospect notes, evaluations, portal tracking |
| Financials | Budget, scholarships, travel costs |
| Medical | Injury history, return-to-play timelines |
| Schedule | Matches, travel, recovery windows |

**What it does:**

- **Cross-source pattern recognition** — "When we play high-press teams, do players fatigue more?" (requires combining Wyscout events + GPS load + match results)
- **Institutional memory** — decisions, rationale, and context are searchable across months and seasons
- **Pre-match prep generation** — auto-generate opponent brief combining their tendencies + our physical state + historical tactical results
- **Proactive alerts** — "Load pattern matches injury history," "Budget trending over"
- **Recruitment intelligence** — "Find prospects matching [successful player profile]"

**Technology:** RAG (retrieval-augmented generation) with vector database for semantic search and LLM synthesis with citations.

**Timeline to value:** 4–6 weeks from data ingestion to working system.

**Why it matters commercially:** The Hub delivers immediate, visible value while the tracking system matures. It justifies the subscription from Day 1 and creates switching costs (the system gets smarter with each season of accumulated data).

### Layer 2: Tracking + Decision Engine

Proprietary computer vision extracts player and ball coordinates from match video. The decision engine converts those coordinates into tactical intelligence.

**Tracking capabilities (current):**

| Component | Status |
|-----------|--------|
| Player detection (YOLOv8) | Working |
| Ball detection with temporal consistency | Working |
| Team classification (jersey color clustering) | Working |
| Multi-object tracking (ByteTrack) | Working |
| Manual pitch calibration (homography) | Working |
| Physical metrics (speed, distance, acceleration, sprints) | Working |
| Auto-calibration (neural keypoint detection) | Built, needs validation |
| Player re-identification (OSNet embeddings) | Built, needs testing |
| Full-match identity maintenance | In progress |

**Decision engine capabilities (current):**

| Module | What It Does | Status |
|--------|-------------|--------|
| Elimination calculation | Which defenders are functionally out of play | Working |
| xG evaluation | Expected goals from any position | Working |
| Pass option evaluation | Every teammate rated as pass target with interception probability | Working |
| Through ball detection | Where can attackers run; will the ball arrive before defenders | Working |
| Dribble evaluation | Time-to-dribble vs. defender close-down | Working |
| Defensive force modeling | Models defensive positioning as equilibrium of forces | Working |
| Game state scoring | Composite 0–1 score comparing any two moments objectively | Working |
| Block identification | Low/mid/high block detection and gap analysis | Working |

**What the engine does NOT yet do (and the development path):**

| Capability | Status | Phase |
|-----------|--------|-------|
| Multi-step simulation (search ahead like chess) | Designed, not built | Phase 5 |
| Defensive response prediction | Designed, not built | Phase 3–4 |
| Outcome learning from real data | Architecture designed, not trained | Phase 2–3 |
| Player-specific profiles (speed, decision tendencies) | Framework exists | Phase 3 |
| Opponent-specific pattern library | Architecture ready, needs data | Phase 2 |

**The development sequence:**

```
Phase 1: Tracking validation (position accuracy vs GPS)
Phase 2: Similarity-based retrieval (find similar historical situations, analyze what worked)
Phase 3: Outcome learning (adjust success probabilities from real data, not just physics)
Phase 4: Production system (fast queries, video clip retrieval, pre/post-match reports)
Phase 5: Simulation engine (search for optimal decision sequences through real patterns)
```

---

## 3. What It Enables (Value Propositions)

### For Coaching Staff

**Objective game model accountability**
- "Are we actually playing the way we say we're playing?"
- Measure execution of specific tactical principles (buildup patterns, pressing triggers, defensive shape maintenance)
- See exact moments where structure breaks down, with alternative options quantified

**Decision quality evaluation**
- For any chance created or conceded: "What was the optimal play?"
- Player-specific feedback: "You chose option B (xG 0.08) vs. available option A (xG 0.31)"
- Objective development metric tracked over time

**Opponent-specific tactical intelligence**
- Auto-generate what patterns succeed against a specific opponent's defensive setup
- Learn their weaknesses from analyzing their matches: "Their LB takes 2.8s to recover on switches vs. league average 2.1s — target that channel"
- Pre-match plans grounded in actual data, not general tendencies

**Training design**
- Test scenarios computationally before implementing in practice
- Identify specific structural weaknesses to address with targeted sessions

### For Recruitment

**Physical metrics from video**
- Extract sprint patterns, recovery runs, work rate, acceleration — without needing the prospect's GPS data
- Compare prospect profiles to current players and ideal position profiles

**Decision-making quality**
- "This prospect chooses the highest-value option 68% of the time in transition"
- "His xG-added per action is similar to our starter, but he creates it through dribbling not passing"
- Objective evaluation that supplements subjective scouting

### For Program Operations (Hub)

**Cross-source intelligence**
- Queries that span video analysis, GPS, medical, financial, and tactical data
- "Show me all instances where our pressing intensity dropped below X in games where we'd traveled more than 500 miles"

**Institutional knowledge**
- Decisions and rationale are captured and searchable
- New staff members ramp faster
- The program compounds knowledge instead of resetting each season

---

## 4. Market Opportunity

### Target Markets

**Primary: NCAA Division I Programs**

| Segment | Size | Budget Range | Taka Tech Fit |
|---------|------|-------------|---------------|
| Power 4 + top programs | ~80 programs | $50K–$200K analytics budgets | Full platform (Hub + Tracking + Engine) |
| Competitive D1 programs | ~120 programs | $20K–$75K analytics budgets | Hub + selective tracking |
| Remaining D1 | ~340 programs | $5K–$30K analytics budgets | Hub-only tier |

D1 women's programs: 333 additional programs, growing investment in analytics.

**Secondary: Professional Clubs**

| Segment | Size | Budget Range |
|---------|------|-------------|
| Top European leagues (Big 5) | ~100 clubs | $100K–$500K+ analytics spend |
| MLS, Liga MX, Americas | ~150 clubs | $50K–$200K |
| Championship, 2nd/3rd tier European | ~500 clubs | $25K–$100K |
| Lower professional leagues | ~2,500+ clubs | $10K–$50K |

**Tertiary: Academies and Youth Development**

- 200+ professional club academies
- 1,000+ elite youth clubs
- Scaled-down product at $5K–$15K/year

### Total Addressable Market

Using conservative estimates:

| Segment | Addressable Programs/Clubs | Avg. Price/Year | TAM |
|---------|---------------------------|-----------------|-----|
| NCAA D1 (men + women) | ~540 | $30K | $16M |
| Professional (global) | ~3,000 | $75K | $225M |
| D2/D3 + NAIA | ~700 | $10K | $7M |
| Academies + elite youth | ~1,200 | $10K | $12M |
| **Total** | | | **~$260M** |

The broader sports analytics market provides additional context — estimated in the low billions globally across all sports, with football/soccer commanding the largest share.

### Serviceable Market (Years 1–3)

Focus on English-speaking markets first:

| Segment | Reachable | Avg. Price | SAM |
|---------|-----------|-----------|-----|
| NCAA D1 (top 100 programs) | 100 | $35K | $3.5M |
| MLS + USL + English lower leagues | 100 | $75K | $7.5M |
| **SAM** | | | **~$11M** |

---

## 5. Competitive Landscape

### Why Current Tools Don't Solve This

The analytics market has three layers, and Taka Tech operates in a layer nobody occupies:

**Layer 1: Event Data (commoditized)**
Wyscout, Opta, StatsBomb, InStat — everyone has access. Competitive advantage from event data alone is gone.

**Layer 2: Tracking Data (emerging, expensive)**
Second Spectrum, SkillCorner, Hawkeye — available to well-funded clubs. But tracking data is raw positions — it requires interpretation. Clubs that buy tracking data still need analysts to make it useful.

**Layer 3: Decision Intelligence (Taka Tech)**
Nobody is selling decision-level evaluation as a product: "Given the full field state, what was the best option, and how does what we did compare?" This is the layer coaches actually need.

### Competitive Differentiation

| Dimension | Competitors | Taka Tech |
|-----------|------------|-----------|
| Data type | Events (what happened) | Decisions (what should have happened) |
| Granularity | Aggregate stats (completion %) | Moment-specific, player-specific |
| Adaptation | Generic metrics | Adapts to team's tactical philosophy |
| Learning | Static models | Learns from each team's real outcomes |
| Output | Data requiring interpretation | Actionable coaching recommendations |
| Integration | Siloed data source | Connects all program data (Hub) |

### Defensibility

The moat deepens with scale:

- **Outcome learning flywheel** — more games analyzed = better predictions = more value = more adoption = more data
- **Program-specific knowledge** — each team's Hub accumulates institutional intelligence that can't be replicated
- **Opponent database** — more teams in the ecosystem = richer opponent modeling for everyone
- **Switching costs** — accumulated seasons of data, learned patterns, and staff workflows

---

## 6. Business Model

### Subscription Tiers

| Tier | Price/Year | Includes |
|------|-----------|----------|
| **Hub** | $15,000–$25,000 | Intelligence Hub (all data sources connected), cross-source queries, institutional memory, pre-match briefs |
| **Hub + Tracking** | $40,000–$75,000 | Everything in Hub + video tracking, physical metrics from video, spatial data overlay |
| **Full Platform** | $75,000–$150,000 | Everything above + decision engine, game model evaluation, player decision quality, opponent intelligence, simulation |

### Why Tiered

- Hub-only is the wedge: immediate value, low risk, fast deployment (4–6 weeks)
- Tracking adds proprietary data creation
- Full platform is the differentiated product that justifies premium pricing
- Teams can start at Hub and upgrade as they see value

### Unit Economics

| Metric | Estimate |
|--------|----------|
| CAC | $15K–$25K (pilot program + sales cycle) |
| LTV | $150K+ (3–5 year retention expected at avg. $40K/year) |
| Gross margin | 80%+ (software, minimal marginal cost per customer) |
| Payback period | < 12 months |

The key cost driver is compute (GPU inference for tracking). This scales with usage but remains a small fraction of revenue at target pricing.

### Revenue Projections

| Year | Customers | Avg. Revenue/Customer | ARR | Notes |
|------|-----------|----------------------|-----|-------|
| Year 1 | 5 | $40K | $200K | Marshall + 2–4 pilot programs |
| Year 2 | 25 | $48K | $1.2M | Expand in college + 1–2 MLS/USL |
| Year 3 | 75 | $60K | $4.5M | Add professional clubs, European pilots |
| Year 5 | 200 | $75K | $15M | Market leader in decision analytics |

These projections assume gradual upselling from Hub-only to full platform, and new customer acquisition from proven results.

---

## 7. Go-to-Market Strategy

### Phase 1: Prove Value at Marshall (Months 1–3)

**Objective:** Validate that the platform delivers coaching value and generate a referenceable case study.

**Actions:**
- Deploy Intelligence Hub (connect Wyscout, GPS, game plans, meetings)
- Validate tracking accuracy against GPS ground truth
- Run decision engine on key match moments; get coaching staff validation
- Document results: time saved, insights generated, decisions influenced

**Success criteria:**
- Coaching staff using the Hub weekly
- Tracking position error < 2m (vs. GPS)
- Engine flags same moments coaches identify on film (face validity)
- Case study ready for external sharing

**Why Marshall first:** Active pilot, direct access, D1 credibility, existing relationship.

### Phase 2: Expand to 5–10 College Programs (Months 4–12)

**Objective:** Prove repeatable sales and product-market fit beyond one customer.

**Target customers:**
- Power 4 programs with analytics budgets and data infrastructure
- Programs connected to Marshall's coaching network
- Programs that already use Wyscout + GPS (data is already there)

**Sales approach:**
- Coach testimonials and case study from Marshall
- Conference presentations (United Soccer Coaches convention, NSCAA)
- Demo day targeting analytics directors
- Pilot pricing: reduced first-year rate in exchange for feedback and case study rights

**Product strategy:**
- Lead with Hub (fast deployment, immediate value, low risk)
- Upsell tracking + decision engine once Hub is adopted
- Build coach advisory board from early customers (feedback loop + credibility)

### Phase 3: Professional and International (Year 2+)

**Objective:** Move upmarket to higher-budget customers.

**Target:** MLS, USL, English Championship, and 2nd-tier European leagues.

**Approach:**
- Professional clubs have larger budgets and more sophisticated analytics staff
- They can evaluate the product more rigorously — this is a feature, not a bug (validates quality)
- Conference packages (offer to entire conferences for network effects in opponent modeling)
- International expansion requires localization and region-specific sales presence

---

## 8. Technical Architecture

### System Overview

```
VIDEO INPUT (Wyscout, tactical cam, broadcast)
     │
     ▼
┌─────────────────────────────────┐
│    TRACKING LAYER               │
│  YOLOv8 detection               │
│  ByteTrack multi-object track   │
│  Homography (pixel → meters)    │
│  Team classification            │
│  Player re-identification       │
└─────────────────────────────────┘
     │
     ▼
┌─────────────────────────────────┐
│    FEATURE EXTRACTION           │
│  Ball position (continuous)     │
│  Defensive behavior features    │
│  Attacking features             │
│  Context (score, time)          │
└─────────────────────────────────┘
     │
     ▼
┌─────────────────────────────────┐
│    DECISION ENGINE              │
│  Situation similarity matching  │
│  Pass/shot/dribble evaluation   │
│  Defensive gap analysis         │
│  Game state scoring             │
│  Outcome learning               │
└─────────────────────────────────┘
     │
     ▼
┌─────────────────────────────────┐
│    INTELLIGENCE HUB             │
│  RAG (vector DB + LLM)          │
│  Cross-source queries           │
│  Report generation              │
│  Alerts and recommendations     │
└─────────────────────────────────┘
     │
     ▼
COACHING STAFF INTERFACE
(queries, reports, video clips, dashboards)
```

### Technology Stack

| Component | Technology |
|-----------|-----------|
| Detection | YOLOv8 + DETR (transformer) |
| Tracking | ByteTrack via Supervision |
| Calibration | OpenCV + RANSAC + HRNet keypoint detection |
| Re-identification | OSNet embeddings |
| Decision engine | PyTorch, custom physics models |
| Hub | RAG with vector database + LLM (Claude/GPT) |
| Backend | Express.js (Bun runtime), PostgreSQL, Prisma |
| Infrastructure | GPU compute (RTX 3080+ for inference) |

### Current Codebase

- **36,000+ lines** of production Python
- Modular architecture
- Well-documented build plans and technical specifications

---

## 9. Development Roadmap

### Completed

- Player and ball detection pipeline
- Multi-object tracking
- Manual pitch calibration
- Physical metrics calculation
- Decision engine core modules (8 working modules)
- Interactive tactical analysis UI
- Marshall pilot active

### Next 12 Months

| Phase | Timeframe | Deliverable | Dependency |
|-------|-----------|-------------|------------|
| Tracking validation | Months 1–2 | Position accuracy confirmed vs. GPS | GPS data access |
| Auto-calibration | Months 1–3 | Process video without manual setup | Training data |
| Hub deployment | Months 1–2 | Marshall Hub live, staff using weekly | Data ingestion |
| Hub refinement | Months 2–4 | Iterate based on staff feedback | Usage data |
| Tracking reliability | Months 3–4 | Maintain player identity across full matches | Re-ID testing |
| Game model labeling | Months 3–5 | Label Marshall moments in tracking data | Coaching input |
| Decision engine v1 | Months 4–6 | First automated game model measurements | Labeled data |
| Similarity database | Months 5–8 | Retrieve similar historical situations | 1,000+ possessions |
| Outcome learning | Months 6–10 | Adjust success rates from real data | Sufficient match data |
| Second customer | Months 4–8 | Deploy Hub + tracking at second program | Marshall proof |
| Production system | Months 8–12 | Fast queries, reports, video clip retrieval | Engine validation |

### 12–24 Months

- Expand to 10–25 customers
- Professional club pilots
- Simulation engine (multi-step search)
- Player profiling at scale
- Conference-level opponent modeling

---

## 10. Key Risks

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| **Auto-calibration fails on varied footage** | Medium | High — can't scale without it | Fall back to semi-manual; invest in better keypoint detector; Wyscout API for camera metadata |
| **Tracking loses player identity too often** | Medium | High — data not usable for decisions | Focus on key sequences first; aggressive re-ID; quality thresholds |
| **Physics predictions don't match reality** | Medium | Medium — engine gives bad advice early | Expected — this is why outcome learning exists; iterative improvement |
| **Coaches don't trust AI outputs** | Low–Medium | High — no adoption | Face validity testing first; show video evidence alongside numbers; position as augmentation, not replacement |
| **Competitor builds similar system** | Low–Medium | Medium | First-mover advantage; data moat; program-specific knowledge; patent key innovations |
| **Sales cycle too long for college programs** | Medium | Medium | Lead with Hub (fast value, low risk); reduce friction with pilot pricing |
| **Training data insufficient** | Medium | Medium — poor generalizations | Start with Marshall data; expand carefully; validate on held-out matches |
| **Key person risk** | High (early) | High | Document everything; modular codebase; hire early |

---

## 11. Financial Plan

### Startup Costs (Year 1)

| Category | Cost | Notes |
|----------|------|-------|
| Engineering (primary) | $120K | Salary + benefits, 1 full-time |
| Cloud compute (GPU) | $20K | Development and inference |
| Data and licensing (Wyscout API, tools) | $10K | Access for development |
| Infrastructure (servers, databases) | $15K | Hosting and storage |
| **Total Year 1 Investment** | **$165K** | Before revenue |

### Ongoing Monthly Costs (Operational)

| Item | Monthly Cost |
|------|-------------|
| Cloud compute (inference) | $2K–$5K |
| Data APIs (Wyscout, etc.) | $1K–$2K |
| Infrastructure (servers, storage) | $1K–$2K |
| LLM API (Hub queries) | $500–$2K |
| Tools and licenses | $500 |
| **Total baseline** | **$5K–$11K/month** |

Costs scale with customer count (more inference, more API calls) but gross margin remains 80%+ at target pricing.

### Path to Profitability

| Year | Revenue | Costs | Net |
|------|---------|-------|-----|
| Year 1 | $200K | $230K | –$30K |
| Year 2 | $1.2M | $500K (team growth) | +$700K |
| Year 3 | $4.5M | $1.5M (team + infra) | +$3M |

Breakeven expected in Year 1–2 depending on hiring pace.

---

## 12. Funding

### Current Stage

Pre-seed / seed. Active pilot at Marshall University validating the platform. 36,000+ lines of production code. Working decision engine and tracking pipeline.

### Seed Round Target

**Raising:** $500K

**Use of funds:**

| Allocation | Amount | Purpose |
|-----------|--------|---------|
| Engineering | $300K (60%) | Tracking reliability, outcome learning, simulation engine, Hub refinement |
| Pilot expansion | $100K (20%) | 3–5 additional teams, onboarding, support |
| Sales and marketing | $75K (15%) | Conference presence, demos, content |
| Operations | $25K (5%) | Legal, infrastructure, admin |

**Milestones for seed:**

- Tracking accuracy validated against GPS
- 3+ pilot teams with positive feedback
- First revenue (even small)
- Clear path to Series A metrics (10+ customers, $500K+ ARR)

---

## 13. Team and Hiring

### Current

*[Founder details to be filled in]*

Technical capabilities: ML/computer vision, full-stack engineering, football domain knowledge.

### Key Hires (with funding)

| Role | Priority | Why |
|------|----------|-----|
| ML Engineer | High | Tracking reliability, outcome learning, model training |
| Sales / Business Development | High | College program relationships, conference circuit |
| Football Domain Expert | Medium | Coaching credibility, product direction, face validity |
| Frontend / Product | Medium | Customer-facing interface, dashboard, reports |

---

## 14. Why Now

1. **Tracking technology matured** — YOLOv8, ByteTrack, and transformer models make broadcast-quality tracking feasible for the first time outside elite clubs
2. **Analytics adoption accelerating** — even mid-tier college programs now have data staff and analytics budgets
3. **Event data is commoditized** — everyone has Wyscout; the next edge must come from a different data layer
4. **Decision analysis is the frontier** — coaches know they need this; nobody is selling it as a product
5. **AI/ML infrastructure is cheap** — GPU compute, model training, and deployment are accessible to startups
6. **LLMs enable the Hub** — RAG + vector search makes cross-source intelligence practical without building custom NLP from scratch

---

## 15. Long-Term Vision

**Year 1:** Prove decision-level analysis delivers coaching value. Establish Marshall as a reference customer.

**Year 3:** Standard tool for serious programs. "We use tactical intelligence the way we use GPS tracking."

**Year 5:** Market leader in decision analytics. 200+ teams. The way football understands decisions changes — not "did the pass work" but "was it the right pass given all options."

**Long-term:** Every player gets objective feedback on every decision. Development becomes quantified. Scouting evaluates decision quality, not just physical output. The simulation engine finds optimal tactical sequences no human would discover.

---

## 16. Relationship to Taka Game

Taka Tech and the Taka board game are separate product lines under the same parent. They share a name and a founding insight — that football is fundamentally about decision-making — but they serve different customers, have different business models, and operate on different timelines.

| Dimension | Taka Game | Taka Tech |
|-----------|-----------|-----------|
| Customer | Consumers (players, fans) | Programs and clubs (B2B) |
| Revenue model | DTC + digital subscriptions | B2B SaaS subscriptions |
| Timeline | Near-term launch | Ongoing development |
| Dependencies | Independent | Independent |

**Potential synergies (future, not near-term):**

- The game builds brand recognition in the football tactics community, which includes coaches who are Taka Tech's customers
- Decision engine research may inform game design (balance, meta)
- Football community credibility transfers between products

These synergies are real but secondary. Each product must stand on its own merits.

---

## Summary

- **Problem:** Football analytics is stuck at events; coaches can't evaluate decision quality at scale
- **Solution:** A platform that analyzes every option, evaluates decisions against optimal play, and learns from real outcomes
- **Market:** $260M+ TAM across college and professional football
- **Traction:** 36K+ lines of code, working engine, active D1 pilot
- **Business model:** B2B SaaS, $15K–$150K/year per customer, 80%+ gross margins
- **Moat:** Outcome learning flywheel, program-specific accumulated knowledge, opponent database network effects
- **Ask:** $500K seed to validate tracking, expand pilots, reach first revenue
- **Vision:** Decision analytics becomes the standard — Taka Tech defines the category
