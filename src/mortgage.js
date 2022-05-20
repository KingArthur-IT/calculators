import ApexCharts from 'apexcharts';

const MONTHES = 12.;
const mortgageElement = document.querySelector("#mortgage-chart");
var mortgageChart;

var mortgageInputVals = {
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

export function caclMortgage(homePrice, downPayment, loanTerm, interestRate){
    const i = 1. * interestRate / (100.0 * MONTHES),
          n = loanTerm * MONTHES,
          intermediateVal = Math.pow(i + 1, n);
    return (homePrice - downPayment) * i * intermediateVal / (intermediateVal - 1)
}

export function getInitMortageValues(){
    mortgageInputVals.homePrice = document.getElementsByName("home_price")[0].value;
    mortgageInputVals.downPayment = document.getElementsByName("down_payment")[0].value;
    mortgageInputVals.loanTerm = document.getElementsByName("loan_term")[0].value;
    mortgageInputVals.interestRate = document.getElementsByName("interest_rate_mortgage")[0].value;

    mortageOutputVals.taxes = document.getElementsByName("property_tax")[0].value;
    mortageOutputVals.insurance = document.getElementsByName("home_insurance")[0].value;
    mortageOutputVals.HOA = document.getElementsByName("HOA_dues")[0].value;
    mortageOutputVals.principalAndInterest = caclMortgage(mortgageInputVals.homePrice, mortgageInputVals.downPayment, mortgageInputVals.loanTerm, mortgageInputVals.interestRate).toFixed(2)

    createMortageChart();
}

export function onInputMortage(){
    document.getElementsByName("home_price")[0].addEventListener('input', () => {
        mortgageInputVals.homePrice = document.getElementsByName("home_price")[0].value;
        mortageOutputVals.principalAndInterest = caclMortgage(mortgageInputVals.homePrice, mortgageInputVals.downPayment, mortgageInputVals.loanTerm, mortgageInputVals.interestRate).toFixed(2);
        updateMortageChart();
        console.log(mortageOutputVals);
    })
    document.getElementsByName("down_payment")[0].addEventListener('input', () => {
        mortgageInputVals.downPayment = document.getElementsByName("down_payment")[0].value;
        mortageOutputVals.principalAndInterest = caclMortgage(mortgageInputVals.homePrice, mortgageInputVals.downPayment, mortgageInputVals.loanTerm, mortgageInputVals.interestRate).toFixed(2);
        updateMortageChart();
        console.log(mortageOutputVals);
    })
    document.getElementsByName("loan_term")[0].addEventListener('input', () => {
        mortgageInputVals.loanTerm = document.getElementsByName("loan_term")[0].value;
        mortageOutputVals.principalAndInterest = caclMortgage(mortgageInputVals.homePrice, mortgageInputVals.downPayment, mortgageInputVals.loanTerm, mortgageInputVals.interestRate).toFixed(2);
        updateMortageChart();
        console.log(mortageOutputVals);
    })
    document.getElementsByName("interest_rate")[0].addEventListener('input', () => {
        mortgageInputVals.interestRate = document.getElementsByName("interest_rate")[0].value;
        mortageOutputVals.principalAndInterest = caclMortgage(mortgageInputVals.homePrice, mortgageInputVals.downPayment, mortgageInputVals.loanTerm, mortgageInputVals.interestRate).toFixed(2);
        updateMortageChart();
        console.log(mortageOutputVals);
    })
    document.getElementsByName("property_tax")[0].addEventListener('input', () => {
        mortageOutputVals.taxes = document.getElementsByName("property_tax")[0].value;
        updateMortageChart();
        console.log(mortageOutputVals);
    })
    document.getElementsByName("home_insurance")[0].addEventListener('input', () => {
        mortageOutputVals.insurance = document.getElementsByName("home_insurance")[0].value;
        updateMortageChart();
        console.log(mortageOutputVals);
    })
    document.getElementsByName("HOA_dues")[0].addEventListener('input', () => {
        mortageOutputVals.HOA = document.getElementsByName("HOA_dues")[0].value;
        updateMortageChart();
        console.log(mortageOutputVals);
    })
}

export function getMortageOutputVals(){
    return mortageOutputVals;
}

var options = {
    series: Object.values(mortageOutputVals),
    labels: ['Principal & Interest', 'Taxes', 'Insurance', 'HOA'],
    chart: {
        type: 'donut',
    },
    responsive: [{
        brakepoint: 2000,
        options: {
            chart: {
                width: 600
            },
            legend: {
                position: 'left'
            }
        }
    }],
    plotOptions: {
        pie: {
          donut: {
            labels: {
              show: true,
              total: {
                show: true,
                label: 'Total',
                formatter: () => '$ ' + getTotal(),
                color: '#ffffff',
                fontFamily: 'Riviera Nights'
              }
            }
          }
        }
    },
    legend:{
        position: 'left',
        fontFamily: 'Riviera Nights',
        fontSize: 16,
        color: '#ffffff',
    }
};

function getTotal(){
    let total = 1. * mortageOutputVals.HOA + 1. * mortageOutputVals.insurance + 1. * mortageOutputVals.principalAndInterest + 1. * mortageOutputVals.taxes;
    return Number(total).toFixed(2)
}

function createMortageChart(){
    const vals = Object.values(mortageOutputVals).map((i) => i * 1.)
    options.series = vals
    mortgageChart = new ApexCharts(mortgageElement, options);
    mortgageChart.render();
}

function updateMortageChart(){
    const vals = Object.values(mortageOutputVals).map((i) => i * 1.)
    options.series = vals
    mortgageChart.updateOptions(options, false, true, true)
}