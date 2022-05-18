(function (factory) {
    typeof define === 'function' && define.amd ? define(factory) :
    factory();
})((function () { 'use strict';

    function caclMortgage(homePrice, downPayment, loanTerm, interestRate){
        const MONTHES = 12.;
        const i = 1. * interestRate / (100.0 * MONTHES),
              n = loanTerm * MONTHES,
              intermediateVal = Math.pow(i + 1, n);
        return (homePrice - downPayment) * i * intermediateVal / (intermediateVal - 1)
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

    class App {
        start(){
            getInitMortageValues();
            onInputMortage();

            console.log(mortageOutputVals);
        }
    }

    function getInitMortageValues(){
        mortgageInputVals.homePrice = document.getElementsByName("home_price")[0].value;
        mortgageInputVals.downPayment = document.getElementsByName("down_payment")[0].value;
        mortgageInputVals.loanTerm = document.getElementsByName("loan_term")[0].value;
        mortgageInputVals.interestRate = document.getElementsByName("interest_rate")[0].value;

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

    const app = new App();
    app.start();

}));
