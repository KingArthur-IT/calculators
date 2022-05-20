import { caclMortgage } from './mortgage.js'
import ApexCharts from 'apexcharts';

const MONTHES = 12.;
const comparisonElement = document.querySelector("#comparison-chart");
var comparisonChart;

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
    loanComparisonOutputVals.insurance = document.getElementsByName("homeowners_insurance_loan_comparison")[0].value;
    
    calcOption1();
    calcOption2();
    createComparisonChart();
}

export function onInputLoanComparison(){
    document.getElementsByName("loan_amount")[0].addEventListener('input', () => {
        loanComparisonInputVals.loanAmount = document.getElementsByName("loan_amount")[0].value;

        calcOption1();
        calcOption2();
        
        updateComparisonChart();

        document.getElementsByName('comparison-insurance-percent')[0].innerHTML = (100. * loanComparisonOutputVals.insurance / loanComparisonInputVals.loanAmount).toFixed(2) + '%';
        document.getElementsByName('comparison-tax-percent')[0].innerHTML = (100. * loanComparisonOutputVals.tax / loanComparisonInputVals.loanAmount).toFixed(2) + '%';
    })
    document.getElementsByName("loan_term_comparison_1")[0].addEventListener('input', () => {
        loanComparisonInputVals.loanTermOption1 = document.getElementsByName("loan_term_comparison_1")[0].value;

        calcOption1();
        
        updateComparisonChart();
    })
    document.getElementsByName("loan-option1-comparison-minus")[0].addEventListener('click', () => {
        loanComparisonInputVals.loanTermOption1 = document.getElementsByName("loan_term_comparison_1")[0].value;

        calcOption1();
        updateComparisonChart();
    })
    document.getElementsByName("loan-option1-comparison-plus")[0].addEventListener('click', () => {
        loanComparisonInputVals.loanTermOption1 = document.getElementsByName("loan_term_comparison_1")[0].value;

        calcOption1();
        updateComparisonChart();
    })
    document.getElementsByName("loan_term_comparison_2")[0].addEventListener('input', () => {
        loanComparisonInputVals.loanTermOption2 = document.getElementsByName("loan_term_comparison_2")[0].value;

        calcOption2();
        updateComparisonChart();
    })
    document.getElementsByName("loan-option2-comparison-minus")[0].addEventListener('click', () => {
        loanComparisonInputVals.loanTermOption2 = document.getElementsByName("loan_term_comparison_2")[0].value;

        calcOption2();
        updateComparisonChart();
    })
    document.getElementsByName("loan-option2-comparison-plus")[0].addEventListener('click', () => {
        loanComparisonInputVals.loanTermOption2 = document.getElementsByName("loan_term_comparison_2")[0].value;

        calcOption2();
        updateComparisonChart();
    })
    document.getElementsByName("interest_rate_comparison_1")[0].addEventListener('input', () => {
        loanComparisonInputVals.interestRateOpetion1 = document.getElementsByName("interest_rate_comparison_1")[0].value;

        calcOption1();
        updateComparisonChart();
    })
    document.getElementsByName("interest_rate_comparison_2")[0].addEventListener('input', () => {
        loanComparisonInputVals.interestRateOpetion2 = document.getElementsByName("interest_rate_comparison_2")[0].value;

        calcOption2();
        updateComparisonChart();
    })
    document.getElementsByName("property_tax_loan_comparison")[0].addEventListener('input', () => {
        loanComparisonOutputVals.tax = document.getElementsByName("property_tax_loan_comparison")[0].value;
        updateComparisonChart();
        document.getElementsByName('comparison-tax-percent')[0].innerHTML = (100. * loanComparisonOutputVals.tax / loanComparisonInputVals.loanAmount).toFixed(2) + '%';
    })
    document.getElementsByName("homeowners_insurance_loan_comparison")[0].addEventListener('input', () => {
        loanComparisonOutputVals.insurance = document.getElementsByName("homeowners_insurance_loan_comparison")[0].value;
        updateComparisonChart();
        document.getElementsByName('comparison-insurance-percent')[0].innerHTML = (100. * loanComparisonOutputVals.insurance / loanComparisonInputVals.loanAmount).toFixed(2) + '%';
    })
    document.getElementsByName('comparison-btn-balance')[0].addEventListener('click', () => {
        updateComparisonChart();
    })
    document.getElementsByName('comparison-btn-monthly')[0].addEventListener('click', () => {
        updateComparisonChart();
    })
}

export function getLoanComparisonOutputVals(){
    return loanComparisonOutputVals
}

var options = {
    series: [
        {
            name: 'Incurance',
            data: [0, 0]
        }, 
        {
            name: 'Taxes',
            data: [0, 0]
        }, 
        {
            name: 'Interest',
            data: [0, 0]
  
        }, 
        {
            name: 'Principal',
            data: [0, 0]
        }
    ],
    chart: {
        type: 'bar',
        height: 300,
        width: 800,
        stacked: true,
    },
    plotOptions: {
        bar: {
            horizontal: true,
            dataLabels: {
                position: 'bottom'
              }
        },
    },
    stroke: {
        width: 1,
        colors: ['#000']
    },
    xaxis: {
        categories: ['Loan Option1', 'Loan Option2'],
        labels: {
            style:{
                colors: ['#ffffff']
            },
            formatter: function (val) {
                return '$' + (val / 1000).toFixed() + 'K'
            }
        },
        axisBorder: {
            show: true,
            color: '#ffffff',
            offsetX: -1,
            offsetY: 0
        },
    },
    yaxis:{
        labels:{
            style:{
                colors: ['#ffffff'],
                fontFamily: 'Riviera Nights',
                fontSize: '14px'
            },
            formatter: function (val) {
                return val
            },
        },
    },
    dataLabels: {
        enabled: true,
        offsetX: -65,
        offsetY: 20,
        style: {
          fontSize: '14px',
          colors: ["#ffffff"]
        },
        formatter: function(value, { seriesIndex, dataPointIndex, w}) {
            if (seriesIndex === 0)
                return '$' + w.globals.stackedSeriesTotals[dataPointIndex].toFixed(2)
        }
    },
    tooltip: {
        y: {
          formatter: function (val) {
            return '$' + Number(val).toFixed(2)
          },
        },
        theme: 'dark'
    },
    legend: {
        position: 'top',
        horizontalAlign: 'left',
        offsetX: 40,
        fontFamily: 'Riviera Nights',
        fontSize: 16,
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
            horizontal: 10,
            vertical: 0
        },
    },
};

function createComparisonChart(){
    options.series[0].data = [loanComparisonOutputVals.insurance, loanComparisonOutputVals.insurance];
    options.series[1].data = [loanComparisonOutputVals.tax, loanComparisonOutputVals.tax];
    options.series[2].data = [loanComparisonOutputVals.interestOption1, loanComparisonOutputVals.interestOption2];
    options.series[3].data = [loanComparisonOutputVals.principalOption1, loanComparisonOutputVals.principalOption2];
    comparisonChart = new ApexCharts(comparisonElement, options);
    comparisonChart.render();
}

function updateComparisonChart(){
    const diff = loanComparisonOutputVals.interestOption1 + loanComparisonOutputVals.principalOption1 - loanComparisonOutputVals.interestOption2 - loanComparisonOutputVals.principalOption2;
    document.getElementsByName('comparison-title-value')[0].innerHTML = Math.abs(diff).toFixed(2);
    document.getElementsByName('comparison-title-sign')[0].innerHTML = Math.sign(diff) > 0 ? 'bigger' : 'lower';

    comparisonChart.destroy();
    createComparisonChart()
}

function calcOption1(){
    const option1 = caclInterestAndPrincipal(loanComparisonInputVals.loanAmount, loanComparisonInputVals.loanTermOption1, loanComparisonInputVals.interestRateOpetion1);
    loanComparisonOutputVals.interestOption1 = option1.interest;
    loanComparisonOutputVals.principalOption1 = option1.principal;
}
function calcOption2(){
    const option2 = caclInterestAndPrincipal(loanComparisonInputVals.loanAmount, loanComparisonInputVals.loanTermOption2, loanComparisonInputVals.interestRateOpetion2);
    loanComparisonOutputVals.interestOption2 = option2.interest;
    loanComparisonOutputVals.principalOption2 = option2.principal;
}
function getTotal(seriesName){
    const name = String(seriesName);
    const i = name[name.length-1];
    const constVals = loanComparisonOutputVals.insurance + loanComparisonOutputVals.tax;
    const p = loanComparisonOutputVals['interestOption' + i] + loanComparisonOutputVals['principalOption' + i]
    return Number(p + constVals).toFixed(2)
}