import { GlobalStyles } from '@mui/material';
import AppTheme from './theme/AppTheme';
import { globalStyles } from './theme/globalStyles';
import { DebtCalculatorPage } from './features/DebtCalculator';

export default function App() {
  return (
    <AppTheme>
      <GlobalStyles styles={globalStyles} />
      <DebtCalculatorPage />
    </AppTheme>
  );
}
