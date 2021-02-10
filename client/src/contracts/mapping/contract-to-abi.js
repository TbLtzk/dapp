import ContractRegistryABI from '../abi/ContractRegistryABI';
import QPiggyBankABI from '../abi/QPiggyBankABI';
import ValidatorsABI from '../abi/ValidatorsABI';
import ValidationRewardPoolsABI from '../abi/ValidationRewardPoolsABI';
import ValidationRewardProxyABI from '../abi/ValidationRewardProxyABI';
import SavingABI from '../abi/SavingABI';
import BorrowingCoreABI from '../abi/BorrowingCoreABI';
import StableCoinABI from '../abi/StableCoinABI';
import EPDRParametersABI from '../abi/EPDRParametersABI';
import FxPriceFeedABI from '../abi/FxPriceFeedABI';
import RootNodesABI from '../abi/RootNodesABI';
import LiquidationAuctionABI from '../abi/LiquidationAuctionABI';
import SystemSurplusAuctionABI from '../abi/SystemSurplusAuctionABI';
import SystemDebtAuctionABI from '../abi/SystemDebtAuctionABI';

import ConstitutionVotingABI from '../abi/ConstitutionVotingABI';
import EmergencyUpdateVotingABI from '../abi/EmergencyUpdateVotingABI';
import GeneralUpdateVotingABI from '../abi/GeneralUpdateVotingABI';
import EPDR_MembershipVotingABI from '../abi/EPDR_MembershipVotingABI';
import EPDR_ParametersVotingABI from '../abi/EPDR_ParametersVotingABI';
import EPQFI_MembershipVotingABI from '../abi/EPQFI_MembershipVotingABI';
import EPQFI_ParametersVotingABI from '../abi/EPQFI_ParametersVotingABI';
import RootsVotingABI from '../abi/RootsVotingABI';
import ValidatorsSlashingVotingABI from '../abi/ValidatorsSlashingVotingABI';
import RootNodesSlashingVotingABI from '../abi/RootNodesSlashingVotingABI';

import DefaultAllocationProxyABI from '../abi/DefaultAllocationProxyABI';
import RootNodeRewardProxyABI from '../abi/RootNodeRewardProxyABI';
import QHolderRewardPoolABI from '../abi/QHolderRewardPoolABI';
import SystemReserveABI from '../abi/SystemReserveABI';
import EPDR_ParametersABI from '../abi/EPDR_ParametersABI';
import EPDR_MembershipABI from '../abi/EPDR_MembershipABI';
import EPQFI_MembershipABI from '../abi/EPQFI_MembershipABI';
import EPQFI_ParametersABI from '../abi/EPQFI_ParametersABI';
import ConstitutionParametersABI from '../abi/ConstitutionParametersABI';
import SystemBalanceABI from '../abi/SystemBalanceABI';

import RootABI from '../abi/RootABI';

export const contractsToAbi = {
  ContractRegistry: ContractRegistryABI,
  QPiggyBank: QPiggyBankABI,
  Validators: ValidatorsABI,
  ValidationRewardPools: ValidationRewardPoolsABI,
  ValidationRewardProxy: ValidationRewardProxyABI,
  SavingQUSD: SavingABI,
  BorrowingCoreQUSD: BorrowingCoreABI,
  StableCoinQUSD: StableCoinABI,
  EPDRParameters: EPDRParametersABI,
  GovernedEpdrQethQusdOracle: FxPriceFeedABI,
  GovernedEpdrQbtcQusdOracle: FxPriceFeedABI,
  GovernedEpdrQethAddress: StableCoinABI,
  GovernedEpdrQbtcAddress: StableCoinABI,
  RootNodes: RootNodesABI,
  LiquidationAuction: LiquidationAuctionABI,
  SystemSurplusAuction: SystemSurplusAuctionABI,
  SystemDebtAuction: SystemDebtAuctionABI,

  ConstitutionVoting: ConstitutionVotingABI,
  EmergencyUpdateVoting: EmergencyUpdateVotingABI,
  GeneralUpdateVoting: GeneralUpdateVotingABI,
  EPDR_MembershipVoting: EPDR_MembershipVotingABI,
  EPDR_ParametersVoting: EPDR_ParametersVotingABI,
  EPQFI_MembershipVoting: EPQFI_MembershipVotingABI,
  EPQFI_ParametersVoting: EPQFI_ParametersVotingABI,
  RootsVoting: RootsVotingABI,
  ValidatorsSlashingVoting: ValidatorsSlashingVotingABI,
  RootNodesSlashingVoting: RootNodesSlashingVotingABI,
  Root: RootABI,

  DefaultAllocationProxy: DefaultAllocationProxyABI,
  RootNodeRewardProxy: RootNodeRewardProxyABI,
  QHolderRewardPool: QHolderRewardPoolABI,
  SystemReserve: SystemReserveABI,

  EPDR_Parameters: EPDR_ParametersABI,
  EPQFI_Membership: EPQFI_MembershipABI,
  EPDR_Membership: EPDR_MembershipABI,
  EPQFI_Parameters: EPQFI_ParametersABI,
  ConstitutionParameters: ConstitutionParametersABI,

  SystemBalance: SystemBalanceABI,
};
