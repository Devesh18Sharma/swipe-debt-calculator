https://www.nerdwallet.com/personal-loans/calculators/debt-consolidation?utm_source=chatgpt.com
nerdwallet.com
Debt Consolidation Calculator - NerdWallet
NerdWallet's debt consolidation calculator helps you compare ways to consolidate debt and estimates your savings with a debt consolidation loan.
https://www.nerdwallet.com/personal-loans/calculators/debt-consolidation?utm_source=chatgpt.com
[12:47 AM]
And perhaps we can change to format and do it as a bot, something similar to what we have done with See How Rich You Can Get
[12:47 AM]
We will just ask the user to input their credit card Balance and Interest rates for as many cards as they want
[12:48 AM]
then we show them the savings in Interest paid over time
[12:49 AM]
and then we show them after they pay off their debt what if they invest a similar amount into the market until they are 90, similar to what we have already done
....
so we have to build this calculator for swipeswipe
and if we can show some visual chart that would also be great 

We have to build this for swipeswipe 
we already have a saving calculator:this is for reference of the web ui of swipeswipe:src/features/Calculator/CalculatorWidget.tsx:
src/features/Calculator/components/CalculatorChart.tsx: import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer } from 'recharts';
import { ChartDataPoint } from '../types';
import { formatCurrency } from '../../../utilites/format-utils';
interface CalculatorChartProps {
    chartData: ChartDataPoint[];
}
export const CalculatorChart = ({ chartData }: CalculatorChartProps) => {
    const formatAxisText = (value: number) => {
        if (value >= 1e6) {
            return formatCurrency(value / 1e6) + 'M';
        } else if (value >= 1e3) {
            return formatCurrency(value / 1e3) + 'k';
        }
        return value.toString();
    };
    if (chartData.length === 0) {
        return null;
    }
    return (
        <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <XAxis dataKey="year" stroke="#949EAB" />
                <YAxis tickFormatter={formatAxisText} stroke="#949EAB" />
                <Tooltip
                    cursor={{ fill: '#E6E6E6' }}
                    formatter={(value: number, name: string) => [formatCurrency(value), name]}
                    labelFormatter={(label) => `Year ${label}`}
                />
                <CartesianGrid strokeWidth="1" vertical={false} />
                <Legend />
                <Bar dataKey="Investment" stackId="a" fill="#343458" />
                <Bar dataKey="Return" stackId="a" fill="#cdcdff" />
            </BarChart>
        </ResponsiveContainer>
    );
};
import { Typography, Box } from '@mui/material';
import { CalculatorResults as CalculatorResultsType } from '../types';
import { Currency } from '../../../components/Currency.tsx';
interface CalculatorResultsProps {
    results: CalculatorResultsType;
    hasInputs: boolean;
}
export const CalculatorResults = ({ results, hasInputs }: CalculatorResultsProps) => {
    const displayValue = hasInputs ? results.futureBalance : 0;
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '12px',
                width: '100%',
                minHeight: '128px',
                justifyContent: hasInputs ? 'flex-start' : 'center',
            }}
        >
            <Typography
                sx={{
                    fontFamily: 'Libre Franklin',
                    fontWeight: 500,
                    fontSize: '16px',
                    lineHeight: '40px',
                    color: '#293A60',
                    textAlign: 'center',
                    width: '184px',
                    height: '40px',
                }}
            >
                Potential Future Savings
            </Typography>
            <Typography
                sx={{
                    fontFamily: 'Libre Franklin',
                    fontWeight: 500,
                    fontSize: { xs: '24px', sm: '30px', md: '36px' },
                    lineHeight: '44px',
                    color: '#293A60',
                    width: '196px',
                    height: '44px',
                    textAlign: 'center',
                }}
            >
                <Currency value={displayValue} />
            </Typography>
        </Box>
    );
};
SO please act as a senior software developer use best practices and create a calulcutor : Alex  [12:46 AM]
https://www.nerdwallet.com/personal-loans/calculators/debt-consolidation?utm_source=chatgpt.com
nerdwallet.com
Debt Consolidation Calculator - NerdWallet
NerdWallet's debt consolidation calculator helps you compare ways to consolidate debt and estimates your savings with a debt consolidation loan.
https://www.nerdwallet.com/personal-loans/calculators/debt-consolidation?utm_source=chatgpt.com
[12:47 AM]
And perhaps we can change to format and do it as a bot, something similar to what we have done with See How Rich You Can Get
[12:47 AM]
We will just ask the user to input their credit card Balance and Interest rates for as many cards as they want
[12:48 AM]
then we show them the savings in Interest paid over time
[12:49 AM]
and then we show them after they pay off their debt what if they invest a similar amount into the market until they are 90, similar to what we have already done
This calulator we want for swipeswipe
Code in React+TS+Vite+Mui 
and Act as a Award winning UI UX designer who has 3 decades of experiece make the UI responsive
and Act as a product manager and product woner for swipeswipe
More about swipeswipe: https://swipeswipe.co/
https://chromewebstore.google.com/detail/swipeswipe/jmephhldhjnmcmmnmgoiibamhgeoolbl?utm_source=ext_app_menu&pli=1
more about swipeswipe:Subscribed to page notifications from people you may know. Click to manage.
SwipeSwipe
We turn overspending into wealth
Financial Services
99 followers
2-10 employees
Alex works here
MessageFollowing
* Home
* About
* Posts
* Jobs
* People
Overview
Have you ever received your credit card statements and realized that you have been spending more than you thought on sites like Amazon? If yes, download our Chrome extension and you will have an ability to control how you spend online.   We are helping consumers make better shopping decisions. All of us buy many items base on emotions at that moment, we want you to be able to buy what you need and what has value.  We let you set your guilt free daily/weekly/monthly spending allowances and when you spend more than you wanted we tell you. We help you build better habits and keep more of your money in your pocket.  Our goal is to help you reduce your stress about money. Gain your financial independence.   Or perhaps you want to retire, buy a house, send your kids to an amazing college, buy a new car, or just save for a nice vacation.   We will help you rescue your dollars from online overspending and then save and grow it.  Download our extension today:  https://chromewebstore.google.com/detail/swipeswipe/jmephhldhjnmcmmnmgoiibamhgeoolbl
Website
swipeswipe.co
Industry
Financial Services
Company size
2-10 employees
5 associated members LinkedIn members who’ve listed SwipeSwipe as their current workplace on their profile.
So please create this calucltor use your brain 
This is a million dollar company please we have thousand of real users we wanna help thrugh this
Give yiur bestest
NerdWallet Home PageNerdWallet Home Page
Personal Loans
Debt Consolidation Calculator
Advertiser disclosure
Debt Consolidation Calculator
Plug in your current debts to see ways to consolidate, and estimate your savings with a consolidation loan.

Jan 8, 2026

Fact Checked
Profile photo of Jackie Veling
Written by 
Jackie Veling
Lead Writer & Content Strategist
Profile photo of Kim Lowe
Edited by 
Kim Lowe
Head of Content, Personal & Student Loans
The debt consolidation calculator below can help you decide if consolidation is right for you. The calculator will suggest the best way to consolidate your debt and estimate your savings with a debt consolidation loan.

You can also see our picks for the best debt consolidation loans.

Debt consolidation calculator

How to use our debt consolidation calculator
Step 1: Enter the balances, interest rates and monthly payments you currently make toward your unsecured debts. This may include credit cards, personal loans and payday loans.

Don't include secured debts like car loans or low-rate student loans here. There are better ways to manage those debts. (Learn more about auto refinancing and student loan refinance options.)

Click "I'm done" and then “Calculate.” Based on the figures you entered, the calculator shows:

Total balance: The sum of all your debts, or what you owe in total.

Combined interest rate: Your average weighted interest rate for all the debts you put in the calculator.

Total monthly payment: The amount you're paying monthly toward these debts. 

When you'll be debt-free: The amount of time until you are debt-free, based on your current balance and monthly payments.

Step 2: Choose your credit score range to see your debt consolidation options. Depending on the size of your debt and credit score, a balance transfer card or debt consolidation loan may be a good fit.

If you’re interested in a consolidation loan, drag the sliders below the table to enter an estimated APR (the loan’s interest rate, plus fees) and the repayment term you want (in years) for the new loan.

Step 3: Look at the comparison between your current debts and the new debt consolidation loan.

Debt consolidation makes the most sense when your new total payment is less than your current total payment, and you save money on interest.

See how the calculator works with $20,000 in credit card debt













Ways to consolidate debt
Debt consolidation loan: These loans, usually from an online lender, credit union or bank, provide a large amount of money to pay off multiple debts at once. This leaves you with only one monthly debt payment. Terms on debt consolidation loans typically range from one to seven years.

Balance transfer credit card: This option transfers your existing credit card debt to a new credit card that charges no interest for a promotional period, typically 15 to 21 months. This makes the debt easier to pay off, since you aren’t spending money on interest.

Debt management plan: This option combines several debts, usually credit cards, into a single monthly payment at a lower interest rate. A credit counseling agency can enroll you in a debt management plan and charges small startup and monthly fees. It usually takes three to five years to repay the debt.

Home equity loan: If you own your home, you may be able to get a loan based on the equity in your home to pay off your other debts. But you risk losing your home if you don’t keep up with the payments.

Retirement account loan: If you have an employer-sponsored retirement account, like a 401(k), you could take out some of that money to pay off your debts. The downsides are less funds for your retirement, and if you can’t repay the loan, you’ll owe penalties and taxes.

Debt consolidation options for bad credit
Debt consolidation loans for bad credit are available from many online lenders. These loans have terms up to seven years, and amounts can be as high as $50,000. Some lenders may have a minimum credit score requirement between 550 and 600, while others may accept borrowers with no minimum credit score.

Credit unions are another smart place to turn, since they tend to look more favorably on bad-credit borrowers. Check with your local credit union first, though you can also look for national credit unions that offer personal loans.

If you can’t qualify for a debt consolidation loan with a low enough interest rate, debt payoff options like the debt snowball and debt avalanche methods are good alternatives. These DIY strategies can be extremely effective and don’t require you to apply for credit.

Do debt consolidation loans hurt my credit score?
You may see a temporary dip in your credit score after applying for a debt consolidation loan. That’s because lenders require a hard credit pull as part of the application, which knocks a few points off your score.

However, if you make on-time payments on the new loan and avoid running up new debt, your credit scores should rebound and even grow over time. This can make it easier to qualify for more affordable financing in the future.

» MORE: Does debt consolidation hurt your credit?

Weigh the pros and cons of debt consolidation
If you’re not sure whether debt consolidation is right for you, consider the benefits and risks to consolidating your debts.

Pros
You pay less in interest.

You may get out of debt faster.

You have only one payment.

You have a clear finish line.

Cons
You still have debt you need to manage.

Consolidation won’t fix core spending issues.

Pros of debt consolidation
You pay less in interest: If you consolidate with a product that has a lower interest rate than your credit cards or other debts, you’ll save money on interest. This can make getting out of debt easier.

You may get out of debt faster: Since you’re paying less interest, you could potentially apply those savings to your debt repayment and get out of debt even faster.

You have only one payment: Instead of juggling multiple debt repayments, consolidating your debts means you only have to worry about making one payment. This can help you avoid late fees or additional interest.

You have a clear finish line: Paying off debt is challenging, but with consolidation, you have a clear plan and a finish line to work toward. As long as you make your payments on time, you’ll know when you’ll be out of debt for good.

Cons of debt consolidation
You may not qualify for a low enough rate: Depending on your credit score, you may not be able to qualify for a lower interest rate than your current debts. In this case, consolidation may not be the best option.

You still have debt you need to manage: Debt consolidation doesn’t mean you’re debt-free. You still have to manage payments for your new loan, balance-transfer card or other consolidation product.

Consolidation won’t fix core spending issues: If you struggle with chronic overspending, consolidation may make things worse. This is especially true if you’re consolidating credit card debt, since consolidation “frees up” your credit cards by moving the existing balance elsewhere. 

Which lender is right for me?
NerdWallet has reviewed more than 30 lenders to help you choose one that’s right for you. Below is a list of lenders that offer standout debt consolidation loans.

Personal loans from our partners


Debt Consolidation

Big Purchase

Emergency

Home Improvement

Medical
SoFi logo
SoFi

4.5NerdWallet rating 
APR 
8.74- 35.49%

Loan amount 
$5K- $100K

Lightstream logo
LightStream

4.5NerdWallet rating 
APR 
6.49- 24.89%

Loan amount 
$5K- $100K

BestEgg logo
Best Egg

4.5NerdWallet rating 
APR 
6.99- 35.99%

Loan amount 
$2K- $50K

NerdWallet Home Page
Finance Smarter
about
Company
Leadership
Careers
Corporate impact
Diversity & Inclusion
Editorial guidelines
Star rating methodologies
Editorial team
Press
Press kit
Investors
help
Help center
Security FAQs
legal
Terms of use
Supplier Code of Conduct
Privacy policy
California privacy policy
Privacy preferences
Do not sell or share my personal information
Learn more about the app
Download the app

Download on the App Store
4.8
121,000+ reviews
Get it on Google Play
4.3
31,200+ reviews
QR code for downloading the app
Disclaimer: NerdWallet strives to keep its information accurate and up to date. This information may be different than what you see when you visit a financial institution, service provider or specific product's site. All financial products, shopping products and services are presented without warranty. When evaluating offers, please review the financial institution's Terms and Conditions. Pre-qualified offers are not binding. If you find discrepancies with your credit score or information from your credit report, please contact TransUnion® directly.

NerdWallet Compare, Inc. NMLS ID# 1617539

NMLS Consumer Access | Licenses and Disclosures

California: California Finance Lender loans arranged pursuant to Department of Financial Protection and Innovation Finance Lenders License #60DBO-74812

Insurance Services offered through NerdWallet Insurance Services, Inc. (CA resident license no.OK92033)   Insurance Licenses

Fundera, Inc. NMLS ID# 1240038

NMLS Consumer Access

California: California Finance Lender loans arranged pursuant to the Department of Financial Protection and Innovation Finance Lenders License #603L288

NerdWallet has engaged Atomic Invest LLC (“Atomic”), an SEC-registered investment adviser, to bring you the opportunity to open investment advisory accounts (Automated Investing Account and/or Treasury Account) with Atomic. NerdWallet receives compensation of 0% to 0.85% of assets under management annualized, payable monthly, for each referred client who opens an Atomic account and a percentage of free cash interest earned by clients, which creates a conflict of interest. Brokerage services for Atomic are provided by Atomic Brokerage LLC ("Atomic Brokerage"), member of FINRA/SIPC and an affiliate of Atomic, which creates a conflict of interest. See details about Atomic, in their Form CRS, Form ADV Part 2A and Privacy Policy. See details about Atomic Brokerage in their Form CRS, General Disclosures, fee schedule, and FINRA’s BrokerCheck.

You also can open a Cash Account offered by Atomic Brokerage which allows you to earn interest on your cash through a cash sweep program. View Important Cash Account Disclosures.

Neither Atomic Invest nor Atomic Brokerage, nor any of their affiliates is a bank. Investments in securities: Not FDIC Insured, Not Bank Guaranteed, May Lose Value. Investing involves risk, including the possible loss of principal. Before investing, consider your investment objectives and the fees and expenses charged.

Images are for illustrative purposes only.

NerdWallet™ | 4150 N Drinkwater Blvd, Suite 200, Scottsdale, AZ 85251

USANerdWallet USA
|
UKNerdWallet UK
|import { Box, Paper } from '@mui/material';
import { useState, useMemo, useCallback } from 'react';
import { CalculatorForm } from './components/CalculatorForm';
import { CalculatorResults } from './components/CalculatorResults';
import { CalculatorChart } from './components/CalculatorChart';
import { CalculatorInputs, CalculatorResults as CalculatorResultsType, ChartDataPoint, DepositFrequency } from './types';

const DEFAULT_INPUTS: CalculatorInputs = {
    depositAmount: 50,
    frequency: DepositFrequency.WEEKLY,
    yearsToGrow: 30,
    annualReturn: 5,
};

const FREQUENCY_MAP = {
    [DepositFrequency.DAILY]: 365,
    [DepositFrequency.WEEKLY]: 52,
    [DepositFrequency.MONTHLY]: 12,
    [DepositFrequency.YEARLY]: 1,
} as const;

const getDepositsPerYear = (frequency: DepositFrequency): number => {
    return FREQUENCY_MAP[frequency] || 52;
};

const calculateCompoundInterest = (params: {
    depositAmount: number;
    depositsPerYear: number;
    periodicRate: number;
    yearsToGrow: number;
    currentYear: number;
}): CalculatorResultsType => {
    const { depositAmount, depositsPerYear, periodicRate, yearsToGrow, currentYear } = params;
    const yearlyData: ChartDataPoint[] = [];

    for (let year = 1; year <= yearsToGrow; year++) {
        const totalPeriods = depositsPerYear * year;
        const futureValue =
            periodicRate === 0
                ? depositAmount * totalPeriods
                : (depositAmount * (Math.pow(1 + periodicRate, totalPeriods) - 1)) / periodicRate;
        const totalInvestment = depositAmount * totalPeriods;
        const totalReturn = futureValue - totalInvestment;

        yearlyData.push({
            year: currentYear + year,
            amount: Math.floor(futureValue),
            Investment: Math.floor(totalInvestment),
            Return: Math.floor(totalReturn),
        });
    }

    const finalBalance = yearlyData.length > 0 ? yearlyData[yearlyData.length - 1].amount : 0;

    return {
        futureBalance: finalBalance,
        chartData: yearlyData,
    };
};

export const CalculatorWidget = () => {
    const [inputs, setInputs] = useState<CalculatorInputs>(DEFAULT_INPUTS);

    const updateInput = useCallback(<K extends keyof CalculatorInputs>(key: K, value: CalculatorInputs[K]) => {
        setInputs((prev) => ({ ...prev, [key]: value }));
    }, []);

    const calculationParams = useMemo(() => {
        const { depositAmount, frequency, yearsToGrow, annualReturn } = inputs;

        if (depositAmount <= 0) {
            return null;
        }

        const depositsPerYear = getDepositsPerYear(frequency);
        const annualRate = annualReturn / 100;
        const periodicRate = annualRate / depositsPerYear;
        const currentYear = new Date().getFullYear();

        return {
            depositAmount,
            depositsPerYear,
            periodicRate,
            yearsToGrow,
            currentYear,
        };
    }, [inputs]);

    const results: CalculatorResultsType = useMemo(() => {
        if (!calculationParams) {
            return {
                futureBalance: 0,
                chartData: [],
            };
        }

        return calculateCompoundInterest(calculationParams);
    }, [calculationParams]);

    const hasInputs = useMemo(() => inputs.depositAmount > 0, [inputs.depositAmount]);

    return (
        <Paper
            variant="outlined"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                maxWidth: { xs: '100%', md: '987px' },
                padding: { xs: 3, md: '25px 30px' },
                gap: { xs: 3, md: '40px' },
                boxShadow: '0px 5px 20px rgba(0, 0, 0, 0.05)',
                border: '1px solid #E6E6E6',
                borderRadius: '10px',
                minHeight: { xs: '400px', md: '794px' },
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' },
                    alignItems: 'flex-start',
                    gap: { xs: 3, md: '40px' },
                    width: '100%',
                }}
            >
                <Box
                    sx={{
                        width: { xs: '100%', md: '315px' },
                        flexShrink: 0,
                    }}
                >
                    <CalculatorForm inputs={inputs} onInputChange={updateInput} />
                </Box>

                <Box
                    sx={{
                        width: { xs: '100%', md: '572px' },
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '12px',
                        minHeight: '128px',
                        justifyContent: hasInputs ? 'flex-start' : 'center',
                    }}
                >
                    <CalculatorResults results={results} hasInputs={hasInputs} />
                </Box>
            </Box>

            {hasInputs && (
                <Box
                    sx={{
                        width: '100%',
                        height: { xs: '300px', sm: '350px', md: '400px' },
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <CalculatorChart chartData={results.chartData} />
                </Box>
            )}
        </Paper>
    );
};
import { Stack, Select, MenuItem, FormControl, Box, Typography } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import NumericField from '../../../components/NumericField';
import { CalculatorInputs, DepositFrequency } from '../types';

interface CalculatorFormProps {
    inputs: CalculatorInputs;
    onInputChange: <K extends keyof CalculatorInputs>(key: K, value: CalculatorInputs[K]) => void;
}

const getFrequencyLabel = (frequency: DepositFrequency): string => {
    const labels: Record<DepositFrequency, string> = {
        [DepositFrequency.DAILY]: 'Daily',
        [DepositFrequency.WEEKLY]: 'Weekly',
        [DepositFrequency.MONTHLY]: 'Monthly',
        [DepositFrequency.YEARLY]: 'Yearly',
    };
    return labels[frequency];
};

const getFrequencyOptions = () => {
    return Object.values(DepositFrequency).map(value => ({
        value,
        label: getFrequencyLabel(value),
    }));
};

const YEARS_TO_GROW_OPTIONS = Array.from({ length: 50 }, (_, i) => ({
    value: i + 1,
    label: `${i + 1} Year${i + 1 > 1 ? 's' : ''}`,
}));

const ANNUAL_RETURN_OPTIONS = [
    { value: 3, label: '3%' },
    { value: 5, label: '5%' },
    { value: 7, label: '7%' },
    { value: 8, label: '8%' },
    { value: 10, label: '10%' },
    { value: 12, label: '12%' },
    { value: 15, label: '15%' },
];

const fieldStyles = {
    width: '100%',
    height: '44.48px',
    background: '#F9F9F9',
    border: '1px solid #F9F9F9',
    borderRadius: '4px',
    '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
    '& .MuiSelect-select': { 
        padding: '13px 20px',
        fontFamily: 'Work Sans',
        fontWeight: 500,
        fontSize: '16px',
        color: '#293A60',
    },
};

const labelStyles = {
    position: 'absolute',
    left: '20px',
    top: '50%',
    transform: 'translateY(-50%)',
    fontFamily: 'Work Sans',
    fontWeight: 500,
    fontSize: '16px',
    color: '#293A60',
    pointerEvents: 'none',
    zIndex: 1,
    lineHeight: '1',
    display: 'flex',
    alignItems: 'center',
    height: '18px',
};

const createRenderValue = (options: Array<{ value: any; label: string }>, placeholder: string) => 
    (value: any) => {
        const option = options.find(opt => opt.value === value);
        return option ? option.label : placeholder;
    };

export const CalculatorForm = ({ inputs, onInputChange }: CalculatorFormProps) => {
    const frequencyOptions = getFrequencyOptions();

    return (
        <Stack 
            spacing={'10px'}
            sx={{ 
                width: '100%',
                height: '207.92px',
                justifyContent: 'flex-end',
            }}
        >
            <Box sx={{ position: 'relative', height: '44.48px' }}>
                <NumericField
                    value={inputs.depositAmount}
                    onValueChange={(values) => onInputChange('depositAmount', values.floatValue || 0)}
                    allowNegative={false}
                    placeholder="Enter amount"
                    variant="outlined"
                    fullWidth
                    prefix="$"
                    aria-label="Deposit Amount"
                    isAllowed={(values) => {
                        const { floatValue } = values;
                        return floatValue === undefined || floatValue <= 10000000;
                    }}
                    sx={{
                        ...fieldStyles,
                        height: '44.48px',
                        '& .MuiInputBase-root': {
                            backgroundColor: '#E3F2FD',
                            height: '44.48px',
                            '& .MuiOutlinedInput-notchedOutline': {
                                border: 'none',
                            },
                        },
                        '& .MuiInputBase-input': {
                            padding: '13px 20px',
                            fontFamily: 'Work Sans',
                            fontWeight: 500,
                            fontSize: '16px',
                            color: '#293A60',
                            textAlign: 'right',
                            paddingLeft: '130px',
                            height: '44.48px',
                            display: 'flex',
                            alignItems: 'center',
                        },
                    }}
                />
                <Typography sx={labelStyles}>
                    Deposit Amount
                </Typography>
            </Box>

            <FormControl fullWidth>
                <Select
                    value={inputs.frequency}
                    onChange={(e) => onInputChange('frequency', e.target.value as DepositFrequency)}
                    IconComponent={KeyboardArrowDownIcon}
                    displayEmpty
                    aria-label="Deposit Frequency"
                    renderValue={createRenderValue(frequencyOptions, 'Frequency')}
                    sx={fieldStyles}
                >
                    {frequencyOptions.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <FormControl fullWidth>
                <Select
                    value={inputs.yearsToGrow}
                    onChange={(e) => onInputChange('yearsToGrow', Number(e.target.value))}
                    IconComponent={KeyboardArrowDownIcon}
                    displayEmpty
                    aria-label="Years to Grow"
                    renderValue={createRenderValue(YEARS_TO_GROW_OPTIONS, 'Years to Grow')}
                    sx={fieldStyles}
                >
                    {YEARS_TO_GROW_OPTIONS.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <FormControl fullWidth>
                <Select
                    value={inputs.annualReturn}
                    onChange={(e) => onInputChange('annualReturn', Number(e.target.value))}
                    IconComponent={KeyboardArrowDownIcon}
                    displayEmpty
                    aria-label="Annual Return Percentage"
                    renderValue={createRenderValue(ANNUAL_RETURN_OPTIONS, 'Annual Return %')}
                    sx={fieldStyles}
                >
                    {ANNUAL_RETURN_OPTIONS.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Stack>
    );
};