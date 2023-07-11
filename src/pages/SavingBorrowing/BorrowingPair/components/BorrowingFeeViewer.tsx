
import { useTranslation } from 'react-i18next';

import { useAnimateNumber } from '@q-dev/react-hooks';
import styled from 'styled-components';
import { Asset, StablecoinAsset } from 'typings/defi';

import { useBorrowing, useBorrowingVaults } from 'store/borrowing/hooks';

interface Props {
  collateral: Asset;
  stablecoin: StablecoinAsset;
}

const StyledWrapper = styled.div`
  padding: 24px 24px 16px 24px;
  display: grid;
  gap: 4px;

  .active-vaults-count {
    margin-top: 12px;
  }
`;

function BorrowingFeeViewer ({ collateral, stablecoin }: Props) {
  const { t } = useTranslation();
  const { getBorrowingFee } = useBorrowing();
  const borrowingFee = getBorrowingFee(collateral, stablecoin);
  const { borrowingVaults } = useBorrowingVaults(stablecoin);

  const borrowingFeeRef = useAnimateNumber(borrowingFee, ' %');
  const activeVaultsCount = borrowingVaults
    .filter(v => v.colKey === collateral && !v.isLiquidated)
    .length;

  return (
    <StyledWrapper className="block">
      <h2 className="text-lg">{t('BORROWING_FEE')}</h2>
      <p ref={borrowingFeeRef} className="text-xl font-semibold">0 %</p>
      <p className="active-vaults-count text-sm">
        <span className="font-light">{t('ACTIVE_VAULTS')}</span>
        {' '}
        <span>{activeVaultsCount}</span>
      </p>
    </StyledWrapper>
  );
}

export default BorrowingFeeViewer;
