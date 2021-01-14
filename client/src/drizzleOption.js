import {contractRegistryConfig, rootConfig, constitutionVotingConfig, RootsVotingConfig,
  EPQFI_MembershipVotingConfig, EPDR_MembershipVotingConfig, EPQFI_ParametersVotingConfig,
  EPDR_ParametersVotingConfig, ValidatorsSlashingVotingConfig, RootNodesSlashingVotingConfig,
  EmergencyUpdateVotingConfig, GeneralUpdateVotingConfig, LiquidationAuctionConfig,
  SystemDebtAuctionConfig, SystemSurplusAuctionConfig
} from "api/contracts/contants"

const options = {
  contracts: [contractRegistryConfig, rootConfig, constitutionVotingConfig, RootsVotingConfig,
    EPQFI_MembershipVotingConfig, EPDR_MembershipVotingConfig, EPQFI_ParametersVotingConfig,
    EPDR_ParametersVotingConfig, ValidatorsSlashingVotingConfig, RootNodesSlashingVotingConfig,
    EmergencyUpdateVotingConfig, GeneralUpdateVotingConfig, LiquidationAuctionConfig,
    SystemDebtAuctionConfig, SystemSurplusAuctionConfig],
  web3: {
    fallback: {
      type: "ws",
      url: "ws://18.158.7.68:8545",
    },

  },
};

export default options;
