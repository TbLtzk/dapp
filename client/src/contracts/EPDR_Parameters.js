import { contracts } from './config/drizzle-config';

export default class EPDR_Parameters {
  constructor() {
    this.methods = contracts['EPDR_Parameters'].methods;
  }

  async getAddrKeys() {
    return await this.methods.getAddrKeys().call();
  }

  async getUintKeys() {
    return await this.methods.getUintKeys().call();
  }

  async getAddr(key) {
    return await this.methods.getAddr(key).call();
  }

  async getUint(key) {
    return await this.methods.getUint(key).call();
  }
}
