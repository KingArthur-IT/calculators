import ApexCharts from 'apexcharts';

const MONTHES = 12.;
const homeAffordElement = document.querySelector("#home-afford-chart");
var homeAffordChart;

var homeAffordInputVals = {
    annualIncome: 700000,
    downPayment: 20000,
    loanTerm: 5,
    monthlyDebts: 500,
    interestRate: 3.6,
    debtToIncome: 36,
    taxes: 100,
    insurance: 100,
    HOADues: 0
}

var homeAffordOutputVals = {
    PAndI: 0,
    taxes: 100,
    insurance: 100
}

export function getInitHomeAfforfdValues(){
    homeAffordInputVals.annualIncome = document.getElementsByName('home_annual_income')[0].value.replaceAll(',', '');
    homeAffordInputVals.downPayment = document.getElementsByName('home_down_payment')[0].value.replaceAll(',', '');
    homeAffordInputVals.monthlyDebts = document.getElementsByName('home_monthly_debts')[0].value.replaceAll(',', '');
    homeAffordInputVals.loanTerm = document.getElementsByName('home_loan_term')[0].value.replaceAll(',', '');
    homeAffordInputVals.interestRate = document.getElementsByName('home_interest_rate')[0].value.replaceAll(',', '');

    homeAffordInputVals.debtToIncome = document.getElementsByName('home-debt-to-income')[0].value.replaceAll(',', '');
    homeAffordInputVals.insurance = document.getElementsByName('home_insurance')[0].value.replaceAll(',', '');
    homeAffordInputVals.taxes = document.getElementsByName('home_property_tax')[0].value.replaceAll(',', '');
    homeAffordInputVals.HOADues = document.getElementsByName('home_HOA_dues')[0].value.replaceAll(',', '');
    
    createHomeAffordChart();
}

function caclHomeAfford(monthly, downPayment, loanTerm, interestRate){
    const i = 1. * interestRate / (100.0 * MONTHES),
          n = loanTerm * MONTHES,
          intermediateVal = Math.pow(i + 1, n),
          k = 1. * i * intermediateVal / (intermediateVal - 1.);
    return 1. * downPayment + 1. * monthly / k 
}

export function onInputHomeAfford(){
    document.getElementsByName('calculator-btn-home')[0].addEventListener('click', () => {
        //updateHomeAffordChart()
        homeAffordChart.destroy();
        setTimeout(() => {
            createHomeAffordChart();
        }, 170);
    })
    document.getElementsByName("home_annual_income")[0].addEventListener('input', () => {
        homeAffordInputVals.annualIncome = document.getElementsByName('home_annual_income')[0].value.replaceAll(',', '');

        if (Number(homeAffordInputVals.downPayment) > Number(homeAffordInputVals.annualIncome)){
            homeAffordInputVals.downPayment = homeAffordInputVals.annualIncome;
            document.getElementsByName("home_down_payment")[0].value = homeAffordInputVals.downPayment.replace(/\B(?=(?:\d{3})+(?!\d))/g, ',');
        }
        if (Number(homeAffordInputVals.insurance) > Number(homeAffordInputVals.annualIncome)){
            homeAffordInputVals.insurance = homeAffordInputVals.annualIncome;
            document.getElementsByName("home_afford_insurance")[0].value = homeAffordInputVals.insurance.replace(/\B(?=(?:\d{3})+(?!\d))/g, ',');
        }

        calculateMonthlyDepth();

        if (Number(homeAffordInputVals.monthlyDebts) > Number(homeAffordInputVals.annualIncome)){
            homeAffordInputVals.monthlyDebts = homeAffordInputVals.annualIncome;
            document.getElementsByName("home_monthly_debts")[0].value = homeAffordInputVals.monthlyDebts.replace(/\B(?=(?:\d{3})+(?!\d))/g, ',');
        }

        updateHomeAffordChart();
    })
    document.getElementsByName("home_down_payment")[0].addEventListener('input', () => {
        homeAffordInputVals.downPayment = document.getElementsByName('home_down_payment')[0].value.replaceAll(',', '');
        if (Number(homeAffordInputVals.downPayment) > Number(homeAffordInputVals.annualIncome)){
            homeAffordInputVals.downPayment = homeAffordInputVals.annualIncome;
            document.getElementsByName("home_down_payment")[0].value = homeAffordInputVals.downPayment.replace(/\B(?=(?:\d{3})+(?!\d))/g, ',');
        }

        updateHomeAffordChart();
    })
    document.getElementsByName("home_monthly_debts")[0].addEventListener('input', () => {
        homeAffordInputVals.monthlyDebts = document.getElementsByName('home_monthly_debts')[0].value.replaceAll(',', '');
        
        calculatePercent();

        updateHomeAffordChart();
    })
    document.getElementsByName("home_loan_term")[0].addEventListener('input', () => {
        homeAffordInputVals.loanTerm = document.getElementsByName('home_loan_term')[0].value;
        updateHomeAffordChart();
    })
    document.getElementsByName("home-loan-term-minus")[0].addEventListener('click', () => {
        homeAffordInputVals.loanTerm = document.getElementsByName('home_loan_term')[0].value;
        updateHomeAffordChart();
    })
    document.getElementsByName("home-loan-term-plus")[0].addEventListener('click', () => {
        homeAffordInputVals.loanTerm = document.getElementsByName('home_loan_term')[0].value;
        updateHomeAffordChart();
    })
    document.getElementsByName("home_interest_rate")[0].addEventListener('input', () => {
        homeAffordInputVals.interestRate = document.getElementsByName('home_interest_rate')[0].value;
        updateHomeAffordChart();
    })
    document.getElementsByName("home-debt-to-income")[0].addEventListener('input', () => {
        if (1. * document.getElementsByName('home-debt-to-income')[0].value < 100.)
            homeAffordInputVals.debtToIncome = document.getElementsByName('home-debt-to-income')[0].value;
            
        document.getElementsByName('home-debt-to-income')[0].value = homeAffordInputVals.debtToIncome;

        calculateMonthlyDepth();
        
        updateHomeAffordChart();
    })
    document.getElementsByName("home_afford_insurance")[0].addEventListener('input', () => {
        homeAffordInputVals.insurance = document.getElementsByName('home_afford_insurance')[0].value.replaceAll(',', '');

        if (Number(homeAffordInputVals.insurance) > Number(homeAffordInputVals.annualIncome)){
            homeAffordInputVals.insurance = homeAffordInputVals.annualIncome;
            document.getElementsByName("home_afford_insurance")[0].value = homeAffordInputVals.insurance.replace(/\B(?=(?:\d{3})+(?!\d))/g, ',');
        }

        calculateMonthlyDepth();
        updateHomeAffordChart();
    })
    document.getElementsByName("home_property_tax")[0].addEventListener('input', () => {
        homeAffordInputVals.taxes = document.getElementsByName('home_property_tax')[0].value.replaceAll(',', '');
        calculateMonthlyDepth();
        updateHomeAffordChart();
    })
    document.getElementsByName("home_HOA_dues")[0].addEventListener('input', () => {
        homeAffordInputVals.HOADues = document.getElementsByName('home_HOA_dues')[0].value.replaceAll(',', '');
        calculateMonthlyDepth();
        updateHomeAffordChart();
    })
}

var options = {
    series: Object.values(homeAffordOutputVals),
    labels: ['P&I', 'Taxes', 'Insurance'],
    chart: {
        type: 'donut',
        width: '100%',
        height: 600
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
                    return '$ ' + String(getTotal()).replace(/\B(?=(?:\d{3})+(?!\d))/g, ',')
                }
              },
              value: {
                show: true,
                fontSize: '16px',
                fontFamily: 'Riviera Nights',
                fontWeight: 400,
                color: '#ffffff',
                formatter: function (val) {
                  return '$ ' + String(Number(val).toFixed(2)).replace(/\B(?=(?:\d{3})+(?!\d))/g, ',')
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
              return '$' + String(value.toFixed(2)).replace(/\B(?=(?:\d{3})+(?!\d))/g, ',')
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
            breakpoint: 1250,
            options: {
                chart: {
                    width: 550,
                },
            }
        },
        {
            breakpoint: 1025,
            options: {
                chart: {
                    width: '100%',
                },
            }
        },
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
                      offsetY: -15,
                      itemMargin: {
                          horizontal: 5,
                          vertical: 5
                      },
                  }
            }
          }
      ]
};

function getTotal(){
    let total = 1. * homeAffordOutputVals.insurance + 1. * homeAffordOutputVals.PAndI + 1. * homeAffordOutputVals.taxes;
    return Number(total).toFixed(2)
}

function createHomeAffordChart(){
    let vals = []

    const home = caclHomeAfford(homeAffordInputVals.monthlyDebts, homeAffordInputVals.downPayment, homeAffordInputVals.loanTerm, homeAffordInputVals.interestRate);
    homeAffordOutputVals.PAndI = Number(home).toFixed(2);
    vals.push(1. * homeAffordOutputVals.PAndI);
    
    homeAffordOutputVals.taxes = homeAffordOutputVals.PAndI * 0.01 * homeAffordInputVals.taxes;
    vals.push(homeAffordOutputVals.taxes)

    homeAffordOutputVals.insurance = 1. * homeAffordInputVals.insurance * homeAffordInputVals.loanTerm * MONTHES;
    vals.push(homeAffordOutputVals.insurance)
    
    options.series = vals
    homeAffordChart = new ApexCharts(homeAffordElement, options);
    homeAffordChart.render();

    const total = (1. * homeAffordOutputVals.PAndI + 1. * homeAffordOutputVals.insurance + 1. * homeAffordOutputVals.taxes).toFixed();
    document.getElementsByName('home-title-full')[0].textContent = String(total).replace(/\B(?=(?:\d{3})+(?!\d))/g, ',');
    document.getElementsByName('home-title-monthly')[0].textContent = String((1. * homeAffordInputVals.monthlyDebts).toFixed()).replace(/\B(?=(?:\d{3})+(?!\d))/g, ',');
}

function updateHomeAffordChart(){
    homeAffordChart.destroy();
    createHomeAffordChart();
}

function calculateMonthlyDepth(){
    let monthlyIncome = 1. * homeAffordInputVals.annualIncome / (MONTHES);
    monthlyIncome = 1. * monthlyIncome - 1. * homeAffordInputVals.insurance - monthlyIncome * homeAffordInputVals.taxes / 100. - 1. * homeAffordInputVals.HOADues;
    
    if (1. * monthlyIncome < 0.0) monthlyIncome = 0.0;
    homeAffordInputVals.monthlyDebts = (1. * monthlyIncome * homeAffordInputVals.debtToIncome / 100.).toFixed();
    document.getElementsByName("home_monthly_debts")[0].value = String(homeAffordInputVals.monthlyDebts).replace(/\B(?=(?:\d{3})+(?!\d))/g, ',');
}

function calculatePercent(){
    let monthlyIncome = 1. * homeAffordInputVals.annualIncome / (MONTHES);
    monthlyIncome = 1. * monthlyIncome - 1. * homeAffordInputVals.insurance - monthlyIncome * homeAffordInputVals.taxes / 100. - 1. * homeAffordInputVals.HOADues;
    if (monthlyIncome < 0) monthlyIncome = 0.0;
    
    homeAffordInputVals.debtToIncome = (100. * homeAffordInputVals.monthlyDebts / monthlyIncome).toFixed();
    document.getElementsByName("home-debt-to-income")[0].value = String(homeAffordInputVals.debtToIncome);
}