import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { MenuDropdown, Modal } from '@q-dev/q-ui-kit';

import RootNodeForms from '../RootNodeForms';

export const FORM_TYPES = {
  stakeToRanking: 'stake-to-panel',
  announceWithdrawal: 'announce-withdrawal',
  withdrawFromRanking: 'withdraw-from-ranking',
};

function RootNodeMenu () {
  const { t } = useTranslation();

  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [modalForm, setModalForm] = useState<null | string>(null);

  const handleFormModalOpen = (type: string) => {
    setModalForm(type);
  };

  const handleFormModalClose = () => {
    setModalForm(null);
  };

  const menuItems = [
    {
      id: FORM_TYPES.stakeToRanking,
      title: t('STAKE_TO_PANEL'),
      action: () => handleFormModalOpen(FORM_TYPES.stakeToRanking),
    },
    {
      id: FORM_TYPES.announceWithdrawal,
      title: t('ANNOUNCE_WITHDRAWAL'),
      action: () => handleFormModalOpen(FORM_TYPES.announceWithdrawal),
    },
    {
      id: FORM_TYPES.withdrawFromRanking,
      title: t('WITHDRAW_FROM_PANEL'),
      action: () => handleFormModalOpen(FORM_TYPES.withdrawFromRanking),
    },
  ];

  const formType = menuItems.find((item) => item.id === modalForm) || menuItems[0];

  return (
    <div>
      <MenuDropdown
        right
        style={{ margin: '0 10px 0 10px' }}
        open={menuOpen}
        menuItems={menuItems}
        onToggle={setMenuOpen}
      />
      <Modal
        title={formType.title}
        open={Boolean(modalForm)}
        onClose={handleFormModalClose}
      >
        <RootNodeForms formType={modalForm} onReset={handleFormModalClose} />
      </Modal>
    </div>
  );
}

export default RootNodeMenu;
