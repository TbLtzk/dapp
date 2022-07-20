
import { SlashingProposal } from 'typings/proposals';
import Tooltip from 'ui/Tooltip';

import useEndTime from '../../../hooks/useEndTime';
import LinkViewer from '../../LinkViewer';

import { formatNumber } from 'func/formatters';

function ObjectionDetails ({ proposal }: { proposal: SlashingProposal }) {
  const objection = proposal.objEscrow.objection;
  const objectionEndTime = useEndTime(objection.objectionEndTime);
  const appealEndTime = useEndTime(objection.appealEndTime);

  return (
    <div className="details-list">
      <div className="details-list-item">
        <div className="details-item">
          <p className="text-md color-secondary">Objection End Time</p>
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
          <p className="text-md color-secondary">Status</p>
          <p className="text-md">{objection.statusObjection || '–'}</p>
        </div>

        <div className="details-item">
          <p className="text-md color-secondary">Slashed Amount</p>
          <p className="text-md">{formatNumber(objection.slashedAmount, 4) + ' Q'}</p>
        </div>

        <div className="details-item">
          <p className="text-md color-secondary">Candidate Appeal Confirmation</p>
          <p className="text-md">{objection.appealConfirmed ? 'Yes' : 'No'}</p>
        </div>

        <div className="details-item">
          <p className="text-md color-secondary">Executed</p>
          <p className="text-md">{objection.executed ? 'Yes' : 'No'}</p>
        </div>
      </div>

      <div className="details-list-item">
        <div className="details-item">
          <p className="text-md color-secondary">Appeal End Time</p>
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
          <p className="text-md color-secondary">Remark</p>
          <LinkViewer link={objection.remark} />
        </div>

        <div className="details-item">
          <p className="text-md color-secondary">Proposer Remark</p>
          <p className="text-md break-word">{String(objection.proposerRemark || '–')}</p>
        </div>
      </div>
    </div>
  );
}

export default ObjectionDetails;
