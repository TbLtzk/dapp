import { ParameterType } from '@q-dev/q-js-sdk';
import { ParameterType as StringParameterType } from '@q-dev/q-js-sdk/lib/contracts/BaseParametersInstance';
import { ContractRegistryUpgradeVotingInstance } from '@q-dev/q-js-sdk/lib/contracts/governance/ContractRegistryUpgradeVoting';
import { ErrorHandler } from 'helpers';
import { ContractType } from 'typings/contracts';

import {
  getConstitutionInstance,
  getEpdrParametersInstance,
  getEpqfiParametersInstance,
  getEprsParametersInstance,
  getInstance
} from 'contracts/contract-instance';

import { CONTRACT_TYPES } from 'constants/contracts';

export async function getParameterKeysByType (
  contractType: string,
  parameterType: ParameterType
) {
  try {
    const contract = await getContract(contractType);
    switch (parameterType) {
      case ParameterType.ADDRESS:
        return contract.instance.getAddrKeys();
      case ParameterType.BOOL:
        return contract.instance.getBoolKeys();
      case ParameterType.STRING:
        return contract.instance.getStringKeys();
      case ParameterType.BYTE:
        return contract.instance.getBytes32Keys();
      case ParameterType.UINT:
        return contract.instance.getUintKeys();
      default:
        return [];
    }
  } catch (error) {
    ErrorHandler.processWithoutFeedback(error);
    return [];
  }
}

export async function getParameterValueByKey (
  contractType: string,
  parameterType: ParameterType,
  key: string
) {
  const parameterTypeMap: Record<ParameterType, StringParameterType> = {
    [ParameterType.ADDRESS]: 'Addr',
    [ParameterType.BOOL]: 'Bool',
    [ParameterType.STRING]: 'String',
    [ParameterType.BYTE]: 'Bytes32',
    [ParameterType.UINT]: 'Uint',
    [ParameterType.NONE]: 'String'
  };

  try {
    const contract = await getContract(contractType);
    return contract.getParameter(parameterTypeMap[parameterType], key);
  } catch (error) {
    ErrorHandler.processWithoutFeedback(error);
    return '';
  }
}

export async function getContractOwner (type: ContractType) {
  const contract = await getInstance(type)() as ContractRegistryUpgradeVotingInstance;
  return 'owner' in contract.instance
    ? contract.instance.owner()
    : '';
}

async function getContract (type: string) {
  switch (type) {
    case CONTRACT_TYPES.qFee:
      return getEpqfiParametersInstance();
    case CONTRACT_TYPES.qDefi:
      return getEpdrParametersInstance();
    case CONTRACT_TYPES.constitution:
    case CONTRACT_TYPES.constitutionUpdate:
      return getConstitutionInstance();
    case CONTRACT_TYPES.qEprs:
    default:
      return getEprsParametersInstance();
  }
}
