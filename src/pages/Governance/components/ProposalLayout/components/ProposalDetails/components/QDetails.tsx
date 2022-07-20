import { Proposal } from 'typings/proposals';

import LinkViewer from '../../LinkViewer';

interface Props {
  proposal: Proposal
}

function QDetails ({ proposal }: Props) {
  return (
    <div className="details-list-item">
      {Boolean(proposal.currentConstitutionHash) && (
        <div className="details-item">
          <p className="text-md color-secondary">Current Constitution Hash</p>
          <p className="text-md">{proposal.currentConstitutionHash}</p>
        </div>
      )}

      {Boolean(proposal.newConstitutionHash) && (
        <div className="details-item">
          <p className="text-md color-secondary">New Constitution Hash</p>
          <p className="text-md">{proposal.newConstitutionHash}</p>
        </div>
      )}

      <div className="details-item">
        <p className="text-md color-secondary">External source</p>
        <LinkViewer link={proposal.remark} />
      </div>
    </div>
  );
}

export default QDetails;
