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
        if (mortgageInputVals.homePrice > 0){
            document.getElementsByName("mortgage_down_payment_percent")[0].innerHTML = (100. * mortgageInputVals.downPayment / mortgageInputVals.homePrice).toFixed(2) + '%';
            document.getElementsByName("mortgage_tax_percent")[0].innerHTML = (100. * mortageOutputVals.taxes / mortgageInputVals.homePrice).toFixed(2) + '%';
        }
        else{
            document.getElementsByName("mortgage_down_payment_percent")[0].innerHTML = '100%';
            document.getElementsByName("mortgage_tax_percent")[0].innerHTML = '100%';
        }
    })
    document.getElementsByName("down_payment")[0].addEventListener('input', () => {
        mortgageInputVals.downPayment = document.getElementsByName("down_payment")[0].value;
        mortageOutputVals.principalAndInterest = caclMortgage(mortgageInputVals.homePrice, mortgageInputVals.downPayment, mortgageInputVals.loanTerm, mortgageInputVals.interestRate).toFixed(2);
        updateMortageChart();
        if (mortgageInputVals.homePrice > 0)
            document.getElementsByName("mortgage_down_payment_percent")[0].innerHTML = (100. * mortgageInputVals.downPayment / mortgageInputVals.homePrice).toFixed(2) + '%';
        else document.getElementsByName("mortgage_down_payment_percent")[0].innerHTML = '100%';
    })
    document.getElementsByName("loan_term")[0].addEventListener('input', () => {
        mortgageInputVals.loanTerm = document.getElementsByName("loan_term")[0].value;
        mortageOutputVals.principalAndInterest = caclMortgage(mortgageInputVals.homePrice, mortgageInputVals.downPayment, mortgageInputVals.loanTerm, mortgageInputVals.interestRate).toFixed(2);
        updateMortageChart();
    })
    document.getElementsByName("mortgage_year_minus")[0].addEventListener('click', () => {
        mortgageInputVals.loanTerm = document.getElementsByName("loan_term")[0].value;
        mortageOutputVals.principalAndInterest = caclMortgage(mortgageInputVals.homePrice, mortgageInputVals.downPayment, mortgageInputVals.loanTerm, mortgageInputVals.interestRate).toFixed(2);
        updateMortageChart();
    })
    document.getElementsByName("mortgage_year_plus")[0].addEventListener('click', () => {
        mortgageInputVals.loanTerm = document.getElementsByName("loan_term")[0].value;
        mortageOutputVals.principalAndInterest = caclMortgage(mortgageInputVals.homePrice, mortgageInputVals.downPayment, mortgageInputVals.loanTerm, mortgageInputVals.interestRate).toFixed(2);
        updateMortageChart();
    })
    document.getElementsByName("interest_rate_mortgage")[0].addEventListener('input', () => {
        mortgageInputVals.interestRate = document.getElementsByName("interest_rate_mortgage")[0].value;
        mortageOutputVals.principalAndInterest = caclMortgage(mortgageInputVals.homePrice, mortgageInputVals.downPayment, mortgageInputVals.loanTerm, mortgageInputVals.interestRate).toFixed(2);
        updateMortageChart();
    })
    document.getElementsByName("property_tax")[0].addEventListener('input', () => {
        mortageOutputVals.taxes = document.getElementsByName("property_tax")[0].value;
        updateMortageChart();
        if (mortgageInputVals.homePrice > 0)
            document.getElementsByName("mortgage_tax_percent")[0].innerHTML = (100. * mortageOutputVals.taxes / mortgageInputVals.homePrice).toFixed(2) + '%';
        else document.getElementsByName("mortgage_tax_percent")[0].innerHTML = '100%';
    })
    document.getElementsByName("home_insurance")[0].addEventListener('input', () => {
        mortageOutputVals.insurance = document.getElementsByName("home_insurance")[0].value;
        updateMortageChart();
    })
    document.getElementsByName("HOA_dues")[0].addEventListener('input', () => {
        mortageOutputVals.HOA = document.getElementsByName("HOA_dues")[0].value;
        updateMortageChart();
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
                color: '#ffffff',
                label: 'Total',
                fontFamily: 'Riviera Nights',
                formatter: function () {
                    return '$ ' + getTotal()
                }
              },
              value: {
                show: true,
                fontSize: '16px',
                fontFamily: 'Riviera Nights',
                fontWeight: 400,
                color: '#ffffff',
                formatter: function (val) {
                  return '$ ' + val
                }
              },
            },
          }
        }
    },
    legend:{
        position: 'left',
        fontFamily: 'Riviera Nights',
        fontSize: 16,
        horizontalAlign: 'center', 
        offsetX: 0,
        offsetY: 20,
        labels: {
            colors: '#ffffff'
        },
        markers: {
            width: 16,
            height: 16,
            radius: 16,
            offsetX: -10,
            offsetY: 2
        },
        itemMargin: {
            horizontal: 0,
            vertical: 10
        },
    },
    tooltip: {
        y: {
            formatter: function(value) {
              return '$' + value
            }
          }
    },
    stroke: {
        show: true,
        curve: 'smooth',
        colors: '#000000',
        width: 2,    
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
    mortgageChart.updateOptions(options, true, true, true)
}