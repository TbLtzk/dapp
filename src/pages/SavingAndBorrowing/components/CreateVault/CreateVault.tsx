import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Modal } from '@q-dev/q-ui-kit';

import Button from 'components/Button';

import ModalCreateVault from './ModalCreateVault';

function CreateVault () {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

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
        <ModalCreateVault onSubmit={() => setOpen(false)} />
      </Modal>
    </>
  );
}

export default CreateVault;
