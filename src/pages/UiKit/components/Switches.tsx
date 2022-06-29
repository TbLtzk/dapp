import { useState } from 'react';

import SegmentedButton from 'ui/SegmentedButton';
import Switch from 'ui/Switch';

function Switches () {
  const [network, setNetwork] = useState('mainnet');
  const [isOn, setIsOn] = useState(false);

  return (
    <div className="block">
      <h2 className="text-h2">Switches</h2>
      <div className="block-content">
        <div className="switch-list">
          <Switch
            label="Switch unchecked"
            value={isOn}
            onChange={setIsOn}
          />

          <Switch
            label="Switch checked"
            value={!isOn}
            onChange={(val) => setIsOn(!val)}
          />

          <Switch
            disabled
            label="Switch disabled"
            value={isOn}
            onChange={setIsOn}
          />

          <SegmentedButton
            value={network}
            options={[
              { value: 'devnet', label: 'DevNet' },
              { value: 'testnet', label: 'TestNet' },
              { value: 'mainnet', label: 'MainNet' },
            ]}
            onChange={setNetwork}
          />
        </div>
      </div>
    </div>
  );
}

export default Switches;
