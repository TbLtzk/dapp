
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { Tag } from '@q-dev/q-ui-kit';
import { toBigNumber } from '@q-dev/utils';
import { DAOProposal } from 'typings/proposals';

import PageLayout from 'components/PageLayout';
import ProposalCallDataViewer from 'pages/Governance/components/ProposalCallDataViewer';

import DAODetails from './components/DAODetails';
import ProposalActions from './components/ProposalActions';
import ProposalDetails from './components/ProposalDetails';
import ProposalVeto from './components/ProposalVeto';
import { DAOProposalLayoutContainer } from './styles';

import { dateToUnix } from 'utils/date';

function DAOProposalLayout ({ proposal, abi }: { proposal: DAOProposal; abi: string[] | null }) {
  const { t } = useTranslation();

  const isVetoEnded = useMemo(() => {
    return toBigNumber(proposal.vetoEndTimestamp).lt(dateToUnix());
  }, [proposal.vetoEndTimestamp]);

  return (
    <PageLayout
      title={t('DAO_PROPOSAL')}
      titleExtra={
        <Tag state={isVetoEnded ? 'approved' : 'pending'}>
          {isVetoEnded ? t('ENDED') : t('ACTIVE') }
        </Tag>
      }
      action={<ProposalActions
        proposal={proposal}
        title={t('DAO_PROPOSAL')}
        isVetoEnded={isVetoEnded}
      />}
    >
      <DAOProposalLayoutContainer>

        <DAODetails proposal={proposal} />
        <ProposalDetails proposal={proposal} />
        <ProposalCallDataViewer
          callData={proposal.calldata}
          abi={abi}
          header={t('PARAMETERS')}
        />

        <div className="dao-proposal-layout__voting">
          <ProposalVeto proposal={proposal} />
        </div>
      </DAOProposalLayoutContainer>
    </PageLayout>
  );
}

export default DAOProposalLayout;
