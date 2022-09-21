import { useEffect, useState } from 'react';

import styled from 'styled-components';

import AssetMenu from 'pages/SavingBorrowing/components/AssetMenu';

import useAnimateNumber from 'hooks/useAnimateNumber';

import { useSaving } from 'store/saving/hooks';

import { getStableCoinInstance } from 'contracts/contract-instance';

const StyledWrapper = styled.div`
  display: grid;
  gap: 4px;
  padding: 24px;
`;

function StableCoinBalance () {
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
        <h2 className="text-lg">QUSD Balance</h2>
        <AssetMenu asset="QUSD" contractAddress={contractAddress} />
      </div>
      <p ref={qusdBalanceInQVaultRef} className="text-xl font-semibold">0</p>
    </StyledWrapper>
  );
}

export default StableCoinBalance;
