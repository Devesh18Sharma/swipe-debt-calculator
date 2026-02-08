import { Box, Typography } from '@mui/material';
import { useCalculatorReducer } from './hooks/useCalculatorReducer';
import { useDebtCalculations } from './hooks/useDebtCalculations';
import { useAutoScroll } from './hooks/useAutoScroll';
import CalculatorHeader from './components/CalculatorHeader';
import BotMessage from './components/BotMessage';
import CardInputList from './components/CardInputList';
import CreditScoreSelector from './components/CreditScoreSelector';
import DebtSummaryStats from './components/DebtSummaryStats';
import DebtPayoffChart from './components/DebtPayoffChart';
import ConsolidationControls from './components/ConsolidationControls';
import InterestComparison from './components/InterestComparison';
import InvestmentProjection from './components/InvestmentProjection';
import FinalSummary from './components/FinalSummary';
import LegalDisclaimer from './components/LegalDisclaimer';
import { formatFull } from './utils/formatters';

export default function DebtCalculatorPage() {
  const {
    state,
    addCard,
    removeCard,
    updateCard,
    goToStep,
    setLoanApr,
    setLoanTerm,
    setUserAge,
    setAnnualReturn,
    setCreditScore,
    reset,
    hasValidCards,
  } = useCalculatorReducer();

  const { debtSummary, consolidation, debtPayoffData, investmentData } =
    useDebtCalculations(state);

  const scrollRef = useAutoScroll([state.step, state.creditScore]);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: 'background.default',
        fontFamily: "'Work Sans', sans-serif",
      }}
    >
      <CalculatorHeader />

      {/* Chat Area */}
      <Box
        ref={scrollRef}
        sx={{
          maxWidth: 720,
          mx: 'auto',
          px: 2,
          pt: 3,
          pb: '100px',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* ── STEP 1: ADD CARDS ── */}
        <BotMessage>
          <Typography
            sx={{
              fontSize: 15,
              color: 'custom.navy',
              m: 0,
              lineHeight: 1.6,
              fontWeight: 500,
              fontFamily: "'Work Sans', sans-serif",
            }}
          >
            Let&apos;s find out how much you could save! Add your credit cards
            below — I&apos;ll show you the true cost of that debt and how to
            crush it.
          </Typography>
        </BotMessage>

        <CardInputList
          cards={state.cards}
          onAdd={addCard}
          onRemove={removeCard}
          onChange={updateCard}
          onSubmit={() => goToStep(2)}
          showSubmit={state.step === 1}
          canSubmit={hasValidCards}
        />

        {/* ── STEP 2: CREDIT SCORE (gated step with skip) ── */}
        {state.step >= 2 && (
          <CreditScoreSelector
            selected={state.creditScore}
            onSelect={setCreditScore}
            onContinue={() => goToStep(3)}
            onSkip={() => goToStep(3)}
            showActions={state.step === 2}
          />
        )}

        {/* ── STEP 3: DEBT ANALYSIS + CONSOLIDATION ── */}
        {state.step >= 3 && debtSummary.totalBalance > 0 && (
          <>
            <BotMessage delay={200}>
              <Typography
                sx={{
                  fontSize: 15,
                  color: 'custom.navy',
                  m: 0,
                  mb: 0.5,
                  fontWeight: 500,
                  fontFamily: "'Work Sans', sans-serif",
                }}
              >
                Here&apos;s the picture. At current payments, you&apos;d pay{' '}
                <Box component="strong" sx={{ color: 'custom.red' }}>
                  {formatFull(Math.round(debtSummary.totalInterest))}
                </Box>{' '}
                in interest alone! Let&apos;s fix that.
              </Typography>
            </BotMessage>

            <DebtSummaryStats debtSummary={debtSummary} />

            <ConsolidationControls
              loanApr={state.loanApr}
              loanTerm={state.loanTermYears}
              creditScore={state.creditScore}
              onAprChange={setLoanApr}
              onTermChange={setLoanTerm}
            />

            {consolidation && debtPayoffData.length > 1 && (
              <DebtPayoffChart data={debtPayoffData} />
            )}

            {consolidation && (
              <InterestComparison
                debtSummary={debtSummary}
                consolidation={consolidation}
                loanApr={state.loanApr}
                loanTerm={state.loanTermYears}
                step={state.step}
                onAdvance={() => goToStep(4)}
              />
            )}
          </>
        )}

        {/* ── STEP 4: INVESTMENT PROJECTION ── */}
        {state.step >= 4 &&
          consolidation &&
          consolidation.interestSaved > 0 && (
            <>
              <BotMessage delay={200}>
                <Typography
                  sx={{
                    fontSize: 15,
                    color: 'custom.navy',
                    m: 0,
                    mb: 0.5,
                    fontWeight: 500,
                    fontFamily: "'Work Sans', sans-serif",
                  }}
                >
                  Here&apos;s where it gets exciting. Once your debt is paid off
                  in{' '}
                  <strong>
                    {state.loanTermYears} year
                    {state.loanTermYears > 1 ? 's' : ''}
                  </strong>
                  , what if you invested that same{' '}
                  <strong>
                    {formatFull(Math.round(consolidation.monthlyPayment))}/month
                  </strong>{' '}
                  into the market until you&apos;re 90?
                </Typography>
              </BotMessage>

              {investmentData && investmentData.length > 0 && (
                <InvestmentProjection
                  investmentData={investmentData}
                  consolidation={consolidation}
                  annualReturn={state.annualReturn}
                  userAge={state.userAge}
                  loanTerm={state.loanTermYears}
                  onAgeChange={setUserAge}
                  onReturnChange={setAnnualReturn}
                />
              )}

              {investmentData && investmentData.length > 0 && (
                <FinalSummary
                  consolidation={consolidation}
                  investmentData={investmentData}
                  onReset={reset}
                />
              )}
            </>
          )}

        <LegalDisclaimer />
      </Box>
    </Box>
  );
}
