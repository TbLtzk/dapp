import { contracts } from '../../config/config'
import MembershipService from './MembershipService'

export default class EPQFI_Membership extends MembershipService {
  constructor () {
    super()
    this.contract = contracts.EPQFI_Membership
    this.contractName = 'EPQFI_Membership'
  }
}
