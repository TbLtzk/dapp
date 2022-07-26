import { useTranslation } from 'react-i18next';

import { Proposal } from 'typings/proposals';

import ExplorerAddress from 'components/Custom/ExplorerAddress';

import LinkViewer from '../../LinkViewer';

import { ZERO_ADDRESS } from 'constants/config';

interface Props {
  proposal: Proposal
}

function RootNodeDetails ({ proposal }: Props) {
  const { t } = useTranslation();

  const isNodeAdded = proposal.candidate && proposal.candidate !== ZERO_ADDRESS;
  const isNodeRemoved = proposal.replaceDest && proposal.replaceDest !== ZERO_ADDRESS;

  return (
    <div className="details-list-item">
      {isNodeAdded && (
        <div className="details-item">
          <p className="text-md color-secondary">{t('ROOT_NODE_TO_ADD')}</p>
          <ExplorerAddress
            iconed
            short
            className="text-md"
            address={proposal.candidate}
          />
        </div>
      )}

      {isNodeRemoved && (
        <div className="details-item">
          <p className="text-md color-secondary">{t('ROOT_NODE_TO_REMOVE')}</p>
          <ExplorerAddress
            iconed
            short
            className="text-md"
            address={proposal.replaceDest}
          />
        </div>
      )}

      <div className="details-item">
        <p className="text-md color-secondary">{t('EXTERNAL_SOURCE')}</p>
        <LinkViewer link={proposal.remark} />
      </div>
    </div>
  );
}

export default RootNodeDetails;
