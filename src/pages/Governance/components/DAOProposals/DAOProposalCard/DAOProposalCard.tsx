import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { Progress, Tag, Tooltip } from '@q-dev/q-ui-kit';
import { formatFraction, formatPercent, toBigNumber, trimString } from '@q-dev/utils';
import { DAOProposal } from 'typings/proposals';

import { DAOProposalCardWrap } from './styles';

import { dateToUnix, formatDate, formatDateDMY, unixToDate } from 'utils/date';

function DAOProposalCard ({ proposal }: { proposal: DAOProposal }) {
  const { t, i18n } = useTranslation();

  const isVetoEnded = useMemo(() => {
    return toBigNumber(proposal.vetoEndTimestamp).lt(dateToUnix());
  }, [proposal.vetoEndTimestamp]);

  const currentVetoedPercent = useMemo(() => {
    if (!proposal.vetoed.length || !proposal.participants.length) return '0';

    return toBigNumber(proposal.vetoed.length)
      .div(proposal.participants.length)
      .multipliedBy(100)
      .toString();
  }, [proposal.vetoed.length, proposal.participants.length]);

  const vetoText = isVetoEnded
    ? t('VETO_ENDS')
    : t('VETO_ENDED');

  return (
    <DAOProposalCardWrap
      className="block"
      to={{
        pathname: `/governance/proposal/dao/${proposal.id}`,
        state: { from: 'list' },
      }}
    >
      <div className="dao-proposal-card__head">
        <p className="dao-proposal-card__id text-md">
          <span className="font-light">{t('PROPOSAL_ID')}</span>
          <span>{trimString(proposal.id)}</span>
        </p>

        <Tag className="dao-proposal-card__tag" state={isVetoEnded ? 'approved' : 'pending'}>
          {isVetoEnded ? t('ENDED') : t('ACTIVE') }
        </Tag>
      </div>

      <h2 className="dao-proposal-card__title text-h2 ellipsis">
        {proposal.dao.name}
      </h2>

      <div className="dao-proposal-card__veto">
        <div className="dao-proposal-card__quorum">
          <p className="text-md">
            {t('VETOED_PERCENT', {
              percent: formatPercent(currentVetoedPercent, 2)
              ,
            })}
          </p>
          <p className="text-md">
            {t('THRESHOLD', { threshold: formatFraction(proposal.requiredVetoQuorum) })}
          </p>
        </div>

        <Progress
          className="dao-proposal-card__progress"
          value={proposal.vetoed.length}
          max={proposal.participants.length}
        />

        <div className="dao-proposal-card__periods">
          <Tooltip
            placement="bottom"
            trigger={(
              <p className="text-md font-light">
                {`${vetoText} ${formatDateDMY(unixToDate(proposal.vetoEndTimestamp), i18n.language)}`}
              </p>
            )}
          >
            {formatDate(unixToDate(proposal.vetoEndTimestamp), i18n.language)}
          </Tooltip>
        </div>
      </div>
    </DAOProposalCardWrap>
  );
}

export default DAOProposalCard;
