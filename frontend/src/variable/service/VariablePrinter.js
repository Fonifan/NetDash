import { VariableName } from '../../Constant';

class VariablePrinter {
	static print (variable) {
		if (variable[0] === VariableName.START_DATE || variable[0] === VariableName.END_DATE) {
			return `${variable[0]}: ${new Date(variable[1]).toLocaleString()}`;
		}

		return `${variable[0]}: ${variable[1]}`;
	}
}

export default VariablePrinter;
