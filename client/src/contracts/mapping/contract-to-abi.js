import ContractRegistryABI from '../abi-devnet/ContractRegistryABI';
import QPiggyBankABI from '../abi-devnet/QPiggyBankABI';
import ValidatorsABI from '../abi-devnet/ValidatorsABI';
import ValidationRewardPoolsABI from '../abi-devnet/ValidationRewardPoolsABI';
import ValidationRewardProxyABI from '../abi-devnet/ValidationRewardProxyABI';
import SavingABI from '../abi-devnet/SavingABI';
import BorrowingCoreABI from '../abi-devnet/BorrowingCoreABI';
import StableCoinABI from '../abi-devnet/StableCoinABI';
import FxPriceFeedABI from '../abi-devnet/FxPriceFeedABI';
import RootNodesABI from '../abi/RootNodesABI';
import LiquidationAuctionABI from '../abi-devnet/LiquidationAuctionABI';
import SystemSurplusAuctionABI from '../abi-devnet/SystemSurplusAuctionABI';
import SystemDebtAuctionABI from '../abi-devnet/SystemDebtAuctionABI';

import ConstitutionVotingABI from '../abi-devnet/ConstitutionVotingABI';
import EmergencyUpdateVotingABI from '../abi-devnet/EmergencyUpdateVotingABI';
import GeneralUpdateVotingABI from '../abi-devnet/GeneralUpdateVotingABI';
import EPDR_MembershipVotingABI from '../abi-devnet/EPDR_MembershipVotingABI';
import EPDR_ParametersVotingABI from '../abi-devnet/EPDR_ParametersVotingABI';
import EPQFI_MembershipVotingABI from '../abi-devnet/EPQFI_MembershipVotingABI';
import EPQFI_ParametersVotingABI from '../abi-devnet/EPQFI_ParametersVotingABI';
import RootsVotingABI from '../abi-devnet/RootsVotingABI';
import ValidatorsSlashingVotingABI from '../abi-devnet/ValidatorsSlashingVotingABI';
import RootNodesSlashingVotingABI from '../abi-devnet/RootNodesSlashingVotingABI';

import DefaultAllocationProxyABI from '../abi-devnet/DefaultAllocationProxyABI';
import RootNodeRewardProxyABI from '../abi-devnet/RootNodeRewardProxyABI';
import QHolderRewardPoolABI from '../abi-devnet/QHolderRewardPoolABI';
import SystemReserveABI from '../abi-devnet/SystemReserveABI';
import EPDR_ParametersABI from '../abi-devnet/EPDR_ParametersABI';
import EPDR_MembershipABI from '../abi-devnet/EPDR_MembershipABI';
import EPQFI_MembershipABI from '../abi-devnet/EPQFI_MembershipABI';
import EPQFI_ParametersABI from '../abi-devnet/EPQFI_ParametersABI';
import ConstitutionParametersABI from '../abi/ConstitutionParametersABI';
import SystemBalanceABI from '../abi-devnet/SystemBalanceABI';

import RootABI from '../abi-devnet/RootABI';

export const contractsToAbi = {
  ContractRegistry: ContractRegistryABI,
  QPiggyBank: QPiggyBankABI,
  Validators: ValidatorsABI,
  ValidationRewardPools: ValidationRewardPoolsABI,
  ValidationRewardProxy: ValidationRewardProxyABI,
  SavingQUSD: SavingABI,
  BorrowingCoreQUSD: BorrowingCoreABI,
  StableCoinQUSD: StableCoinABI,
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
