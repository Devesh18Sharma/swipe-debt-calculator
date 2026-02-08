# SwipeSwipe — Company & Product Context

## 🏢 About SwipeSwipe

**Tagline:** "We turn overspending into wealth"

**Industry:** Financial Services / FinTech

**Company Size:** 2-10 employees (startup)

**Website:** https://swipeswipe.co

**Chrome Extension:** [SwipeSwipe on Chrome Web Store](https://chromewebstore.google.com/detail/swipeswipe/jmephhldhjnmcmmnmgoiibamhgeoolbl)

---

## 🎯 Mission & Vision

SwipeSwipe exists to help everyday consumers:
1. **Control online spending** — Stop impulsive purchases driven by emotion
2. **Build better financial habits** — Awareness leads to behavioral change
3. **Grow wealth over time** — Every dollar saved is a dollar that can be invested

### The Core Problem We Solve
> "Have you ever received your credit card statements and realized that you have been spending more than you thought on sites like Amazon?"

Most people buy items based on emotions in the moment. SwipeSwipe intervenes at the point of purchase to help users make conscious decisions about their spending.

---

## 📱 Product Overview

### Chrome Extension (Core Product)
A browser extension that:
- Lets users set **guilt-free spending allowances** (daily/weekly/monthly)
- **Tracks online spending** across e-commerce sites
- **Alerts users** when they exceed their planned budget
- Helps build **better spending habits** over time

### Web Application (swipeswipe.co)
- User dashboard for viewing spending patterns
- Financial calculators and tools
- Educational content about personal finance

### Financial Calculators
Interactive tools that help users visualize the impact of their financial decisions:

1. **"See How Rich You Can Get" Calculator** (existing)
   - Shows compound growth of regular investments
   - Bot-style conversational UI
   - Motivates users to save by showing long-term potential

2. **Debt Freedom Calculator** (building now)
   - Shows true cost of credit card debt
   - Compares consolidation options
   - Projects wealth building after debt payoff

---

## 👥 Target Users

### Primary Persona: "The Accidental Overspender"
- Age: 25-45
- Has credit card debt (often accumulated unknowingly)
- Shops online regularly (Amazon, etc.)
- Wants to improve finances but struggles with impulse control
- Motivated by seeing concrete numbers and future projections

### User Goals
- "I want to stop spending more than I earn"
- "I want to pay off my credit cards"
- "I want to save for retirement/house/kids' college"
- "I want to reduce financial stress"
- "I want to build wealth, not just survive"

### User Pain Points
- Unaware of how much they're actually spending
- Credit card debt feels overwhelming
- Don't know where to start with investing
- Need motivation to change behavior
- Want simple tools, not complex financial jargon

---

## 🎨 Brand Personality

### Tone of Voice
- **Friendly & Encouraging** — Like a supportive financial coach, not a judgmental advisor
- **Empowering** — "You can do this" energy
- **Simple & Clear** — No confusing financial jargon
- **Optimistic** — Focus on the positive outcomes, not shame
- **Celebratory** — Celebrate wins, even small ones 🎉

### What We're NOT
- Preachy or condescending
- Overly formal or corporate
- Judgmental about past spending mistakes
- Complicated or jargon-heavy

### Example Messaging
✅ "Let's find out how much you could save!"
✅ "Here's where it gets exciting..."
✅ "That's the SwipeSwipe way: turn overspending into freedom!"
❌ "Your spending habits are problematic"
❌ "You need to implement a debt reduction strategy"
❌ "Failure to address this will result in..."

---

## 🎨 Visual Design Language

### Color Palette

| Color | Hex | Usage |
|-------|-----|-------|
| Navy | `#293A60` | Primary text, headers, main brand color |
| Purple | `#343458` | Accents, gradients, bot avatar |
| Accent Blue | `#5B6ABF` | Interactive elements, highlights |
| Lilac | `#cdcdff` | Light accents, subtle backgrounds |
| Light Blue | `#E3F2FD` | Input highlights, info backgrounds |
| Success Green | `#19B600` | Positive numbers, savings |
| Warning Orange | `#F5692B` | Alerts, negative numbers |
| Background | `#FAFAFA` | Page background |
| Card White | `#FFFFFF` | Card backgrounds |
| Muted Gray | `#949EAB` | Secondary text, labels |
| Border Gray | `#E6E6E6` | Borders, dividers |

### Typography
- **Primary Font:** Libre Franklin
- **Secondary Font:** Work Sans (UI elements)
- **Headlines:** Bold/Extra-bold weights
- **Body:** Regular/Medium weights
- **Numbers:** Semi-bold for emphasis

### UI Characteristics
- **Clean & Modern** — Lots of white space
- **Friendly Rounded Corners** — Cards, buttons (8-16px radius)
- **Subtle Shadows** — Depth without heaviness
- **Smooth Animations** — Polished, not flashy
- **Mobile-First** — Works great on phones

---

## 🤖 Bot-Style UI Pattern

SwipeSwipe calculators use a **conversational bot interface**:

### Why This Pattern?
1. **Feels Personal** — Like chatting with a financial advisor
2. **Reduces Overwhelm** — Information revealed progressively
3. **Guides Users** — Clear next steps at each stage
4. **Celebrates Progress** — Each step feels like an achievement
5. **Builds Trust** — The "bot" feels friendly and supportive

### Bot Avatar Design
- Circular shape with gradient background (purple → accent blue)
- Dollar sign ($) icon in white
- Subtle shadow for depth
- Consistent across all messages

### Message Bubble Design
- White background
- Asymmetric rounded corners (4px top-left, 16px others)
- Subtle border and shadow
- Fade-in + slide-up animation on appear

### Progressive Disclosure
- Step 1: Collect input
- Step 2: Show analysis
- Step 3: Show projection
- Each step reveals only when previous is complete
- Auto-scroll to new content

---

## 📊 Existing Calculator Reference

The **"See How Rich You Can Get"** savings calculator establishes the pattern:

### Structure
```
src/features/Calculator/
├── CalculatorWidget.tsx      # Main container
├── components/
│   ├── CalculatorForm.tsx    # Input controls
│   ├── CalculatorResults.tsx # Summary display
│   └── CalculatorChart.tsx   # Recharts visualization
└── types.ts                  # TypeScript interfaces
```

### Key Components Used
- MUI Paper for cards
- MUI Select for dropdowns
- MUI Typography for text
- Custom NumericField for currency inputs
- Recharts BarChart for visualization

### Data Flow
1. User inputs stored in React state
2. Calculations performed in useMemo hooks
3. Results displayed in real-time
4. Chart updates automatically

---

## 🎯 Debt Calculator Specific Context

### Why This Tool Matters
Credit card debt is one of the biggest obstacles to building wealth. Average American household has ~$8,000 in credit card debt at 20%+ APR. This tool:

1. **Creates Awareness** — Shows the true cost of minimum payments
2. **Provides Options** — Demonstrates consolidation benefits
3. **Motivates Action** — "What if you invested instead?"
4. **Ties to SwipeSwipe Mission** — Prevents future debt through spending control

### The Emotional Journey
1. **Curiosity** → "Let me see what this shows"
2. **Shock** → "Wow, I'd pay THAT much in interest?!"
3. **Hope** → "I could save this much by consolidating"
4. **Excitement** → "And then I could build THIS much wealth!"
5. **Motivation** → "I need to take action on this"

### Key Metrics to Highlight
- Total interest paid (scary number in red)
- Interest saved through consolidation (happy number in green)
- Potential wealth by age 90 (aspirational number)

---

## 🔗 Integration Points

### Where This Calculator Lives
1. **SwipeSwipe Web App** — As a feature within the logged-in experience
2. **Standalone Landing Page** — For marketing/SEO (deployable on Vercel)
3. **Potential Future:** Embedded in Chrome extension

### Data Privacy
- All calculations happen client-side
- No personal financial data is stored
- Users don't need to log in to use calculator
- Educational tool, not financial advice

---

## 📝 Legal Disclaimer (Add to UI)

```
This calculator is for educational purposes only and does not constitute financial advice. 
Actual rates and terms may vary. Consult a financial advisor for personalized recommendations.
```

---

## 🚀 Success Metrics

How we'll know this calculator is working:

1. **Engagement:** Users complete all 3 steps
2. **Sharing:** Users share results (future feature)
3. **Conversion:** Users sign up for SwipeSwipe after using
4. **Retention:** Users return to recalculate with updated numbers
5. **Qualitative:** Positive feedback from user testing

---

## 💡 Key Takeaways for Development

1. **Keep it simple** — Our users aren't financial experts
2. **Make numbers visual** — Charts and progress bars > tables
3. **Celebrate savings** — Green colors, animations, emoji 🎉
4. **Be encouraging** — Friendly bot messages throughout
5. **Mobile first** — Many users will be on phones
6. **Fast & responsive** — Calculations should feel instant
7. **Accessible** — Works for everyone

---

*This context should help Claude Code understand not just WHAT to build, but WHY — ensuring the final product truly serves SwipeSwipe's mission and users.*
