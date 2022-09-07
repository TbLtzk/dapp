import { useTranslation } from 'react-i18next';

import { BorrowInfoContainer } from './styles';

import { useBorrowAssets } from 'store/borrow-assets/hooks';

import { formatNumber, formatPercent } from 'utils/numbers';

function BorrowInfo () {
  const { t } = useTranslation();
  const { borrowVault } = useBorrowAssets();
  const { collateralDetails, borrowingDetails } = borrowVault;

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
          value: formatNumber(collateralDetails?.assetPrice || 0),
        },
        {
          name: t('AVAILABLE_TO_WITHDRAW_ASSET'),
          value: formatNumber(collateralDetails?.availableWithdraw || 0),
        },
        {
          name: t('LOCKED_COLLATERAL'),
          value: formatNumber(collateralDetails?.lockedCollateral || 0),
        },
        {
          name: t('AVAILABLE_TO_DEPOSIT'),
          value: formatNumber(collateralDetails?.availableDeposit || 0),
        },
        {
          name: t('LIQUIDATION_PRICE'),
          value: formatNumber(collateralDetails?.liquidationPrice || 0),
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
          value: formatNumber(borrowingDetails?.borrowingLimit || 0),
        },
        {
          name: t('AVAILABLE_TO_REPAY'),
          value: formatNumber(borrowingDetails?.availableRepay || 0),
        },
        {
          name: t('COLLATERAL_VALUE'),
          value: formatNumber(borrowingDetails?.collateralValue || 0),
        },
        {
          name: t('AVAILABLE_TO_BORROW'),
          value: formatNumber(borrowingDetails?.availableBorrow || 0),
        },
        {
          name: t('OUTSTANDING_DEBT'),
          value: formatNumber(borrowingDetails?.outstandingDebt || 0),
        },
        {
          name: t('LIQUIDATION_LIMIT'),
          value: formatNumber(borrowingDetails?.liquidationLimit || 0),
        },
        {
          name: t('BORROWING_FEE'),
          value: formatPercent(borrowingDetails?.borrowingFee || 0),
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
