import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

import { Proposal, ProposalType } from 'typings/proposals';

import ContractUpdateDetails from './components/ContractUpdateDetails';
import ExpertDetails from './components/ExpertDetails';
import QDetails from './components/QDetails';
import RootNodeDetails from './components/RootNodeDetails';
import SlashingDetails from './components/SlashingDetails';

interface Props {
  proposal: Proposal;
  type: ProposalType;
}

function ProposalDetails ({ proposal, type }: Props) {
  const { t } = useTranslation();

  const detailsByTypeMap: Record<ProposalType, ReactNode> = {
    q: <QDetails proposal={proposal} />,
    rootNode: <RootNodeDetails proposal={proposal} />,
    expert: <ExpertDetails proposal={proposal} />,
    slashing: <SlashingDetails proposal={proposal} />,
    contractUpdate: <ContractUpdateDetails proposal={proposal} />,
  };

  return (
    <div className="block">
      <h2 className="text-h2">{t('DETAILS')}</h2>

      <div className="block__content">
        <div className="details-list single-column">
          {detailsByTypeMap[type]}
        </div>
      </div>
    </div>
  );
}

export default ProposalDetails;
