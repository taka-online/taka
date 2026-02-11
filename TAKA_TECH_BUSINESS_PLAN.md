# Taka Tech — Business Plan

*The Stockfish of Football*

---

## Executive Summary

Taka Tech is building the Stockfish of football — a decision engine that thinks about tactics the way chess engines think about positions. Not "what's the best pass right now" but "here's a 5-move sequence that breaks their defensive structure and creates a 0.4 xG chance."

The platform evaluates every decision in a football match: what options existed, what was the expected value of each, what was chosen, and what should have been chosen instead. It learns from real outcomes, adapts to any tactical philosophy, and generates opponent-specific exploitation plans grounded in data.

**The product has two layers:**

1. **Decision Engine** — the core asset. A physics-based tactical analysis system that evaluates game states, generates all available options, learns what actually works from match data, and ultimately searches multi-step sequences to find optimal paths to goal. Eight working modules. 36,000+ lines of production code.

2. **Tracking Layer** — computer vision that extracts player and ball coordinates from any match video, feeding the decision engine continuous spatial data that event-based tools cannot provide.

**Primary market:** Professional football clubs — where margins are thin, player salaries are high, and every tactical edge matters. The analytics staff exists, the budget exists, and the need for decision-level intelligence is acute.

**Validation:** Active pilot with Marshall University Men's Soccer (NCAA Division I) proving the system against real coaching workflows before scaling to professional clubs.

---

## 1. The Problem

Football analytics is stuck at the event level. The entire industry tells coaches *what happened*. Nobody tells them *what should have happened*.

### The Three Layers of Football Data

**Layer 1: Event Data (commoditized)**
Wyscout, Opta, StatsBomb, InStat — pass completed, shot taken, possession percentage, expected goals. Every club has this. Competitive advantage from events alone is gone.

**Layer 2: Tracking Data (emerging, raw)**
Second Spectrum, SkillCorner, Hawkeye — raw player and ball positions over time. Available to well-funded clubs. But tracking data is just coordinates. It requires expensive analyst teams to interpret. Most clubs that buy tracking data underutilize it.

**Layer 3: Decision Intelligence (the gap)**
Nobody answers: **"Given all 22 players on the pitch at this moment, what was the best option, and how does what we did compare?"**

A midfielder completes a pass. Events say: successful. Tracking says: here were the positions. Neither says: there was a through ball to the forward that would have created a 0.31 xG chance, but the midfielder chose a sideways pass worth 0.04 xG. That gap — the decision gap — is what Taka Tech fills.

### Why This Matters to Professional Clubs

| What Clubs Spend On | What They Get | What They Still Can't Do |
|---------------------|---------------|--------------------------|
| Wyscout ($50K+/yr) | Events, scouting database | Evaluate decision quality |
| Tracking ($100K+/yr) | Raw positions | Turn positions into coaching insights |
| Analyst staff ($200K+/yr) | Manual film review | Scale analysis across every moment of every match |
| Coaching ($1M+/yr) | Subjective tactical judgment | Quantify whether game model is being executed |

Clubs invest millions in analytics infrastructure and staff, then manually watch film to answer the questions that matter most. The tools they have are data — not intelligence.

---

## 2. The Decision Engine

The decision engine is Taka Tech's core asset. Everything else — tracking, the Hub, the interface — exists to feed and deliver the engine's analysis.

### What It Does Today

The engine takes player and ball coordinates and produces tactical intelligence through five core modules:

**Module 1: Elimination Calculator**

A defender is *eliminated* when the ball is past them and they cannot reach an effective intervention point before the attack progresses. This is not "goal-side" — it's physics: sprint speed, reaction time, momentum, distance. A defender who looks goal-side but can't intervene in time is eliminated.

Every action can be evaluated by how many defenders it eliminates. A pass that takes out three defenders is quantifiably more valuable than one that takes out one. This is the foundational metric for measuring attacking progress.

**Module 2: Defensive Force Model**

Defensive positioning modeled as an equilibrium of attraction forces: ball attraction (pressing), goal protection, zone coverage, opponent marking, teammate spacing, line compactness, and xG path blocking.

The key insight: **force weights are tunable parameters.** Different teams defend differently:

| Weight Configuration | Defensive Style |
|---------------------|-----------------|
| High ball weight | Aggressive pressing |
| High goal weight | Deep-sitting, compact |
| High opponent weight | Tight man-marking |
| High line weight | Organized block |

Feed the engine an opponent's match data, adjust weights until the model matches their positioning, and you have a mathematical representation of how they defend — which can simulate where they'll be in situations they haven't faced yet.

**Module 3: Game State Evaluator**

Every game state receives a composite score (0–1) across six dimensions:

| Component | Weight | What It Measures |
|-----------|--------|------------------|
| Elimination | 25% | Defenders functionally out of play |
| Proximity | 20% | Distance to goal |
| Angle | 15% | Shooting angle available |
| Density | 15% | Space around the ball |
| Compactness | 10% | Defensive structure integrity |
| Action options | 15% | Forward passing/dribbling options |

This creates an objective score for any position. Compare moments across a match, across a season, or across opponents. Identify precisely why certain attacks succeeded while others stalled.

**Module 4: Option Generation and Evaluation**

For any frame, the engine generates all available actions:

- **Every pass target** — with interception probability using physics (ball travel time vs. defender arrival time, accounting for reaction, acceleration, and reach)
- **Through balls** — where can attackers run, will the ball arrive before defenders, is it offside
- **Dribble options** — time-to-dribble vs. defender close-down speed
- **Shot evaluation** — xG accounting for distance, angle, and shot blocking

Each option is ranked: HIGH_VALUE, SAFE, MODERATE, LOW_VALUE, AVOID. The engine shows the best action and quantifies why.

**Module 5: Block Identification**

Three primary defensive configurations with different characteristics:

| Block | Line Height | Characteristics |
|-------|-------------|-----------------|
| Low | ~12m from goal | Compact, protective, minimal pressing |
| Mid | ~22m from goal | Balanced, controls midfield space |
| High | Near halfway | Aggressive, traps opponents |

For any moment: which block are they in, are they maintaining it, where are the gaps, what triggered a breakdown.

### What the Engine Becomes: The Stockfish Vision

The modules above are the **evaluation function and move generator** — Stockfish's equivalent of scoring positions and enumerating legal moves. What transforms this from an analysis tool into a tactical engine is search and learning.

**Phase 1: Similarity-Based Learning**

A retrieval system that encodes game situations as continuous feature vectors — not discrete zones or formation labels, but behavioral measurements (line height, compactness, press intensity, marking style, shift speed). Find the most similar historical situations. Analyze what actions succeeded.

This is grounded in real data, not simulation. Similar to DeepMind's TacticAI retrieval methodology but applied to open-play decision-making.

```
Situation encoding:
  Defensive: line_height, compactness_v, compactness_h, press_intensity,
             pressure_on_ball, players_behind_ball, marking_style, shift_speed
  Attacking: attackers_ahead, attacking_width, players_in_box, space_ahead
  Ball:      continuous x/y, distance_to_goal, angle_to_goal
  Context:   score_differential, match_time, possession_duration
```

Query: "In situations similar to this, what worked?"
Output: "Switches to the weak side succeeded 65% vs. 45% against average opponents. Central combinations only 28% — their #6 intercepts well."

**Phase 2: Outcome Learning**

Close the gap between physics and reality. The math says a through ball is available. Reality shows that pass gets read 80% of the time against this type of defensive setup. The engine learns actual success rates — not designed rules that might be wrong, but measured outcomes from thousands of real situations.

Over time, the engine builds:

| Learned Knowledge | Source |
|-------------------|--------|
| Pass success rates by situation type | Historical outcome analysis |
| Actual pass speeds and trajectories | Measured from tracking data |
| How defenders actually react after each action type | Tracked defensive movement |
| Player-specific tendencies and capabilities | Aggregated individual data |
| Opponent-specific vulnerabilities | Their match data filtered |

**Phase 3: Multi-Step Search (The Goal)**

The simulation engine. Not fixed-depth lookahead — variable-depth tree exploration:

```
Ball reception moment
     │
     ├── Pass to Player A
     │      ├── A shoots → evaluate xG ← STOP
     │      ├── A passes to B
     │      │     ├── B shoots → evaluate xG ← STOP
     │      │     └── B dribbles → keep exploring
     │      └── A loses ball ← STOP
     │
     ├── Pass to Player B (promising)
     │      └── ... ← go DEEP on this branch
     │
     ├── Dribble into pressure
     │      └── ... ← PRUNE early (low value)
     │
     └── Shot → evaluate xG ← STOP
```

Smart allocation of compute: go deep on promising branches, prune bad ones early, stop when too far from known patterns. Return the path with highest expected value.

**Why this is different from Google Research Football (which failed):**

| Google Approach | Taka Approach |
|----------------|---------------|
| Designed physics engine | Learned physics from real data |
| Agents learn from scratch | Agents use learned human patterns |
| Sim-to-real gap (simulation ≠ reality) | No gap — simulation IS compressed reality |
| Sparse reward (goals only) | Dense signal from learned state values |
| No validation against real football | Validated against real outcomes |

**What multi-step search enables:**

| Capability | Example |
|------------|---------|
| Tactical plan generation | "Against their low block, here's a 4-move sequence that creates a 2v1 on the weak side with 0.28 xG" |
| Opponent exploitation | "Their RCB is slow to recover. Target that channel with diagonal runs. Success rate: 40% progression" |
| Counterfactual analysis | "What if you'd passed left instead? Here's what the search tree shows" |
| Novel tactic discovery | Search finds high-value sequences humans haven't tried |
| Squad optimization | "With Player X at #8, buildup success increases 12% because of his carrying ability" |
| Decision quality scoring | Compare chosen action vs. best action from search — per player, per match, over time |

---

## 3. The Tracking Layer

The decision engine needs coordinates. The tracking layer creates them from any video source.

### Current Capabilities

| Component | Technology | Status |
|-----------|-----------|--------|
| Player detection | YOLOv8 + DETR (transformer) | Working |
| Ball detection | Specialized detector with temporal consistency | Working |
| Team classification | K-means jersey color clustering | Working |
| Multi-object tracking | ByteTrack via Supervision | Working |
| Pitch calibration | OpenCV homography (manual + auto) | Manual working; auto needs validation |
| Physical metrics | Speed, distance, acceleration, sprints | Working |
| Player re-identification | OSNet embeddings | Built, needs testing |
| 3D ball tracking | LSTM with Kalman filtering | Built, needs training |
| Trajectory prediction | Baller2Vec transformer | Built, needs weights |

### Why Build Tracking Instead of Buying

SkillCorner and Second Spectrum sell tracking data. But:

1. **Cost** — tracking data subscriptions are $100K+/year per league. Owning the tracking layer eliminates this dependency.
2. **Coverage** — commercial tracking covers top leagues only. Taka's tracking works on any video, including college, lower leagues, and tactical cameras.
3. **Control** — when tracking feeds the decision engine directly, the pipeline is optimized end-to-end. No format conversion, no latency, no dependency on third-party release schedules.
4. **Data ownership** — proprietary tracking data is a moat component, not a cost center.

For professional clubs that already have tracking data from other providers, Taka Tech can ingest their existing data directly — the decision engine is data-source agnostic.

---

## 4. Value Delivery for Professional Clubs

### Pre-Match: Opponent Intelligence

Feed the engine an opponent's last 8–10 matches. It learns their specific patterns:

| What the Engine Learns | Example Output |
|------------------------|----------------|
| Defensive weaknesses | "Against quick switches, their LB takes 2.8s to recover vs. league average 2.1s — target that channel" |
| High-value actions | "Through balls into their left channel succeed 55% vs. 35% on the right — their LCB is slow to drop" |
| Pressing triggers | "They press when ball goes back to GK but leave massive gaps when ball goes wide" |
| Shape vulnerabilities | "Gap between CM and RB opens when ball is on opposite wing" |
| Recovery patterns | "After losing possession, they take 4.2s to reform vs. average 3.1s — we have a transition window" |

Pre-match report auto-generated: specific, actionable, grounded in data. Not "they defend deep" — "in this exact situation type, this specific action works X% of the time against them."

### In-Match: Real-Time Decision Support

As the engine matures toward real-time capability:
- "They've shifted to 5-3-2. Switch to wide overloads — expected value increases from 0.15 to 0.24"
- "Their #4 is fatiguing. Target his channel — close-down speed dropped 15% since the 60th minute"

Performance target: < 2 seconds for real-time suggestions.

### Post-Match: Decision Analysis

For any chance created or conceded:
- What options existed at each decision point
- Which option had the highest expected value
- What was actually chosen, and what was the xG difference
- Player-by-player decision quality scores

"We created 2.3 xG. Engine analysis says optimal play would have produced 3.1 xG. Here are the 8 moments where higher-value options were available."

### Player Development

- Objective measurement of decision quality over time
- "Player A chooses the highest-value option 72% of the time — up from 61% in August"
- Compare player decisions against engine-optimal: where do they consistently leave value on the table?
- Position-specific development: "Your through ball recognition is elite. Your switch-of-play timing costs 0.08 xG per match on average."

### Recruitment and Scouting

Run a prospect's film through the engine without needing their GPS data:
- Extract physical metrics from video: sprint speed, acceleration, recovery run patterns, work rate
- Evaluate decision-making: "This prospect chooses the highest-xG option 68% of the time in transition — top 5% in his league"
- Compare profiles directly: "He's faster than our current starter but his pass accuracy under pressure is 12% lower"
- Player profiling: physical, technical, and decision-making attributes from video alone

### Game Model Accountability

Define your tactical philosophy. The engine measures execution:
- "Are we actually pressing the way we train?"
- "In BGZ buildups with this defensive shape, we're supposed to switch — we do it 45% of the time"
- "Breakdown at 34:22 — #6 had the switch available (0.15 xG higher) but played central"

Objective, quantifiable, traceable across the season. The subjective question "are we playing our way?" becomes a measurable metric.

---

## 5. Market Opportunity

### Primary Market: Professional Clubs

| Segment | Size | Analytics Budget | Taka Tech Pricing |
|---------|------|-----------------|-------------------|
| Big 5 European leagues | ~100 clubs | $200K–$1M+ | $100K–$250K/year |
| MLS, Liga MX, top Americas | ~80 clubs | $100K–$500K | $75K–$150K/year |
| English Championship, 2nd-tier European | ~200 clubs | $50K–$200K | $50K–$100K/year |
| 3rd-tier European, USL, other professional | ~500 clubs | $25K–$100K | $25K–$75K/year |
| Lower professional leagues | ~2,500+ clubs | $10K–$50K | $15K–$50K/year |

**Why professional clubs are the primary market:**
- Analytics budgets already exist — this is not creating a new budget line, it's competing for allocation within established spend
- Margins are razor-thin at the top — a tactical edge that produces one more win per season justifies six-figure spend
- Analyst staff are already in place — they can evaluate and adopt sophisticated tools
- Player salaries dwarf analytics costs — $75K/year for better decisions on $50M+ payroll is trivial
- Coaching pressure is intense — clubs fire managers after 10 poor results; anything that improves decisions is valuable

### Secondary Market: College Programs

| Segment | Size | Budget Range |
|---------|------|-------------|
| Power 4 + top programs | ~80 | $50K–$200K |
| Competitive D1 | ~120 | $20K–$75K |
| Remaining D1 (men + women) | ~670 | $5K–$30K |

College programs serve as validation and entry market. Marshall University (D1, Sun Belt) is the current pilot. College provides faster iteration cycles, direct coaching access, and case studies that support professional sales.

### Tertiary Market: Academies

- 200+ professional club academies
- 1,000+ elite youth clubs
- Scaled product at $5K–$15K/year
- Natural land-and-expand from parent club adoption

### Total Addressable Market

| Segment | Addressable Clubs | Avg. Price | TAM |
|---------|-------------------|-----------|-----|
| Professional (global) | ~3,400 | $75K | $255M |
| NCAA D1 (men + women) | ~540 | $30K | $16M |
| Academies + elite youth | ~1,200 | $10K | $12M |
| **Total** | | | **~$283M** |

The broader sports analytics market is estimated in the low billions globally. Football commands the largest share.

---

## 6. Competitive Landscape

### Current Tools

| Company | What They Sell | Why It's Not Enough |
|---------|---------------|-------------------|
| **Hudl** | Video platform, tagging | No spatial analysis, no decision evaluation |
| **Wyscout** | Event database, scouting | Events only — "pass completed" not "was it the right pass" |
| **StatsBomb** | Advanced event metrics (xG, xA, OBV) | Still event-level; requires analyst interpretation |
| **Second Spectrum** | Tracking data | Raw data — positions without intelligence |
| **SkillCorner** | Broadcast tracking | Data provider, not insight provider |
| **Opta / InStat** | Event data, match stats | No spatial analysis, no decision evaluation |

### Where Taka Tech Sits

| Dimension | Event Tools | Tracking Providers | Taka Tech |
|-----------|-----------|-------------------|-----------|
| What it answers | "What happened?" | "Where were players?" | "What should have happened?" |
| Granularity | Match/player aggregates | Position streams | Moment-specific, option-by-option |
| Adaptation | Generic metrics | Generic coordinates | Adapts to team's tactical philosophy |
| Learning | Static | Static | Learns from each team's real outcomes |
| Output | Data for analysts | Data for analysts | Coaching recommendations with evidence |

### Potential Future Competitors

**DeepMind / TacticAI** — published research on corner kick optimization using retrieval-based methods. Similar conceptual approach to our similarity engine. Risk: Google could productize. Mitigation: TacticAI covers set pieces only; Taka covers open play. Google has no distribution in football coaching. Research ≠ product.

**StatsBomb + tracking** — StatsBomb acquired tracking capabilities. Could move toward decision analysis. Mitigation: their DNA is event data and metrics, not simulation and search. Different technical architecture.

**Club in-house teams** — top clubs (Liverpool, Man City, Brentford) build internal analytics. Risk: they build what we sell. Mitigation: in-house teams serve one club; Taka serves hundreds. Network effects and data flywheel advantages compound with scale.

### Defensibility

| Moat Layer | How It Compounds |
|------------|-----------------|
| Outcome learning | More games → better predictions → more value → more adoption → more data |
| Opponent database | More clubs in ecosystem → richer intelligence on every opponent |
| Situation database | Every match adds to the similarity library — 10,000 matches >> 100 matches |
| Team-specific learning | Each club's accumulated seasons of data create switching costs |
| Pattern discovery | Engine finds sequences humans miss → becomes indispensable |

---

## 7. Business Model

### Subscription Tiers

| Tier | Price/Year | Target Customer | Includes |
|------|-----------|-----------------|----------|
| **Starter** | $25,000 | Lower-league professional, D1 college | Post-match decision analysis, 30 games/season, team-level insights |
| **Professional** | $75,000 | Mid-tier professional, top college | All matches, player-level reports, opponent modeling, pre-match intelligence |
| **Elite** | $150,000 | Top-league professional | Real-time analysis, simulation engine, custom integrations, dedicated support, full opponent database access |

### Why This Pricing Works

- **Starter** replaces 20+ hours/week of manual film review and provides insights manual review cannot produce. At $25K, it's less than a junior analyst's salary.
- **Professional** generates opponent-specific game plans that would take an analyst team days to produce manually. At $75K, it's a fraction of a single player's weekly salary at Championship level.
- **Elite** provides tactical capabilities no human staff can match — multi-step search, real-time suggestions, continuous simulation. At $150K, it's less than 0.1% of a Premier League squad's wage bill.

### Unit Economics

| Metric | Estimate |
|--------|----------|
| CAC | $15K–$30K (pilot program + 2–3 month sales cycle) |
| ACV | $75K (blended across tiers) |
| LTV | $300K+ (4+ year retention at professional level) |
| Gross margin | 80%+ |
| Payback period | < 6 months |
| Net revenue retention | 120%+ (tier upgrades + expanded usage) |

### Revenue Projections

| Year | Pro Clubs | College | Total Customers | Avg. ACV | ARR |
|------|-----------|---------|-----------------|----------|-----|
| Year 1 | 2 | 5 | 7 | $35K | $250K |
| Year 2 | 12 | 15 | 27 | $55K | $1.5M |
| Year 3 | 40 | 25 | 65 | $70K | $4.5M |
| Year 5 | 120 | 60 | 180 | $85K | $15M |

Year 1 is pilot-heavy (lower ACV). As the product matures and simulation capabilities come online, average ACV increases through tier upgrades and new customers entering at higher tiers.

---

## 8. Go-to-Market Strategy

### Phase 1: Validate at Marshall (Months 1–6)

**Objective:** Prove the decision engine delivers value coaches act on. Build a case study.

**Why Marshall:**
- Active pilot, direct coaching access, existing relationship
- Division I credibility
- Access to Wyscout + GPS for validation
- Fast iteration cycles (weekly coaching touchpoints)

**Success criteria:**
- Engine flags the same moments coaches identify on film (face validity)
- Tracking position error < 2m vs. GPS ground truth
- Coaching staff uses engine outputs in game preparation at least weekly
- Documented instances where engine insights influenced tactical decisions
- Case study and testimonials ready for external use

### Phase 2: First Professional Pilots (Months 6–12)

**Objective:** Prove the product works in professional environments. Establish pricing reality.

**Target: 2–3 professional clubs (MLS, USL, English lower leagues)**

Why these levels:
- Large enough budgets to pay real prices ($50K+)
- Sophisticated enough to evaluate the product rigorously
- Accessible enough to establish direct coaching relationships
- Media visibility that validates the product for larger clubs

**Sales approach:**
- Case study from Marshall + demo of opponent analysis on the prospect's actual upcoming fixture
- Pilot pricing: reduced first year in exchange for feedback and testimonial rights
- Target analytics directors and head coaches directly — not IT departments

**Parallel: 5–10 additional college programs**
- Expand via coaching networks from Marshall
- Conference presentations (United Soccer Coaches convention)
- Hub-only tier for programs that need immediate value before engine matures

### Phase 3: Scale Professional (Year 2–3)

**Objective:** Become the standard decision intelligence platform for professional clubs.

**Target: Championship, Bundesliga 2, Serie B, Ligue 2, MLS**

**Approach:**
- League and conference packages (network effects: more clubs in ecosystem = better opponent intelligence for everyone)
- Coach advisory board from Phase 1–2 customers driving credibility
- Annual contract renewals with upsell to higher tiers as simulation engine launches
- Analyst community building: let analytics staff become advocates

### Phase 4: Top Leagues and International (Year 3+)

**Target: Big 5 leagues, international expansion**

By this point:
- Simulation engine is operational (multi-step search)
- Opponent database covers major leagues
- Product is validated by 50+ professional clubs
- Premium tier ($150K+) justified by simulation capabilities no competitor offers

---

## 9. Technical Architecture

### System Overview

```
VIDEO INPUT
(Broadcast, Wyscout, tactical cam, or third-party tracking data)
     │
     ▼
┌──────────────────────────────────────────────┐
│              TRACKING LAYER                   │
│  Detection:   YOLOv8 + DETR transformer      │
│  Tracking:    ByteTrack multi-object          │
│  Calibration: Homography (manual + auto)      │
│  Identity:    OSNet re-identification         │
│  Output:      22 players + ball, x/y meters   │
└──────────────────────────────────────────────┘
     │
     ▼
┌──────────────────────────────────────────────┐
│           FEATURE EXTRACTION                  │
│  Defensive: line height, compactness,         │
│    press intensity, marking style, shift      │
│  Attacking: width, depth, box presence        │
│  Ball: continuous position, distance, angle   │
│  Context: score, time, possession duration    │
└──────────────────────────────────────────────┘
     │
     ▼
┌──────────────────────────────────────────────┐
│            DECISION ENGINE                    │
│                                               │
│  ┌─ Elimination Calculator                    │
│  ├─ Defensive Force Model                     │
│  ├─ Game State Evaluator                      │
│  ├─ Option Generator + Evaluator              │
│  ├─ Block Identifier                          │
│  ├─ Similarity Engine (Phase 2)               │
│  ├─ Outcome Learning (Phase 3)                │
│  └─ Simulation Search (Phase 4)               │
│                                               │
│  Inputs: coordinates                          │
│  Outputs: scores, options, recommendations,   │
│           sequences, opponent profiles         │
└──────────────────────────────────────────────┘
     │
     ▼
┌──────────────────────────────────────────────┐
│              OUTPUT LAYER                     │
│                                               │
│  Pre-match:   Opponent intelligence reports   │
│  Post-match:  Decision analysis, player scores│
│  Real-time:   Tactical suggestions            │
│  Development: Player decision quality trends  │
│  Scouting:    Prospect evaluation from video  │
└──────────────────────────────────────────────┘
```

### Technology Stack

| Component | Technology |
|-----------|-----------|
| Detection | YOLOv8 + DETR transformer |
| Tracking | ByteTrack via Supervision |
| Calibration | OpenCV + RANSAC + HRNet keypoint detection |
| Re-identification | OSNet embeddings |
| 3D Ball Tracking | LSTM with Kalman filtering |
| Trajectory prediction | Baller2Vec transformer |
| Decision engine | PyTorch, custom physics + similarity models |
| Intelligence Hub | RAG with vector database + LLM |
| Search (future) | Monte Carlo Tree Search (MCTS) |
| Backend | Express.js (Bun runtime), PostgreSQL, Prisma |

### Codebase

- **36,000+ lines** of production Python
- Modular architecture across detection, tracking, calibration, decision engine, and training infrastructure
- ~5,000 lines of training code covering 6 model types
- Comprehensive build plans and technical specifications

---

## 10. Development Roadmap

### What's Built

| Component | Status |
|-----------|--------|
| Player/ball detection pipeline | Working |
| Multi-object tracking (ByteTrack) | Working |
| Manual pitch calibration | Working |
| Physical metrics extraction | Working |
| Decision engine: 5 core modules | Working |
| Interactive tactical analysis UI | Working |
| Auto-calibration architecture | Built, needs validation |
| Player re-ID, 3D ball, trajectory prediction | Built, need training/testing |
| Training infrastructure (6 model types) | Built |
| Marshall pilot | Active |

### Development Phases

| Phase | Timeframe | What Ships | What It Enables |
|-------|-----------|-----------|-----------------|
| **Tracking validation** | Months 1–3 | Confirmed accuracy vs. GPS; auto-calibration on Wyscout footage | Reliable spatial data for decision engine |
| **Similarity engine** | Months 3–6 | Situation database with 1,000+ possessions; retrieval + outcome analysis | "In similar situations, what worked?" |
| **Outcome learning** | Months 4–8 | Learned success rates from real data; skill-adjusted patterns | Physics → reality; engine stops guessing |
| **Production system** | Months 6–10 | Fast queries (<1s), video clip retrieval, pre/post-match reports | Saleable product for professional clubs |
| **Pattern library** | Months 8–12 | Attacking combinations (overlap, third-man, switch) + defensive vulnerabilities | Engine guided search, not blind search |
| **Player profiles** | Months 8–14 | Physical, technical, mental attributes per player from tracking data | Realistic simulation; recruitment evaluation |
| **Opponent modeling** | Months 10–16 | Feed opponent matches → learn their patterns → generate exploitation plans | Pre-match tactical plans from engine, not just analysts |
| **Simulation engine** | Months 12–20 | Multi-step MCTS search; variable-depth tree exploration | The Stockfish moment: engine finds sequences humans miss |

### What Each Phase Builds Toward Simulation

| Phase | What We Learn | How It Powers Search |
|-------|---------------|---------------------|
| Similarity engine | Core features work; situations can be matched | Defines state representation |
| Outcome learning | Actual success rates, not physics guesses | Accurate branch evaluation |
| Pattern library | Known good sequences, known vulnerabilities | Opening book for guided search |
| Player profiles | What each player can actually execute | Realistic simulation constraints |
| Opponent modeling | How specific defenses react | Opponent-specific search trees |
| Simulation engine | All of the above combined | Full tactical search and planning |

---

## 11. Key Risks

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| **Auto-calibration fails on varied footage** | Medium | High | Semi-manual fallback; invest in better keypoint model; accept tracking data from third parties |
| **Tracking loses player identity** | Medium | High | Focus on key sequences (not full 90'); aggressive re-ID; for clubs with existing tracking data, bypass entirely |
| **Physics predictions don't match reality** | Medium | Medium | Expected and planned for — entire Phase 2–3 exists to close this gap |
| **Professional clubs won't buy from a startup** | Medium | High | Marshall case study; pilot pricing; coach advisory board; start with lower leagues and work up |
| **Sales cycle too long** | Medium | Medium | Hub as fast-value wedge ($25K, 4–6 week deployment); reduce risk for buyer |
| **Competitor builds similar system** | Low–Medium | Medium | First-mover; data flywheel; 36K lines head start; network effects in opponent database |
| **Coaches don't trust AI** | Low–Medium | High | Position as augmentation not replacement; show video evidence alongside every recommendation; face validity testing |
| **Search complexity too high for real-time** | Medium | Medium | Pre-compute common situations; shallow search for real-time, deep search for pre-match; cloud GPU for heavy analysis |
| **Key person risk** | High (early) | High | Documented architecture; modular codebase; hire ML engineer early |

---

## 12. Financial Plan

### Year 1 Costs

| Category | Cost | Notes |
|----------|------|-------|
| Engineering (primary developer) | $120K | Full-time |
| Cloud compute (GPU training + inference) | $25K | Scales with usage |
| Data access (Wyscout API, tracking data) | $15K | Development access |
| Infrastructure (servers, DB, storage) | $15K | Baseline hosting |
| Sales (conferences, travel, demos) | $20K | United Soccer Coaches, analyst conferences |
| Legal and admin | $5K | Contracts, IP |
| **Total Year 1** | **$200K** | Before revenue |

### Monthly Run Rate (Operational)

| Item | Monthly Cost |
|------|-------------|
| Cloud compute (inference serving) | $3K–$8K |
| Data APIs | $1K–$3K |
| Infrastructure | $1K–$3K |
| LLM API (Hub queries) | $500–$2K |
| Tools and licenses | $500 |
| **Total baseline** | **$6K–$16K/month** |

Scales with customer count but gross margin remains 80%+ at target pricing.

### Path to Profitability

| Year | Revenue | Total Costs | Net | Headcount |
|------|---------|-------------|-----|-----------|
| Year 1 | $250K | $280K | –$30K | 1–2 |
| Year 2 | $1.5M | $650K | +$850K | 3–5 |
| Year 3 | $4.5M | $1.8M | +$2.7M | 8–12 |
| Year 5 | $15M | $5M | +$10M | 20–30 |

Cash-flow positive by end of Year 1 / early Year 2 depending on hiring pace.

---

## 13. Funding

### Current Stage

Pre-seed. Active D1 pilot. 36,000+ lines of production code. Working decision engine with five core modules. Tracking pipeline operational.

### Seed Round

**Target raise:** $500K

| Allocation | Amount | Purpose |
|-----------|--------|---------|
| Engineering (60%) | $300K | ML engineer hire; tracking reliability; outcome learning; similarity engine |
| Pilot expansion (20%) | $100K | 2–3 professional club pilots + 5 college programs; onboarding and support |
| Sales + marketing (15%) | $75K | Conference circuit; analyst community; demo infrastructure |
| Operations (5%) | $25K | Legal, IP protection, infrastructure, admin |

**Milestones this round funds:**

1. Tracking accuracy validated against GPS ground truth
2. Similarity engine operational with 1,000+ possession database
3. 2+ professional club pilots with positive coaching feedback
4. First $500K+ in contracted ARR
5. Outcome learning producing measurably better recommendations than physics alone
6. Series A ready: 10+ customers, proven product-market fit, clear scaling path

---

## 14. Team

### Current

Technical capabilities: ML/computer vision, full-stack engineering, football domain expertise.

### Key Hires

| Role | Priority | Why |
|------|----------|-----|
| ML Engineer | Critical | Tracking reliability, similarity engine, outcome learning, model training |
| Sales / BD (football network) | Critical | Professional club relationships, conference circuit, pilot management |
| Football Domain Expert | High | Coaching credibility with professional staff; product direction; face validity |
| Frontend / Product Engineer | High | Customer-facing dashboards, report generation, query interface |

---

## 15. Why Now

1. **Tracking technology matured** — YOLOv8, ByteTrack, DETR make broadcast-quality tracking feasible outside elite clubs for the first time
2. **Event data is fully commoditized** — Wyscout is universal; the next edge must come from a different data layer
3. **Decision analysis is the acknowledged frontier** — coaches and analysts know this is what's needed; nobody is selling it
4. **Professional club analytics spend is accelerating** — Championship clubs now employ 3–5 analysts; even League One has data staff
5. **Player salaries make analytics trivial by comparison** — $75K/year for better decisions on a $20M+ wage bill is obvious ROI
6. **AI/ML infrastructure is accessible** — GPU compute, model training, LLMs for Hub — all available to startups at manageable cost
7. **TacticAI proved the concept** — DeepMind's research validated similarity-based tactical retrieval; Taka is building the product

---

## 16. Long-Term Vision

**Year 1:** Prove decision-level analysis delivers coaching value. Marshall reference customer. First professional pilots.

**Year 3:** Standard tool for serious clubs. Outcome learning producing insights no human analysis can match. "We use decision intelligence the way we use GPS tracking."

**Year 5:** 180+ clubs. Simulation engine operational. Engine generates pre-match tactical plans and finds exploitation sequences. Decision quality scoring transforms player development and scouting.

**Long-term:** The engine changes how football understands tactics. Not "did the pass work" but "was it the right pass given all options." Every player gets objective feedback on every decision. Scouting evaluates decision quality, not just physical output. The simulation engine discovers novel tactical sequences — attacking combinations and defensive structures that human coaches haven't imagined.

This is the Stockfish of football. The engine that thinks ahead, learns from reality, and gets smarter with every match it analyzes.

---

## 17. Relationship to Taka Game

Taka Tech and the Taka board game are separate product lines under the same parent. They share a founding insight — football is fundamentally about decisions — but serve different customers with different models.

| Dimension | Taka Game | Taka Tech |
|-----------|-----------|-----------|
| Customer | Consumers (players, fans, coaches) | Professional clubs and programs (B2B) |
| Revenue | DTC sales + digital subscriptions | B2B SaaS subscriptions |
| Core value | Competitive tactical entertainment | Coaching intelligence and tactical edge |
| Dependencies | Independent | Independent |

The game builds brand recognition in the football tactics community, which includes coaches and analysts who are Taka Tech's buyers. Decision engine research may inform game balance and meta-development. These synergies are real but secondary — each product stands on its own.

---

## Summary

**The problem:** Football analytics answers "what happened" but not "what should have happened." Decision quality — the thing that actually determines match outcomes — is unmeasured.

**The product:** A decision engine that evaluates every option, learns what works from real data, and ultimately searches multi-step sequences to find optimal tactical paths. The Stockfish of football.

**The market:** $283M+ TAM. Professional clubs are the primary customer — they have the budgets, the analyst staff, and the acute need for tactical edge.

**The traction:** 36K+ lines of production code. Five working engine modules. Active D1 pilot. Tracking pipeline operational.

**The moat:** Outcome learning flywheel. Opponent database network effects. Situation library that compounds with every match analyzed.

**The model:** B2B SaaS, $25K–$150K/year, 80%+ gross margins, < 6 month payback.

**The ask:** $500K seed to validate tracking, build similarity engine, land professional pilots, reach $500K+ ARR.

**The vision:** Decision analytics becomes the standard. Taka Tech defines the category.
