import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { Tooltip } from '@q-dev/q-ui-kit';
import { Asset } from 'typings/defi';

import CustomBlock from 'components/Base/CustomBlock';
import Table from 'ui/Table';

import BorrowManageAsset from '../BorrowManageAsset';

import { useBorrowingCore } from 'store/borrowing-core/hooks';

import { addBorrowTokenToWallet } from 'contracts/helpers/borrowing-core';

import { formatPercent } from 'utils/numbers';

function BorrowCryptoAssets () {
  const { t } = useTranslation();
  const {
    borrowingVaults,
    borrowingVaultsError,
    borrowingVaultsLoading,
    getBorrowingVaults
  } = useBorrowingCore();

  useEffect(() => {
    getBorrowingVaults();
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
        error={borrowingVaultsError}
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
          interestAsset: formatPercent(vault.borrowingFee),
          button: vault.isLiquidated ? t('VAULT_IS_LIQUIDATED') : <BorrowManageAsset vault={vault} />,
        }))}
      />
    </CustomBlock>
  );
}

export default BorrowCryptoAssets;
