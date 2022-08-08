import { useSelector } from 'react-redux';

import { ProposalStatus } from '@q-dev/q-js-sdk';
import { Proposal, ProposalType, SlashingProposal } from 'typings/proposals';

import PageLayout from 'components/PageLayout';
import useProposalDetails from 'pages/Governance/hooks/useProposalDetails';
import Tag from 'ui/Tag';

import CastObjection from './components/CastObjection';
import ProposalActions from './components/ProposalActions';
import ProposalDecision from './components/ProposalDecision';
import ProposalDetails from './components/ProposalDetails';
import ProposalObjection from './components/ProposalObjection';
import ProposalParameters from './components/ProposalParameters';
import ProposalTurnout from './components/ProposalTurnout';
import ProposalVeto from './components/ProposalVeto';
import ProposalVoting from './components/ProposalVoting';
import { ProposalLayoutContainer } from './styles';

import { userAddressMetamask } from 'store/user-inf/selectors';

function ProposalLayout ({ proposal, type }: { proposal: Proposal, type: ProposalType }) {
  const userAddress = useSelector(userAddressMetamask);
  const { title, status, state } = useProposalDetails(proposal);

  const isSlashingProposal = type === 'slashing' &&
    proposal.status === ProposalStatus.EXECUTED;

  return (
    <PageLayout
      title={`#${proposal.id} ${title}`}
      titleExtra={<Tag state={state}>{status}</Tag>}
      action={<ProposalActions proposal={proposal} title={title} />}
    >
      <ProposalLayoutContainer>
        {isSlashingProposal && proposal.candidate === userAddress && (
          <CastObjection proposal={proposal as SlashingProposal} />
        )}

        <ProposalDetails proposal={proposal} type={type} />
        {proposal.parameters?.length > 0 && (
          <ProposalParameters proposal={proposal} />
        )}

        {isSlashingProposal && (
          <>
            <ProposalObjection proposal={proposal as SlashingProposal} />
            <ProposalDecision proposal={proposal as SlashingProposal} />
          </>
        )}

        <div className="proposal-layout__voting">
          <ProposalTurnout proposal={proposal} />
          <ProposalVoting proposal={proposal} />
          <ProposalVeto proposal={proposal} />
        </div>
      </ProposalLayoutContainer>
    </PageLayout>
  );
}

export default ProposalLayout;
