(function (factory) {
    typeof define === 'function' && define.amd ? define(factory) :
    factory();
})((function () { 'use strict';

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

    const mortgageInputVals = {
        homePrice: 300000,
        downPayment: 60000,
        loanTerm: 30,
        interestRate: 6
    };
    var mortageOutputVals = {
        principalAndInterest: 0,
        taxes: 100,
        insurance: 100,
        HOA: 100
    };
    const refinanceInputVals = {
        remainingBalance: 50000,
        interestRateCurrent: 6,
        interestRateNew: 3.3,
        newLoanTerm: 30,
        closingCosts: 4000
    };

    const refinanceOutputVals = {
        currentPayment: 358,
        newPayment: 0
    };

    class App {
        start(){
            getInitMortageValues();
            onInputMortage();
            console.log(mortageOutputVals);

            getInitRefinanceValues();
            onInputRefinance();
            console.log(refinanceOutputVals);
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
        mortageOutputVals.principalAndInterest = caclMortgage(mortgageInputVals.homePrice, mortgageInputVals.downPayment, mortgageInputVals.loanTerm, mortgageInputVals.interestRate);
    }

    function onInputMortage(){
        document.getElementsByName("home_price")[0].addEventListener('input', () => {
            mortgageInputVals.homePrice = document.getElementsByName("home_price")[0].value;
            mortageOutputVals.principalAndInterest = caclMortgage(mortgageInputVals.homePrice, mortgageInputVals.downPayment, mortgageInputVals.loanTerm, mortgageInputVals.interestRate);
            console.log(mortageOutputVals);
        });
        document.getElementsByName("down_payment")[0].addEventListener('input', () => {
            mortgageInputVals.downPayment = document.getElementsByName("down_payment")[0].value;
            mortageOutputVals.principalAndInterest = caclMortgage(mortgageInputVals.homePrice, mortgageInputVals.downPayment, mortgageInputVals.loanTerm, mortgageInputVals.interestRate);
            console.log(mortageOutputVals);
        });
        document.getElementsByName("loan_term")[0].addEventListener('input', () => {
            mortgageInputVals.loanTerm = document.getElementsByName("loan_term")[0].value;
            mortageOutputVals.principalAndInterest = caclMortgage(mortgageInputVals.homePrice, mortgageInputVals.downPayment, mortgageInputVals.loanTerm, mortgageInputVals.interestRate);
            console.log(mortageOutputVals);
        });
        document.getElementsByName("interest_rate")[0].addEventListener('input', () => {
            mortgageInputVals.interestRate = document.getElementsByName("interest_rate")[0].value;
            mortageOutputVals.principalAndInterest = caclMortgage(mortgageInputVals.homePrice, mortgageInputVals.downPayment, mortgageInputVals.loanTerm, mortgageInputVals.interestRate);
            console.log(mortageOutputVals);
        });
        document.getElementsByName("property_tax")[0].addEventListener('input', () => {
            mortageOutputVals.taxes = document.getElementsByName("property_tax")[0].value;
            console.log(mortageOutputVals);
        });
        document.getElementsByName("home_insurance")[0].addEventListener('input', () => {
            mortageOutputVals.insurance = document.getElementsByName("home_insurance")[0].value;
            console.log(mortageOutputVals);
        });
        document.getElementsByName("HOA_dues")[0].addEventListener('input', () => {
            mortageOutputVals.HOA = document.getElementsByName("HOA_dues")[0].value;
            console.log(mortageOutputVals);
        });
    }

    function getInitRefinanceValues(){
        refinanceInputVals.remainingBalance = document.getElementsByName("remaining_balance")[0].value;
        refinanceInputVals.interestRateCurrent = document.getElementsByName("interest_rate_refinance_current")[0].value;
        refinanceInputVals.interestRateNew = document.getElementsByName("interest_rate_refinance_new")[0].value;
        refinanceInputVals.newLoanTerm = document.getElementsByName("new_loan_term")[0].value;
        refinanceInputVals.closingCosts = document.getElementsByName("Closing_costs")[0].value;

        refinanceOutputVals.currentPayment = document.getElementsByName("monthly_payment")[0].value;
        refinanceOutputVals.newPayment = caclRefinance(refinanceInputVals.remainingBalance, refinanceInputVals.closingCosts, refinanceInputVals.newLoanTerm, refinanceInputVals.interestRateNew);
    }
    function onInputRefinance(){
        document.getElementsByName("remaining_balance")[0].addEventListener('input', () => {
            refinanceInputVals.remainingBalance = document.getElementsByName("remaining_balance")[0].value;
            refinanceOutputVals.newPayment = caclRefinance(refinanceInputVals.remainingBalance, refinanceInputVals.closingCosts, refinanceInputVals.newLoanTerm, refinanceInputVals.interestRateNew);
            console.log(refinanceOutputVals);
        });
        document.getElementsByName("interest_rate_refinance_current")[0].addEventListener('input', () => {
            refinanceInputVals.interestRateCurrent = document.getElementsByName("interest_rate_refinance_current")[0].value;
            refinanceOutputVals.newPayment = caclRefinance(refinanceInputVals.remainingBalance, refinanceInputVals.closingCosts, refinanceInputVals.newLoanTerm, refinanceInputVals.interestRateNew);
            console.log(refinanceOutputVals);
        });
        document.getElementsByName("interest_rate_refinance_new")[0].addEventListener('input', () => {
            refinanceInputVals.interestRateNew = document.getElementsByName("interest_rate_refinance_new")[0].value;
            refinanceOutputVals.newPayment = caclRefinance(refinanceInputVals.remainingBalance, refinanceInputVals.closingCosts, refinanceInputVals.newLoanTerm, refinanceInputVals.interestRateNew);
            console.log(refinanceOutputVals);
        });
        document.getElementsByName("new_loan_term")[0].addEventListener('input', () => {
            refinanceInputVals.newLoanTerm = document.getElementsByName("new_loan_term")[0].value;
            refinanceOutputVals.newPayment = caclRefinance(refinanceInputVals.remainingBalance, refinanceInputVals.closingCosts, refinanceInputVals.newLoanTerm, refinanceInputVals.interestRateNew);
            console.log(refinanceOutputVals);
        });
        document.getElementsByName("Closing_costs")[0].addEventListener('input', () => {
            refinanceInputVals.closingCosts = document.getElementsByName("Closing_costs")[0].value;
            refinanceOutputVals.newPayment = caclRefinance(refinanceInputVals.remainingBalance, refinanceInputVals.closingCosts, refinanceInputVals.newLoanTerm, refinanceInputVals.interestRateNew);
            console.log(refinanceOutputVals);
        });
        document.getElementsByName("monthly_payment")[0].addEventListener('input', () => {
            refinanceOutputVals.currentPayment = document.getElementsByName("monthly_payment")[0].value;
            console.log(refinanceOutputVals);
        });
    }

    const app = new App();
    app.start();

}));
