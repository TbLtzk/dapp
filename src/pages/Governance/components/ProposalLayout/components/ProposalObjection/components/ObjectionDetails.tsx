
import { useTranslation } from 'react-i18next';

import { SlashingProposal } from 'typings/proposals';

import Tooltip from 'ui/Tooltip';

import useEndTime from '../../../hooks/useEndTime';
import LinkViewer from '../../LinkViewer';

import { ObjectionStatus } from 'constants/statuses';
import { formatNumber } from 'utils/formatters';

function ObjectionDetails ({ proposal }: { proposal: SlashingProposal }) {
  const { t } = useTranslation();

  const objection = proposal.objEscrow.objection;
  const objectionEndTime = useEndTime(objection.objectionEndTime);
  const appealEndTime = useEndTime(objection.appealEndTime);

  const statusTranslationsMap: Record<ObjectionStatus, string> = {
    [ObjectionStatus.NONE]: t('STATUS_NONE'),
    [ObjectionStatus.OPEN]: t('STATUS_OPEN'),
    [ObjectionStatus.ACCEPTED]: t('STATUS_ACCEPTED'),
    [ObjectionStatus.PENDING]: t('STATUS_PENDING'),
    [ObjectionStatus.DECIDED]: t('STATUS_DECIDED'),
    [ObjectionStatus.EXECUTED]: t('STATUS_EXECUTED'),
  };

  return (
    <div className="details-list">
      <div className="details-list-item">
        <div className="details-item">
          <p className="text-md color-secondary">{t('OBJECTION_END_TIME')}</p>
          <Tooltip
            placement="bottom"
            trigger={(
              <p className="text-md">{objectionEndTime.relative}</p>
            )}
          >
            {objectionEndTime.formatted}
          </Tooltip>
        </div>

        <div className="details-item">
          <p className="text-md color-secondary">{t('STATUS')}</p>
          <p className="text-md">{statusTranslationsMap[objection.status] || '–'}</p>
        </div>

        <div className="details-item">
          <p className="text-md color-secondary">{t('SLASHED_AMOUNT')}</p>
          <p className="text-md">{formatNumber(objection.slashedAmount, 4) + ' Q'}</p>
        </div>

        <div className="details-item">
          <p className="text-md color-secondary">{t('CANDIDATE_APPEAL_CONFIRMATION')}</p>
          <p className="text-md">{objection.appealConfirmed ? t('YES') : t('NO')}</p>
        </div>

        <div className="details-item">
          <p className="text-md color-secondary">{t('EXECUTED')}</p>
          <p className="text-md">{objection.executed ? t('YES') : t('NO')}</p>
        </div>
      </div>

      <div className="details-list-item">
        <div className="details-item">
          <p className="text-md color-secondary">{t('APPEAL_END_TIME')}</p>
          <Tooltip
            placement="bottom"
            trigger={(
              <p className="text-md">{appealEndTime.relative}</p>
            )}
          >
            {appealEndTime.formatted}
          </Tooltip>
        </div>

        <div className="details-item">
          <p className="text-md color-secondary">{t('REMARK')}</p>
          <LinkViewer link={objection.remark} />
        </div>

        <div className="details-item">
          <p className="text-md color-secondary">{t('PROPOSER_REMARK')}</p>
          <p className="text-md break-word">{String(objection.proposerRemark || '–')}</p>
        </div>
      </div>
    </div>
  );
}

export default ObjectionDetails;
