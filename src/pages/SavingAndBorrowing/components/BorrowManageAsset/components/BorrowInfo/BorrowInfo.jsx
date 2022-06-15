import { useSelector } from 'react-redux';

import { borrowVaultInfoSelector } from 'store/borrow-assets/selectors';

import { fN } from 'func/useful';

function BorrowInfo () {
  const { collateralDetails, borrowingDetails } = useSelector(borrowVaultInfoSelector);

  return (
    <div>
      <div className="modal__line" />
      <h3>Collateral</h3>
      <div className="modal__three-colm">
        <div>
          <h5>Asset</h5>
          <p>{collateralDetails?.assets || '-'}</p>

          <h5>Locked Collateral</h5>
          <p>{fN(collateralDetails?.lockedCol) || 0}</p>
        </div>

        <div>
          <h5>Asset Price</h5>
          <p>{fN(collateralDetails?.assetPrice) || 0}</p>

          <h5>Available to Deposit</h5>
          <p>{fN(collateralDetails?.availableDeposit) || 0}</p>
        </div>

        <div>
          <h5>Available to Withdraw</h5>
          <p>{fN(collateralDetails?.availableWithdraw) || 0}</p>

          <h5>Liquidation Price</h5>
          <p>{fN(collateralDetails?.liquidationPrice) || 0}</p>
        </div>
      </div>

      <div className="modal__line" />

      <h3>Borrowing</h3>
      <div className="modal__three-colm">
        <div>
          <h5>Asset</h5>
          <p>{borrowingDetails?.assets || '-'}</p>

          <h5>Collateral Value</h5>
          <p>{fN(borrowingDetails?.collateralValue) || 0}</p>

          <h5>Liquidation Limit</h5>
          <p>{fN(borrowingDetails?.liquidationLimit) || 0}</p>
        </div>

        <div>
          <h5>Borrowing Limit</h5>
          <p>{fN(borrowingDetails?.borrowingLimit) || 0}</p>

          <h5>Available to Borrow</h5>
          <p>{fN(borrowingDetails?.availableBorrow) || 0}</p>

          <h5>Borrowing Fee (p.a.)</h5>
          <p>{(fN(borrowingDetails?.borrowingFee) || 0)} %</p>
        </div>

        <div>
          <h5>Available to Repay</h5>
          <p>{fN(borrowingDetails?.availableRepay) || 0}</p>

          <h5>Outstanding Debt</h5>
          <p>{fN(borrowingDetails?.outstandingDebt) || 0}</p>
        </div>
      </div>
    </div>
  );
}

export default BorrowInfo;
