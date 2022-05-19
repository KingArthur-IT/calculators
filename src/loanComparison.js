import { caclMortgage } from './mortgage.js'
const MONTHES = 12.;

var loanComparisonInputVals = {
    loanAmount: 250000,
    loanTermOption1: 15,
    interestRateOpetion1: 5,
    loanTermOption2: 15,
    interestRateOpetion2: 15,
}

var loanComparisonOutputVals = {
    interestOption1: 0,
    interestOption2: 0,
    principalOption1: 0,
    principalOption2: 0,
    tax: 0,
    insurance: 0
}

export function caclInterestAndPrincipal(loanAmount, loanTerm, interestRate){
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

export function getInitLoanComparisonValues(){
    loanComparisonInputVals.loanAmount = document.getElementsByName("loan_amount")[0].value;
    loanComparisonInputVals.loanTermOption1 = document.getElementsByName("loan_term_comparison_1")[0].value;
    loanComparisonInputVals.loanTermOption2 = document.getElementsByName("loan_term_comparison_2")[0].value;
    loanComparisonInputVals.interestRateOpetion1 = document.getElementsByName("interest_rate_comparison_1")[0].value;
    loanComparisonInputVals.interestRateOpetion2 = document.getElementsByName("interest_rate_comparison_2")[0].value;

    loanComparisonOutputVals.tax = document.getElementsByName("property_tax_loan_comparison")[0].value;
    loanComparisonOutputVals.insurance = document.getElementsByName("homeowners_insurance")[0].value;
}

export function onInputLoanComparison(){
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

export function getLoanComparisonOutputVals(){
    return loanComparisonOutputVals
}