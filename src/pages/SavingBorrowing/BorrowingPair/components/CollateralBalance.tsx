
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useAnimateNumber } from '@q-dev/react-hooks';
import styled from 'styled-components';
import { Asset } from 'typings/defi';

import ExplorerAddress from 'components/Custom/ExplorerAddress';
import AssetMenu from 'pages/SavingBorrowing/components/AssetMenu';

import { useBorrowing } from 'store/borrowing/hooks';

import { getBorrowingInstance } from 'contracts/contract-instance';

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
  const { collateralBalance } = useBorrowing();
  const [contractAddress, setContractAddress] = useState('…');
  const collateralBalanceRef = useAnimateNumber(collateralBalance, '');

  useEffect(() => {
    getBorrowingInstance(asset).then(({ options }) => setContractAddress(options.address));
  }, []);

  return (
    <StyledWrapper className="block">
      <div className="block__header">
        <h2 className="text-lg">{t('ASSET_BALANCE', { asset })}</h2>
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
