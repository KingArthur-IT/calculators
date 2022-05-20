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
    console.log('amount', Amount, loanAmount, 0.0, loanAmount, interestRate)
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
    loanComparisonOutputVals.insurance = document.getElementsByName("homeowners_insurance")[0].value;

    createComparisonChart();
}

export function onInputLoanComparison(){
    document.getElementsByName("loan_amount")[0].addEventListener('input', () => {
        loanComparisonInputVals.loanAmount = document.getElementsByName("loan_amount")[0].value;

        const option1 = caclInterestAndPrincipal(loanComparisonInputVals.loanAmount, loanComparisonInputVals.loanTermOption1, loanComparisonInputVals.interestRateOpetion1),
              option2 = caclInterestAndPrincipal(loanComparisonInputVals.loanAmount, loanComparisonInputVals.loanTermOption2, loanComparisonInputVals.interestRateOpetion2);
        loanComparisonOutputVals.interestOption1 = option1.interest;
        loanComparisonOutputVals.principalOption1 = option1.principal;
        loanComparisonOutputVals.interestOption2 = option2.interest;
        loanComparisonOutputVals.principalOption2 = option2.principal;
        
        console.log(loanComparisonOutputVals);
        updateComparisonChart();
    })
    document.getElementsByName("loan_term_comparison_1")[0].addEventListener('input', () => {
        loanComparisonInputVals.loanTermOption1 = document.getElementsByName("loan_term_comparison_1")[0].value;

        const option1 = caclInterestAndPrincipal(loanComparisonInputVals.loanAmount, loanComparisonInputVals.loanTermOption1, loanComparisonInputVals.interestRateOpetion1);
        loanComparisonOutputVals.interestOption1 = option1.interest;
        loanComparisonOutputVals.principalOption1 = option1.principal;
        
        console.log(loanComparisonOutputVals);
        updateComparisonChart();
    })
    document.getElementsByName("loan_term_comparison_2")[0].addEventListener('input', () => {
        loanComparisonInputVals.loanTermOption2 = document.getElementsByName("loan_term_comparison_2")[0].value;

        const option2 = caclInterestAndPrincipal(loanComparisonInputVals.loanAmount, loanComparisonInputVals.loanTermOption2, loanComparisonInputVals.interestRateOpetion2);
        loanComparisonOutputVals.interestOption2 = option2.interest;
        loanComparisonOutputVals.principalOption2 = option2.principal;
        
        console.log(loanComparisonOutputVals);
        updateComparisonChart();
    })
    document.getElementsByName("interest_rate_comparison_1")[0].addEventListener('input', () => {
        loanComparisonInputVals.interestRateOpetion1 = document.getElementsByName("interest_rate_comparison_1")[0].value;

        const option1 = caclInterestAndPrincipal(loanComparisonInputVals.loanAmount, loanComparisonInputVals.loanTermOption1, loanComparisonInputVals.interestRateOpetion1);
        loanComparisonOutputVals.interestOption1 = option1.interest;
        loanComparisonOutputVals.principalOption1 = option1.principal;
        
        console.log(loanComparisonOutputVals);
        updateComparisonChart();
    })
    document.getElementsByName("interest_rate_comparison_2")[0].addEventListener('input', () => {
        loanComparisonInputVals.interestRateOpetion2 = document.getElementsByName("interest_rate_comparison_2")[0].value;

        const option2 = caclInterestAndPrincipal(loanComparisonInputVals.loanAmount, loanComparisonInputVals.loanTermOption2, loanComparisonInputVals.interestRateOpetion2);
        loanComparisonOutputVals.interestOption2 = option2.interest;
        loanComparisonOutputVals.principalOption2 = option2.principal;
        
        console.log(loanComparisonOutputVals);
        updateComparisonChart();
    })
}

export function getLoanComparisonOutputVals(){
    return loanComparisonOutputVals
}

var options = {
    series: [{
        name: 'Incurance',
        data: [0, 0]
    }, {
    name: 'Taxes',
    data: [0, 0]
  }, {
    name: 'Interest',
    data: [0, 0]
  }, {
    name: 'Principal',
    data: [0, 0]
  }],
    chart: {
    type: 'bar',
    height: 300,
    width: 600,
    stacked: true,
  },
  plotOptions: {
    bar: {
      horizontal: true,
    },
  },
  stroke: {
    width: 1,
    colors: ['#fff']
  },
  title: {
    text: 'Loan Option 1 will be $1,521.98 lower than loan Loan Option 2.'
  },
  xaxis: {
    categories: ['Loan Option1', 'Loan Option2'],
    labels: {
      formatter: function (val) {
        return '$' + val + "K"
      }
    }
  },
  yaxis: {
    title: {
      text: undefined
    },
  },
  tooltip: {
    y: {
      formatter: function (val) {
        return '$' + val + "K"
      }
    }
  },
  fill: {
    opacity: 1
  },
  legend: {
    position: 'top',
    horizontalAlign: 'left',
    offsetX: 40
  }
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
    options.series[0].data = [loanComparisonOutputVals.insurance, loanComparisonOutputVals.insurance];
    options.series[1].data = [loanComparisonOutputVals.tax, loanComparisonOutputVals.tax];
    options.series[2].data = [loanComparisonOutputVals.interestOption1, loanComparisonOutputVals.interestOption2];
    options.series[3].data = [loanComparisonOutputVals.principalOption1, loanComparisonOutputVals.principalOption2];
    comparisonChart.updateOptions(options, false, true, true)
}