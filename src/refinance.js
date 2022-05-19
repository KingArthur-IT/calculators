const MONTHES = 12.;

var refinanceInputVals = {
    remainingBalance: 50000,
    interestRateCurrent: 6,
    interestRateNew: 3.3,
    newLoanTerm: 30,
    closingCosts: 4000
}

var refinanceOutputVals = {
    currentPayment: 358,
    newPayment: 0
}

export function caclRefinance(balance, closingCosts, loanTerm, interestRate){
    const i = 1. * interestRate / (100.0 * MONTHES),
          n = loanTerm * MONTHES,
          intermediateVal = Math.pow(i + 1, n);
    return (1. * balance + 1. * closingCosts) * i * intermediateVal / (intermediateVal - 1)
}

export function getInitRefinanceValues(){
    refinanceInputVals.remainingBalance = document.getElementsByName("remaining_balance")[0].value;
    refinanceInputVals.interestRateCurrent = document.getElementsByName("interest_rate_refinance_current")[0].value;
    refinanceInputVals.interestRateNew = document.getElementsByName("interest_rate_refinance_new")[0].value;
    refinanceInputVals.newLoanTerm = document.getElementsByName("new_loan_term")[0].value;
    refinanceInputVals.closingCosts = document.getElementsByName("Closing_costs")[0].value;

    refinanceOutputVals.currentPayment = document.getElementsByName("monthly_payment")[0].value;
    refinanceOutputVals.newPayment = caclRefinance(refinanceInputVals.remainingBalance, refinanceInputVals.closingCosts, refinanceInputVals.newLoanTerm, refinanceInputVals.interestRateNew)
}

export function onInputRefinance(){
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

export function getRefinanceOutputVals(){
    return refinanceOutputVals
}