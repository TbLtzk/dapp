import ParametersService from './ParametersService';
import { contracts } from '../../config/drizzle-config';

export default class EPDR_Parameters extends ParametersService{

  constructor() {
    super();
    this.contract = contracts["EPDR_Parameters"];
    this.contractName = "EPDR_Parameters";
    console.log("contract", this.contract)
  }

  // async getAddrKeys() {
  //   return await this.methods.getAddrKeys().call();
  // }
  //
  // async getUintKeys() {
  //   return await this.methods.getUintKeys().call();
  // }
  //
  // async getAddr(key) {
  //   return await this.methods.getAddr(key).call();
  // }
  //
  // async getUint(key) {
  //   return await this.methods.getUint(key).call();
  // }
}
