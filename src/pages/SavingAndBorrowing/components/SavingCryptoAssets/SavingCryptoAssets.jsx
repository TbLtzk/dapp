import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import Table from 'ui/Table';

import CustomBlock from 'components/Base/CustomBlock';

import SaveManageAsset from '../SaveManageAsset';

import { getSavingAssets } from 'store/borrowing-core/action-creators';
import { savingAssetsSelector } from 'store/borrowing-core/selectors';

import { fN } from 'func/useful';

function SavingCryptoAssets () {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const savingAssets = useSelector(savingAssetsSelector);

  useEffect(() => {
    dispatch(getSavingAssets());
  }, []);

  return (
    <CustomBlock>
      <Table
        tiny
        title={t('SAVING_CRYPTO_ASSETS')}
        emptyTableMessage={t('NO_SAVING_ASSETS')}
        loading={!savingAssets}
        perPageLength={savingAssets?.length}
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
        table={savingAssets?.map((value, idx) => ({
          id: idx,
          depositAsset: value.depositAsset,
          interestAsset: value.interestAsset,
          rate: fN(value.rate) + ' %',
          button: <SaveManageAsset depositAsset={value.depositAsset} interestAsset={value.interestAsset} />,
        }))}
      />
    </CustomBlock>
  );
}

export default SavingCryptoAssets;
