import { useTranslation } from 'react-i18next';

import { Proposal } from 'typings/proposals';

import ExplorerAddress from 'components/Custom/ExplorerAddress';

import { CONTRACTS_NAMES } from 'constants/contracts';

interface Props {
  proposal: Proposal;
}

function ContractUpdateDetails ({ proposal }: Props) {
  const { t } = useTranslation();
  const isAddressVotingContract = proposal.contract === CONTRACTS_NAMES.addressVoting;

  return (
    <div className="details-list-item">
      <div className="details-item">
        <p className="text-md color-secondary">{t('PROXY')}</p>
        <ExplorerAddress className="text-md word-break" address={proposal.proxy} />
      </div>

      <div className="details-item">
        <p className="text-md color-secondary">
          {isAddressVotingContract ? t('KEY') : t('NEW_IMPLEMENTATION')}
        </p>
        { isAddressVotingContract
          ? <p className="text-md break-word">{proposal.key}</p>
          : <ExplorerAddress className="text-md word-break" address={proposal.implementation} />
        }
      </div>
    </div>
  );
}

export default ContractUpdateDetails;
