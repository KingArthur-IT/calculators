import ApexCharts from 'apexcharts';

const homeAffordElement = document.querySelector("#home-afford-chart");
var homeAffordChart;

var homeAffordOutputVals = {
    PAndI: 0,
    taxes: 100,
    insurance: 100
}

export function getInitHomeAfforfdValues(){
    createHomeAffordChart();
}

export function onInputHomeAfford(){
    document.getElementsByName("home_annual_income")[0].addEventListener('input', () => {
        updateHomeAffordChart();
    })
    document.getElementsByName("home_down_payment")[0].addEventListener('input', () => {
        updateHomeAffordChart();
    })
    document.getElementsByName("home_monthly_debts")[0].addEventListener('input', () => {
        updateHomeAffordChart();
    })
    document.getElementsByName("home_loan_term")[0].addEventListener('input', () => {
        updateHomeAffordChart();
    })
    document.getElementsByName("home-loan-term-minus")[0].addEventListener('click', () => {
        updateHomeAffordChart();
    })
    document.getElementsByName("home-loan-term-plus")[0].addEventListener('click', () => {
        updateHomeAffordChart();
    })
    document.getElementsByName("home_interest_rate")[0].addEventListener('input', () => {
        updateHomeAffordChart();
    })
    document.getElementsByName("home-debt-to-income")[0].addEventListener('input', () => {
        updateHomeAffordChart();
    })
    document.getElementsByName("home_insurance")[0].addEventListener('input', () => {
        updateHomeAffordChart();
    })
    document.getElementsByName("home_property_tax")[0].addEventListener('input', () => {
        updateHomeAffordChart();
    })
    document.getElementsByName("home_HOA_dues")[0].addEventListener('input', () => {
        updateHomeAffordChart();
    })
}

var options = {
    series: Object.values(homeAffordOutputVals),
    labels: ['P&I', 'Taxes', 'Insurance'],
    chart: {
        type: 'donut'
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
          breakpoint: 650,
          options: {
              chart: {
                  width: 500,
              },
          }
        },
        {
            breakpoint: 525,
            options: {
                chart: {
                    width: 450,
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
    homeAffordOutputVals.PAndI = Math.random() * 5000 + 5000;
    vals.push(homeAffordOutputVals.PAndI)
    homeAffordOutputVals.taxes = Math.random() * 5000 + 5000;
    vals.push(homeAffordOutputVals.taxes)
    homeAffordOutputVals.insurance = Math.random() * 5000 + 5000;
    vals.push(homeAffordOutputVals.insurance)
    
    options.series = vals
    homeAffordChart = new ApexCharts(homeAffordElement, options);
    homeAffordChart.render();
}

function updateHomeAffordChart(){
    homeAffordChart.destroy();
    createHomeAffordChart();
}