import React from 'react';
import VotingStats from 'components/Custom/VotingStats';
import ProposalsList from '../ProposalsList';
import { ProposalsTabWrp } from './styles';

function ProposalsTab(props) {
  const {
    proposalsType,
    isLoading,
    proposals,
    errorMessage,
  } = props;

  return (
    <ProposalsTabWrp>
      <ProposalsList
        activeTab={proposalsType}
        proposals={proposals}
        loading={isLoading}
        errorMessage={errorMessage}
        proposalsKind={proposalsType}
      />
      <VotingStats/>
    </ProposalsTabWrp>
  );
}

export default ProposalsTab;
