
import { useTranslation } from 'react-i18next';

import { useAnimateNumber } from '@q-dev/react-hooks';
import styled from 'styled-components';
import { Asset } from 'typings/defi';

import { useBorrowing, useBorrowingVaults } from 'store/borrowing/hooks';

const StyledWrapper = styled.div`
  padding: 24px 24px 16px 24px;
  display: grid;
  gap: 4px;

  .active-vaults-count {
    margin-top: 12px;
  }
`;

function BorrowingFeeViewer ({ asset }: { asset: Asset }) {
  const { t } = useTranslation();
  const { borrowingFee } = useBorrowing();
  const { borrowingVaults } = useBorrowingVaults();

  const borrowingFeeRef = useAnimateNumber(borrowingFee, ' %');
  const activeVaultsCount = borrowingVaults
    .filter(v => v.colKey === asset && !v.isLiquidated)
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
