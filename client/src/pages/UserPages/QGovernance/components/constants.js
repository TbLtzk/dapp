export function checkCurrentTab(activeTab) {
  switch (activeTab) {
    case 'q-proposals':
      return 'QProposals';
    case 'q-root-node-panel':
      return 'QRootNodePanel';
    case 'q-membership-proposals':
      return 'QExpertProposals';
    case 'slashing-proposals':
      return 'SlashingProposals';
  }
}

export function checkActiveTabByContract(contract) {
  switch (contract) {
    case 'ConstitutionVoting':
    case 'EmergencyUpdateVoting':
    case 'GeneralUpdateVoting':
      return 'q-proposals';
    case 'RootsVoting':
      return 'q-root-node-panel';
    case 'EPQFI_MembershipVoting':
    case 'EPDR_MembershipVoting':
    case 'EPQFI_ParametersVoting':
    case 'EPDR_ParametersVoting':
      return 'q-membership-proposals';
    case 'RootNodesSlashingVoting':
    case 'ValidatorsSlashingVoting':
      return 'slashing-proposals';
  }
}
