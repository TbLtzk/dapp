import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CustomBlock from 'components/Base/CustomBlock';
import MemberTables from 'components/Custom/MemberTables/MemberTables';

import { getSavingAssets } from 'store/borrowing-core/action-creators';
import { savingAssetsSelector } from 'store/borrowing-core/selectors';

import { savingCryptoAssetsColumnns } from 'constants/columns';
import { savingCryptoAssets } from 'constants/tables';

function SavingCryptoAssets () {
  const dispatch = useDispatch();
  const savingAssets = useSelector(savingAssetsSelector);
  const savingAssetsTable = savingCryptoAssets(savingAssets || []);
  useEffect(() => {
    dispatch(getSavingAssets());
  }, []);

  return (
    <CustomBlock>
      <MemberTables
        lineForEach={true}
        title="Saving Crypto Assets"
        emptyTableMessage="No Saving Assets"
        table={savingAssetsTable}
        loading={!savingAssets}
        columns={savingCryptoAssetsColumnns}
        perPageLength={savingAssets?.length}
      />
    </CustomBlock>
  );
}

export default SavingCryptoAssets;
