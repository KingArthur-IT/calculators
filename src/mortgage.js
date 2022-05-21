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
    mortgageInputVals.homePrice = document.getElementsByName("home_price")[0].value.replaceAll(',', '');
    mortgageInputVals.downPayment = document.getElementsByName("down_payment")[0].value.replaceAll(',', '');
    mortgageInputVals.loanTerm = document.getElementsByName("loan_term")[0].value;
    mortgageInputVals.interestRate = document.getElementsByName("interest_rate_mortgage")[0].value;

    mortageOutputVals.taxes = document.getElementsByName("property_tax")[0].value.replaceAll(',', '');
    mortageOutputVals.insurance = document.getElementsByName("home_insurance")[0].value.replaceAll(',', '');
    mortageOutputVals.HOA = document.getElementsByName("HOA_dues")[0].value.replaceAll(',', '');
    mortageOutputVals.principalAndInterest = caclMortgage(mortgageInputVals.homePrice, mortgageInputVals.downPayment, mortgageInputVals.loanTerm, mortgageInputVals.interestRate).toFixed(2)

    createMortageChart();
}

export function onInputMortage(){
    document.getElementsByName('calculator-btn-mortgage')[0].addEventListener('click', () => {
        mortgageChart.destroy();
        //createMortageChart();
        setTimeout(() => {
            //updateMortageChart();
            createMortageChart();
        }, 170);
    })
    document.getElementsByName("home_price")[0].addEventListener('input', () => {
        mortgageInputVals.homePrice = document.getElementsByName("home_price")[0].value.replaceAll(',', '');
        
        if (Number(mortgageInputVals.downPayment) > Number(mortgageInputVals.homePrice)){
            mortgageInputVals.downPayment = mortgageInputVals.homePrice;
            document.getElementsByName("down_payment")[0].value = mortgageInputVals.downPayment.replace(/\B(?=(?:\d{3})+(?!\d))/g, ',');
        }
        if (Number(mortageOutputVals.taxes) > Number(mortgageInputVals.homePrice)){
            mortageOutputVals.taxes = mortgageInputVals.homePrice;
            document.getElementsByName("property_tax")[0].value = mortgageInputVals.homePrice.replace(/\B(?=(?:\d{3})+(?!\d))/g, ',');
        }
        
        if (mortgageInputVals.homePrice > 0){
            document.getElementsByName("mortgage_down_payment_percent")[0].innerHTML = (100. * mortgageInputVals.downPayment / mortgageInputVals.homePrice).toFixed(2) + '%';
            document.getElementsByName("mortgage_tax_percent")[0].innerHTML = (100. * mortageOutputVals.taxes / mortgageInputVals.homePrice).toFixed(2) + '%';
        }
        else{
            document.getElementsByName("mortgage_down_payment_percent")[0].innerHTML = '100%';
            document.getElementsByName("mortgage_tax_percent")[0].innerHTML = '100%';
        }
        mortageOutputVals.principalAndInterest = caclMortgage(mortgageInputVals.homePrice, mortgageInputVals.downPayment, mortgageInputVals.loanTerm, mortgageInputVals.interestRate).toFixed(2);
        updateMortageChart();
    })
    document.getElementsByName("down_payment")[0].addEventListener('input', () => {
        mortgageInputVals.downPayment = document.getElementsByName("down_payment")[0].value.replaceAll(',', '');
        
        if (1. * mortgageInputVals.downPayment > 1. * mortgageInputVals.homePrice){
            mortgageInputVals.downPayment = mortgageInputVals.homePrice;
            document.getElementsByName("down_payment")[0].value = mortgageInputVals.downPayment.replace(/\B(?=(?:\d{3})+(?!\d))/g, ',');
        }
        if (Number(mortageOutputVals.taxes) > Number(mortgageInputVals.homePrice)){
            mortageOutputVals.taxes = mortgageInputVals.homePrice;
            document.getElementsByName("property_tax")[0].value = mortgageInputVals.homePrice.replace(/\B(?=(?:\d{3})+(?!\d))/g, ',');
        }

        if (mortgageInputVals.homePrice > 0)
            document.getElementsByName("mortgage_down_payment_percent")[0].innerHTML = (100. * mortgageInputVals.downPayment / mortgageInputVals.homePrice).toFixed(2) + '%';
        else document.getElementsByName("mortgage_down_payment_percent")[0].innerHTML = '100%';
        
        mortageOutputVals.principalAndInterest = caclMortgage(mortgageInputVals.homePrice, mortgageInputVals.downPayment, mortgageInputVals.loanTerm, mortgageInputVals.interestRate).toFixed(2);
        updateMortageChart();
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
        mortageOutputVals.taxes = document.getElementsByName("property_tax")[0].value.replaceAll(',', '');
 
        if (Number(mortageOutputVals.taxes) > Number(mortgageInputVals.homePrice)){
            mortageOutputVals.taxes = mortgageInputVals.homePrice;
            document.getElementsByName("property_tax")[0].value = mortgageInputVals.homePrice.replace(/\B(?=(?:\d{3})+(?!\d))/g, ',');
        }
        if (mortgageInputVals.homePrice > 0)
            document.getElementsByName("mortgage_tax_percent")[0].innerHTML = (100. * mortageOutputVals.taxes / mortgageInputVals.homePrice).toFixed(2) + '%';
        else document.getElementsByName("mortgage_tax_percent")[0].innerHTML = '100%';
        updateMortageChart();
    })
    document.getElementsByName("home_insurance")[0].addEventListener('input', () => {
        mortageOutputVals.insurance = document.getElementsByName("home_insurance")[0].value.replaceAll(',', '');
        updateMortageChart();
    })
    document.getElementsByName("HOA_dues")[0].addEventListener('input', () => {
        mortageOutputVals.HOA = document.getElementsByName("HOA_dues")[0].value.replaceAll(',', '');
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
                    return '$ ' + getTotal().replace(/\B(?=(?:\d{3})+(?!\d))/g, ',')
                }
              },
              value: {
                show: true,
                fontSize: '16px',
                fontFamily: 'Riviera Nights',
                fontWeight: 400,
                color: '#ffffff',
                formatter: function (val) {
                  return '$ ' + val.replace(/\B(?=(?:\d{3})+(?!\d))/g, ',')
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
    },
    responsive: [
        {
          breakpoint: 480,
          options: {
              chart: {
                  width: '100%',
                  height: 600,
               },
                legend: {
                    position: "bottom",
                    fontSize: 14,
                    offsetY: 0,
                    itemMargin: {
                        horizontal: 5,
                        vertical: 5
                    },
                },
            }
        }
      ]
};

function getTotal(){
    let total = 1. * mortageOutputVals.HOA + 1. * mortageOutputVals.insurance + 1. * mortageOutputVals.principalAndInterest + 1. * mortageOutputVals.taxes;
    return Number(Math.abs(total)).toFixed(2)
}

function createMortageChart(){
    const vals = Object.values(mortageOutputVals).map((i) => i * 1.)
    options.series = vals
    mortgageChart = new ApexCharts(mortgageElement, options);
    mortgageChart.render();
}

function updateMortageChart(){
    mortgageChart.destroy();
    createMortageChart();
}