import { useState } from 'react';

import Button from 'ui/Button';
import Modal from 'ui/Modal';

function Modals () {
  const [regularOpen, setRegularOpen] = useState(false);
  const [tipOpen, setTipOpen] = useState(false);

  return (
    <div className="block">
      <h2 className="text-h2">Modals</h2>
      <div className="block-content">
        <div style={{ display: 'flex', gap: '16px' }}>
          <Button onClick={() => setRegularOpen(true)}>Regular modal</Button>
          <Modal
            open={regularOpen}
            title="Regular modal"
            onClose={() => setRegularOpen(false)}
          >
            <span>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Donec euismod, nisl eget consectetur sagittis, nisl nunc
            </span>
          </Modal>

          <Button onClick={() => setTipOpen(true)}>Tip modal</Button>
          <Modal
            open={tipOpen}
            title="Tip modal"
            tip="Some tip"
            onClose={() => setTipOpen(false)}
          >
            <span>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Donec euismod, nisl eget consectetur sagittis, nisl nunc
            </span>
          </Modal>
        </div>
      </div>
    </div>
  );
}

export default Modals;
