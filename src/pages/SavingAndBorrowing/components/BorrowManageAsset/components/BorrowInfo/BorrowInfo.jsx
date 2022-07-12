import { useSelector } from 'react-redux';

import { BorrowInfoContainer } from './styles';

import { borrowVaultInfoSelector } from 'store/borrow-assets/selectors';

import { fN } from 'func/useful';

function BorrowInfo () {
  const { collateralDetails, borrowingDetails } = useSelector(borrowVaultInfoSelector);

  const infoGroups = [
    {
      title: 'Collateral',
      items: [
        {
          name: 'Asset',
          value: collateralDetails?.assets || '–',
        },
        {
          name: 'Asset Price',
          value: fN(collateralDetails?.assetPrice) || 0,
        },
        {
          name: 'Available to Withdraw',
          value: fN(collateralDetails?.availableWithdraw) || 0,
        },
        {
          name: 'Locked Collateral',
          value: fN(collateralDetails?.lockedCol) || 0,
        },
        {
          name: 'Available to Deposit',
          value: fN(collateralDetails?.availableDeposit) || 0,
        },
        {
          name: 'Liquidation Price',
          value: fN(collateralDetails?.liquidationPrice) || 0,
        },
      ]
    },
    {
      title: 'Borrowing',
      items: [
        {
          name: 'Asset',
          value: borrowingDetails?.assets || '–',
        },
        {
          name: 'Borrowing Limit',
          value: fN(borrowingDetails?.borrowingLimit) || 0,
        },
        {
          name: 'Available to Repay',
          value: fN(borrowingDetails?.availableRepay) || 0,
        },
        {
          name: 'Collateral Value',
          value: fN(borrowingDetails?.collateralValue) || 0,
        },
        {
          name: 'Available to Borrow',
          value: fN(borrowingDetails?.availableBorrow) || 0,
        },
        {
          name: 'Outstanding Debt',
          value: fN(borrowingDetails?.outstandingDebt) || 0,
        },
        {
          name: 'Liquidation Limit',
          value: fN(borrowingDetails?.liquidationLimit) || 0,
        },
        {
          name: 'Borrowing Fee (p.a.)',
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
