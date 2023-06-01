import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Modal } from '@q-dev/q-ui-kit';
import { Delegation, Validator, ValidatorStats } from 'typings/validator';

import Button from 'components/Button';

import UpdateStakeForm from '../DelegationsTable/components/UpdateStakeForm';
import DelegateStakeForm from '../ManageDelegations/components/DelegateStakeForm';

import { useQVault } from 'store/q-vault/hooks';

export interface DelegateModalProps {
  delegation?: Delegation;
  validator?: ValidatorStats | Validator;
  btnTitle?: string;
  onClose?: () => void;
}

function DelegateModal ({ delegation, validator, btnTitle, onClose = () => { } }: DelegateModalProps) {
  const { t } = useTranslation();

  const { loadDelegationStakeInfo } = useQVault();

  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    loadDelegationStakeInfo();
  }, []);

  const handleClose = () => {
    setModalOpen(false);
    onClose();
  };

  const modalDetails = !validator && delegation
    ? {
      btnTitle: t('EDIT'),
      title: t('UPDATE_DELEGATION_STAKE'),
      tip: t('INCREASE_REDUCE_REMOVE_YOUR_STAKE'),
      form: (
        <UpdateStakeForm
          delegation={delegation}
          onSubmit={handleClose}
        />
      ),
    }
    : {
      btnTitle: t('SELECT'),
      title: t('STAKE_TOKENS'),
      tip: t('STAKE_YOUR_TOKENS_FOR_CURRENT_VALIDATOR'),
      form: (
        <DelegateStakeForm
          validator={validator}
          onSubmit={handleClose}
        />),
    };

  return (
    <>
      <Button compact onClick={() => setModalOpen(true)}>
        {btnTitle ?? modalDetails.btnTitle}
      </Button>
      <Modal
        open={modalOpen}
        title={modalDetails.title}
        tip={modalDetails.tip}
        onClose={handleClose}
      >
        {modalDetails.form}
      </Modal>
    </>
  );
}

export default DelegateModal;
