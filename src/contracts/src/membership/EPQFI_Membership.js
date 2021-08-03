import { contracts } from '../../config/config'
import MembershipService from './MembershipService'

export default class EPQFIMembership extends MembershipService {
  constructor () {
    super()
    this.contract = contracts.EPQFIMembership
    this.contractName = 'EPQFIMembership'
  }
}
