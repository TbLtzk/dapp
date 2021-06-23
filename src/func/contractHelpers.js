import { ParameterType } from '@q-dev/q-js-sdk';

/**
 * @contract {contract} ConstitutionParameters or EPQFI_Parameters or EPDR_Parameters
 * or other which extends ParametersService
 */
export async function loadKVParameters(contract) {
  return await Promise.all([
    ...await loadUintsKeys(contract),
    ...await loadAddrsKeys(contract),
    ...await loadStringsKeys(contract),
    ...await loadBytes32sKeys(contract),
    ...await loadBoolsKeys(contract),
  ]);
  ;
}

export async function loadUintsKeys(contract) {
  const uintKeys = await contract.getUintKeys();

  async function getUint(i) {
    const value = await contract.getUint(i);
    return {
      key: i,
      value: value
    };
  }

  return await Promise.all(
    uintKeys.map(i => getUint(i))
  );
}

export async function loadAddrsKeys(contract) {
  const keys = await contract.getAddrKeys();

  async function getValue(i) {
    const value = await contract.getAddr(i);
    return {
      key: i,
      value: value
    };
  }

  return await Promise.all(
    keys.map(i => getValue(i))
  );
}

export async function loadStringsKeys(contract) {
  const keys = await contract.getStringKeys();

  async function getValue(i) {
    const value = await contract.getString(i);
    return {
      key: i,
      value: value
    };
  }

  return await Promise.all(
    keys.map(i => getValue(i))
  );
}

export async function loadBytes32sKeys(contract) {
  const keys = await contract.getBytes32Keys();

  async function getValue(i) {
    const value = await contract.getBytes(i);
    return {
      key: i,
      value: value
    };
  }

  return await Promise.all(
    keys.map(i => getValue(i))
  );
}

export async function loadBoolsKeys(contract) {
  const keys = await contract.getBoolKeys();

  async function getValue(i) {
    const value = await contract.getBool(i);
    return {
      key: i,
      value: value
    };
  }

  return await Promise.all(
    keys.map(i => getValue(i))
  );
}

export function getTypeName(typeId) {
  switch (typeId) {
    case ParameterType.ADDRESS:
      return 'Address';
    case ParameterType.BOOL:
      return 'Boolean';
    case ParameterType.STRING:
      return 'String';
    case ParameterType.UINT:
      return 'Uint';
  }
}

