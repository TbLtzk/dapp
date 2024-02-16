
import { useTranslation } from 'react-i18next';

import { Tooltip } from '@q-dev/q-ui-kit';
import { formatAsset } from '@q-dev/utils';
import { SlashingProposal } from 'typings/proposals';

import LinkViewer from 'pages/Governance/components/LinkViewer';
import useEndTime from 'pages/Governance/hooks/useEndTime';

import useNetworkConfig from 'hooks/useNetworkConfig';

import { ObjectionStatus } from 'constants/slashing';

function ObjectionDetails ({ proposal }: { proposal: SlashingProposal }) {
  const { t } = useTranslation();
  const { qTicker } = useNetworkConfig();

  const objection = proposal.objEscrow.objection;
  const objectionEndTime = useEndTime(objection.objectionEndTime);
  const appealEndTime = useEndTime(objection.appealEndTime);

  const statusTranslationsMap: Record<ObjectionStatus, string> = {
    [ObjectionStatus.NONE]: t('STATUS_NONE'),
    [ObjectionStatus.OPEN]: t('STATUS_OPEN'),
    [ObjectionStatus.ACCEPTED]: t('STATUS_ACCEPTED'),
    [ObjectionStatus.PENDING]: t('STATUS_ACTIVE'),
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
          <p className="text-md">{formatAsset(objection.slashedAmount, qTicker)}</p>
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
