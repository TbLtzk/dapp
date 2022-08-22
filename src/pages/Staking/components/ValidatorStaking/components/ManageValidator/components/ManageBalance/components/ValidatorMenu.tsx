import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import MenuDropdown from 'ui/MenuDropdown';
import Modal from 'ui/Modal';

import ValidatorForms from './ValidatorForms';

export const FORM_TYPES = {
  stakeToRanking: 'stake-to-ranking',
  announceWithdrawal: 'announce-withdrawal',
  withdrawFromRanking: 'withdraw-from-ranking',
};

function ValidatorMenu () {
  const { t } = useTranslation();
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [modalForm, setModalForm] = useState<null | string>(null);

  const menuItems = [
    {
      id: FORM_TYPES.stakeToRanking,
      title: t('STAKE_TO_RANKING'),
      action: () => handleFormModalOpen(FORM_TYPES.stakeToRanking),
    },
    {
      id: FORM_TYPES.announceWithdrawal,
      title: t('ANNOUNCE_WITHDRAWAL'),
      action: () => handleFormModalOpen(FORM_TYPES.announceWithdrawal),
    },
    {
      id: FORM_TYPES.withdrawFromRanking,
      title: t('WITHDRAW_FROM_RANKING'),
      action: () => handleFormModalOpen(FORM_TYPES.withdrawFromRanking),
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
    <>
      <MenuDropdown
        right
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
    </>
  );
}

export default ValidatorMenu;
