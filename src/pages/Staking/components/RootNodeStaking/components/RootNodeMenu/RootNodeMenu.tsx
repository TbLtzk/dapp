import { useState } from 'react';

import MenuDropdown from 'ui/MenuDropdown';
import Modal from 'ui/Modal';

import RootNodeForms from '../RootNodeForms';

export const FORM_TYPES = {
  stakeToRanking: 'stake-to-panel',
  announceWithdrawal: 'announce-withdrawal',
  withdrawFromRanking: 'withdraw-from-ranking',
};

function RootNodeMenu () {
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
      title: 'Stake to Panel',
      action: () => handleFormModalOpen(FORM_TYPES.stakeToRanking),
    },
    {
      id: FORM_TYPES.announceWithdrawal,
      title: 'Announce Withdrawal',
      action: () => handleFormModalOpen(FORM_TYPES.announceWithdrawal),
    },
    {
      id: FORM_TYPES.withdrawFromRanking,
      title: 'Withdraw from Panel',
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
