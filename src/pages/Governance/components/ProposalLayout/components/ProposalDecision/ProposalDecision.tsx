import { useTranslation } from 'react-i18next';

import { SlashingProposal } from 'typings/proposals';

import Illustration from 'ui/Illustration';

import DecisionActions from './components/DecisionActions';
import DecisionDetails from './components/DecisionDetails';

import { ZERO_ADDRESS } from 'constants/config';

function ProposalDecision ({ proposal }: { proposal: SlashingProposal }) {
  const { t } = useTranslation();

  return (
    <div className="block">
      <div className="block__header">
        <h2 className="text-h2">{t('DECISION')}</h2>
        <DecisionActions proposal={proposal} />
      </div>

      <div className="block__content">
        {proposal.objEscrow.decision.proposer === ZERO_ADDRESS
          ? (
            <div className="details-stub">
              <Illustration type="bulb" />
              <div className="details-stub-content">
                <p className="text-md font-semibold">
                  {t('NO_SUGGESTED_DECISION')}
                </p>
                <p className="text-sm">
                  {t('PROPOSE_DECISION_DESC')}
                </p>
              </div>
            </div>
          )
          : <DecisionDetails proposal={proposal} />
        }
      </div>
    </div>
  );
}

export default ProposalDecision;
