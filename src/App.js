import { getInitMortageValues, onInputMortage } from './mortgage.js'
import { getInitRefinanceValues, onInputRefinance } from './refinance.js'
import { getInitLoanComparisonValues, onInputLoanComparison } from './loanComparison.js'
import { getInitHomeAfforfdValues, onInputHomeAfford} from './homeAfford.js'
class App {
    start(){
        getInitMortageValues();
        onInputMortage();

        getInitRefinanceValues();
        onInputRefinance();
        
        getInitLoanComparisonValues();
        onInputLoanComparison();

        getInitHomeAfforfdValues();
        onInputHomeAfford();
    }
}

export default App;
