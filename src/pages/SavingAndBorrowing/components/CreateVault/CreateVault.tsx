import { useState } from 'react';

import Button from 'ui/Button';
import Modal from 'ui/Modal';

import useMetamaskReset from 'hooks/useMetamaskReset';

import ModalCreateVault from './ModalCreateVault';

import { TRANSACTION_TYPES } from 'constants/statuses';

function CreateVault () {
  const [open, setOpen] = useState(false);

  useMetamaskReset(TRANSACTION_TYPES.success, () => setOpen(false));

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        <i style={{ fontSize: '20px' }} className="mdi mdi-safe" />
        <span>New Vault</span>
      </Button>

      <Modal
        open={open}
        title="New Vault"
        tip="Before depositing a supported collateral asset, you need to create a vault"
        onClose={() => setOpen(false)}
      >
        <ModalCreateVault />
      </Modal>
    </>
  );
}

export default CreateVault;
