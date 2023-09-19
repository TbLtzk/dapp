import { useTranslation } from 'react-i18next';

import { formatAsset } from '@q-dev/utils';
import styled from 'styled-components';

import { useManageVaultContext } from './ManageVaultContext';

import { UINT_PSEUDO_UNDEFINED } from 'constants/boundaries';
import { fromWei } from 'utils/web3';

const StyledLiquidationInfoBlock = styled.div`
  display: grid;
  gap: 8px;
  background-color: ${({ theme }) => theme.colors.backgroundSecondary};
  padding: 12px 16px;
  border-radius: 8px;

  .liquidation-info-block__balance {
    display: flex;
    justify-content: space-between;
  }
`;

function LiquidationInfoBlock () {
  const { t } = useTranslation();

  const { borrowVault, } = useManageVaultContext();
  const { collateralDetails, borrowingDetails } = borrowVault;

  const getLiquidationPrice = () => {
    if (collateralDetails.liquidationPrice === UINT_PSEUDO_UNDEFINED) {
      return 'n/a';
    }

    const price = formatAsset(fromWei(collateralDetails.liquidationPrice), borrowingDetails.borrowingAsset);
    return `1 ${collateralDetails.collateralAsset} ≈ ${price}`;
  };

  return (
    <StyledLiquidationInfoBlock>
      <p className="liquidation-info-block__balance text-sm">
        <span className="font-light">{t('LIQUIDATION_PRICE')}</span>
        <span>
          {getLiquidationPrice()}
        </span>
      </p>

      <p className="liquidation-info-block__balance text-sm">
        <span className="font-light">{t('LIQUIDATION_LIMIT')}</span>
        <span>{formatAsset(borrowingDetails.liquidationLimit, borrowingDetails.borrowingAsset)}</span>
      </p>
    </StyledLiquidationInfoBlock>
  );
}

export default LiquidationInfoBlock;
