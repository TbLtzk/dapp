import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Delegation, Validator } from 'typings/validator';

import Button from 'ui/Button';
import Modal from 'ui/Modal';

import UpdateStakeForm from '../DelegationsTable/components/UpdateStakeForm';
import DelegateStakeForm from '../ManageDelegations/components/DelegateStakeForm';

export interface DelegateModalProps {
  delegation: Delegation | Validator;
  btnTitle?: string;
  type: 'validator-select' | 'delegator-select';
}

function DelegateModal ({ delegation, type, btnTitle }: DelegateModalProps) {
  const { t } = useTranslation();
  const [modalOpen, setModalOpen] = useState(false);

  const modalTypes = {
    'delegator-select': {
      btnTitle: t('EDIT'),
      title: t('UPDATE_DELEGATION_STAKE'),
      tip: t('INCREASE_REDUCE_REMOVE_YOUR_STAKE'),
      form: (
        <UpdateStakeForm
          delegation={delegation as Delegation}
          onSubmit={() => setModalOpen(false)}
        />
      ),
    },
    'validator-select': {
      btnTitle: t('SELECT'),
      title: t('STAKE_TOKENS'),
      tip: t('STAKE_YOUR_TOKENS_FOR_CURRENT_VALIDATOR'),
      form: (
        <DelegateStakeForm
          delegation={delegation as Validator}
          onSubmit={() => setModalOpen(false)}
        />),
    },
  };

  const modalType = modalTypes[type];

  return (
    <>
      <Button compact onClick={() => setModalOpen(true)}>
        {btnTitle ?? modalType.btnTitle}
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
