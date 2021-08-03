import { contracts } from '../../config/config'
import MembershipService from './MembershipService'

export default class EPDRMembership extends MembershipService {
  constructor () {
    super()
    this.contract = contracts.EPDRMembership
    this.contractName = 'EPDRMembership'
  }
}
