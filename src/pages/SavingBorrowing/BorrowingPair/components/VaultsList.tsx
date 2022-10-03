import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router';

import { fillArray } from '@q-dev/utils';
import styled from 'styled-components';
import { media } from 'styles/media';
import { Asset, VaultWithId } from 'typings/defi';

import Illustration from 'ui/Illustration';
import Modal from 'ui/Modal';
import SegmentedButton from 'ui/SegmentedButton';

import ManageVault from './ManageVault';
import VaultCard from './VaultCard';
import VaultCardSkeleton from './VaultCardSkeleton';

import { useBorrowingVaults } from 'store/borrowing/hooks';

const StyledWrapper = styled.div`
  .vaults-list-title {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .vaults-list {
    margin-top: 24px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;

    ${media.lessThan('large')} {
      grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
    }

    ${media.lessThan('tablet')} {
      grid-template-columns: 1fr;
    }
  }

  .vaults-list-empty-stub {
    margin: 32px auto;
    text-align: center;
  }
`;

function VaultsList ({ asset }: { asset: Asset }) {
  const { t } = useTranslation();
  const history = useHistory();
  const { borrowingVaults, borrowingVaultsLoading } = useBorrowingVaults();

  const [filter, setFilter] = useState<'all' | 'active'>('all');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedVault, setSelectedVault] = useState<VaultWithId | null>(null);

  const handleOpenModal = (vault: VaultWithId) => {
    setSelectedVault(vault);
    history.replace({ hash: '#deposit' });
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedVault(null);
    setModalOpen(false);
    setTimeout(() => history.replace({ hash: '' }), 300);
  };

  const vaults = borrowingVaults
    .filter(vault => vault.colKey === asset)
    .filter(vault => filter === 'all' || !vault.isLiquidated);

  return (
    <StyledWrapper>
      <div className="vaults-list-title">
        <h2 className="text-h2">{t('YOUR_VAULTS')}</h2>
        {vaults.length > 0 && (
          <SegmentedButton
            light
            value={filter}
            options={[
              { label: t('ALL_VAULTS'), value: 'all' },
              { label: t('ONLY_ACTIVE'), value: 'active' },
            ]}
            onChange={setFilter}
          />
        )}
      </div>

      {!borrowingVaultsLoading && vaults.length === 0
        ? (
          <div className="vaults-list-empty-stub">
            <Illustration type="empty-list" />
            <p className="text-lg font-semibold">{t('NO_VAULTS_YET')}</p>
          </div>
        )
        : (
          <div className="vaults-list">
            {borrowingVaultsLoading
              ? fillArray(4).map(i => <VaultCardSkeleton key={i} />)
              : vaults.map((vault) => (
                <VaultCard
                  key={vault.id}
                  vault={vault}
                  onManageClick={handleOpenModal}
                />
              ))
            }
          </div>
        )
      }

      <Modal
        open={modalOpen}
        title={t('VAULT_NUMBER', { id: selectedVault?.id })}
        onClose={handleCloseModal}
      >
        {selectedVault && <ManageVault vault={selectedVault} />}
      </Modal>
    </StyledWrapper>
  );
}

export default VaultsList;
