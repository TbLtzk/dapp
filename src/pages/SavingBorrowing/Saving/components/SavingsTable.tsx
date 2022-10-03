import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router';

import { formatAsset, formatPercent } from '@q-dev/utils';
import styled from 'styled-components';
import { SavingAsset } from 'typings/defi';

import AssetLogo from 'ui/AssetLogo';
import Button from 'ui/Button';
import Icon from 'ui/Icon';
import Modal from 'ui/Modal';
import Table from 'ui/Table';

import ManageSaving from './ManageSaving';
import RefreshBalanceButton from './RefreshBalanceButton';

import { useSavingAssets } from 'store/saving/hooks';

import { formatDate, formatDateRelative } from 'utils/date';

const StyledWrapper = styled.div`
  overflow: hidden;

  .asset-block {
    display: flex;
    gap: 8px;
    align-items: center;
  }

  .asset-logo {
    width: 28px;
  }

  .refresh-block {
    display: flex;
    gap: 4px;
    align-items: center;
  }

  .table thead th {
    font-weight: 400;
  }
`;

function SavingsTable () {
  const { t, i18n } = useTranslation();
  const history = useHistory();

  const {
    savingAssets,
    savingAssetsLoading,
    savingAssetsError,
    getSavingAssets
  } = useSavingAssets();

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState<SavingAsset | null>(null);

  useEffect(() => {
    getSavingAssets();
  }, []);

  const handleOpenModal = (asset: SavingAsset) => {
    setSelectedAsset(asset);
    history.replace({ hash: '#deposit' });
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedAsset(null);
    setModalOpen(false);
    setTimeout(() => history.replace({ hash: '' }), 300);
  };

  return (
    <StyledWrapper>
      <h2 className="text-h2">{t('YOUR_SAVINGS')}</h2>
      <Table
        hideSearch
        emptyTableMessage={t('NO_SAVING_ASSETS')}
        loading={savingAssetsLoading}
        perPage={savingAssets.length}
        error={savingAssetsError}
        table={savingAssets}
        keyField="depositAsset"
        columns={[
          {
            dataField: 'depositAsset',
            text: t('DEPOSIT_ASSET'),
            formatter: (cell) => (
              <div className="asset-block">
                <AssetLogo asset={cell} className="asset-logo" />
                {cell}
              </div>
            )
          },
          {
            dataField: 'interestAsset',
            text: t('INTEREST_ASSET'),
            formatter: (cell) => (
              <div className="asset-block">
                <AssetLogo asset={cell} className="asset-logo" />
                {cell}
              </div>
            )
          },
          {
            dataField: 'rate',
            text: t('APY'),
            headerStyle: { minWidth: '100px' },
            formatter: (cell) => formatPercent(cell)
          },
          {
            dataField: 'balance',
            text: t('SAVING_BALANCE'),
            formatter: cell => formatAsset(cell, 'QUSD')
          },
          {
            dataField: 'compoundRateUpdated',
            text: t('SAVING_BALANCE_REFRESHED'),
            formatter: (cell) => (
              <div className="refresh-block">
                <span title={formatDate(cell, i18n.language)}>{formatDateRelative(cell, i18n.language)}</span>
                <RefreshBalanceButton />
              </div>
            )
          },
          {
            dataField: 'button',
            text: '',
            formatter: (_, row) => (
              <Button
                compact
                look="ghost"
                onClick={() => handleOpenModal(row)}
              >
                <Icon name="manage" />
                <span>{t('MANAGE')}</span>
              </Button>
            ),
          },
        ]}
      />

      <Modal
        open={modalOpen}
        title={t('ASSET_SAVINGS', { asset: selectedAsset?.depositAsset })}
        onClose={handleCloseModal}
      >
        {selectedAsset && <ManageSaving asset={selectedAsset} />}
      </Modal>
    </StyledWrapper>
  );
}

export default SavingsTable;
