import BorrowingCoreABI from '../abi-devnet/BorrowingCore';
import ConstitutionParametersABI from '../abi-devnet/Constitution';
import ConstitutionVotingABI from '../abi-devnet/ConstitutionVoting';
import ContractRegistryABI from '../abi-devnet/ContractRegistry';
import DefaultAllocationProxyABI from '../abi-devnet/DefaultAllocationProxy';
import EmergencyUpdateVotingABI from '../abi-devnet/EmergencyUpdateVoting';

import EPDR_MembershipABI from '../abi-devnet/EPDR_Membership';
import EPDR_MembershipVotingABI from '../abi-devnet/EPDR_MembershipVoting';
import EPDR_ParametersABI from '../abi-devnet/EPDR_Parameters';
import EPDR_ParametersVotingABI from '../abi-devnet/EPDR_ParametersVoting';

import EPQFI_MembershipABI from '../abi-devnet/EPQFI_Membership';
import EPQFI_MembershipVotingABI from '../abi-devnet/EPQFI_MembershipVoting';
import EPQFI_ParametersABI from '../abi-devnet/EPQFI_Parameters';
import EPQFI_ParametersVotingABI from '../abi-devnet/EPQFI_ParametersVoting';

import FxPriceFeedABI from '../abi-devnet/FxPriceFeed';
import GeneralUpdateVotingABI from '../abi-devnet/GeneralUpdateVoting';
import LiquidationAuctionABI from '../abi-devnet/LiquidationAuction';
import QPiggyBankABI from '../abi-devnet/PiggyBank';
import QHolderRewardPoolABI from '../abi-devnet/QHolderRewardPool';

import RootNodeRewardProxyABI from '../abi-devnet/RootNodeRawardProxy';
import RootNodesSlashingVotingABI from '../abi-devnet/RootNodesSlashingVoting';
import RootNodesSlashingEscrowABI from '../abi-devnet/RootNodeSlashingEscrow';
import RootABI from '../abi-devnet/Roots';
import RootsVotingABI from '../abi-devnet/RootsVoting';

import SavingABI from '../abi-devnet/Saving';
import StableCoinABI from '../abi-devnet/StableCoin';
import SystemBalanceABI from '../abi-devnet/SystemBalance';
import SystemDebtAuctionABI from '../abi-devnet/SystemDebtAuction';
import SystemReserveABI from '../abi-devnet/SystemReserve';
import SystemSurplusAuctionABI from '../abi-devnet/SystemSurplusAuction';

import ValidationRewardPoolsABI from '../abi-devnet/ValidationRewardPools';
import ValidationRewardProxyABI from '../abi-devnet/ValidationRewardProxy';
import ValidatorsABI from '../abi-devnet/Validators';
import ValidatorsSlashingEscrowABI from '../abi-devnet/ValidatorSlashingEscrow';
import ValidatorsSlashingVotingABI from '../abi-devnet/ValidatorsSlashingVoting';

export const contractsToAbi = {
  BorrowingCoreQUSD: BorrowingCoreABI,
  ConstitutionParameters: ConstitutionParametersABI,
  ConstitutionVoting: ConstitutionVotingABI,
  ContractRegistry: ContractRegistryABI,
  DefaultAllocationProxy: DefaultAllocationProxyABI,
  EmergencyUpdateVoting: EmergencyUpdateVotingABI,

  EPDR_Membership: EPDR_MembershipABI,
  EPDR_MembershipVoting: EPDR_MembershipVotingABI,
  EPDR_Parameters: EPDR_ParametersABI,
  EPDR_ParametersVoting: EPDR_ParametersVotingABI,

  EPQFI_Membership: EPQFI_MembershipABI,
  EPQFI_MembershipVoting: EPQFI_MembershipVotingABI,
  EPQFI_Parameters: EPQFI_ParametersABI,
  EPQFI_ParametersVoting: EPQFI_ParametersVotingABI,

  GeneralUpdateVoting: GeneralUpdateVotingABI,
  GovernedEpdrQethQusdOracle: FxPriceFeedABI,
  GovernedEpdrQbtcQusdOracle: FxPriceFeedABI,
  GovernedEpdrQethAddress: StableCoinABI,
  GovernedEpdrQbtcAddress: StableCoinABI,

  LiquidationAuction: LiquidationAuctionABI,
  QPiggyBank: QPiggyBankABI,
  QHolderRewardPool: QHolderRewardPoolABI,

  RootNodeRewardProxy: RootNodeRewardProxyABI,
  RootNodesSlashingVoting: RootNodesSlashingVotingABI,
  RootNodesSlashingEscrow: RootNodesSlashingEscrowABI,
  Root: RootABI,
  RootsVoting: RootsVotingABI,

  SavingQUSD: SavingABI,
  StableCoinQUSD: StableCoinABI,
  SystemBalance: SystemBalanceABI,
  SystemDebtAuction: SystemDebtAuctionABI,
  SystemReserve: SystemReserveABI,
  SystemSurplusAuction: SystemSurplusAuctionABI,

  ValidationRewardPools: ValidationRewardPoolsABI,
  ValidationRewardProxy: ValidationRewardProxyABI,
  Validators: ValidatorsABI,
  ValidatorsSlashingEscrow: ValidatorsSlashingEscrowABI,
  ValidatorsSlashingVoting: ValidatorsSlashingVotingABI,
};
