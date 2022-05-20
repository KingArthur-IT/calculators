import { getInitMortageValues, onInputMortage, getMortageOutputVals } from './mortgage.js'
import { getInitRefinanceValues, onInputRefinance, getRefinanceOutputVals } from './refinance.js'
import { getInitLoanComparisonValues, onInputLoanComparison, getLoanComparisonOutputVals } from './loanComparison.js'

class App {
    start(){
        getInitMortageValues();
        onInputMortage();
        console.log(getMortageOutputVals())

        getInitRefinanceValues();
        onInputRefinance();
        console.log(getRefinanceOutputVals());

        getInitLoanComparisonValues();
        onInputLoanComparison();
        console.log(getLoanComparisonOutputVals());
    }
}

export default App;
