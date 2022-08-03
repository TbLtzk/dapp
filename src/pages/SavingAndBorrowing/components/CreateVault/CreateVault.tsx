import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import Button from 'ui/Button';
import Modal from 'ui/Modal';

import useMetamaskReset from 'hooks/useMetamaskReset';

import ModalCreateVault from './ModalCreateVault';

import { TRANSACTION_TYPES } from 'constants/statuses';

function CreateVault () {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();
  useMetamaskReset(TRANSACTION_TYPES.success, () => setOpen(false));

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        <i style={{ fontSize: '20px' }} className="mdi mdi-safe" />
        <span>{t('NEW_VAULT')}</span>
      </Button>

      <Modal
        open={open}
        title={t('NEW_VAULT')}
        tip={t('BEFORE_DEPOSITING')}
        onClose={() => setOpen(false)}
      >
        <ModalCreateVault />
      </Modal>
    </>
  );
}

export default CreateVault;
