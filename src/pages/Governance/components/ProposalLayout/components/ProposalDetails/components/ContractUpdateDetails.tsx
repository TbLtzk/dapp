import { Proposal } from 'typings/proposals';

import ExplorerAddress from 'components/Custom/ExplorerAddress';

import { CONTRACTS_NAMES } from 'constants/contracts';

interface Props {
  proposal: Proposal
}

function ContractUpdateDetails ({ proposal }: Props) {
  const isAddressVotingContract = proposal.contract === CONTRACTS_NAMES.addressVoting;

  return (
    <div className="details-list-item">
      <div className="details-item">
        <p className="text-md color-secondary">
          {isAddressVotingContract ? 'Key' : 'Implementation'}
        </p>
        <p className="text-md">
          {isAddressVotingContract ? proposal.key : proposal.implementation}
        </p>
      </div>

      <div className="details-item">
        <p className="text-md color-secondary">Proxy</p>
        <ExplorerAddress className="text-md" address={proposal.proxy} />
      </div>
    </div>
  );
}

export default ContractUpdateDetails;
