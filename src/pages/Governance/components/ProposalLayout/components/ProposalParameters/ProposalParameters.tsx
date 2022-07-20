import { Proposal } from 'typings/proposals';

import ParameterViewer from 'components/ParameterViewer';

interface Props {
  proposal: Proposal
}

function ProposalParameters ({ proposal }: Props) {
  return (
    <div className="block">
      <h2 className="text-h2">Parameters</h2>

      <div className="block__content">
        <div className="details-list">
          {(proposal.parameters as any[]).map((parameter, i) => (
            <ParameterViewer
              key={i}
              block
              parameter={parameter}
              index={i}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProposalParameters;
