
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useAnimateNumber } from '@q-dev/react-hooks';
import styled from 'styled-components';
import { Asset } from 'typings/defi';

import ExplorerAddress from 'components/Custom/ExplorerAddress';
import AssetMenu from 'pages/SavingBorrowing/components/AssetMenu';

import AssetInfoTooltip from './AssetInfoTooltip';

import { useBorrowing } from 'store/borrowing/hooks';

import { getBorrowingInstance } from 'contracts/contract-instance';

import { fromWei } from 'utils/web3';

const StyledWrapper = styled.div`
  padding: 24px 24px 16px 24px;
  display: grid;
  gap: 4px;

  .collateral-contract {
    margin-top: 12px;
    display: flex;
    gap: 4px;
  }
`;

function CollateralBalance ({ asset }: { asset: Asset }) {
  const { t } = useTranslation();
  const { getCollateralBalanceByAsset, getAssetInfo, loadAssetInfo } = useBorrowing();
  const [contractAddress, setContractAddress] = useState('…');

  const balance = getCollateralBalanceByAsset(asset);
  const assetInfo = getAssetInfo(asset);
  const collateralBalanceRef = useAnimateNumber(
    assetInfo.decimals ? fromWei(balance, assetInfo.decimals) : '0',
    ''
  );

  useEffect(() => {
    loadAssetInfo(asset);
    getBorrowingInstance(asset).then(({ instance }) => setContractAddress(instance.address));
  }, []);

  return (
    <StyledWrapper className="block">
      <div className="block__header">
        <h2 className="text-lg">
          <span>{t('ASSET_BALANCE', { asset })}</span>
          <AssetInfoTooltip assetInfo={assetInfo} />
        </h2>
        <AssetMenu asset={asset} />
      </div>
      <p ref={collateralBalanceRef} className="text-xl font-semibold">0</p>
      <div className="collateral-contract text-sm">
        <span className="font-light">{t('CONTRACT')}</span>
        <ExplorerAddress short address={contractAddress} />
      </div>
    </StyledWrapper>
  );
}

export default CollateralBalance;
