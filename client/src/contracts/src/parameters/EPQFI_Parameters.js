import ParametersService from './ParametersService';
import { contracts } from '../../config/drizzle-config';

export default class EPQFI_Parameters extends ParametersService{

  constructor() {
    super();
    this.contract = contracts['EPQFI_Parameters'];
    this.contractName = 'EPQFI_Parameters';
  }

}
