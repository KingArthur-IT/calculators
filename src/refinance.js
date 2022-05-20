import ApexCharts from 'apexcharts';

const MONTHES = 12.;
const refinanceElement = document.querySelector("#refinance-chart");
var refinanceChart;

var refinanceInputVals = {
    remainingBalance: 50000,
    interestRateCurrent: 6,
    interestRateNew: 3.3,
    newLoanTerm: 30,
    closingCosts: 4000
}

var refinanceOutputVals = {
    currentPayment: 0,
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
    refinanceOutputVals.newPayment = caclRefinance(refinanceInputVals.remainingBalance, refinanceInputVals.closingCosts, refinanceInputVals.newLoanTerm, refinanceInputVals.interestRateNew).toFixed(2);

    createRefinanceChart();
}

export function onInputRefinance(){
    document.getElementsByName("remaining_balance")[0].addEventListener('input', () => {
        refinanceInputVals.remainingBalance = document.getElementsByName("remaining_balance")[0].value;
        refinanceOutputVals.newPayment = caclRefinance(refinanceInputVals.remainingBalance, refinanceInputVals.closingCosts, refinanceInputVals.newLoanTerm, refinanceInputVals.interestRateNew).toFixed(2);
        console.log(refinanceOutputVals);
        updateRefinanceChart();
    })
    document.getElementsByName("interest_rate_refinance_current")[0].addEventListener('input', () => {
        refinanceInputVals.interestRateCurrent = document.getElementsByName("interest_rate_refinance_current")[0].value;
        refinanceOutputVals.newPayment = caclRefinance(refinanceInputVals.remainingBalance, refinanceInputVals.closingCosts, refinanceInputVals.newLoanTerm, refinanceInputVals.interestRateNew).toFixed(2);
        console.log(refinanceOutputVals);
        updateRefinanceChart();
    })
    document.getElementsByName("interest_rate_refinance_new")[0].addEventListener('input', () => {
        refinanceInputVals.interestRateNew = document.getElementsByName("interest_rate_refinance_new")[0].value;
        refinanceOutputVals.newPayment = caclRefinance(refinanceInputVals.remainingBalance, refinanceInputVals.closingCosts, refinanceInputVals.newLoanTerm, refinanceInputVals.interestRateNew).toFixed(2);
        console.log(refinanceOutputVals);
        updateRefinanceChart();
    })
    document.getElementsByName("new_loan_term")[0].addEventListener('input', () => {
        refinanceInputVals.newLoanTerm = document.getElementsByName("new_loan_term")[0].value;
        refinanceOutputVals.newPayment = caclRefinance(refinanceInputVals.remainingBalance, refinanceInputVals.closingCosts, refinanceInputVals.newLoanTerm, refinanceInputVals.interestRateNew).toFixed(2);
        console.log(refinanceOutputVals);
        updateRefinanceChart();
    })
    document.getElementsByName("Closing_costs")[0].addEventListener('input', () => {
        refinanceInputVals.closingCosts = document.getElementsByName("Closing_costs")[0].value;
        refinanceOutputVals.newPayment = caclRefinance(refinanceInputVals.remainingBalance, refinanceInputVals.closingCosts, refinanceInputVals.newLoanTerm, refinanceInputVals.interestRateNew).toFixed(2);
        console.log(refinanceOutputVals);
        updateRefinanceChart();
    })
    document.getElementsByName("monthly_payment")[0].addEventListener('input', () => {
        refinanceOutputVals.currentPayment = document.getElementsByName("monthly_payment")[0].value;
        console.log(refinanceOutputVals);
        updateRefinanceChart();
    })
}

export function getRefinanceOutputVals(){
    return refinanceOutputVals
}


var options = {
    series: [{ data: Object.values(refinanceOutputVals) }],
    xaxis: {
        categories: ['Current payment', 'New payment'],
    },
    chart: {
        type: 'bar',
        height: 300,
        width: 600
    },
    plotOptions: {
        bar: {
          horizontal: true
        }
    },
};

function createRefinanceChart(){
    const vals = Object.values(refinanceOutputVals).map((i) => i * 1.)
    options.series[0].data = vals
    refinanceChart = new ApexCharts(refinanceElement, options);
    refinanceChart.render();
}

function updateRefinanceChart(){
    const vals = Object.values(refinanceOutputVals).map((i) => i * 1.)
    options.series[0].data = vals
    refinanceChart.updateOptions(options, true, true, true)
}