import { useState } from 'react';

import MenuDropdown from 'ui/MenuDropdown';
import Modal from 'ui/Modal';

import ValidatorForms from '../ValidatorForms';

export const FORM_TYPES = {
  stakeToRanking: 'stake-to-ranking',
  announceWithdrawal: 'announce-withdrawal',
  withdrawFromRanking: 'withdraw-from-ranking',
};

function ValidatorMenu () {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [modalForm, setModalForm] = useState<null | string>(null);

  const menuItems = [
    {
      id: FORM_TYPES.stakeToRanking,
      title: 'Stake to Ranking',
      func: () => handleFormModalOpen(FORM_TYPES.stakeToRanking),
    },
    {
      id: FORM_TYPES.announceWithdrawal,
      title: 'Announce Withdrawal',
      func: () => handleFormModalOpen(FORM_TYPES.announceWithdrawal),
    },
    {
      id: FORM_TYPES.withdrawFromRanking,
      title: 'Withdraw from Ranking',
      func: () => handleFormModalOpen(FORM_TYPES.withdrawFromRanking),
    },
  ];

  const handleFormModalOpen = (type: string) => {
    setModalForm(type);
  };

  const handleFormModalClose = () => {
    setModalForm(null);
  };

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
        <ValidatorForms formType={modalForm} />
      </Modal>
    </div>
  );
}

export default ValidatorMenu;
