import { useState, useMemo, useCallback, useEffect, useRef } from "react";
import {
  BarChart, Bar, AreaChart, Area, XAxis, YAxis, Tooltip,
  Legend, CartesianGrid, ResponsiveContainer,
} from "recharts";
import { Trash2, Plus, CreditCard, TrendingUp, ArrowRight, ChevronDown, DollarSign, Percent, RotateCcw } from "lucide-react";

// ─── CONSTANTS ────────────────────────────────────────────────
const COLORS = {
  navy: "#293A60",
  purple: "#343458",
  lilac: "#cdcdff",
  lightBlue: "#E3F2FD",
  accent: "#5B6ABF",
  accentLight: "#8B96D4",
  green: "#2E7D5B",
  greenLight: "#E8F5E9",
  red: "#C0392B",
  redLight: "#FDEDEC",
  bg: "#F7F8FC",
  cardBg: "#FFFFFF",
  muted: "#949EAB",
  border: "#E6E6E6",
  inputBg: "#F4F5F9",
};

const fmt = (v) =>
  v >= 1e6
    ? `$${(v / 1e6).toFixed(1)}M`
    : v >= 1e3
    ? `$${(v / 1e3).toFixed(v >= 1e4 ? 0 : 1)}k`
    : `$${Math.round(v).toLocaleString()}`;

const fmtFull = (v) => `$${Math.round(v).toLocaleString()}`;

const generateId = () => Math.random().toString(36).slice(2, 9);

// ─── MATH HELPERS ─────────────────────────────────────────────
function calcMinPayment(balance) {
  return Math.max(balance * 0.02, 25);
}

function calcCreditCardPayoff(balance, apr, monthlyPayment) {
  let remaining = balance;
  const monthlyRate = apr / 100 / 12;
  let totalInterest = 0;
  let months = 0;
  const maxMonths = 600;

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

function calcLoanPayment(principal, apr, termMonths) {
  const r = apr / 100 / 12;
  if (r === 0) return principal / termMonths;
  return (principal * r * Math.pow(1 + r, termMonths)) / (Math.pow(1 + r, termMonths) - 1);
}

function calcLoanTotalInterest(principal, apr, termMonths) {
  const monthly = calcLoanPayment(principal, apr, termMonths);
  return monthly * termMonths - principal;
}

function calcInvestmentGrowth(monthlyDeposit, annualReturn, years) {
  const data = [];
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
      Invested: Math.round(totalDeposits),
      Growth: Math.round(balance - totalDeposits),
      total: Math.round(balance),
    });
  }
  return data;
}

// ─── ANIMATED NUMBER ──────────────────────────────────────────
function AnimatedNumber({ value, prefix = "$", duration = 800 }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const start = display;
    const diff = value - start;
    const startTime = performance.now();

    const animate = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(start + diff * eased));
      if (progress < 1) ref.current = requestAnimationFrame(animate);
    };

    ref.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(ref.current);
  }, [value]);

  return (
    <span>
      {prefix}
      {display.toLocaleString()}
    </span>
  );
}

// ─── BOT MESSAGE BUBBLE ──────────────────────────────────────
function BotMessage({ children, delay = 0 }) {
  const [visible, setVisible] = useState(delay === 0);

  useEffect(() => {
    if (delay > 0) {
      const t = setTimeout(() => setVisible(true), delay);
      return () => clearTimeout(t);
    }
  }, [delay]);

  if (!visible) return null;

  return (
    <div
      style={{
        display: "flex",
        gap: 12,
        alignItems: "flex-start",
        animation: "fadeSlideIn 0.4s ease-out",
        marginBottom: 16,
      }}
    >
      <div
        style={{
          width: 36,
          height: 36,
          borderRadius: "50%",
          background: `linear-gradient(135deg, ${COLORS.purple}, ${COLORS.accent})`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          boxShadow: "0 2px 8px rgba(91,106,191,0.25)",
        }}
      >
        <DollarSign size={18} color="#fff" />
      </div>
      <div
        style={{
          background: COLORS.cardBg,
          borderRadius: "4px 16px 16px 16px",
          padding: "16px 20px",
          maxWidth: "100%",
          flex: 1,
          boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
          border: `1px solid ${COLORS.border}`,
        }}
      >
        {children}
      </div>
    </div>
  );
}

// ─── CREDIT CARD INPUT ROW ────────────────────────────────────
function CardRow({ card, index, onChange, onRemove, canRemove }) {
  return (
    <div
      style={{
        display: "flex",
        gap: 10,
        alignItems: "center",
        padding: "12px 14px",
        background: COLORS.inputBg,
        borderRadius: 10,
        animation: "fadeSlideIn 0.3s ease-out",
        border: `1px solid ${COLORS.border}`,
      }}
    >
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: 8,
          background: COLORS.lightBlue,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <CreditCard size={16} color={COLORS.navy} />
      </div>

      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>
        <input
          type="text"
          placeholder={`Card ${index + 1} name (optional)`}
          value={card.name}
          onChange={(e) => onChange(card.id, "name", e.target.value)}
          style={{
            border: "none",
            background: "transparent",
            fontSize: 13,
            fontFamily: "'Work Sans', sans-serif",
            color: COLORS.muted,
            outline: "none",
            padding: 0,
          }}
        />
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <div style={{ position: "relative", flex: "1 1 140px", minWidth: 120 }}>
            <span
              style={{
                position: "absolute",
                left: 10,
                top: "50%",
                transform: "translateY(-50%)",
                color: COLORS.muted,
                fontSize: 14,
                fontFamily: "'Work Sans', sans-serif",
                fontWeight: 500,
              }}
            >
              $
            </span>
            <input
              type="number"
              placeholder="Balance"
              value={card.balance || ""}
              onChange={(e) => onChange(card.id, "balance", parseFloat(e.target.value) || 0)}
              style={{
                width: "100%",
                padding: "8px 10px 8px 22px",
                borderRadius: 6,
                border: `1px solid ${COLORS.border}`,
                fontSize: 15,
                fontFamily: "'Work Sans', sans-serif",
                fontWeight: 600,
                color: COLORS.navy,
                background: "#fff",
                outline: "none",
                boxSizing: "border-box",
              }}
            />
          </div>
          <div style={{ position: "relative", flex: "0 1 100px", minWidth: 80 }}>
            <input
              type="number"
              placeholder="APR %"
              value={card.apr || ""}
              onChange={(e) => onChange(card.id, "apr", parseFloat(e.target.value) || 0)}
              step="0.1"
              style={{
                width: "100%",
                padding: "8px 28px 8px 10px",
                borderRadius: 6,
                border: `1px solid ${COLORS.border}`,
                fontSize: 15,
                fontFamily: "'Work Sans', sans-serif",
                fontWeight: 600,
                color: COLORS.navy,
                background: "#fff",
                outline: "none",
                boxSizing: "border-box",
              }}
            />
            <span
              style={{
                position: "absolute",
                right: 10,
                top: "50%",
                transform: "translateY(-50%)",
                color: COLORS.muted,
                fontSize: 14,
                fontFamily: "'Work Sans', sans-serif",
                fontWeight: 500,
              }}
            >
              %
            </span>
          </div>
        </div>
      </div>

      {canRemove && (
        <button
          onClick={() => onRemove(card.id)}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 6,
            borderRadius: 6,
            color: COLORS.muted,
            display: "flex",
            alignItems: "center",
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = COLORS.red)}
          onMouseLeave={(e) => (e.currentTarget.style.color = COLORS.muted)}
        >
          <Trash2 size={16} />
        </button>
      )}
    </div>
  );
}

// ─── STAT CARD ────────────────────────────────────────────────
function StatCard({ label, value, sub, color, icon: Icon }) {
  return (
    <div
      style={{
        flex: "1 1 200px",
        padding: "18px 20px",
        borderRadius: 12,
        background: COLORS.cardBg,
        border: `1px solid ${COLORS.border}`,
        boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
        display: "flex",
        flexDirection: "column",
        gap: 6,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        {Icon && (
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: 7,
              background: color ? `${color}18` : COLORS.lightBlue,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Icon size={14} color={color || COLORS.accent} />
          </div>
        )}
        <span
          style={{
            fontSize: 12,
            fontFamily: "'Work Sans', sans-serif",
            fontWeight: 500,
            color: COLORS.muted,
            textTransform: "uppercase",
            letterSpacing: "0.5px",
          }}
        >
          {label}
        </span>
      </div>
      <span
        style={{
          fontSize: 24,
          fontFamily: "'Libre Franklin', sans-serif",
          fontWeight: 700,
          color: color || COLORS.navy,
          lineHeight: 1.2,
        }}
      >
        {value}
      </span>
      {sub && (
        <span
          style={{
            fontSize: 12,
            fontFamily: "'Work Sans', sans-serif",
            color: COLORS.muted,
          }}
        >
          {sub}
        </span>
      )}
    </div>
  );
}

// ─── CUSTOM TOOLTIP ───────────────────────────────────────────
function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div
      style={{
        background: "rgba(41,58,96,0.95)",
        backdropFilter: "blur(8px)",
        borderRadius: 10,
        padding: "12px 16px",
        boxShadow: "0 4px 16px rgba(0,0,0,0.2)",
        border: "none",
      }}
    >
      <div
        style={{
          fontSize: 12,
          color: "rgba(255,255,255,0.6)",
          marginBottom: 6,
          fontFamily: "'Work Sans', sans-serif",
        }}
      >
        {label}
      </div>
      {payload.map((entry, i) => (
        <div
          key={i}
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: 16,
            alignItems: "center",
            padding: "2px 0",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: 2,
                background: entry.color,
              }}
            />
            <span
              style={{
                fontSize: 12,
                color: "rgba(255,255,255,0.8)",
                fontFamily: "'Work Sans', sans-serif",
              }}
            >
              {entry.name}
            </span>
          </div>
          <span
            style={{
              fontSize: 13,
              fontWeight: 600,
              color: "#fff",
              fontFamily: "'Work Sans', sans-serif",
            }}
          >
            {fmtFull(entry.value)}
          </span>
        </div>
      ))}
    </div>
  );
}

// ─── COMPARISON BAR ───────────────────────────────────────────
function ComparisonBar({ label, value, maxValue, color, amount }) {
  const pct = maxValue > 0 ? (value / maxValue) * 100 : 0;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
        }}
      >
        <span
          style={{
            fontSize: 13,
            fontFamily: "'Work Sans', sans-serif",
            fontWeight: 500,
            color: COLORS.navy,
          }}
        >
          {label}
        </span>
        <span
          style={{
            fontSize: 16,
            fontFamily: "'Libre Franklin', sans-serif",
            fontWeight: 700,
            color,
          }}
        >
          {amount}
        </span>
      </div>
      <div
        style={{
          height: 10,
          background: COLORS.inputBg,
          borderRadius: 5,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${Math.min(pct, 100)}%`,
            height: "100%",
            background: `linear-gradient(90deg, ${color}, ${color}cc)`,
            borderRadius: 5,
            transition: "width 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        />
      </div>
    </div>
  );
}

// ─── PRIMARY BUTTON ───────────────────────────────────────────
function PrimaryButton({ children, onClick, disabled, style = {} }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        padding: "12px 28px",
        borderRadius: 10,
        border: "none",
        background: disabled
          ? COLORS.border
          : `linear-gradient(135deg, ${COLORS.purple}, ${COLORS.accent})`,
        color: disabled ? COLORS.muted : "#fff",
        fontSize: 15,
        fontFamily: "'Work Sans', sans-serif",
        fontWeight: 600,
        cursor: disabled ? "not-allowed" : "pointer",
        display: "flex",
        alignItems: "center",
        gap: 8,
        transition: "all 0.2s",
        boxShadow: disabled ? "none" : "0 2px 10px rgba(91,106,191,0.3)",
        ...style,
      }}
      onMouseEnter={(e) => {
        if (!disabled)
          e.currentTarget.style.transform = "translateY(-1px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      {children}
    </button>
  );
}

// ═══════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════
export default function DebtConsolidationCalculator() {
  // ─── STATE ────────────────────────────────────
  const [cards, setCards] = useState([
    { id: generateId(), name: "", balance: 5000, apr: 22.99 },
    { id: generateId(), name: "", balance: 3000, apr: 19.49 },
  ]);
  const [step, setStep] = useState(1);
  const [loanApr, setLoanApr] = useState(10);
  const [loanTerm, setLoanTerm] = useState(3);
  const [userAge, setUserAge] = useState(30);
  const [annualReturn, setAnnualReturn] = useState(8);
  const scrollRef = useRef(null);

  // Auto-scroll when step changes
  useEffect(() => {
    if (scrollRef.current) {
      setTimeout(() => {
        scrollRef.current.scrollTo({
          top: scrollRef.current.scrollHeight,
          behavior: "smooth",
        });
      }, 100);
    }
  }, [step]);

  // ─── CARD MANAGEMENT ─────────────────────────
  const addCard = useCallback(() => {
    setCards((prev) => [
      ...prev,
      { id: generateId(), name: "", balance: 0, apr: 0 },
    ]);
  }, []);

  const removeCard = useCallback((id) => {
    setCards((prev) => prev.filter((c) => c.id !== id));
  }, []);

  const updateCard = useCallback((id, field, value) => {
    setCards((prev) =>
      prev.map((c) => (c.id === id ? { ...c, [field]: value } : c))
    );
  }, []);

  // ─── CALCULATIONS ────────────────────────────
  const debtSummary = useMemo(() => {
    const validCards = cards.filter((c) => c.balance > 0 && c.apr > 0);
    if (validCards.length === 0)
      return {
        totalBalance: 0,
        weightedApr: 0,
        totalMinPayment: 0,
        totalInterest: 0,
        monthsToPayoff: 0,
        cards: [],
      };

    const totalBalance = validCards.reduce((s, c) => s + c.balance, 0);
    const weightedApr =
      validCards.reduce((s, c) => s + c.apr * c.balance, 0) / totalBalance;
    const totalMinPayment = validCards.reduce(
      (s, c) => s + calcMinPayment(c.balance),
      0
    );

    let totalInterest = 0;
    let maxMonths = 0;
    validCards.forEach((c) => {
      const result = calcCreditCardPayoff(
        c.balance,
        c.apr,
        calcMinPayment(c.balance)
      );
      totalInterest += result.totalInterest;
      maxMonths = Math.max(maxMonths, result.months);
    });

    return {
      totalBalance,
      weightedApr,
      totalMinPayment,
      totalInterest,
      monthsToPayoff: maxMonths,
      cards: validCards,
    };
  }, [cards]);

  const consolidation = useMemo(() => {
    if (debtSummary.totalBalance <= 0) return null;

    const termMonths = loanTerm * 12;
    const monthlyPayment = calcLoanPayment(
      debtSummary.totalBalance,
      loanApr,
      termMonths
    );
    const totalInterest = calcLoanTotalInterest(
      debtSummary.totalBalance,
      loanApr,
      termMonths
    );
    const interestSaved = debtSummary.totalInterest - totalInterest;
    const monthlySaved = debtSummary.totalMinPayment - monthlyPayment;

    return {
      monthlyPayment,
      totalInterest,
      interestSaved,
      monthlySaved,
      termMonths,
    };
  }, [debtSummary, loanApr, loanTerm]);

  const investmentData = useMemo(() => {
    if (!consolidation || consolidation.interestSaved <= 0) return null;

    const monthlyInvestment = consolidation.monthlyPayment;
    const yearsToInvest = Math.max(90 - userAge - loanTerm, 1);

    return calcInvestmentGrowth(monthlyInvestment, annualReturn, yearsToInvest);
  }, [consolidation, userAge, loanTerm, annualReturn]);

  const hasValidCards =
    cards.filter((c) => c.balance > 0 && c.apr > 0).length >= 1;

  const handleReset = () => {
    setCards([
      { id: generateId(), name: "", balance: 0, apr: 0 },
    ]);
    setStep(1);
    setLoanApr(10);
    setLoanTerm(3);
    setUserAge(30);
    setAnnualReturn(8);
  };

  // ─── RENDER ──────────────────────────────────
  return (
    <div
      style={{
        minHeight: "100vh",
        background: COLORS.bg,
        fontFamily: "'Work Sans', sans-serif",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Libre+Franklin:wght@400;500;600;700;800&family=Work+Sans:wght@400;500;600;700&display=swap');
        
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulseGlow {
          0%, 100% { box-shadow: 0 0 0 0 rgba(91,106,191,0.3); }
          50% { box-shadow: 0 0 0 8px rgba(91,106,191,0); }
        }
        
        input[type="number"]::-webkit-outer-spin-button,
        input[type="number"]::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        input[type="number"] { -moz-appearance: textfield; }
        input::placeholder { color: ${COLORS.muted}; font-weight: 400; }
        
        input[type="range"] {
          -webkit-appearance: none;
          width: 100%;
          height: 6px;
          border-radius: 3px;
          background: ${COLORS.border};
          outline: none;
        }
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: linear-gradient(135deg, ${COLORS.purple}, ${COLORS.accent});
          cursor: pointer;
          box-shadow: 0 2px 6px rgba(91,106,191,0.4);
          border: 2px solid #fff;
        }
        
        * { box-sizing: border-box; }
      `}</style>

      {/* HEADER */}
      <div
        style={{
          background: `linear-gradient(135deg, ${COLORS.purple} 0%, ${COLORS.navy} 50%, #1a2540 100%)`,
          padding: "32px 20px 28px",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -60,
            right: -60,
            width: 200,
            height: 200,
            borderRadius: "50%",
            background: "rgba(205,205,255,0.06)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -40,
            left: -40,
            width: 150,
            height: 150,
            borderRadius: "50%",
            background: "rgba(91,106,191,0.08)",
          }}
        />
        <div
          style={{
            fontSize: 12,
            fontWeight: 600,
            letterSpacing: 2,
            textTransform: "uppercase",
            color: COLORS.lilac,
            marginBottom: 8,
          }}
        >
          SwipeSwipe
        </div>
        <h1
          style={{
            fontFamily: "'Libre Franklin', sans-serif",
            fontSize: "clamp(22px, 5vw, 30px)",
            fontWeight: 800,
            color: "#fff",
            margin: 0,
            lineHeight: 1.2,
          }}
        >
          Debt Freedom Calculator
        </h1>
        <p
          style={{
            fontSize: 14,
            color: "rgba(255,255,255,0.6)",
            marginTop: 8,
            maxWidth: 400,
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          See how consolidating debt saves you money — then watch those savings grow
        </p>
      </div>

      {/* CHAT AREA */}
      <div
        ref={scrollRef}
        style={{
          maxWidth: 720,
          margin: "0 auto",
          padding: "24px 16px 100px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* ── STEP 1: ADD CARDS ── */}
        <BotMessage>
          <p
            style={{
              fontSize: 15,
              color: COLORS.navy,
              margin: 0,
              lineHeight: 1.6,
              fontWeight: 500,
            }}
          >
            👋 Let's find out how much you could save! Add your credit cards
            below — I'll show you the true cost of that debt and how to crush it.
          </p>
        </BotMessage>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 10,
            marginBottom: 16,
            animation: "fadeSlideIn 0.4s ease-out 0.2s both",
          }}
        >
          {cards.map((card, i) => (
            <CardRow
              key={card.id}
              card={card}
              index={i}
              onChange={updateCard}
              onRemove={removeCard}
              canRemove={cards.length > 1}
            />
          ))}

          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <button
              onClick={addCard}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                padding: "10px 18px",
                borderRadius: 8,
                border: `1.5px dashed ${COLORS.accent}`,
                background: "transparent",
                color: COLORS.accent,
                fontSize: 13,
                fontWeight: 600,
                cursor: "pointer",
                fontFamily: "'Work Sans', sans-serif",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = `${COLORS.accent}10`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
              }}
            >
              <Plus size={14} /> Add Another Card
            </button>

            {step === 1 && (
              <PrimaryButton
                onClick={() => setStep(2)}
                disabled={!hasValidCards}
              >
                Show My Savings <ArrowRight size={16} />
              </PrimaryButton>
            )}
          </div>
        </div>

        {/* ── STEP 2: DEBT SUMMARY + CONSOLIDATION ── */}
        {step >= 2 && debtSummary.totalBalance > 0 && (
          <>
            <BotMessage delay={200}>
              <p
                style={{
                  fontSize: 15,
                  color: COLORS.navy,
                  margin: "0 0 4px",
                  fontWeight: 500,
                }}
              >
                📊 Here's the picture. At minimum payments, you'd pay{" "}
                <strong style={{ color: COLORS.red }}>
                  {fmtFull(Math.round(debtSummary.totalInterest))}
                </strong>{" "}
                in interest alone! Let's fix that.
              </p>
            </BotMessage>

            {/* Summary Stats */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 12,
                marginBottom: 20,
                animation: "fadeSlideIn 0.4s ease-out 0.4s both",
              }}
            >
              <StatCard
                label="Total Debt"
                value={fmtFull(Math.round(debtSummary.totalBalance))}
                sub={`Across ${debtSummary.cards.length} card${debtSummary.cards.length > 1 ? "s" : ""}`}
                icon={CreditCard}
                color={COLORS.navy}
              />
              <StatCard
                label="Avg APR"
                value={`${debtSummary.weightedApr.toFixed(1)}%`}
                sub="Weighted average"
                icon={Percent}
                color={COLORS.red}
              />
              <StatCard
                label="Interest Cost"
                value={fmtFull(Math.round(debtSummary.totalInterest))}
                sub={`Over ${Math.ceil(debtSummary.monthsToPayoff / 12)} years at min. payments`}
                icon={TrendingUp}
                color={COLORS.red}
              />
            </div>

            {/* Consolidation Controls */}
            <BotMessage delay={600}>
              <p
                style={{
                  fontSize: 15,
                  color: COLORS.navy,
                  margin: "0 0 16px",
                  fontWeight: 500,
                }}
              >
                🎯 Now let's see what a consolidation loan could look like.
                Adjust the rate and term:
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                {/* APR Slider */}
                <div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: 8,
                    }}
                  >
                    <span
                      style={{
                        fontSize: 13,
                        color: COLORS.muted,
                        fontWeight: 500,
                      }}
                    >
                      Loan APR
                    </span>
                    <span
                      style={{
                        fontSize: 15,
                        color: COLORS.accent,
                        fontWeight: 700,
                        fontFamily: "'Libre Franklin', sans-serif",
                      }}
                    >
                      {loanApr}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min="3"
                    max="36"
                    step="0.5"
                    value={loanApr}
                    onChange={(e) => setLoanApr(parseFloat(e.target.value))}
                  />
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginTop: 4,
                    }}
                  >
                    <span style={{ fontSize: 11, color: COLORS.muted }}>
                      3%
                    </span>
                    <span style={{ fontSize: 11, color: COLORS.muted }}>
                      36%
                    </span>
                  </div>
                </div>

                {/* Term Slider */}
                <div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: 8,
                    }}
                  >
                    <span
                      style={{
                        fontSize: 13,
                        color: COLORS.muted,
                        fontWeight: 500,
                      }}
                    >
                      Loan Term
                    </span>
                    <span
                      style={{
                        fontSize: 15,
                        color: COLORS.accent,
                        fontWeight: 700,
                        fontFamily: "'Libre Franklin', sans-serif",
                      }}
                    >
                      {loanTerm} year{loanTerm > 1 ? "s" : ""}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="7"
                    step="1"
                    value={loanTerm}
                    onChange={(e) => setLoanTerm(parseInt(e.target.value))}
                  />
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginTop: 4,
                    }}
                  >
                    <span style={{ fontSize: 11, color: COLORS.muted }}>
                      1 yr
                    </span>
                    <span style={{ fontSize: 11, color: COLORS.muted }}>
                      7 yrs
                    </span>
                  </div>
                </div>
              </div>
            </BotMessage>

            {/* Comparison */}
            {consolidation && (
              <div
                style={{
                  background: COLORS.cardBg,
                  borderRadius: 14,
                  padding: "20px 22px",
                  marginBottom: 20,
                  border: `1px solid ${COLORS.border}`,
                  boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                  animation: "fadeSlideIn 0.4s ease-out",
                }}
              >
                <h3
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: COLORS.navy,
                    margin: "0 0 16px",
                    textTransform: "uppercase",
                    letterSpacing: 0.5,
                  }}
                >
                  Interest Comparison
                </h3>

                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  <ComparisonBar
                    label="Current Cards (min. payments)"
                    value={debtSummary.totalInterest}
                    maxValue={debtSummary.totalInterest}
                    color={COLORS.red}
                    amount={fmtFull(Math.round(debtSummary.totalInterest))}
                  />
                  <ComparisonBar
                    label={`Consolidation Loan (${loanApr}%, ${loanTerm}yr)`}
                    value={consolidation.totalInterest}
                    maxValue={debtSummary.totalInterest}
                    color={COLORS.green}
                    amount={fmtFull(Math.round(consolidation.totalInterest))}
                  />
                </div>

                {consolidation.interestSaved > 0 ? (
                  <div
                    style={{
                      marginTop: 18,
                      padding: "14px 18px",
                      borderRadius: 10,
                      background: COLORS.greenLight,
                      border: `1px solid ${COLORS.green}25`,
                      textAlign: "center",
                    }}
                  >
                    <div
                      style={{
                        fontSize: 13,
                        color: COLORS.green,
                        fontWeight: 500,
                        marginBottom: 2,
                      }}
                    >
                      You could save
                    </div>
                    <div
                      style={{
                        fontSize: 28,
                        fontFamily: "'Libre Franklin', sans-serif",
                        fontWeight: 800,
                        color: COLORS.green,
                      }}
                    >
                      <AnimatedNumber
                        value={Math.round(consolidation.interestSaved)}
                      />
                    </div>
                    <div
                      style={{
                        fontSize: 12,
                        color: COLORS.green,
                        opacity: 0.7,
                        marginTop: 2,
                      }}
                    >
                      in total interest • Monthly payment:{" "}
                      {fmtFull(Math.round(consolidation.monthlyPayment))}/mo
                    </div>
                  </div>
                ) : (
                  <div
                    style={{
                      marginTop: 18,
                      padding: "14px 18px",
                      borderRadius: 10,
                      background: COLORS.redLight,
                      border: `1px solid ${COLORS.red}25`,
                      textAlign: "center",
                    }}
                  >
                    <div
                      style={{
                        fontSize: 13,
                        color: COLORS.red,
                        fontWeight: 600,
                      }}
                    >
                      ⚠️ At this rate, consolidation costs more. Try lowering
                      the APR or shortening the term.
                    </div>
                  </div>
                )}

                {step === 2 && consolidation.interestSaved > 0 && (
                  <div style={{ textAlign: "center", marginTop: 16 }}>
                    <PrimaryButton
                      onClick={() => setStep(3)}
                      style={{ margin: "0 auto" }}
                    >
                      What If I Invest My Savings? <TrendingUp size={16} />
                    </PrimaryButton>
                  </div>
                )}
              </div>
            )}
          </>
        )}

        {/* ── STEP 3: INVESTMENT PROJECTION ── */}
        {step >= 3 && consolidation && consolidation.interestSaved > 0 && (
          <>
            <BotMessage delay={200}>
              <p
                style={{
                  fontSize: 15,
                  color: COLORS.navy,
                  margin: "0 0 4px",
                  fontWeight: 500,
                }}
              >
                🚀 Here's where it gets exciting. Once your debt is paid off in{" "}
                <strong>{loanTerm} year{loanTerm > 1 ? "s" : ""}</strong>, what
                if you invested that same{" "}
                <strong>
                  {fmtFull(Math.round(consolidation.monthlyPayment))}/month
                </strong>{" "}
                into the market until you're 90?
              </p>
            </BotMessage>

            <div
              style={{
                background: COLORS.cardBg,
                borderRadius: 14,
                padding: "20px 22px",
                marginBottom: 20,
                border: `1px solid ${COLORS.border}`,
                boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                animation: "fadeSlideIn 0.4s ease-out 0.3s both",
              }}
            >
              {/* Controls */}
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 16,
                  marginBottom: 20,
                }}
              >
                <div style={{ flex: "1 1 140px" }}>
                  <label
                    style={{
                      fontSize: 12,
                      color: COLORS.muted,
                      fontWeight: 500,
                      display: "block",
                      marginBottom: 6,
                    }}
                  >
                    Your Current Age
                  </label>
                  <input
                    type="number"
                    value={userAge}
                    onChange={(e) =>
                      setUserAge(
                        Math.max(18, Math.min(85, parseInt(e.target.value) || 30))
                      )
                    }
                    style={{
                      width: "100%",
                      padding: "10px 14px",
                      borderRadius: 8,
                      border: `1px solid ${COLORS.border}`,
                      fontSize: 16,
                      fontWeight: 600,
                      color: COLORS.navy,
                      background: COLORS.inputBg,
                      outline: "none",
                      fontFamily: "'Work Sans', sans-serif",
                    }}
                  />
                </div>
                <div style={{ flex: "1 1 160px" }}>
                  <label
                    style={{
                      fontSize: 12,
                      color: COLORS.muted,
                      fontWeight: 500,
                      display: "block",
                      marginBottom: 6,
                    }}
                  >
                    Expected Annual Return
                  </label>
                  <div style={{ display: "flex", gap: 6 }}>
                    {[6, 8, 10, 12].map((r) => (
                      <button
                        key={r}
                        onClick={() => setAnnualReturn(r)}
                        style={{
                          flex: 1,
                          padding: "10px 4px",
                          borderRadius: 8,
                          border:
                            annualReturn === r
                              ? `2px solid ${COLORS.accent}`
                              : `1px solid ${COLORS.border}`,
                          background:
                            annualReturn === r
                              ? `${COLORS.accent}12`
                              : COLORS.inputBg,
                          color:
                            annualReturn === r ? COLORS.accent : COLORS.navy,
                          fontSize: 14,
                          fontWeight: 600,
                          cursor: "pointer",
                          fontFamily: "'Work Sans', sans-serif",
                          transition: "all 0.15s",
                        }}
                      >
                        {r}%
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Investment Result */}
              {investmentData && investmentData.length > 0 && (
                <>
                  <div
                    style={{
                      textAlign: "center",
                      padding: "20px 16px",
                      borderRadius: 12,
                      background: `linear-gradient(135deg, ${COLORS.purple}08, ${COLORS.accent}12)`,
                      border: `1px solid ${COLORS.accent}20`,
                      marginBottom: 20,
                    }}
                  >
                    <div
                      style={{
                        fontSize: 13,
                        color: COLORS.muted,
                        fontWeight: 500,
                        marginBottom: 4,
                      }}
                    >
                      By age 90, your investment could grow to
                    </div>
                    <div
                      style={{
                        fontSize: "clamp(30px, 6vw, 42px)",
                        fontFamily: "'Libre Franklin', sans-serif",
                        fontWeight: 800,
                        color: COLORS.accent,
                        lineHeight: 1.2,
                      }}
                    >
                      <AnimatedNumber
                        value={
                          investmentData[investmentData.length - 1]?.total || 0
                        }
                      />
                    </div>
                    <div
                      style={{
                        fontSize: 12,
                        color: COLORS.muted,
                        marginTop: 6,
                      }}
                    >
                      Investing{" "}
                      {fmtFull(Math.round(consolidation.monthlyPayment))}/mo •{" "}
                      {annualReturn}% avg return •{" "}
                      {90 - userAge - loanTerm} years
                    </div>
                  </div>

                  {/* Chart */}
                  <div style={{ width: "100%", height: 300 }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        data={investmentData}
                        margin={{ top: 10, right: 10, left: 10, bottom: 5 }}
                      >
                        <defs>
                          <linearGradient
                            id="investedGrad"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                          >
                            <stop
                              offset="5%"
                              stopColor={COLORS.purple}
                              stopOpacity={0.3}
                            />
                            <stop
                              offset="95%"
                              stopColor={COLORS.purple}
                              stopOpacity={0.05}
                            />
                          </linearGradient>
                          <linearGradient
                            id="growthGrad"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                          >
                            <stop
                              offset="5%"
                              stopColor={COLORS.accent}
                              stopOpacity={0.4}
                            />
                            <stop
                              offset="95%"
                              stopColor={COLORS.accent}
                              stopOpacity={0.05}
                            />
                          </linearGradient>
                        </defs>
                        <CartesianGrid
                          strokeDasharray="3 3"
                          vertical={false}
                          stroke={COLORS.border}
                        />
                        <XAxis
                          dataKey="label"
                          stroke={COLORS.muted}
                          tick={{ fontSize: 11 }}
                          interval={Math.max(
                            Math.floor(investmentData.length / 6) - 1,
                            0
                          )}
                        />
                        <YAxis
                          tickFormatter={fmt}
                          stroke={COLORS.muted}
                          tick={{ fontSize: 11 }}
                          width={55}
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend
                          wrapperStyle={{
                            fontSize: 12,
                            fontFamily: "'Work Sans', sans-serif",
                          }}
                        />
                        <Area
                          type="monotone"
                          dataKey="Invested"
                          stackId="1"
                          stroke={COLORS.purple}
                          fill="url(#investedGrad)"
                          strokeWidth={2}
                        />
                        <Area
                          type="monotone"
                          dataKey="Growth"
                          stackId="1"
                          stroke={COLORS.accent}
                          fill="url(#growthGrad)"
                          strokeWidth={2}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Summary Row */}
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 10,
                      marginTop: 16,
                    }}
                  >
                    <StatCard
                      label="Total Invested"
                      value={fmtFull(
                        investmentData[investmentData.length - 1]?.Invested || 0
                      )}
                      icon={DollarSign}
                      color={COLORS.purple}
                    />
                    <StatCard
                      label="Market Growth"
                      value={fmtFull(
                        investmentData[investmentData.length - 1]?.Growth || 0
                      )}
                      icon={TrendingUp}
                      color={COLORS.accent}
                    />
                  </div>
                </>
              )}
            </div>

            {/* Final CTA */}
            <BotMessage delay={500}>
              <p
                style={{
                  fontSize: 15,
                  color: COLORS.navy,
                  margin: 0,
                  fontWeight: 500,
                  lineHeight: 1.6,
                }}
              >
                💰 By consolidating your debt and then investing the payments,
                you're not just saving{" "}
                <strong style={{ color: COLORS.green }}>
                  {fmtFull(Math.round(consolidation?.interestSaved || 0))}
                </strong>{" "}
                in interest — you're building{" "}
                <strong style={{ color: COLORS.accent }}>
                  {fmtFull(
                    investmentData?.[investmentData.length - 1]?.total || 0
                  )}
                </strong>{" "}
                in wealth. That's the SwipeSwipe way: turn overspending into
                freedom. 🎉
              </p>
            </BotMessage>

            <div
              style={{
                textAlign: "center",
                marginTop: 8,
                animation: "fadeSlideIn 0.4s ease-out 0.7s both",
              }}
            >
              <button
                onClick={handleReset}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "10px 20px",
                  borderRadius: 8,
                  border: `1px solid ${COLORS.border}`,
                  background: COLORS.cardBg,
                  color: COLORS.muted,
                  fontSize: 13,
                  fontWeight: 500,
                  cursor: "pointer",
                  fontFamily: "'Work Sans', sans-serif",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = COLORS.accent;
                  e.currentTarget.style.color = COLORS.accent;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = COLORS.border;
                  e.currentTarget.style.color = COLORS.muted;
                }}
              >
                <RotateCcw size={14} /> Start Over
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
