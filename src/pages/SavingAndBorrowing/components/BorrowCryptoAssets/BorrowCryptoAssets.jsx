import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import Table from 'ui/Table';

import CustomBlock from 'components/Base/CustomBlock';

import BorrowManageAsset from '../BorrowManageAsset';

import { getBorrowingVaults } from 'store/borrowing-core/action-creators';
import { borrowingVaultsSelector, loadingBorrowingVaultsSelector } from 'store/borrowing-core/selectors';

import { fN } from 'func/useful';

function BorrowCryptoAssets () {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const vaults = useSelector(borrowingVaultsSelector);
  const loadingVaults = useSelector(loadingBorrowingVaultsSelector);

  useEffect(() => {
    dispatch(getBorrowingVaults());
  }, []);

  return (
    <CustomBlock>
      <Table
        tiny
        title={t('BORROW_CRYPTO_ASSETS')}
        emptyTableMessage={t('NO_VAULTS_CREATED')}
        loading={loadingVaults}
        perPageLength={vaults?.length}
        columns={[
          {
            dataField: 'id',
            text: t('VAULT_ID'),
          },
          {
            dataField: 'depositAsset',
            text: t('COLLATERAL_ASSET'),
          },
          {
            dataField: 'asset',
            text: t('BORROWING_ASSET'),
          },
          {
            dataField: 'interestAsset',
            text: t('BORROWING_FEE'),
          },
          {
            dataField: 'button',
            text: '',
          },
        ]}
        table={vaults.map((vault, idx) => ({
          id: idx,
          depositAsset: vault.colKey,
          asset: 'QUSD',
          interestAsset: fN(vault.borrowingFee) + '%',
          button: vault.isLiquidated ? t('VAULT_IS_LIQUIDATED') : <BorrowManageAsset vault={vault} />,
        }))}
      />
    </CustomBlock>
  );
}

export default BorrowCryptoAssets;
