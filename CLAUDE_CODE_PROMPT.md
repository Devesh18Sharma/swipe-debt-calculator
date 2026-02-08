# Claude Code Implementation Prompt: SwipeSwipe Debt Freedom Calculator

## 🎯 Project Overview

Build a **Debt Freedom Calculator** for SwipeSwipe — a conversational, bot-style financial tool that helps users understand the true cost of credit card debt, explore consolidation savings, and visualize long-term wealth building through investing.

**Product Context:** SwipeSwipe helps consumers control online spending and build wealth. This calculator aligns with our mission: "Turn overspending into wealth." It should feel like a friendly financial coach guiding users through their debt journey.

---

## 📋 Requirements Summary

### Core Flow (3 Steps)

1. **Step 1 — Add Credit Cards**
   - Users input unlimited credit cards (balance + APR)
   - Pre-populate with 2 sample cards for better UX
   - Show running total as cards are added
   - "Add Another Card" button + "Show My Savings" CTA

2. **Step 2 — Debt Analysis & Consolidation Comparison**
   - Display debt summary: Total Balance, Weighted APR, Total Interest (at minimum payments)
   - Consolidation loan controls: APR slider (3-36%), Term slider (1-7 years)
   - Visual comparison bars: Current cards vs Consolidation loan interest
   - Show savings amount with animated counter
   - "What If I Invest My Savings?" CTA

3. **Step 3 — Investment Projection**
   - Input: User's current age
   - Select: Expected annual return (6%, 8%, 10%, 12%)
   - Show: Projected wealth by age 90 if they invest monthly payment after debt payoff
   - Area chart: Invested vs Market Growth over time
   - Summary stats: Total Invested, Market Growth

### UI Pattern
- **Bot-style conversational flow** (similar to existing "See How Rich You Can Get" calculator)
- Chat bubbles with SwipeSwipe avatar introducing each step
- Smooth animations and transitions between steps
- Auto-scroll to new content as steps progress

---

## 🛠 Technical Stack

```
React 18+ with TypeScript
Vite (build tool)
MUI (Material-UI) v5+ — USE EXISTING SWIPESWIPE THEME
Recharts — for data visualization (already used in codebase)
```

### Why MUI (not vanilla CSS)?
- ✅ Consistent with existing SwipeSwipe codebase
- ✅ Leverages existing theme primitives (colors, typography)
- ✅ Built-in responsive design
- ✅ Accessible components out-of-the-box
- ✅ Faster development with pre-built components

---

## 🎨 SwipeSwipe Theme Integration

Use the existing theme. Key values:

```typescript
// Colors (from themePrimitives.ts)
const COLORS = {
  primary: '#293A60',      // Navy - main text, headers
  textSecondary: '#879CA8', // Muted text
  background: '#FAFAFA',   // Page background
  success: '#19B600',      // Green - savings, positive
  successLight: '#D4FACE', // Light green backgrounds
  info: '#23A6F0',         // Blue - accent, interactive
  infoLight: '#B2DFF2',    // Light blue backgrounds
  warning: '#FBC950',      // Yellow - caution
  warningLight: '#FFEDCE', // Light yellow
  orange: '#F5692B',       // Orange - alerts, negative
  orangeLight: '#FADBC9',  // Light orange
};

// Typography
fontFamily: 'Libre Franklin'

// Additional UI colors (extend theme if needed)
const EXTENDED = {
  purple: '#343458',       // Bot avatar gradient
  accent: '#5B6ABF',       // Interactive elements
  lilac: '#cdcdff',        // Light accent
  inputBg: '#F4F5F9',      // Input backgrounds
  border: '#E6E6E6',       // Borders
  cardBg: '#FFFFFF',       // Card backgrounds
};
```

---

## 📁 Project Structure

```
src/
├── features/
│   └── DebtCalculator/
│       ├── index.ts                    # Public exports
│       ├── DebtCalculatorWidget.tsx    # Main container component
│       ├── components/
│       │   ├── BotMessage.tsx          # Chat bubble component
│       │   ├── CardInput.tsx           # Single credit card input row
│       │   ├── CardInputList.tsx       # List of card inputs + add button
│       │   ├── DebtSummary.tsx         # Step 2 summary stats
│       │   ├── ConsolidationControls.tsx # APR/Term sliders
│       │   ├── ComparisonChart.tsx     # Interest comparison bars
│       │   ├── SavingsDisplay.tsx      # Animated savings amount
│       │   ├── InvestmentControls.tsx  # Age + return rate inputs
│       │   ├── InvestmentChart.tsx     # Area chart for growth
│       │   ├── InvestmentSummary.tsx   # Final stats display
│       │   └── StatCard.tsx            # Reusable stat display card
│       ├── hooks/
│       │   ├── useDebtCalculations.ts  # All financial math
│       │   └── useAnimatedNumber.ts    # Number animation hook
│       ├── utils/
│       │   ├── calculations.ts         # Pure calculation functions
│       │   └── formatters.ts           # Currency/number formatters
│       ├── types/
│       │   └── index.ts                # TypeScript interfaces
│       └── constants/
│           └── index.ts                # Default values, limits
```

---

## 📝 TypeScript Interfaces

```typescript
// types/index.ts

export interface CreditCard {
  id: string;
  name: string;
  balance: number;
  apr: number;
}

export interface DebtSummary {
  totalBalance: number;
  weightedApr: number;
  totalMinPayment: number;
  totalInterest: number;
  monthsToPayoff: number;
  cardCount: number;
}

export interface ConsolidationResult {
  monthlyPayment: number;
  totalInterest: number;
  interestSaved: number;
  monthlySaved: number;
  termMonths: number;
}

export interface InvestmentDataPoint {
  year: number;
  label: string;
  invested: number;
  growth: number;
  total: number;
}

export interface CalculatorState {
  step: 1 | 2 | 3;
  cards: CreditCard[];
  loanApr: number;
  loanTermYears: number;
  userAge: number;
  annualReturn: number;
}

export type CalculatorAction =
  | { type: 'ADD_CARD' }
  | { type: 'REMOVE_CARD'; payload: string }
  | { type: 'UPDATE_CARD'; payload: { id: string; field: keyof CreditCard; value: string | number } }
  | { type: 'SET_STEP'; payload: 1 | 2 | 3 }
  | { type: 'SET_LOAN_APR'; payload: number }
  | { type: 'SET_LOAN_TERM'; payload: number }
  | { type: 'SET_USER_AGE'; payload: number }
  | { type: 'SET_ANNUAL_RETURN'; payload: number }
  | { type: 'RESET' };
```

---

## 🧮 Calculation Functions

```typescript
// utils/calculations.ts

/**
 * Calculate minimum payment for a credit card (typically 2% of balance or $25, whichever is greater)
 */
export function calcMinPayment(balance: number): number {
  return Math.max(balance * 0.02, 25);
}

/**
 * Calculate credit card payoff with minimum payments
 * Returns months to payoff and total interest paid
 */
export function calcCreditCardPayoff(
  balance: number,
  apr: number,
  monthlyPayment: number
): { months: number; totalInterest: number } {
  let remaining = balance;
  const monthlyRate = apr / 100 / 12;
  let totalInterest = 0;
  let months = 0;
  const maxMonths = 600; // Safety limit

  while (remaining > 0.01 && months < maxMonths) {
    const interest = remaining * monthlyRate;
    totalInterest += interest;
    const principal = Math.max(monthlyPayment - interest, 0);
    if (principal <= 0) return { months: Infinity, totalInterest: Infinity };
    remaining = Math.max(remaining - principal, 0);
    months++;
  }
  return { months, totalInterest };
}

/**
 * Calculate monthly payment for a fixed-rate loan (amortization formula)
 */
export function calcLoanPayment(
  principal: number,
  apr: number,
  termMonths: number
): number {
  const r = apr / 100 / 12;
  if (r === 0) return principal / termMonths;
  return (principal * r * Math.pow(1 + r, termMonths)) / (Math.pow(1 + r, termMonths) - 1);
}

/**
 * Calculate total interest paid on a loan
 */
export function calcLoanTotalInterest(
  principal: number,
  apr: number,
  termMonths: number
): number {
  const monthly = calcLoanPayment(principal, apr, termMonths);
  return monthly * termMonths - principal;
}

/**
 * Calculate investment growth with regular monthly deposits
 * Returns yearly data points for charting
 */
export function calcInvestmentGrowth(
  monthlyDeposit: number,
  annualReturn: number,
  years: number
): InvestmentDataPoint[] {
  const data: InvestmentDataPoint[] = [];
  const monthlyRate = annualReturn / 100 / 12;
  let balance = 0;
  let totalDeposits = 0;

  for (let y = 1; y <= years; y++) {
    for (let m = 0; m < 12; m++) {
      balance = balance * (1 + monthlyRate) + monthlyDeposit;
      totalDeposits += monthlyDeposit;
    }
    data.push({
      year: y,
      label: `Year ${y}`,
      invested: Math.round(totalDeposits),
      growth: Math.round(balance - totalDeposits),
      total: Math.round(balance),
    });
  }
  return data;
}
```

---

## 🎭 Component Specifications

### 1. BotMessage Component

```typescript
interface BotMessageProps {
  children: React.ReactNode;
  delay?: number; // Animation delay in ms
}
```

**Design:**
- Left-aligned chat bubble with avatar
- Avatar: Circular gradient (purple → accent) with DollarSign icon
- Bubble: White background, subtle shadow, rounded corners (4px top-left, 16px others)
- Fade-in + slide-up animation

### 2. CardInput Component

```typescript
interface CardInputProps {
  card: CreditCard;
  index: number;
  onChange: (id: string, field: keyof CreditCard, value: string | number) => void;
  onRemove: (id: string) => void;
  canRemove: boolean;
}
```

**Design:**
- Card icon on left (blue background)
- Optional card name input (subtle, placeholder text)
- Balance input with $ prefix
- APR input with % suffix
- Delete button (only if canRemove)
- Light gray background with border

### 3. StatCard Component

```typescript
interface StatCardProps {
  label: string;
  value: string;
  subtitle?: string;
  icon?: React.ElementType;
  color?: string;
}
```

**Design:**
- Flexible width (flex: 1 1 200px)
- Icon with colored background circle
- Label in small caps
- Value in large bold text
- Optional subtitle in muted text

### 4. ComparisonChart Component

**Design:**
- Two horizontal progress bars
- Red bar: Current cards interest (100% width baseline)
- Green bar: Consolidation interest (proportional width)
- Labels with values on right side
- Animated width transitions

### 5. InvestmentChart Component

**Use Recharts AreaChart:**
- Stacked areas: Invested (purple) + Growth (accent)
- Gradient fills
- Custom tooltip (dark background, white text)
- Responsive container
- X-axis: Year labels (show every ~5 years)
- Y-axis: Currency formatted (use $Xk, $XM notation)

---

## 🎬 Animations & Interactions

1. **Step Transitions**
   - Fade-in + slide-up for new content
   - Auto-scroll to newly revealed sections
   - 200-600ms delays for staggered reveals

2. **Number Animations**
   - Animated counter for savings amount
   - Eased animation (cubic ease-out)
   - ~800ms duration

3. **Hover States**
   - Buttons: Slight lift (translateY -1px) + enhanced shadow
   - Delete buttons: Color change to red
   - Interactive elements: Cursor pointer

4. **Slider Interactions**
   - Real-time calculation updates
   - Smooth bar width transitions
   - Value display updates instantly

---

## ✅ Implementation Checklist

### Phase 1: Setup & Foundation
- [ ] Create feature folder structure
- [ ] Define TypeScript interfaces
- [ ] Implement calculation utility functions
- [ ] Create formatters (currency, percentages)
- [ ] Set up constants (defaults, limits)

### Phase 2: Core Components
- [ ] BotMessage component with animation
- [ ] CardInput component
- [ ] CardInputList with add/remove logic
- [ ] StatCard reusable component
- [ ] useAnimatedNumber hook

### Phase 3: Step 1 Implementation
- [ ] Initial bot message
- [ ] Card input list with sample data
- [ ] "Add Another Card" button
- [ ] "Show My Savings" CTA (disabled until valid input)
- [ ] Step transition logic

### Phase 4: Step 2 Implementation
- [ ] Debt summary calculation hook
- [ ] Summary stat cards (Total Debt, Avg APR, Interest Cost)
- [ ] Consolidation controls (APR slider, Term slider)
- [ ] Comparison bars with animation
- [ ] Savings display with animated number
- [ ] Warning state when consolidation doesn't save money
- [ ] "What If I Invest?" CTA

### Phase 5: Step 3 Implementation
- [ ] Age input field
- [ ] Annual return selector (button group)
- [ ] Investment calculation hook
- [ ] Investment projection header
- [ ] Area chart with Recharts
- [ ] Summary stat cards (Total Invested, Market Growth)
- [ ] Final bot message with summary

### Phase 6: Polish & QA
- [ ] Responsive design testing (mobile, tablet, desktop)
- [ ] Animation timing refinement
- [ ] Accessibility audit (keyboard nav, screen readers)
- [ ] Edge case handling (zero values, very large numbers)
- [ ] Performance optimization (memo, useCallback)
- [ ] Code cleanup and documentation

---

## 🚫 Do NOT

- Use inline styles — use MUI `sx` prop or styled components
- Hardcode colors — use theme values
- Skip TypeScript types — everything must be typed
- Leave console.logs in code
- Use `any` type
- Forget error boundaries for chart components
- Ignore mobile responsiveness
- Skip loading/empty states

---

## ✨ DO

- Follow SwipeSwipe's existing component patterns
- Use MUI components (Box, Typography, Button, Slider, TextField, Paper)
- Leverage theme.palette and theme.typography
- Implement proper React patterns (controlled components, lifting state)
- Add meaningful aria-labels for accessibility
- Use semantic HTML where appropriate
- Keep components small and focused (<200 lines)
- Extract reusable logic into hooks
- Add JSDoc comments for complex functions
- Test edge cases (empty cards, zero balance, high APR)

---

## 📱 Responsive Breakpoints

```typescript
// Use MUI's breakpoint system
// xs: 0px    — Mobile portrait
// sm: 600px  — Mobile landscape / small tablet
// md: 900px  — Tablet
// lg: 1200px — Desktop
// xl: 1536px — Large desktop

// Example responsive sx prop:
sx={{
  padding: { xs: 2, sm: 3, md: 4 },
  flexDirection: { xs: 'column', md: 'row' },
  fontSize: { xs: '1.25rem', sm: '1.5rem', md: '2rem' },
}}
```

---

## 🔗 Reference Files

When implementing, reference these existing SwipeSwipe files for patterns:
- `src/features/Calculator/CalculatorWidget.tsx` — Main calculator structure
- `src/features/Calculator/components/CalculatorChart.tsx` — Recharts usage
- `src/features/Calculator/components/CalculatorForm.tsx` — Form inputs with MUI
- `src/features/Calculator/components/CalculatorResults.tsx` — Results display
- `src/theme/AppTheme.tsx` — Theme provider setup
- `src/theme/themePrimitives.ts` — Color palette
- `src/components/NumericField.tsx` — Numeric input component

---

## 🎯 Success Criteria

1. **Functional:** All calculations are accurate and match POC
2. **Visual:** Matches SwipeSwipe design language
3. **Responsive:** Works perfectly on mobile through desktop
4. **Accessible:** Keyboard navigable, screen reader friendly
5. **Performant:** No jank, smooth animations
6. **Maintainable:** Clean code, well-organized, documented
7. **Type-safe:** Full TypeScript coverage, no `any`

---

## 💬 Bot Message Copy

### Step 1 Introduction
```
👋 Let's find out how much you could save! Add your credit cards below — I'll show you the true cost of that debt and how to crush it.
```

### Step 2 Analysis
```
📊 Here's the picture. At minimum payments, you'd pay [INTEREST_AMOUNT] in interest alone! Let's fix that.
```

### Step 2 Consolidation
```
🎯 Now let's see what a consolidation loan could look like. Adjust the rate and term:
```

### Step 3 Investment
```
🚀 Here's where it gets exciting. Once your debt is paid off in [X] years, what if you invested that same [AMOUNT]/month into the market until you're 90?
```

### Final Summary
```
💰 By consolidating your debt and then investing the payments, you're not just saving [SAVINGS] in interest — you're building [WEALTH] in wealth. That's the SwipeSwipe way: turn overspending into freedom. 🎉
```

---

## 🚀 Let's Build!

Start with Phase 1 (Setup & Foundation), then proceed sequentially. After each phase, verify the implementation works correctly before moving to the next.

**Priority:** Get the core functionality working first, then polish animations and edge cases.

**Questions?** If any requirement is unclear, ask before implementing. Better to clarify upfront than refactor later.
