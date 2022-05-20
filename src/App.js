import { getInitMortageValues, onInputMortage, getMortageOutputVals } from './mortgage.js'
import { getInitRefinanceValues, onInputRefinance, getRefinanceOutputVals } from './refinance.js'
import { getInitLoanComparisonValues, onInputLoanComparison, getLoanComparisonOutputVals } from './loanComparison.js'

class App {
    start(){
        getInitMortageValues();
        onInputMortage();

        getInitRefinanceValues();
        onInputRefinance();

        getInitLoanComparisonValues();
        onInputLoanComparison();
    }
}

export default App;
