import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import Button from 'ui/Button';
import Modal from 'ui/Modal';

import useMetamaskReset from 'hooks/useMetamaskReset';

import UpdateStakeForm from '../DelegationsTable/components/UpdateStakeForm';
import { Delegation } from '../DelegationsTable/DelegationsTable';
import DelegateStakeForm from '../ManageDelegations/components/DelegateStakeForm';
import { Validator } from '../ManageDelegations/components/ValidatorsList/ValidatorsList';

import formTypes from 'constants/form-types';

export interface DelegateModalProps {
  delegation: Delegation | Validator;
  type: 'validator-select' | 'delegator-select';
}

function DelegateModal ({ delegation, type }: DelegateModalProps) {
  const { t } = useTranslation();

  const [modalOpen, setModalOpen] = useState(false);

  useMetamaskReset(formTypes.qVaultDelegation, () => setModalOpen(false));

  const modalTypes = {
    'delegator-select': {
      btnTitle: t('EDIT'),
      title: t('UPDATE_DELEGATION_STAKE'),
      tip: t('INCREASE_REDUCE_REMOVE_YOUR_STAKE'),
      form: <UpdateStakeForm delegation={delegation as Delegation} />,
    },
    'validator-select': {
      btnTitle: t('SELECT'),
      title: t('STAKE_TOKENS'),
      tip: t('STAKE_YOUR_TOKENS_FOR_CURRENT_VALIDATOR'),
      form: <DelegateStakeForm delegation={delegation as Validator} />,
    },
  };

  const modalType = modalTypes[type];

  return (
    <>
      <Button compact onClick={() => setModalOpen(true)}>
        {modalType.btnTitle}
      </Button>
      <Modal
        open={modalOpen}
        title={modalType.title}
        tip={modalType.tip}
        onClose={() => setModalOpen(false)}
      >
        {modalType.form}
      </Modal>
    </>
  );
}

export default DelegateModal;
