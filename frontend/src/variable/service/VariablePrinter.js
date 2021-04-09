import { VariableName } from '../../Constant';
import { dateFromUTC } from '../../util/ObjectUtil';

class VariablePrinter {
  static print(variable) {
    const { name, value } = variable;
    if (name === VariableName.START_DATE || name === VariableName.END_DATE) {
      return `${name}: ${dateFromUTC(value).toLocaleString()}`;
    }

    return `${name}: ${value.toString()}`;
  }
}

export default VariablePrinter;
