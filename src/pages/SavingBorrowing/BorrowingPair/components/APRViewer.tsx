
import { useTranslation } from 'react-i18next';

import styled from 'styled-components';
import { Asset } from 'typings/defi';

import useAnimateNumber from 'hooks/useAnimateNumber';

import { useBorrowing, useBorrowingVaults } from 'store/borrowing/hooks';

const StyledWrapper = styled.div`
  padding: 24px 24px 16px 24px;
  display: grid;
  gap: 4px;

  .active-vaults-count {
    margin-top: 12px;
  }
`;

function APRViewer ({ asset }: { asset: Asset }) {
  const { t } = useTranslation();
  const { borrowingFee } = useBorrowing();
  const { borrowingVaults } = useBorrowingVaults();

  const borrowingFeeRef = useAnimateNumber(borrowingFee, ' %');
  const activeVaultsCount = borrowingVaults
    .filter(v => v.colKey === asset && !v.isLiquidated)
    .length;

  return (
    <StyledWrapper className="block">
      <h2 className="text-lg">{t('APR')}</h2>
      <p ref={borrowingFeeRef} className="text-xl font-semibold">0 %</p>
      <p className="active-vaults-count text-sm">
        <span className="font-light">{t('ACTIVE_VAULTS')}</span>
        {' '}
        <span>{activeVaultsCount}</span>
      </p>
    </StyledWrapper>
  );
}

export default APRViewer;
