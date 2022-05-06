import { ContractRegistryInstance } from '@q-dev/q-js-sdk';
import { Indexer } from '@q-dev/q-js-sdk/lib/indexer/indexer';
import { ValidatorMetrics } from '@q-dev/q-js-sdk/lib/utils/validator-metrics';

import { indexersUrls } from 'constants/config';

export const CONTRACT_REGISTRY_ADDRESS = '0xc3E589056Ece16BCB88c6f9318e9a7343b663522';

export let contractRegistryInstance = null;

export const getContractRegistryInstance = async () => {
  if (!contractRegistryInstance) {
    contractRegistryInstance = new ContractRegistryInstance(window.web3, CONTRACT_REGISTRY_ADDRESS);
  }
  return contractRegistryInstance;
};

export const cache = {};

export function getInstance (instance, QUSD) {
  return async () => {
    if (!cache[instance]) {
      cache[instance] = contractRegistryInstance[instance](QUSD ? 'QUSD' : null);
    }
    return await cache[instance];
  };
}

export const getUpgradeVotingInstance = getInstance('upgradeVoting');
export const getAddressVotingInstance = getInstance('addressVoting');

export const getGeneralUpdateVotingInstance = getInstance('generalUpdateVoting');

export const getEmergencyUpdateVotingInstance = getInstance('emergencyUpdateVoting');
export const getPiggyBankInstance = getInstance('piggyBank');
export const getVotingWeightProxyInstance = getInstance('votingWeightProxy');
export const getValidationRewardProxyInstance = getInstance('validationRewardProxy');
export const getSystemSurplusAuctionInstance = getInstance('systemSurplusAuction', true);
export const getSystemDebtAuctionInstance = getInstance('systemDebtAuction', true);
export const getSystemBalanceInstance = getInstance('systemBalance', true);
export const getStableCoinInstance = getInstance('stableCoin', true);
export const getSavingInstance = getInstance('saving', true);
export const getRootNodesMembershipVotingInstance = getInstance('rootNodesMembershipVoting');
export const getLiquidationAuctionInstance = getInstance('liquidationAuction', true);
export const getRootNodeRewardProxyInstance = getInstance('rootNodeRewardProxy');

export const getConstitutionVotingInstance = getInstance('constitutionVoting');
export const getConstitutionInstance = getInstance('constitution');
export const getBorrowingCoreInstance = getInstance('borrowingCore', true);
export const getQVaultInstance = getInstance('qVault');
export const getRootNodesInstance = getInstance('rootNodes');
export const getValidatorsInstance = getInstance('validators');
export const getValidationRewardPoolsInstance = getInstance('validationRewardPools');
export const getVestingInstance = getInstance('vesting');
export const getValidatorsSlashingVotingInstance = getInstance('validatorsSlashingVoting');
export const getValidatorSlashingEscrowInstance = getInstance('validatorSlashingEscrow');
export const getSystemReserveInstance = getInstance('systemReserve');
export const getRootNodesSlashingVotingInstance = getInstance('rootNodesSlashingVoting');
export const getRootNodeSlashingEscrowInstance = getInstance('rootNodeSlashingEscrow');
export const getGetSystemContractsAndBalances = getInstance('getSystemContractsAndBalances');
export const getDefaultAllocationProxyInstance = getInstance('defaultAllocationProxy');

export const getEpqfiMembershipVotingInstance = getInstance('epqfiMembershipVoting');
export const getEpqfiMembershipInstance = getInstance('epqfiMembership');
export const getEpqfiParametersVotingInstance = getInstance('epqfiParametersVoting');
export const getEpqfiParametersInstance = getInstance('epqfiParameters');

export const getEpdrParametersVotingInstance = getInstance('epdrParametersVoting');
export const getEpdrParametersInstance = getInstance('epdrParameters');
export const getEpdrMembershipVotingInstance = getInstance('epdrMembershipVoting');
export const getEpdrMembershipInstance = getInstance('epdrMembership');

export const getEprsParametersInstance = getInstance('eprsParameters');
export const getEprsMembershipInstance = getInstance('eprsMembership');
export const getEprsMembershipVotingInstance = getInstance('eprsMembershipVoting');
export const getEprsParametersVotingInstance = getInstance('eprsParametersVoting');

let validatorMetricsInstance = null;
let compoundRateKeeperBorrowingInstance = null;
let compoundRateKeeperSavingInstance = null;
let compoundRateKeeperQVaultInstance = null;
let governedEpdrQbtcAddressInstace = null;
let indexerInstance = null;

export async function getCompoundRateKeeperBorrowingInstance () {
  if (!compoundRateKeeperBorrowingInstance) {
    const contract = await getBorrowingCoreInstance();
    compoundRateKeeperBorrowingInstance = await contract.getCompoundRateKeeper('QBTC');
  }
  return compoundRateKeeperBorrowingInstance;
}

export async function getCompoundRateKeeperSavingInstance () {
  if (!compoundRateKeeperSavingInstance) {
    const contract = await getSavingInstance();
    compoundRateKeeperSavingInstance = await contract.getCompoundRateKeeper();
  }
  return compoundRateKeeperSavingInstance;
}
export async function getCompoundRateKeeperQVaultInstance () {
  if (!compoundRateKeeperQVaultInstance) {
    const contract = await getQVaultInstance();
    compoundRateKeeperQVaultInstance = await contract.getCompoundRateKeeper();
  }
  return compoundRateKeeperQVaultInstance;
}

export const getValidatorMetricsInstance = async () => {
  if (!validatorMetricsInstance) {
    validatorMetricsInstance = new ValidatorMetrics();
  }
  return validatorMetricsInstance;
};

export const getIndexerInstance = async (indexerUrl = indexersUrls.testnet) => {
  if (!indexerInstance) {
    indexerInstance = new Indexer(indexerUrl + '/blocks', { web3: window.web3 });
  }
  return indexerInstance;
};

export async function getGovernedEpdrQbtcAddressInstance () {
  if (!governedEpdrQbtcAddressInstace) {
    const contract = await getEpdrParametersInstance();
    const stableCoinInstance = await getStableCoinInstance();
    const address = await contract.getAddr('governed.EPDR.QBTC_address');
    governedEpdrQbtcAddressInstace = new window.web3.eth.Contract(stableCoinInstance.instance._jsonInterface, address);
  }
  return governedEpdrQbtcAddressInstace;
}
