import { drizzleRegistry, contracts } from '../../config/drizzle-config';
import MembershipService from './MembershipService';

export default class EPDR_Membership extends MembershipService{
  constructor() {
    super();
    this.contract = contracts["EPDR_Membership"];
    this.contractName = "EPDR_Membership";
  }

}
