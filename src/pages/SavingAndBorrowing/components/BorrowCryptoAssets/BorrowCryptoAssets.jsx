import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CustomBlock from 'components/Base/CustomBlock';
import MemberTables from 'components/Custom/MemberTables';

import { getBorrowingVaults } from 'store/borrowing-core/action-creators';
import { borrowingVaultsSelector, loadingBorrowingVaultsSelector } from 'store/borrowing-core/selectors';

import { borrowCryptoAssetsColumnns } from 'constants/columns';
import { borrowCryptoAssets } from 'constants/tables';

function BorrowCryptoAssets () {
  const dispatch = useDispatch();
  const vaults = useSelector(borrowingVaultsSelector);
  const vaultsTable = borrowCryptoAssets(vaults);
  const loadingVaults = useSelector(loadingBorrowingVaultsSelector);

  useEffect(() => {
    dispatch(getBorrowingVaults());
  }, []);

  return (
    <CustomBlock>
      <MemberTables
        lineForEach={true}
        title="Borrow Crypto Assets"
        emptyTableMessage="No vaults created"
        table={vaultsTable}
        loading={loadingVaults}
        columns={borrowCryptoAssetsColumnns}
        perPageLength={vaults?.length}
      />
    </CustomBlock>
  );
}

export default BorrowCryptoAssets;
