import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { Asset } from 'typings/defi';

import CustomBlock from 'components/Base/CustomBlock';
import Table from 'ui/Table';
import Tooltip from 'ui/Tooltip';

import BorrowManageAsset from '../BorrowManageAsset';

import { getBorrowingVaults } from 'store/borrowing-core/actions';
import {
  borrowingVaultsErrorSelector,
  borrowingVaultsLoadingSelector,
  borrowingVaultsSelector,
} from 'store/borrowing-core/selectors';

import { addBorrowTokenToWallet } from 'contracts/helpers/borrowing-core';

import { fN } from 'utils/useful';

function BorrowCryptoAssets () {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const borrowingVaults = useSelector(borrowingVaultsSelector);
  const borrowingVaultsError = useSelector(borrowingVaultsErrorSelector);
  const borrowingVaultsLoading = useSelector(borrowingVaultsLoadingSelector);

  useEffect(() => {
    dispatch(getBorrowingVaults());
  }, []);

  return (
    <CustomBlock>
      <div className="block__header">
        <h3 className="text-h3">
          <span>{t('BORROW_CRYPTO_ASSETS')}</span>
        </h3>
      </div>
      <Table
        tiny
        emptyTableMessage={t('NO_VAULTS_CREATED')}
        loading={borrowingVaultsLoading}
        perPage={borrowingVaults.length}
        error={borrowingVaultsError as any}
        columns={[
          {
            dataField: 'id',
            text: t('VAULT_ID'),
          },
          {
            dataField: 'borrowAsset',
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
        table={borrowingVaults.map((vault, idx) => ({
          id: idx,
          borrowAsset: (
            <div style={{ width: '80px', display: 'flex', justifyContent: 'space-between' }}>
              {vault.colKey}
              <Tooltip
                trigger={
                  <img
                    style={{ width: '23px', height: 'auto', cursor: 'pointer' }}
                    src="/icons/metamask.svg"
                    alt="metamask"
                    className="icon"
                    onClick={() => addBorrowTokenToWallet(vault.colKey as Asset)}
                  />
                }
              >
                Add token to wallet
              </Tooltip>
            </div>
          ),
          asset: 'QUSD',
          interestAsset: fN(vault.borrowingFee) + '%',
          button: vault.isLiquidated ? t('VAULT_IS_LIQUIDATED') : <BorrowManageAsset vault={vault} />,
        }))}
      />
    </CustomBlock>
  );
}

export default BorrowCryptoAssets;
