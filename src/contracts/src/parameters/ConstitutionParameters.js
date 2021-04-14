import ParametersService from './ParametersService';
import { contracts } from '../../config/config';

export default class ConstitutionParameters extends ParametersService {

  constructor() {
    super();
    this.contract = contracts['ConstitutionParameters'];
    this.contractName = 'ConstitutionParameters';
  }
}
