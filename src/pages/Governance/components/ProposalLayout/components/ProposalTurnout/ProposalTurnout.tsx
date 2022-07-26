import { useTranslation } from 'react-i18next';

import { Proposal } from 'typings/proposals';
import Icon from 'ui/Icon';
import Progress from 'ui/Progress';

import { StyledProposalTurnout } from './styles';

import { CONTRACTS_NAMES } from 'constants/contracts';
import { formatNumber, formatPercent } from 'func/formatters';

function ProposalTurnout ({ proposal }: { proposal: Proposal }) {
  const { t } = useTranslation();

  const isRootNodeContract = [
    CONTRACTS_NAMES.validatorsSlashingVoting,
    CONTRACTS_NAMES.emergencyUpdateVoting,
    CONTRACTS_NAMES.addressVoting,
    CONTRACTS_NAMES.upgradeVoting
  ].includes(proposal.contract);

  const leftQuorum = Math.max(
    proposal.requiredQuorum - proposal.currentQuorum,
    0
  );
  const totalVotes = Number(proposal.votesFor) + (Number(proposal.votesAgainst) || 0);

  return (
    <StyledProposalTurnout className="block">
      <h2 className="text-h2">{t('TURNOUT')}</h2>

      <div className="block__content">
        <div className="proposal-turnout__quorum">
          <p className="text-md">
            {t('QUORUM', { quorum: formatPercent(proposal.requiredQuorum) })}
          </p>
          <p className="text-md">
            {leftQuorum || proposal.currentQuorum === 0
              ? `${formatPercent(leftQuorum)} left`
              : <Icon name="double-check" />
            }
          </p>
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
              {formatNumber(totalVotes, 4)}
            </p>
          </div>

          <div className="proposal-turnout__vote">
            <p className="text-md color-secondary">{t('DID_NOT_VOTE')}</p>
            <p className="text-md proposal-turnout__votes-val">
              {isRootNodeContract
                ? formatNumber(proposal.rootNodesNumber - totalVotes, 4)
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
