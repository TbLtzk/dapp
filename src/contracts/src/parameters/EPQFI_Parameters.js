import ParametersService from './ParametersService'
import { contracts } from '../../config/config'

export default class EPQFIParameters extends ParametersService {
  constructor () {
    super()
    this.contract = contracts.EPQFIParameters
    this.contractName = 'EPQFIParameters'
  }
}
