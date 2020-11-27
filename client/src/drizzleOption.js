import {contractRegistryConfig, rootConfig, constitutionVotingConfig, RootsVotingConfig,
  EPQFI_MembershipVotingConfig, EPDR_MembershipVotingConfig, EPQFI_ParametersVotingConfig,
  EPDR_ParametersVotingConfig, ValidatorsSlashingVotingConfig, RootNodesSlashingVotingConfig
} from "api/contracts/contants"

const options = {
  contracts: [contractRegistryConfig, rootConfig, constitutionVotingConfig, RootsVotingConfig,
    EPQFI_MembershipVotingConfig, EPDR_MembershipVotingConfig, EPQFI_ParametersVotingConfig,
    EPDR_ParametersVotingConfig, ValidatorsSlashingVotingConfig, RootNodesSlashingVotingConfig],
  web3: {
    fallback: {
      type: "ws",
      url: "ws://54.187.245.252:8545",
    },
  },
};

export default options;
