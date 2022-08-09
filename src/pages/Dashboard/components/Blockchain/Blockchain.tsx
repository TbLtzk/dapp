import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import ExplorerAddress from 'components/Custom/ExplorerAddress';
import InfoTooltip from 'components/Tooltips/InfoTooltip';

import useAnimateNumber from 'hooks/useAnimateNumber';
import useInterval from 'hooks/useInterval';

import { contractRegistryInstance } from 'contracts/contract-instance';
import { fetchBlockNumber } from 'contracts/helpers/block-number';

import { formatNumber } from 'utils/formatters';

function Blockchain () {
  const { t } = useTranslation();

  const [blockNumber, setBlockNumber] = useState(0);
  const blockNumberRef = useAnimateNumber(blockNumber, ' ', formatNumber);

  const getLatestBlock = () => {
    fetchBlockNumber('latest').then((blockNumber) => setBlockNumber(blockNumber));
  };

  useInterval(() => {
    getLatestBlock();
  }, 5000);

  useEffect(() => {
    getLatestBlock();
  }, []);

  return (
    <div className="block">
      <h2 className="text-h3">
        <span>{t('BLOCKCHAIN')}</span>
        <InfoTooltip topic="blockchain" />
      </h2>

      <div className="block__tight-content">
        <div className="grid-2">
          <div>
            <p className="text-sm color-secondary">
              {t('BLOCK_HEIGHT')}
            </p>
            <p ref={blockNumberRef} className="text-lg font-semibold">0</p>
          </div>
          <div>
            <p className="text-sm color-secondary">
              {t('SYSTEM_CONTRACT_REGISTRY')}
            </p>
            <ExplorerAddress
              short
              semibold
              className="text-lg"
              address={contractRegistryInstance?.address || ''}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Blockchain;
