const MONTHES = 12.;

function caclMortgage(homePrice, downPayment, loanTerm, interestRate){
    const i = 1. * interestRate / (100.0 * MONTHES),
          n = loanTerm * MONTHES,
          intermediateVal = Math.pow(i + 1, n);
    return (homePrice - downPayment) * i * intermediateVal / (intermediateVal - 1)
}

function caclRefinance(balance, closingCosts, loanTerm, interestRate){
    const i = 1. * interestRate / (100.0 * MONTHES),
          n = loanTerm * MONTHES,
          intermediateVal = Math.pow(i + 1, n);
    return (1. * balance + 1. * closingCosts) * i * intermediateVal / (intermediateVal - 1)
}

function caclInterestAndPrincipal(loanAmount, loanTerm, interestRate){
    const Amount = caclMortgage(loanAmount, 0.0, loanTerm, interestRate),
          i = 1. * interestRate / (100.0 * MONTHES),
          n = loanTerm * MONTHES;
    console.log('amount', Amount, loanAmount, 0.0, loanAmount, interestRate)
    const Principal = Amount / Math.pow(1 + i, n);
    return {
        principal: Principal,
        interest: Amount - Principal 
    }
}

const mortgageInputVals = {
    homePrice: 300000,
    downPayment: 60000,
    loanTerm: 30,
    interestRate: 6
}
var mortageOutputVals = {
    principalAndInterest: 0,
    taxes: 100,
    insurance: 100,
    HOA: 100
}
const refinanceInputVals = {
    remainingBalance: 50000,
    interestRateCurrent: 6,
    interestRateNew: 3.3,
    newLoanTerm: 30,
    closingCosts: 4000
}

const refinanceOutputVals = {
    currentPayment: 358,
    newPayment: 0
}

const loanComparisonInputVals = {
    loanAmount: 250000,
    loanTermOption1: 15,
    interestRateOpetion1: 5,
    loanTermOption2: 15,
    interestRateOpetion2: 15,
}

const loanComparisonOutputVals = {
    interestOption1: 0,
    interestOption2: 0,
    principalOption1: 0,
    principalOption2: 0,
    tax: 0,
    insurance: 0
}

class App {
    start(){
        getInitMortageValues();
        onInputMortage();
        console.log(mortageOutputVals)

        getInitRefinanceValues();
        onInputRefinance();
        console.log(refinanceOutputVals);

        getInitLoanComparisonValues();
        onInputLoanComparison();
        console.log(loanComparisonOutputVals);
    }
}

function getInitMortageValues(){
    mortgageInputVals.homePrice = document.getElementsByName("home_price")[0].value;
    mortgageInputVals.downPayment = document.getElementsByName("down_payment")[0].value;
    mortgageInputVals.loanTerm = document.getElementsByName("loan_term")[0].value;
    mortgageInputVals.interestRate = document.getElementsByName("interest_rate_mortgage")[0].value;

    mortageOutputVals.taxes = document.getElementsByName("property_tax")[0].value;
    mortageOutputVals.insurance = document.getElementsByName("home_insurance")[0].value;
    mortageOutputVals.HOA = document.getElementsByName("HOA_dues")[0].value;
    mortageOutputVals.principalAndInterest = caclMortgage(mortgageInputVals.homePrice, mortgageInputVals.downPayment, mortgageInputVals.loanTerm, mortgageInputVals.interestRate)
}
function onInputMortage(){
    document.getElementsByName("home_price")[0].addEventListener('input', () => {
        mortgageInputVals.homePrice = document.getElementsByName("home_price")[0].value;
        mortageOutputVals.principalAndInterest = caclMortgage(mortgageInputVals.homePrice, mortgageInputVals.downPayment, mortgageInputVals.loanTerm, mortgageInputVals.interestRate);
        console.log(mortageOutputVals);
    })
    document.getElementsByName("down_payment")[0].addEventListener('input', () => {
        mortgageInputVals.downPayment = document.getElementsByName("down_payment")[0].value;
        mortageOutputVals.principalAndInterest = caclMortgage(mortgageInputVals.homePrice, mortgageInputVals.downPayment, mortgageInputVals.loanTerm, mortgageInputVals.interestRate);
        console.log(mortageOutputVals);
    })
    document.getElementsByName("loan_term")[0].addEventListener('input', () => {
        mortgageInputVals.loanTerm = document.getElementsByName("loan_term")[0].value;
        mortageOutputVals.principalAndInterest = caclMortgage(mortgageInputVals.homePrice, mortgageInputVals.downPayment, mortgageInputVals.loanTerm, mortgageInputVals.interestRate);
        console.log(mortageOutputVals);
    })
    document.getElementsByName("interest_rate")[0].addEventListener('input', () => {
        mortgageInputVals.interestRate = document.getElementsByName("interest_rate")[0].value;
        mortageOutputVals.principalAndInterest = caclMortgage(mortgageInputVals.homePrice, mortgageInputVals.downPayment, mortgageInputVals.loanTerm, mortgageInputVals.interestRate);
        console.log(mortageOutputVals);
    })
    document.getElementsByName("property_tax")[0].addEventListener('input', () => {
        mortageOutputVals.taxes = document.getElementsByName("property_tax")[0].value;
        console.log(mortageOutputVals);
    })
    document.getElementsByName("home_insurance")[0].addEventListener('input', () => {
        mortageOutputVals.insurance = document.getElementsByName("home_insurance")[0].value;
        console.log(mortageOutputVals);
    })
    document.getElementsByName("HOA_dues")[0].addEventListener('input', () => {
        mortageOutputVals.HOA = document.getElementsByName("HOA_dues")[0].value;
        console.log(mortageOutputVals);
    })
}

function getInitRefinanceValues(){
    refinanceInputVals.remainingBalance = document.getElementsByName("remaining_balance")[0].value;
    refinanceInputVals.interestRateCurrent = document.getElementsByName("interest_rate_refinance_current")[0].value;
    refinanceInputVals.interestRateNew = document.getElementsByName("interest_rate_refinance_new")[0].value;
    refinanceInputVals.newLoanTerm = document.getElementsByName("new_loan_term")[0].value;
    refinanceInputVals.closingCosts = document.getElementsByName("Closing_costs")[0].value;

    refinanceOutputVals.currentPayment = document.getElementsByName("monthly_payment")[0].value;
    refinanceOutputVals.newPayment = caclRefinance(refinanceInputVals.remainingBalance, refinanceInputVals.closingCosts, refinanceInputVals.newLoanTerm, refinanceInputVals.interestRateNew)
}
function onInputRefinance(){
    document.getElementsByName("remaining_balance")[0].addEventListener('input', () => {
        refinanceInputVals.remainingBalance = document.getElementsByName("remaining_balance")[0].value;
        refinanceOutputVals.newPayment = caclRefinance(refinanceInputVals.remainingBalance, refinanceInputVals.closingCosts, refinanceInputVals.newLoanTerm, refinanceInputVals.interestRateNew);
        console.log(refinanceOutputVals);
    })
    document.getElementsByName("interest_rate_refinance_current")[0].addEventListener('input', () => {
        refinanceInputVals.interestRateCurrent = document.getElementsByName("interest_rate_refinance_current")[0].value;
        refinanceOutputVals.newPayment = caclRefinance(refinanceInputVals.remainingBalance, refinanceInputVals.closingCosts, refinanceInputVals.newLoanTerm, refinanceInputVals.interestRateNew);
        console.log(refinanceOutputVals);
    })
    document.getElementsByName("interest_rate_refinance_new")[0].addEventListener('input', () => {
        refinanceInputVals.interestRateNew = document.getElementsByName("interest_rate_refinance_new")[0].value;
        refinanceOutputVals.newPayment = caclRefinance(refinanceInputVals.remainingBalance, refinanceInputVals.closingCosts, refinanceInputVals.newLoanTerm, refinanceInputVals.interestRateNew);
        console.log(refinanceOutputVals);
    })
    document.getElementsByName("new_loan_term")[0].addEventListener('input', () => {
        refinanceInputVals.newLoanTerm = document.getElementsByName("new_loan_term")[0].value;
        refinanceOutputVals.newPayment = caclRefinance(refinanceInputVals.remainingBalance, refinanceInputVals.closingCosts, refinanceInputVals.newLoanTerm, refinanceInputVals.interestRateNew);
        console.log(refinanceOutputVals);
    })
    document.getElementsByName("Closing_costs")[0].addEventListener('input', () => {
        refinanceInputVals.closingCosts = document.getElementsByName("Closing_costs")[0].value;
        refinanceOutputVals.newPayment = caclRefinance(refinanceInputVals.remainingBalance, refinanceInputVals.closingCosts, refinanceInputVals.newLoanTerm, refinanceInputVals.interestRateNew);
        console.log(refinanceOutputVals);
    })
    document.getElementsByName("monthly_payment")[0].addEventListener('input', () => {
        refinanceOutputVals.currentPayment = document.getElementsByName("monthly_payment")[0].value;
        console.log(refinanceOutputVals);
    })
}

function getInitLoanComparisonValues(){
    loanComparisonInputVals.loanAmount = document.getElementsByName("loan_amount")[0].value;
    loanComparisonInputVals.loanTermOption1 = document.getElementsByName("loan_term_comparison_1")[0].value;
    loanComparisonInputVals.loanTermOption2 = document.getElementsByName("loan_term_comparison_2")[0].value;
    loanComparisonInputVals.interestRateOpetion1 = document.getElementsByName("interest_rate_comparison_1")[0].value;
    loanComparisonInputVals.interestRateOpetion2 = document.getElementsByName("interest_rate_comparison_2")[0].value;

    loanComparisonOutputVals.tax = document.getElementsByName("property_tax_loan_comparison")[0].value;
    loanComparisonOutputVals.insurance = document.getElementsByName("homeowners_insurance")[0].value;
}
function onInputLoanComparison(){
    document.getElementsByName("loan_amount")[0].addEventListener('input', () => {
        loanComparisonInputVals.loanAmount = document.getElementsByName("loan_amount")[0].value;

        const option1 = caclInterestAndPrincipal(loanComparisonInputVals.loanAmount, loanComparisonInputVals.loanTermOption1, loanComparisonInputVals.interestRateOpetion1),
              option2 = caclInterestAndPrincipal(loanComparisonInputVals.loanAmount, loanComparisonInputVals.loanTermOption2, loanComparisonInputVals.interestRateOpetion2);
        loanComparisonOutputVals.interestOption1 = option1.interest;
        loanComparisonOutputVals.principalOption1 = option1.principal;
        loanComparisonOutputVals.interestOption2 = option2.interest;
        loanComparisonOutputVals.principalOption2 = option2.principal;
        
        console.log(loanComparisonOutputVals);
    })
    document.getElementsByName("loan_term_comparison_1")[0].addEventListener('input', () => {
        loanComparisonInputVals.loanTermOption1 = document.getElementsByName("loan_term_comparison_1")[0].value;

        const option1 = caclInterestAndPrincipal(loanComparisonInputVals.loanAmount, loanComparisonInputVals.loanTermOption1, loanComparisonInputVals.interestRateOpetion1);
        loanComparisonOutputVals.interestOption1 = option1.interest;
        loanComparisonOutputVals.principalOption1 = option1.principal;
        
        console.log(loanComparisonOutputVals);
    })
    document.getElementsByName("loan_term_comparison_2")[0].addEventListener('input', () => {
        loanComparisonInputVals.loanTermOption2 = document.getElementsByName("loan_term_comparison_2")[0].value;

        const option2 = caclInterestAndPrincipal(loanComparisonInputVals.loanAmount, loanComparisonInputVals.loanTermOption2, loanComparisonInputVals.interestRateOpetion2);
        loanComparisonOutputVals.interestOption2 = option2.interest;
        loanComparisonOutputVals.principalOption2 = option2.principal;
        
        console.log(loanComparisonOutputVals);
    })
    document.getElementsByName("interest_rate_comparison_1")[0].addEventListener('input', () => {
        loanComparisonInputVals.interestRateOpetion1 = document.getElementsByName("interest_rate_comparison_1")[0].value;

        const option1 = caclInterestAndPrincipal(loanComparisonInputVals.loanAmount, loanComparisonInputVals.loanTermOption1, loanComparisonInputVals.interestRateOpetion1);
        loanComparisonOutputVals.interestOption1 = option1.interest;
        loanComparisonOutputVals.principalOption1 = option1.principal;
        
        console.log(loanComparisonOutputVals);
    })
    document.getElementsByName("interest_rate_comparison_2")[0].addEventListener('input', () => {
        loanComparisonInputVals.interestRateOpetion2 = document.getElementsByName("interest_rate_comparison_2")[0].value;

        const option2 = caclInterestAndPrincipal(loanComparisonInputVals.loanAmount, loanComparisonInputVals.loanTermOption2, loanComparisonInputVals.interestRateOpetion2);
        loanComparisonOutputVals.interestOption2 = option2.interest;
        loanComparisonOutputVals.principalOption2 = option2.principal;
        
        console.log(loanComparisonOutputVals);
    })
}
export default App;
