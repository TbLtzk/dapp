import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { BorrowInfoContainer } from './styles';

import { borrowVaultSelector } from 'store/borrow-assets/selectors';

import { fN } from 'func/useful';

function BorrowInfo () {
  const { t } = useTranslation();

  const { collateralDetails, borrowingDetails } = useSelector(borrowVaultSelector);

  const infoGroups = [
    {
      title: t('COLLATERAL'),
      items: [
        {
          name: t('ASSET'),
          value: collateralDetails?.collateralAsset || '–',
        },
        {
          name: t('ASSET_PRICE'),
          value: fN(collateralDetails?.assetPrice) || 0,
        },
        {
          name: t('AVAILABLE_TO_WITHDRAW'),
          value: fN(collateralDetails?.availableWithdraw) || 0,
        },
        {
          name: t('LOCKED_COLLATERAL'),
          value: fN(collateralDetails?.lockedCollateral) || 0,
        },
        {
          name: t('AVAILABLE_TO_DEPOSIT'),
          value: fN(collateralDetails?.availableDeposit) || 0,
        },
        {
          name: t('LIQUIDATION_PRICE'),
          value: fN(collateralDetails?.liquidationPrice) || 0,
        },
      ]
    },
    {
      title: t('BORROWING'),
      items: [
        {
          name: t('ASSET'),
          value: borrowingDetails?.borrowingAsset || '–',
        },
        {
          name: t('BORROWING_LIMIT'),
          value: fN(borrowingDetails?.borrowingLimit) || 0,
        },
        {
          name: t('AVAILABLE_TO_REPAY'),
          value: fN(borrowingDetails?.availableRepay) || 0,
        },
        {
          name: t('COLLATERAL_VALUE'),
          value: fN(borrowingDetails?.collateralValue) || 0,
        },
        {
          name: t('AVAILABLE_TO_BORROW'),
          value: fN(borrowingDetails?.availableBorrow) || 0,
        },
        {
          name: t('OUTSTANDING_DEBT'),
          value: fN(borrowingDetails?.outstandingDebt) || 0,
        },
        {
          name: t('LIQUIDATION_LIMIT'),
          value: fN(borrowingDetails?.liquidationLimit) || 0,
        },
        {
          name: t('BORROWING_FEE'),
          value: `${fN(borrowingDetails?.borrowingFee) || 0}%`,
        },
      ]
    }
  ];

  return (
    <BorrowInfoContainer>
      {infoGroups.map((group, i) => (
        <div
          key={String(i)}
          className="info-group"
        >
          <h3 className="text-lg font-semibold">{group.title}</h3>
          <div className="info-group-items">
            {group.items.map((item) => (
              <div key={item.name}>
                <p className="text-sm font-light">{item.name}</p>
                <p className="text-md">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </BorrowInfoContainer>
  );
}

export default BorrowInfo;
