import { contracts } from './config/drizzle-config';

export default class EPDRParameters {
  constructor() {
    this.methods = contracts['EPDRParameters'].methods;
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
