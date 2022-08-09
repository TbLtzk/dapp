import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import CustomBlock from 'components/Base/CustomBlock';
import Table from 'ui/Table';
import Tooltip from 'ui/Tooltip';

import SaveManageAsset from '../SaveManageAsset';

import { getSavingAssets } from 'store/borrowing-core/actions';
import {
  savingAssetsErrorSelector,
  savingAssetsLoadingSelector,
  savingAssetsSelector,
} from 'store/borrowing-core/selectors';

import { addQUSDTokenToWallet } from 'contracts/helpers/saving-assets-helper';

import { formatPercent } from 'utils/formatters';

function SavingCryptoAssets () {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const savingAssets = useSelector(savingAssetsSelector);
  const savingAssetsLoading = useSelector(savingAssetsLoadingSelector);
  const savingAssetsError = useSelector(savingAssetsErrorSelector);

  useEffect(() => {
    dispatch(getSavingAssets());
  }, []);

  return (
    <CustomBlock>
      <div className="block__header">
        <h3 className="text-h3">
          <span>{t('SAVING_CRYPTO_ASSETS')}</span>
        </h3>
      </div>
      <Table
        tiny
        emptyTableMessage={t('NO_SAVING_ASSETS')}
        loading={savingAssetsLoading}
        perPage={savingAssets.length}
        error={savingAssetsError as any}
        columns={[
          {
            dataField: 'depositAsset',
            text: t('DEPOSIT_ASSET'),
          },
          {
            dataField: 'interestAsset',
            text: t('INTEREST_ASSET'),
          },
          {
            dataField: 'rate',
            text: t('INTEREST_RATE'),
          },
          {
            dataField: 'button',
            text: '',
          },
        ]}
        table={savingAssets.map((value, idx) => ({
          id: idx,
          depositAsset: <div style={{ width: '80px', display: 'flex', justifyContent: 'space-between' }}>
            {value.depositAsset}
            <Tooltip
              trigger={
                <img
                  style={{ width: '23px', height: 'auto', cursor: 'pointer' }}
                  src="/icons/metamask.svg"
                  alt="metamask"
                  className="icon"
                  onClick={() => addQUSDTokenToWallet()}
                />
              }
            >
              Add token to wallet
            </Tooltip>
          </div>,
          interestAsset: value.interestAsset,
          rate: formatPercent(value.rate),
          button: <SaveManageAsset depositAsset={value.depositAsset} interestAsset={value.interestAsset} />,
        }))}
      />
    </CustomBlock>
  );
}

export default SavingCryptoAssets;
