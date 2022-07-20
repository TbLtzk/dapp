import { Proposal } from 'typings/proposals';

import ExplorerAddress from 'components/Custom/ExplorerAddress';

import LinkViewer from '../../LinkViewer';

import { formatNumber } from 'func/formatters';

interface Props {
  proposal: Proposal
}

function SlashingDetails ({ proposal }: Props) {
  return (
    <div className="details-list-item">
      <div className="details-item">
        <p className="text-md color-secondary">Candidate</p>
        <ExplorerAddress
          short
          iconed
          className="text-md"
          address={proposal.candidate}
        />
      </div>

      <div className="details-item">
        <p className="text-md color-secondary">Amount to Slash</p>
        <p className="text-md">{formatNumber(proposal.amountToSlash, 4)} Q</p>
      </div>

      <div className="details-item">
        <p className="text-md color-secondary">External source</p>
        <LinkViewer link={proposal.remark} />
      </div>
    </div>
  );
}

export default SlashingDetails;
