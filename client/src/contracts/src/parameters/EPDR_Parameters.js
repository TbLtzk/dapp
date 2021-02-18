import ParametersService from './ParametersService';
import { contracts } from '../../config/drizzle-config';

const contractName = 'EPDR_Parameters';

export default class EPDR_Parameters extends ParametersService {

  constructor() {
    super();
    this.contract = contracts[contractName];
    this.contractName = contractName;
  }
}
