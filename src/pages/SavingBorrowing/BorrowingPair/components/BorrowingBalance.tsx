
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useAnimateNumber } from '@q-dev/react-hooks';
import styled from 'styled-components';
import { StablecoinAsset } from 'typings/defi';

import ExplorerAddress from 'components/Custom/ExplorerAddress';
import AssetMenu from 'pages/SavingBorrowing/components/AssetMenu';

import { useSaving } from 'store/saving/hooks';

import { getStableCoinInstance } from 'contracts/contract-instance';

interface Props {
  stablecoin: StablecoinAsset;
}

const StyledWrapper = styled.div`
  padding: 24px 24px 16px 24px;
  display: grid;
  gap: 4px;

  .borrowing-contract {
    margin-top: 12px;
    display: flex;
    gap: 4px;
  }
`;

function BorrowingBalance ({ stablecoin }: Props) {
  const { t } = useTranslation();
  const { savingAvailableToDeposit, loadSavingAvailableToDeposit } = useSaving(stablecoin);

  const [contractAddress, setContractAddress] = useState('…');
  const balanceInQVaultRef = useAnimateNumber(savingAvailableToDeposit || 0, '');

  useEffect(() => {
    loadSavingAvailableToDeposit();
    getStableCoinInstance(stablecoin).then(({ address }) => setContractAddress(address));
  }, []);

  return (
    <StyledWrapper className="block">
      <div className="block__header">
        <h2 className="text-lg">{t('ASSET_BALANCE', { asset: stablecoin })}</h2>
        <AssetMenu asset={stablecoin} />
      </div>
      <p ref={balanceInQVaultRef} className="text-xl font-semibold">0</p>
      <div className="borrowing-contract text-sm">
        <span className="font-light">{t('CONTRACT')}</span>
        <ExplorerAddress short address={contractAddress} />
      </div>
    </StyledWrapper>
  );
}

export default BorrowingBalance;
