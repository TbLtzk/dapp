import { useTranslation } from 'react-i18next';

import { Progress, Tooltip } from '@q-dev/q-ui-kit';
import { formatNumber, formatPercent } from '@q-dev/utils';
import { Proposal } from 'typings/proposals';

import { StyledProposalTurnout } from './styles';

import { CONTRACTS_NAMES } from 'constants/contracts';

function ProposalTurnout ({ proposal }: { proposal: Proposal }) {
  const { t } = useTranslation();

  const isUpdateContract = [
    CONTRACTS_NAMES.addressVoting,
    CONTRACTS_NAMES.upgradeVoting
  ].includes(proposal.contract);

  const isRootNodeContract = [
    CONTRACTS_NAMES.validatorsSlashingVoting,
    CONTRACTS_NAMES.emergencyUpdateVoting,
  ].includes(proposal.contract);

  const totalVotes = Number(proposal.votesFor) + (Number(proposal.votesAgainst) || 0);

  return isUpdateContract
    ? null
    : (
      <StyledProposalTurnout className="block">
        <h2 className="text-h2">{t('TURNOUT')}</h2>

        <div className="block__content">
          <div className="proposal-turnout__quorum">
            <p className="text-md">
              {t('QUORUM', { quorum: formatPercent(proposal.currentQuorum) })}
            </p>
            <Tooltip
              className="text-md"
              trigger={t('REQUIRED_QUORUM', { quorum: formatPercent(proposal.requiredQuorum, 2) })}
            >
              {`${proposal.requiredQuorum} %`}
            </Tooltip>
          </div>

          <Progress
            className="proposal-turnout__progress"
            value={Number(proposal.currentQuorum)}
            max={Number(proposal.requiredQuorum)}
          />

          <div className="proposal-turnout__votes">
            <div className="proposal-turnout__vote">
              <p className="text-md color-secondary">{t('VOTED')}</p>
              <p className="text-md proposal-turnout__votes-val">
                {formatNumber(totalVotes)}
              </p>
            </div>

            <div className="proposal-turnout__vote">
              <p className="text-md color-secondary">{t('DID_NOT_VOTE')}</p>
              <p className="text-md proposal-turnout__votes-val">
                {isRootNodeContract
                  ? formatNumber(proposal.rootNodesNumber - totalVotes)
                  : '–'
                }
              </p>
            </div>
          </div>
        </div>
      </StyledProposalTurnout>
    );
}

export default ProposalTurnout;
