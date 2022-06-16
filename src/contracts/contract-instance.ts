import { ContractRegistryInstance, SystemContractWithQBalance } from '@q-dev/q-js-sdk';
import { BaseContractInstance } from '@q-dev/q-js-sdk/lib/contracts/BaseContractInstance';
import { CompoundRateKeeperInstance } from '@q-dev/q-js-sdk/lib/contracts/common/CompoundRateKeeperInstance';
import { Indexer } from '@q-dev/q-js-sdk/lib/indexer/indexer';
import { ValidatorMetrics } from '@q-dev/q-js-sdk/lib/utils/validator-metrics';
import Web3 from 'web3';
import { Contract } from 'web3-eth-contract';

import { indexersUrls } from 'constants/config';

declare global {
  interface Window {
    web3: Web3
  }
}

export const CONTRACT_REGISTRY_ADDRESS = '0xc3E589056Ece16BCB88c6f9318e9a7343b663522';

export let contractRegistryInstance: ContractRegistryInstance | null = null;

export const getContractRegistryInstance = () => {
  if (!contractRegistryInstance) {
    // TODO: Fix types in SDK
    contractRegistryInstance = new ContractRegistryInstance(window.web3 as any, CONTRACT_REGISTRY_ADDRESS);
  }
  return contractRegistryInstance;
};

type KeyOfType<T, U> = {
  [P in keyof T]: T[P] extends U ? P: never
}[keyof T]

type ContractPromise = Promise<BaseContractInstance<any> | SystemContractWithQBalance[]>
type ContractKey = KeyOfType<ContractRegistryInstance, (val: string) => ContractPromise>;
type ContractValue<T extends ContractKey> = ReturnType<ContractRegistryInstance[T]>;

const cache: Record<string, ContractValue<any>> = {};

export function getInstance<T extends ContractKey> (
  instance: T,
  QUSD?: boolean
): () => ContractValue<T> {
  return () => {
    if (!cache[instance]) {
      const contractRegistryInstance = getContractRegistryInstance();
      cache[instance] = contractRegistryInstance[instance](QUSD ? 'QUSD' : '');
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
let compoundRateKeeperBorrowingInstance: CompoundRateKeeperInstance | null = null;
let compoundRateKeeperSavingInstance: CompoundRateKeeperInstance | null = null;
let compoundRateKeeperQVaultInstance: CompoundRateKeeperInstance | null = null;
let governedEpdrQbtcAddressInstance: Contract | null = null;
let indexerInstance: Indexer | null = null;

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
    indexerInstance = new Indexer(indexerUrl + '/blocks');
  }
  return indexerInstance;
};

export async function getGovernedEpdrQbtcAddressInstance () {
  if (!governedEpdrQbtcAddressInstance) {
    const contract = await getEpdrParametersInstance();
    const stableCoinInstance = await getStableCoinInstance();
    const address = await contract.getAddr('governed.EPDR.QBTC_address');
    governedEpdrQbtcAddressInstance = new window.web3.eth.Contract(
      stableCoinInstance.instance.options.jsonInterface,
      address
    );
  }
  return governedEpdrQbtcAddressInstance;
}
