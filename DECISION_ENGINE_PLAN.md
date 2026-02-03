# Football Decision Engine - Technical Plan

## Vision

Build a system that answers: **"Given this situation, what has historically worked best?"**

Using tracking data and event data, analyze patterns of successful build-ups and chance creation. When presented with a game situation (ball position, defensive setup, context), retrieve similar historical situations and identify which attacking actions led to success.

---

## Core Approach

### What We're Building

A **similarity-based retrieval system** that:
1. Takes a current game situation as input
2. Finds the most similar historical situations from our database
3. Returns what actions worked best in those situations
4. Provides actionable insight to coaches

### Why This Approach

| Alternative | Why Not |
|-------------|---------|
| Pure RL/Simulation | No evidence of real-world tactical transfer (Google Football failed) |
| Board game abstraction | Unvalidated - no proof simplified rules capture real tactics |
| Formation labels only | Too imprecise - "4-4-2" means many different things |
| Exact position matching | No matches - football state space too large |

**This approach is grounded in:**
- Real tracking data (not simulation)
- Proven methodology (similar to TacticAI retrieval)
- Measurable features (not subjective labels)

---

## Data Requirements

### Primary: Tracking Data
- Full player positions (all 22 players + ball)
- Minimum 25Hz sampling rate
- Source: SkillCorner, Second Spectrum, or equivalent

### Secondary: Event Data
- Pass, shot, dribble, tackle events
- Outcomes (success/failure)
- Source: Wyscout, StatsBomb

### Derived: Context Data
- Score state
- Match time
- Team identities
- Competition level

---

## Situation Encoding

### Ball Position (Zone-Based)

Divide pitch into 5x5 grid (25 zones):

```
     Left   Left-Center   Center   Right-Center   Right
    ┌───────┬───────┬───────┬───────┬───────┐
    │  A5   │  B5   │  C5   │  D5   │  E5   │  Attacking Third
    ├───────┼───────┼───────┼───────┼───────┤
    │  A4   │  B4   │  C4   │  D4   │  E4   │  Attacking Mid
    ├───────┼───────┼───────┼───────┼───────┤
    │  A3   │  B3   │  C3   │  D3   │  E3   │  Middle Third
    ├───────┼───────┼───────┼───────┼───────┤
    │  A2   │  B2   │  C2   │  D2   │  E2   │  Defensive Mid
    ├───────┼───────┼───────┼───────┼───────┤
    │  A1   │  B1   │  C1   │  D1   │  E1   │  Defensive Third
    └───────┴───────┴───────┴───────┴───────┘
         ← Own Goal                    Opponent Goal →
```

### Defensive Features (Behavioral, Not Labels)

Instead of formation names, measure actual defensive behavior:

| Feature | Description | How to Measure |
|---------|-------------|----------------|
| `line_height` | How high/deep is the defensive line | Average Y-coordinate of back 4 (meters from own goal) |
| `compactness_vertical` | Vertical distance between defensive lines | Distance from deepest defender to highest midfielder |
| `compactness_horizontal` | Width of defensive shape | Distance between widest defenders |
| `press_intensity` | How aggressively do they close down | Average closing speed when ball is received (m/s) |
| `pressure_on_ball` | Immediate pressure | Distance of nearest defender to ball carrier |
| `players_behind_ball` | Defensive commitment | Count of defenders behind ball line |

#### Phase 2 Features (Add After Validation)

| Feature | Description | How to Measure |
|---------|-------------|----------------|
| `marking_style` | Man-oriented vs zonal | Correlation between defender and nearest attacker movement |
| `shift_speed` | Defensive reaction time | Time for shape to adjust after ball movement |
| `recovery_tendency` | Counter-press vs drop | Movement direction after possession loss |

### Attacking Features

| Feature | Description |
|---------|-------------|
| `attackers_ahead_of_ball` | Players in advanced positions |
| `passing_options` | Number of viable passing lanes |
| `space_ahead` | Open space in direction of attack |
| `possession_phase` | Build-up / Progression / Final third |

### Context Features

| Feature | Description |
|---------|-------------|
| `score_state` | Winning / Drawing / Losing |
| `time_bucket` | 0-15, 15-30, 30-45, 45-60, 60-75, 75-90 |
| `possession_duration` | Seconds since possession started |

---

## Similarity Matching

### Approach

1. Encode each historical possession as a feature vector
2. For a query situation, compute distance to all historical situations
3. Return top-N most similar situations
4. Analyze outcomes of those situations

### Distance Metric

Weighted Euclidean distance across normalized features:

```
distance = sqrt(
    w1 * (line_height_diff)^2 +
    w2 * (compactness_diff)^2 +
    w3 * (pressure_diff)^2 +
    ...
)
```

Initial weights: Equal (1.0 for all features)
Later: Learn weights from outcome prediction accuracy

### Alternative: Learned Embeddings

If hand-crafted features plateau, consider:
- Graph Neural Network (GNN) encoding player positions as nodes
- Let model learn what "similar" means
- More complex but potentially more accurate

---

## Success Metrics

### For Possessions

| Metric | Definition | Use Case |
|--------|------------|----------|
| `xT_gained` | Expected Threat added during possession | Primary success metric |
| `final_third_entry` | Did possession reach attacking third | Progression success |
| `shot_generated` | Did possession result in shot | Chance creation |
| `xG_of_shot` | If shot, what was its xG | Chance quality |

### For Actions

| Metric | Definition |
|--------|------------|
| `action_success_rate` | % of times this action type succeeded in similar situations |
| `action_xT_contribution` | Average xT added by this action in similar situations |

---

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      DATA INGESTION                         │
│  ├── Tracking data parser                                   │
│  ├── Event data parser                                      │
│  └── Data alignment (sync tracking + events)                │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    FEATURE EXTRACTION                       │
│  ├── Ball zone classifier                                   │
│  ├── Defensive feature calculator                           │
│  ├── Attacking feature calculator                           │
│  └── Context feature extractor                              │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                   SITUATION DATABASE                        │
│  ├── Feature vectors for all historical possessions         │
│  ├── Indexed for fast similarity search                     │
│  └── Linked to outcomes (what happened next)                │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                   SIMILARITY ENGINE                         │
│  ├── Query encoder                                          │
│  ├── Nearest neighbor search                                │
│  └── Result aggregation                                     │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                      OUTPUT LAYER                           │
│  ├── "In similar situations, X worked Y% of the time"       │
│  ├── Video clips of similar situations                      │
│  └── Recommended actions ranked by success rate             │
└─────────────────────────────────────────────────────────────┘
```

---

## Implementation Phases

### Phase 1: Foundation (Validate Core Concept)

**Goal:** Does similarity matching find meaningful patterns at all?

**Deliverables:**
- [ ] Tracking data ingestion pipeline
- [ ] Basic feature extraction (line height, compactness, pressure, ball zone)
- [ ] Situation database with 1000+ possessions
- [ ] Simple similarity search
- [ ] Basic outcome analysis

**Validation:**
- Do similar situations have similar outcomes?
- Can we distinguish high-success vs low-success patterns?
- Does a coach find the retrieved situations relevant?

**Timeline:** 4-6 weeks

---

### Phase 2: Refinement (Improve Accuracy)

**Goal:** Make recommendations more accurate and actionable

**Deliverables:**
- [ ] Expanded feature set (marking style, shift speed, etc.)
- [ ] Learned feature weights (optimize for outcome prediction)
- [ ] Action-level analysis (not just possession-level)
- [ ] Confidence scores for recommendations

**Validation:**
- Does expanded feature set improve outcome prediction?
- Do coaches prefer recommendations vs baseline?

**Timeline:** 6-8 weeks

---

### Phase 3: Skill Adjustment (Control for Player Quality)

**Goal:** Separate "this worked because it's good" from "good players executed it"

**Deliverables:**
- [ ] Player physical metrics integration
- [ ] Historical performance baselines per player
- [ ] Skill-adjusted success rates
- [ ] Within-team variation analysis

**Validation:**
- Are patterns consistent across team quality tiers?
- Do skill-adjusted recommendations differ from raw recommendations?

**Timeline:** 6-8 weeks

---

### Phase 4: Production (Scale and Polish)

**Goal:** System ready for regular use by coaching staff

**Deliverables:**
- [ ] Real-time query interface
- [ ] Video clip retrieval for similar situations
- [ ] Pre/post-match report generation
- [ ] API for integration with other tools

**Timeline:** 8-12 weeks

---

## What We're NOT Building (And Why)

| Not Building | Reason |
|--------------|--------|
| Full match simulation | Sim-to-real gap unsolved; no evidence of tactical transfer |
| Formation classifier | Labels too imprecise; behavioral features are more accurate |
| Real-time in-match recommendations | Data latency issues; validation harder; Phase 4+ at earliest |
| Player-level decision scoring | Requires skill adjustment first; Phase 3+ |
| Predictive model ("what will happen") | Starting with descriptive ("what has worked"); predictive is harder |

---

## Open Questions (To Resolve Empirically)

1. **Zone granularity:** Is 5x5 right? Or should it be 4x4, 6x6, continuous?
2. **Feature weights:** Which features matter most for similarity?
3. **Sample size threshold:** How many similar situations needed for reliable insight?
4. **Time window:** How much historical data is relevant? (1 season? 3 seasons?)
5. **Cross-league validity:** Do patterns transfer across leagues/levels?

---

## Success Criteria

### Phase 1 Success
- System retrieves situations that coaches agree are "similar"
- Retrieved situations have outcome variance (not all succeed or all fail)
- At least one actionable insight emerges from analysis

### Overall Success
- Coaches use the system regularly (weekly+)
- Recommendations influence training or match preparation
- Measurable improvement in identified metrics (xT, chance creation, etc.)

---

## Risks and Mitigations

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Features don't capture what matters | Medium | High | Start simple, validate with coaches, iterate |
| Not enough data for statistical power | Medium | High | Start with coarser categories, expand data sources |
| Coaches don't trust/use system | Medium | High | Involve coaches early, show video evidence |
| Tracking data too expensive | Low | High | Start with available data, prove value, then expand |
| Skill imbalance skews results | Medium | Medium | Address in Phase 3; be cautious with early conclusions |

---

## Next Steps

1. **Secure tracking data access** - Required before anything else
2. **Build data ingestion pipeline** - Parse tracking + events
3. **Implement basic feature extraction** - Start with 4-5 core features
4. **Create situation database** - 1000+ possessions minimum
5. **Build simple similarity search** - Nearest neighbor on feature vectors
6. **Validate with coach** - Are retrieved situations relevant?

---

*Document version: 1.0*
*Last updated: February 2026*
