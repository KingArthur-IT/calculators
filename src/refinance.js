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
        updateRefinanceChart();
    })
    document.getElementsByName("interest_rate_refinance_current")[0].addEventListener('input', () => {
        refinanceInputVals.interestRateCurrent = document.getElementsByName("interest_rate_refinance_current")[0].value;
        refinanceOutputVals.newPayment = caclRefinance(refinanceInputVals.remainingBalance, refinanceInputVals.closingCosts, refinanceInputVals.newLoanTerm, refinanceInputVals.interestRateNew).toFixed(2);
        updateRefinanceChart();
    })
    document.getElementsByName("interest_rate_refinance_new")[0].addEventListener('input', () => {
        refinanceInputVals.interestRateNew = document.getElementsByName("interest_rate_refinance_new")[0].value;
        refinanceOutputVals.newPayment = caclRefinance(refinanceInputVals.remainingBalance, refinanceInputVals.closingCosts, refinanceInputVals.newLoanTerm, refinanceInputVals.interestRateNew).toFixed(2);
        updateRefinanceChart();
    })
    document.getElementsByName("new_loan_term")[0].addEventListener('input', () => {
        refinanceInputVals.newLoanTerm = document.getElementsByName("new_loan_term")[0].value;
        refinanceOutputVals.newPayment = caclRefinance(refinanceInputVals.remainingBalance, refinanceInputVals.closingCosts, refinanceInputVals.newLoanTerm, refinanceInputVals.interestRateNew).toFixed(2);
        updateRefinanceChart();
        document.getElementsByName("refinance-title-year")[0].innerHTML = refinanceInputVals.newLoanTerm;
    })
    document.getElementsByName("refinance-year-minus")[0].addEventListener('click', () => {
        refinanceInputVals.newLoanTerm = document.getElementsByName("new_loan_term")[0].value - 1;
        refinanceOutputVals.newPayment = caclRefinance(refinanceInputVals.remainingBalance, refinanceInputVals.closingCosts, refinanceInputVals.newLoanTerm, refinanceInputVals.interestRateNew).toFixed(2);
        updateRefinanceChart();
        document.getElementsByName("refinance-title-year")[0].innerHTML = refinanceInputVals.newLoanTerm;
    })
    document.getElementsByName("refinance-year-plus")[0].addEventListener('click', () => {
        refinanceInputVals.newLoanTerm = 1. * document.getElementsByName("new_loan_term")[0].value + 1;
        refinanceOutputVals.newPayment = caclRefinance(refinanceInputVals.remainingBalance, refinanceInputVals.closingCosts, refinanceInputVals.newLoanTerm, refinanceInputVals.interestRateNew).toFixed(2);
        updateRefinanceChart();
        document.getElementsByName("refinance-title-year")[0].innerHTML = refinanceInputVals.newLoanTerm;
    })
    document.getElementsByName("Closing_costs")[0].addEventListener('input', () => {
        refinanceInputVals.closingCosts = document.getElementsByName("Closing_costs")[0].value;
        refinanceOutputVals.newPayment = caclRefinance(refinanceInputVals.remainingBalance, refinanceInputVals.closingCosts, refinanceInputVals.newLoanTerm, refinanceInputVals.interestRateNew).toFixed(2);
        updateRefinanceChart();
    })
    document.getElementsByName("monthly_payment")[0].addEventListener('input', () => {
        refinanceOutputVals.currentPayment = document.getElementsByName("monthly_payment")[0].value;
        updateRefinanceChart();
    })
}

export function getRefinanceOutputVals(){
    return refinanceOutputVals
}


var options = {
    animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 800,
        animateGradually: {
            enabled: true,
            delay: 150
        },
        dynamicAnimation: {
            enabled: true,
            speed: 350
        }
    },
    series: [{ 
        name: "Monthly",
        data: Object.values(refinanceOutputVals) 
        }],
    xaxis: {
        categories: ['Current payment', 'New payment'],
        labels:{
            style:{
                colors: ['#ffffff']
            },
            formatter: function(value) { return '$' + value }
        }
    },
    yaxis:{
        labels:{
            style:{
                colors: ['#ffffff'],
                fontFamily: 'Riviera Nights',
                fontSize: '14px'
            },
        }
    },
    chart: {
        type: 'bar',
        height: 300,
        width: 700
    },
    plotOptions: {
        bar: {
          horizontal: true
        }
    },
    dataLabels: {
        enabled: false
    },
    tooltip: {
        y: {
          formatter: function (val) {
            return '$' + val
          },
        },
        theme: 'dark'
    },
};

function createRefinanceChart(){
    const vals = Object.values(refinanceOutputVals).map((i) => i * 1.)
    options.series[0].data = vals
    refinanceChart = new ApexCharts(refinanceElement, options);
    refinanceChart.render();
}

function updateRefinanceChart(seriesName = 'Monthly'){
    const vals = Object.values(refinanceOutputVals).map((i) => i * 1.)
    options.series[0].data = vals
    options.series[0].name = seriesName;

    refinanceChart.destroy();
    refinanceChart = new ApexCharts(refinanceElement, options);
    refinanceChart.render();

    const newVal = isFinite(refinanceOutputVals.newPayment) ? refinanceOutputVals.newPayment : refinanceOutputVals.currentPayment;
    const refinanceValue = newVal - refinanceOutputVals.currentPayment;
    document.getElementsByName("refinance-title-value")[0].innerHTML = Math.abs(refinanceValue).toFixed(2);
    document.getElementsByName("refinance-title-value-sign")[0].innerHTML = Math.sign(refinanceValue) > 0 ? 'increase' : 'reduce';
}

document.getElementsByName('refinance-btn-monthly')[0].addEventListener('click', () => {
    updateRefinanceChart();
})
document.getElementsByName('refinance-btn-total')[0].addEventListener('click', () => {
    updateRefinanceChart('Total');
})