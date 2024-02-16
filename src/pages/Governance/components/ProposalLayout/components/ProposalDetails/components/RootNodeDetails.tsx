import { useTranslation } from 'react-i18next';

import { formatAsset } from '@q-dev/utils';
import { Proposal } from 'typings/proposals';

import ExplorerAddress from 'components/Custom/ExplorerAddress';
import LinkViewer from 'pages/Governance/components/LinkViewer';

import useNetworkConfig from 'hooks/useNetworkConfig';

import { ZERO_ADDRESS } from 'constants/boundaries';
import { fromWei } from 'utils/web3';

interface Props {
  proposal: Proposal;
}

function RootNodeDetails ({ proposal }: Props) {
  const { t } = useTranslation();
  const { qTicker } = useNetworkConfig();

  const nodesInfo = [
    {
      isDisplayed: proposal.candidate && proposal.candidate !== ZERO_ADDRESS,
      address: proposal.candidate,
      title: t('TO_ADD'),
      stake: proposal.rootNodes?.addedNode?.stake || '0',
      withdrawalAmount: proposal.rootNodes?.addedNode?.withdrawalInfo.amount || '0',
    },
    {
      isDisplayed: proposal.replaceDest && proposal.replaceDest !== ZERO_ADDRESS,
      address: proposal.replaceDest,
      title: t('TO_REMOVE'),
      stake: proposal.rootNodes?.removedNode?.stake || '0',
      withdrawalAmount: proposal.rootNodes?.removedNode?.withdrawalInfo.amount || '0',
    },
  ];

  return (
    <div className="details-list-item">
      {nodesInfo.map((item, index) => (
        item.isDisplayed && (
          <div key={index} className="details-list-item">
            <h3 className="text-h3">{item.title}</h3>
            <div className="details-item">
              <p className="text-md color-secondary">{t('ROOT_NODE')}</p>
              <ExplorerAddress
                iconed
                short
                className="text-md"
                address={item.address}
              />
            </div>
            <div className="details-item">
              <p className="text-md color-secondary">{t('ROOT_NODE_STAKE')}</p>
              <p className="text-md">
                {formatAsset(fromWei(item.stake), qTicker)}
              </p>
            </div>

            <div className="details-item">
              <p className="text-md color-secondary">{t('ANNOUNCED_FOR_WITHDRAWAL')}</p>
              <p className="text-md">
                {formatAsset(fromWei(item.withdrawalAmount), qTicker)}
              </p>
            </div>
          </div>
        )
      ))}

      <div className="details-item">
        <p className="text-md color-secondary">{t('EXTERNAL_SOURCE')}</p>
        <LinkViewer link={proposal.remark} />
      </div>

    </div>
  );
}

export default RootNodeDetails;
