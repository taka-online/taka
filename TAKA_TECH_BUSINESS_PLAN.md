# Taka Tech — Business Plan

*The Stockfish of Football*

---

## Executive Summary

Taka Tech is building the Stockfish of football — an engine that thinks about tactics the way chess engines think about positions.

Not "what's the best pass right now" — but "here's a 5-move sequence that breaks their defensive structure and creates a 0.4 xG chance." Not "this player made a good decision" — but "given these 11 players against those 11 players, here's the optimal way to attack, and here's exactly how to execute it."

The goal: generate tactical plans that humans haven't thought of. Find combinations that exploit specific opponent weaknesses. Optimize how player profiles work together. Be right more often than the best tactical minds in the sport.

**Primary market:** Professional football clubs — where margins are thin, player salaries are high, and every tactical edge matters.

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

## 2. The Vision: A Football Engine That Thinks Ahead

Chess engines didn't beat humans through brute force alone. They combined:

1. **Position evaluation** — objectively score any board state
2. **Move generation** — know all legal options
3. **Search** — simulate many moves ahead, prune bad lines
4. **Learning** — improve evaluation through training on millions of games

Football has the same structure. Positions can be evaluated. Options can be generated. Sequences can be simulated. Outcomes can be learned. The difference is that chess is turn-based with perfect information, while football is continuous with 22 agents acting simultaneously.

**But that's a complexity problem, not an impossibility.** We discretize time into decision points. We model defensive responses probabilistically. We use the same search principles, adapted for a continuous domain.

### What the Engine Will Do

Given any game state — 22 players, a ball, a context — the engine:

1. **Evaluates the position** — how advantageous is this for the attacking team, measured across elimination of defenders, proximity to goal, shooting angle, space, defensive structure, and available actions

2. **Generates all options** — every pass target with interception probability, through ball opportunities, dribble lanes, shooting angles. Each option ranked by expected value.

3. **Searches ahead** — if we play this pass, the defense shifts. That opens the weak side. A switch creates a 2v1. The cross has 0.35 xG. Variable-depth tree exploration — go deep on promising branches, prune bad ones early, stop when too far from known patterns.

4. **Learns from reality** — physics says a through ball is available, but in similar situations it gets read 80% of the time. The engine learns actual success rates from thousands of real matches — not designed rules that might be wrong, but measured outcomes.

5. **Models opponents specifically** — feed it their last 10 matches. It learns exactly how they defend: their LB takes 2.8s to recover on switches vs. league average 2.1s. Their pressing triggers. Their shape vulnerabilities. Their recovery patterns. Then it searches for sequences that exploit those specific weaknesses.

6. **Generates tactical plans** — "Against their low block, here's a 4-move sequence that creates a 2v1 on the weak side with 0.28 xG." Not general advice — specific action sequences with specific expected values for specific opponents.

### How Search Works

Not fixed-depth lookahead. Variable-depth tree exploration:

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

Smart allocation of compute: go deep on promising branches, prune bad ones early, stop when too far from known patterns. Return the path with highest expected value of reaching a scoring position.

This is Monte Carlo Tree Search — the same approach behind AlphaGo — adapted for football's continuous state space.

### Why This Is Different From Google Research Football (Which Failed)

| Google Approach | Taka Approach |
|----------------|---------------|
| Designed physics engine | Learned physics from real data |
| Agents learn from scratch | Agents use learned human patterns as reference |
| Sim-to-real gap (simulation ≠ reality) | No gap — simulation IS compressed reality |
| Sparse reward (goals only) | Dense signal from learned state values |
| No validation against real football | Validated against real outcomes |

Google built a simulation and hoped agents would discover football. We learn how football actually works from tracking data, then use that knowledge to simulate and search. The simulation rules aren't designed — they're measured.

---

## 3. The Architecture

### Two Layers

**Layer 1: Tracking (Data Creation)**
Computer vision extracts player and ball coordinates from any video source — broadcast, Wyscout, tactical camera. Detection, multi-object tracking, pitch calibration, team classification, player re-identification. Output: 22 players + ball, x/y in meters, every frame.

For clubs that already have tracking data from Second Spectrum or SkillCorner, the engine ingests their data directly. The decision engine is data-source agnostic.

**Layer 2: Decision Engine (Intelligence)**
Converts coordinates into tactical intelligence through a modular system:

```
COORDINATES (22 players + ball)
     │
     ▼
┌──────────────────────────────────────────────┐
│           FEATURE EXTRACTION                  │
│  Defensive: line height, compactness,         │
│    press intensity, marking style, shift      │
│    speed, recovery tendency                   │
│  Attacking: width, depth, box presence,       │
│    central overload, space ahead              │
│  Ball: continuous position, goal distance,    │
│    goal angle                                 │
│  Context: score, time, possession duration    │
└──────────────────────────────────────────────┘
     │
     ▼
┌──────────────────────────────────────────────┐
│            DECISION ENGINE                    │
│                                               │
│  Elimination Calculator                       │
│    Which defenders are functionally out of    │
│    play — not just goal-side, but can they    │
│    reach an intervention point in time?       │
│    Physics: sprint speed, reaction time,      │
│    momentum, distance.                        │
│                                               │
│  Defensive Force Model                        │
│    Positioning as equilibrium of forces:      │
│    ball attraction, goal protection, zone     │
│    coverage, marking, spacing, compactness,   │
│    xG path blocking. Tunable weights model    │
│    any defensive style. Feed opponent data,   │
│    match their patterns mathematically.       │
│                                               │
│  Game State Evaluator                         │
│    Composite 0–1 score: elimination (25%),    │
│    proximity (20%), angle (15%), density       │
│    (15%), compactness (10%), actions (15%).    │
│    Compare any two moments objectively.       │
│                                               │
│  Option Generator                             │
│    Every pass, through ball, dribble, shot    │
│    with interception probability and          │
│    expected value. Ranked and explained.      │
│                                               │
│  Similarity Engine                            │
│    Encode situations as continuous vectors.    │
│    Find similar historical moments. Analyze   │
│    what worked. Learn real success rates.      │
│                                               │
│  Simulation Search                            │
│    MCTS: explore action sequences, prune      │
│    bad branches, go deep on promising ones.   │
│    Variable depth. Learned transitions.       │
│    Find optimal paths to scoring positions.   │
│                                               │
│  Pattern Library                              │
│    Overlap, underlap, third-man, switch,      │
│    give-and-go. Low block exploits, high      │
│    line exploits, man-marking exploits.       │
│    Guide search toward known good sequences.  │
│                                               │
│  Player Profile Engine                        │
│    Physical: speed, acceleration, stamina.    │
│    Technical: pass range, first touch, shot.  │
│    Mental: decision speed, off-ball IQ.       │
│    Realistic simulation constraints.          │
│                                               │
│  Opponent Model                               │
│    Learn their defensive patterns from        │
│    match data. Pressing triggers, shape       │
│    vulnerabilities, recovery weaknesses.      │
│    Generate exploitation plans.               │
└──────────────────────────────────────────────┘
     │
     ▼
┌──────────────────────────────────────────────┐
│              OUTPUTS                          │
│                                               │
│  Pre-match:  Opponent exploitation plans —    │
│    specific sequences targeting specific      │
│    weaknesses with expected values            │
│                                               │
│  Post-match: Decision analysis — every        │
│    option at every moment, what was chosen    │
│    vs what was optimal, player-by-player      │
│                                               │
│  Real-time:  Tactical suggestions — "they've  │
│    shifted to 5-3-2, switch to wide           │
│    overloads, EV increases 0.15 to 0.24"      │
│                                               │
│  Development: Decision quality scores per     │
│    player tracked over time                   │
│                                               │
│  Scouting: Prospect decision quality and      │
│    physical metrics extracted from video       │
│                                               │
│  Squad optimization: "With Player X at #8,    │
│    buildup success increases 12%"             │
└──────────────────────────────────────────────┘
```

### The Learning Approach: Reality First, Then Simulate

We don't design simulation rules and hope they match reality. We learn how football actually works from tracking data, then use that knowledge to power the simulation.

```
Phase 1-4: Learn from real matches
           ↓
           "In situations like this, passes to the wing succeed 65%"
           "Defenders typically react by shifting this direction"
           "This type of dribble works against high pressure"
           ↓
Phase 5:   Use learned patterns as simulation rules
           ↓
           Search for optimal sequences through simulation
```

**Situation encoding uses continuous features, not categories.** Formation labels are imprecise — "4-4-2" means many different things. Zone boundaries are arbitrary — a ball 1m apart gets different labels. Instead, we measure actual defensive behavior: line height in meters, compactness as distance between lines, press intensity as closing speed, marking style as correlation between defender and attacker movement.

Similarity matching on these continuous features finds meaningful tactical matches without arbitrary categorization. A situation with ball at 35m and 36m is naturally similar — no zone boundary to cross.

**The learning compounds:**

| What We Learn | How It Powers Search |
|---------------|---------------------|
| Pass success rates by situation type | Accurate branch evaluation during tree search |
| How defenders actually react after actions | Realistic state transitions in simulation |
| Player-specific capabilities and tendencies | Constraints on what's executable |
| Opponent-specific vulnerabilities | Opponent-tuned search trees |
| Known good attacking sequences | Opening book that guides search |

Every match analyzed makes the engine smarter. 10,000 matches >> 100 matches.

### Philosophy: Structure Before Talent

The base model treats all players as physically equal — same speed, same reaction time, no fatigue. This is intentional. **Understand structure before layering in talent.**

If positioning fails when everyone's equal, it will fail when talent is added. Talent is a modifier on top of sound structure, not a replacement for it. This also identifies whether breakdowns are positional (fixable through coaching) or physical (need different personnel).

Player profiles layer on top: once we know the structural answer, we adjust for what each specific player can actually execute.

---

## 4. What This Delivers to Professional Clubs

### Pre-Match: Opponent Exploitation Plans

Feed the engine an opponent's last 8–10 matches. It learns their specific patterns and generates a tactical plan:

| What the Engine Learns | Example Output |
|------------------------|----------------|
| Defensive weaknesses | "Against quick switches, their LB takes 2.8s to recover vs. league average 2.1s — target that channel" |
| High-value actions | "Through balls into their left channel succeed 55% vs. 35% on the right — their LCB is slow to drop" |
| Pressing triggers | "They press when ball goes back to GK but leave massive gaps when ball goes wide" |
| Shape vulnerabilities | "Gap between CM and RB opens when ball is on opposite wing" |
| Recovery patterns | "After losing possession, they take 4.2s to reform vs. average 3.1s — we have a transition window" |
| Specific sequences | "Against their low block, here's a 4-move sequence: buildup left → switch to weak side → overlap → cross. Creates 2v1, 0.28 xG" |

Not "they defend deep." Specific actions, specific expected values, specific exploitation sequences for this opponent.

### In-Match: Real-Time Tactical Intelligence

- "They've shifted to 5-3-2. Switch to wide overloads — expected value increases from 0.15 to 0.24"
- "Their #4 is fatiguing. Target his channel — close-down speed dropped 15% since the 60th minute"
- Real-time expected value for current attacking patterns vs. alternatives

### Post-Match: Decision Quality Analysis

For every chance created or conceded:
- All options that existed at each decision point
- Expected value of each option
- What was actually chosen and the xG difference
- Player-by-player decision quality scores

"We created 2.3 xG. Engine analysis says optimal play would have produced 3.1 xG. Here are the 8 moments where higher-value options were available — and here's exactly what the search tree shows for each one."

### Player Development

- Objective decision quality measurement tracked over time
- "Player A chooses the highest-value option 72% of the time — up from 61% in August"
- Position-specific: "Your through ball recognition is elite. Your switch-of-play timing costs 0.08 xG per match on average"
- Compare player decisions against engine-optimal: where do they consistently leave value?

### Recruitment and Scouting

Run a prospect's film through the engine:
- Extract physical metrics from video: sprint speed, acceleration, recovery patterns, work rate — without needing their GPS data
- Decision-making quality: "This prospect chooses the highest-xG option 68% of the time in transition — top 5% in his league"
- Direct comparison: "He's faster than our current starter but his pass accuracy under pressure is 12% lower"
- Squad fit: "Given your current profiles, adding a player with X characteristics increases buildup success by Y%"

### Game Model Accountability

Define your tactical philosophy. The engine measures execution objectively:
- "Are we actually pressing the way we train?"
- "In buildup situations with this defensive shape, we're supposed to switch — we do it 45% of the time"
- "Breakdown at 34:22 — #6 had the switch available (0.15 xG higher) but played central"

The subjective question "are we playing our way?" becomes a quantified, traceable metric across the season.

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
- Analytics budgets already exist — not creating a new budget line, competing for allocation within established spend
- Margins are razor-thin at the top — one more win per season justifies six-figure spend
- Analyst staff are already in place — they can evaluate and adopt sophisticated tools
- Player salaries dwarf analytics costs — $75K/year for better decisions on $50M+ payroll is trivial
- Coaching pressure is intense — clubs fire managers after 10 poor results; anything that improves decisions is valuable

### Secondary Market: College Programs

| Segment | Size | Budget Range |
|---------|------|-------------|
| Power 4 + top programs | ~80 | $50K–$200K |
| Competitive D1 | ~120 | $20K–$75K |
| Remaining D1 (men + women) | ~670 | $5K–$30K |

College programs serve as validation and entry market. Marshall University (D1, Sun Belt) is the active pilot. College provides faster iteration cycles, direct coaching access, and case studies that support professional sales.

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

### Phase 3: Scale Professional (Year 2–3)

**Target: Championship, Bundesliga 2, Serie B, Ligue 2, MLS**

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
- Elite tier ($150K+) justified by capabilities no competitor offers

---

## 9. Development Roadmap

### The Path to Stockfish

| Phase | What Ships | What It Enables |
|-------|-----------|-----------------|
| **Tracking validation** | Reliable coordinates from video; accuracy confirmed against GPS | Spatial data the decision engine needs |
| **Similarity engine** | Situation database with thousands of possessions; retrieval + outcome analysis | "In similar situations, what worked?" — grounded in real data |
| **Outcome learning** | Learned success rates replacing physics estimates; skill-adjusted patterns | Engine stops guessing, starts knowing |
| **Pattern library** | Attacking combinations (overlap, third-man, switch) + defensive vulnerability templates | Opening book that guides search toward proven sequences |
| **Player profiles** | Physical, technical, mental attributes per player extracted from tracking | Realistic constraints — simulation knows what each player can actually do |
| **Opponent modeling** | Feed opponent matches → learn their patterns → auto-generate exploitation plans | Pre-match intelligence that no manual analysis can match |
| **Simulation engine** | Multi-step MCTS search; variable-depth tree exploration; learned transitions | **The Stockfish moment:** engine finds sequences humans haven't imagined |

### How Each Phase Builds Toward Simulation

The simulation doesn't come from nowhere. Each phase produces specific knowledge the engine needs:

| Phase | What We Learn | How It Powers Search |
|-------|---------------|---------------------|
| Similarity engine | Situations can be meaningfully matched on continuous features | Defines the state representation for simulation |
| Outcome learning | Actual success rates, not physics guesses | Accurate branch evaluation during tree search |
| Pattern library | Known good sequences, known vulnerabilities | Opening book — don't search from scratch every time |
| Player profiles | What each player can actually execute | Realistic simulation constraints |
| Opponent modeling | How specific defenses react to specific actions | Opponent-tuned search trees |
| Simulation engine | All of the above combined | Full tactical search: explore, prune, find the best path |

**The key insight:** we can't simulate what we don't understand. First we learn the patterns from real data. Then we simulate with confidence that the simulation matches reality.

---

## 10. Key Risks

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| **Tracking accuracy insufficient** | Medium | High | Semi-manual fallback; accept tracking data from third parties; focus on key sequences not full 90' |
| **Physics predictions don't match reality** | Medium | Medium | Expected and planned for — the entire outcome learning phase exists to close this gap |
| **Professional clubs won't buy from a startup** | Medium | High | Marshall case study; pilot pricing; start with lower leagues and work up; coach advisory board |
| **Coaches don't trust AI** | Low–Medium | High | Position as augmentation not replacement; show video evidence alongside every recommendation; face validity testing |
| **Competitor builds similar system** | Low–Medium | Medium | First-mover; data flywheel; network effects in opponent database |
| **Search complexity too high for real-time** | Medium | Medium | Pre-compute common situations; shallow search for real-time, deep search for pre-match; cloud GPU |
| **Sales cycle too long** | Medium | Medium | Lead with immediate-value features; reduce buyer risk with pilot pricing |
| **Key person risk** | High (early) | High | Documented architecture; modular codebase; hire ML engineer early |

---

## 11. Financial Plan

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

### Path to Profitability

| Year | Revenue | Total Costs | Net | Headcount |
|------|---------|-------------|-----|-----------|
| Year 1 | $250K | $280K | –$30K | 1–2 |
| Year 2 | $1.5M | $650K | +$850K | 3–5 |
| Year 3 | $4.5M | $1.8M | +$2.7M | 8–12 |
| Year 5 | $15M | $5M | +$10M | 20–30 |

Cash-flow positive by end of Year 1 / early Year 2 depending on hiring pace. Gross margin 80%+ at all scales.

---

## 12. Funding

### Current Stage

Pre-seed. Active D1 pilot. 36,000+ lines of production code. Working tracking pipeline and decision engine modules.

### Seed Round

**Target raise:** $500K

| Allocation | Amount | Purpose |
|-----------|--------|---------|
| Engineering (60%) | $300K | ML engineer hire; tracking reliability; similarity engine; outcome learning |
| Pilot expansion (20%) | $100K | 2–3 professional club pilots + 5 college programs |
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

## 13. Team

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

## 14. Why Now

1. **Tracking technology matured** — YOLOv8, ByteTrack, DETR make broadcast-quality tracking feasible outside elite clubs for the first time
2. **Event data is fully commoditized** — Wyscout is universal; the next edge must come from a different data layer
3. **Decision analysis is the acknowledged frontier** — coaches and analysts know this is what's needed; nobody is selling it
4. **Professional club analytics spend is accelerating** — Championship clubs now employ 3–5 analysts; even League One has data staff
5. **Player salaries make analytics trivial by comparison** — $75K/year for better decisions on a $20M+ wage bill is obvious ROI
6. **AI/ML infrastructure is accessible** — GPU compute, model training, LLMs — all available to startups at manageable cost
7. **TacticAI proved the concept** — DeepMind's research validated similarity-based tactical retrieval; Taka is building the product

---

## 15. Long-Term Vision

**Year 1:** Prove decision-level analysis delivers coaching value. Marshall reference customer. First professional pilots.

**Year 3:** Standard tool for serious clubs. Outcome learning producing insights no human analysis can match. "We use decision intelligence the way we use GPS tracking."

**Year 5:** 180+ clubs. Simulation engine operational. Engine generates pre-match tactical plans and finds exploitation sequences. Decision quality scoring transforms player development and scouting.

**Long-term:** The engine changes how football understands tactics. Not "did the pass work" but "was it the right pass given all options." Every player gets objective feedback on every decision. Scouting evaluates decision quality, not just physical output. The simulation engine discovers novel tactical sequences — attacking combinations and defensive structures that human coaches haven't imagined.

This is the Stockfish of football. The engine that thinks ahead, learns from reality, and gets smarter with every match it analyzes.

---

## 16. Relationship to Taka Game

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

**The vision:** A decision engine that evaluates every option, learns what works from real data, and searches multi-step sequences to find optimal tactical paths. The Stockfish of football.

**The market:** $283M+ TAM. Professional clubs are the primary customer — they have the budgets, the analyst staff, and the acute need for tactical edge.

**The moat:** Outcome learning flywheel. Opponent database network effects. Situation library that compounds with every match analyzed.

**The model:** B2B SaaS, $25K–$150K/year, 80%+ gross margins, < 6 month payback.

**The ask:** $500K seed to validate tracking, build similarity engine, land professional pilots, reach $500K+ ARR.

**The vision:** Decision analytics becomes the standard. Taka Tech defines the category.
