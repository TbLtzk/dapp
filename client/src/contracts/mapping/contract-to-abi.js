import ContractRegistryABI from '../abi/ContractRegistryABI';
import QPiggyBankABI from '../abi/QPiggyBankABI';
import ValidatorsABI from '../abi/ValidatorsABI';
import ValidationRewardPoolsABI from '../abi/ValidationRewardPoolsABI';
import SavingABI from '../abi/SavingABI';
import BorrowingCoreABI from '../abi/BorrowingCoreABI';
import StableCoinABI from '../abi/StableCoinABI';
import EPDRParametersABI from '../abi/EPDRParametersABI';
import FxPriceFeedABI from '../abi/FxPriceFeedABI';
import RootNodesABI from '../abi/RootNodesABI';

export const contractsToAbi = {
  ContractRegistry: ContractRegistryABI,
  QPiggyBank: QPiggyBankABI,
  Validators: ValidatorsABI,
  ValidationRewardPools: ValidationRewardPoolsABI,
  SavingQUSD: SavingABI,
  BorrowingCoreQUSD: BorrowingCoreABI,
  StableCoinQUSD: StableCoinABI,
  EPDRParameters: EPDRParametersABI,
  GovernedEpdrQethQusdOracle: FxPriceFeedABI,
  GovernedEpdrQbtcQusdOracle: FxPriceFeedABI,
  GovernedEpdrQethAddress: StableCoinABI,
  GovernedEpdrQbtcAddress: StableCoinABI,
  RootNodes: RootNodesABI,
};
