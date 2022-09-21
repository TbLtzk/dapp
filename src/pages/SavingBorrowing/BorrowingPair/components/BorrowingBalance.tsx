
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import styled from 'styled-components';

import ExplorerAddress from 'components/Custom/ExplorerAddress';
import AssetMenu from 'pages/SavingBorrowing/components/AssetMenu';

import useAnimateNumber from 'hooks/useAnimateNumber';

import { useSaving } from 'store/saving/hooks';

import { getStableCoinInstance } from 'contracts/contract-instance';

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

function BorrowingBalance () {
  const { t } = useTranslation();
  const { savingAvailableToDeposit, getSavingAvailableToDeposit } = useSaving();

  const [contractAddress, setContractAddress] = useState('…');
  const qusdBalanceInQVaultRef = useAnimateNumber(savingAvailableToDeposit || 0, '');

  useEffect(() => {
    getSavingAvailableToDeposit();
    getStableCoinInstance().then(({ address }) => setContractAddress(address));
  }, []);

  return (
    <StyledWrapper className="block">
      <div className="block__header">
        <h2 className="text-lg">{t('ASSET_BALANCE', { asset: 'QUSD' })}</h2>
        <AssetMenu asset="QUSD" />
      </div>
      <p ref={qusdBalanceInQVaultRef} className="text-xl font-semibold">0</p>
      <div className="borrowing-contract text-sm">
        <span className="font-light">{t('CONTRACT')}</span>
        <ExplorerAddress short address={contractAddress} />
      </div>
    </StyledWrapper>
  );
}

export default BorrowingBalance;
