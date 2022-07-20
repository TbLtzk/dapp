import { Proposal } from 'typings/proposals';

import ExplorerAddress from 'components/Custom/ExplorerAddress';

import LinkViewer from '../../LinkViewer';

import { ZERO_ADDRESS } from 'constants/config';

interface Props {
  proposal: Proposal
}

function ExpertDetails ({ proposal }: Props) {
  const isExpertAdded = proposal.addressToAdd && proposal.addressToAdd !== ZERO_ADDRESS;
  const isExpertRemoved = proposal.addressToRemove && proposal.addressToRemove !== ZERO_ADDRESS;

  return (
    <div className="details-list-item">
      {isExpertAdded && (
        <div className="details-item">
          <p className="text-md color-secondary">Expert to Add</p>
          <ExplorerAddress
            iconed
            short
            className="text-md"
            address={proposal.addressToAdd}
          />
        </div>
      )}

      {isExpertRemoved && (
        <div className="details-item">
          <p className="text-md color-secondary">Expert to Remove</p>
          <ExplorerAddress
            iconed
            short
            className="text-md"
            address={proposal.addressToRemove}
          />
        </div>
      )}

      <div className="details-item">
        <p className="text-md color-secondary">External source</p>
        <LinkViewer link={proposal.remark} />
      </div>
    </div>
  );
}

export default ExpertDetails;
