import { useState } from 'react';

import { Dropdown } from '@q-dev/q-ui-kit';

import Button from 'components/Button';

function Dropdowns () {
  const [leftOpen, setLeftOpen] = useState(false);
  const [fullOpen, setFullOpen] = useState(false);
  const [rightOpen, setRightOpen] = useState(false);

  return (
    <div className="block">
      <h2 className="text-h2">Dropdowns</h2>
      <div className="block-content">
        <div className="row-list">
          <Dropdown
            open={leftOpen}
            trigger={<Button>Left dropdown</Button>}
            onToggle={setLeftOpen}
          >
            <div className="dropdown-item-content">
              <span>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Donec euismod, nisl eget consectetur sagittis, nisl nunc
              </span>
            </div>
          </Dropdown>

          <Dropdown
            fullWidth
            open={fullOpen}
            trigger={<Button style={{ width: '320px' }}>Full width dropdown</Button>}
            style={{ width: '320px' }}
            onToggle={setFullOpen}
          >
            <div className="dropdown-item-content">
              <span>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Donec euismod, nisl eget consectetur sagittis, nisl nunc
              </span>
            </div>
          </Dropdown>

          <Dropdown
            right
            open={rightOpen}
            trigger={<Button>Right dropdown</Button>}
            onToggle={setRightOpen}
          >
            <div className="dropdown-item-content">
              <span>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Donec euismod, nisl eget consectetur sagittis, nisl nunc
              </span>
            </div>
          </Dropdown>
        </div>
      </div>
    </div>
  );
}

export default Dropdowns;
