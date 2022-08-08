import { ContractRegistryInstance } from '@q-dev/q-js-sdk';
import { CompoundRateKeeperInstance } from '@q-dev/q-js-sdk/lib/contracts/common/CompoundRateKeeperInstance';
import { Indexer } from '@q-dev/q-js-sdk/lib/indexer/indexer';
import { ValidatorMetrics } from '@q-dev/q-js-sdk/lib/utils/validator-metrics';
import { ContractType, ContractValue } from 'typings/contracts';
import { Asset } from 'typings/defi';

import { networkConfigsMap } from 'constants/config';

export const CONTRACT_REGISTRY_ADDRESS = '0xc3E589056Ece16BCB88c6f9318e9a7343b663522';
export let contractRegistryInstance: ContractRegistryInstance | null = null;
const cache: Record<string, ContractValue<any>> = {};

export const getContractRegistryInstance = () => {
  if (!contractRegistryInstance) {
    // TODO: Fix types in SDK
    contractRegistryInstance = new ContractRegistryInstance(window.web3 as any, CONTRACT_REGISTRY_ADDRESS);
  }
  return contractRegistryInstance;
};

export function getInstance<T extends ContractType> (
  instance: T,
  asset?: string
): () => ContractValue<T> {
  return () => {
    if (!cache[instance]) {
      const contractRegistryInstance = getContractRegistryInstance();
      cache[instance] = contractRegistryInstance[instance](asset || '');
    }

    return cache[instance];
  };
}

export const getUpgradeVotingInstance = getInstance('upgradeVoting');
export const getAddressVotingInstance = getInstance('addressVoting');

export const getGeneralUpdateVotingInstance = getInstance('generalUpdateVoting');

export const getEmergencyUpdateVotingInstance = getInstance('emergencyUpdateVoting');
export const getPiggyBankInstance = getInstance('piggyBank');
export const getVotingWeightProxyInstance = getInstance('votingWeightProxy');
export const getValidationRewardProxyInstance = getInstance('validationRewardProxy');
export const getRootNodesMembershipVotingInstance = getInstance('rootNodesMembershipVoting');
export const getRootNodeRewardProxyInstance = getInstance('rootNodeRewardProxy');

export const getConstitutionVotingInstance = getInstance('constitutionVoting');
export const getConstitutionInstance = getInstance('constitution');

export const getSavingInstance = getInstance('saving', 'QUSD');
export const getStableCoinInstance = getInstance('stableCoin', 'QUSD');
export const getBorrowingCoreInstance = getInstance('borrowingCore', 'QUSD');
export const getSystemBalanceInstance = getInstance('systemBalance', 'QUSD');
export const getSystemDebtAuctionInstance = getInstance('systemDebtAuction', 'QUSD');
export const getLiquidationAuctionInstance = getInstance('liquidationAuction', 'QUSD');
export const getSystemSurplusAuctionInstance = getInstance('systemSurplusAuction', 'QUSD');

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
export const getAccountAliasesInstance = getInstance('accountAliases');

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

let validatorMetricsInstance: ValidatorMetrics | null = null;
let compoundRateKeeperSavingInstance: CompoundRateKeeperInstance | null = null;
let compoundRateKeeperQVaultInstance: CompoundRateKeeperInstance | null = null;
let indexerInstance: Indexer | null = null;

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

export const getIndexerInstance = async (indexerUrl = networkConfigsMap.testnet.indexerUrl) => {
  if (!indexerInstance) {
    indexerInstance = new Indexer(indexerUrl + '/blocks');
  }
  return indexerInstance;
};

const сompoundRateBorrowingInstances: Record<string, ContractValue<any>> = {};

export async function getCompoundRateBorrowingInstance (asset: Asset) {
  if (!сompoundRateBorrowingInstances[asset]) {
    const borrowingCoreInstance = await getBorrowingCoreInstance();
    сompoundRateBorrowingInstances[asset] = await borrowingCoreInstance.getCompoundRateKeeper(asset);
  }
  return сompoundRateBorrowingInstances[asset];
}

const borrowingInstances: Record<string, ContractValue<any>> = {};

export async function getBorrowingInstance (asset: Asset) {
  if (!borrowingInstances[asset]) {
    const stableCoinInstance = await getStableCoinInstance();
    const epdrParametersInstance = await getEpdrParametersInstance();

    const contractAddress = await epdrParametersInstance.getAddr(`governed.EPDR.${asset}_address`);

    borrowingInstances[asset] = new window.web3.eth.Contract(
      stableCoinInstance.instance.options.jsonInterface,
      contractAddress
    );
  }
  return borrowingInstances[asset];
}
