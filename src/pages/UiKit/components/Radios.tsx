import { useState } from 'react';

import Radio from 'ui/Radio';
import RadioGroup from 'ui/RadioGroup';

function Radios () {
  const [network, setNetwork] = useState('mainnet');
  const [isOn, setIsOn] = useState(false);

  return (
    <div className="block">
      <h2 className="text-h2">Radio buttons</h2>
      <div className="block-content">
        <div className="switch-list">
          <Radio
            name="radio"
            checked={isOn}
            value={true}
            label="Radio unchecked"
            onChange={setIsOn}
          />

          <Radio
            name="radio"
            checked={!isOn}
            value={false}
            label="Radio checked"
            onChange={setIsOn}
          />

          <Radio
            disabled
            name="radio-2"
            checked={isOn}
            value={true}
            label="Radio disabled"
            onChange={setIsOn}
          />
        </div>

        <div className="radio-group-list">
          <RadioGroup
            name="radio-group-1"
            label="Radio group"
            value={network}
            options={[
              { value: 'devnet', label: 'DevNet' },
              { value: 'testnet', label: 'TestNet' },
              { value: 'mainnet', label: 'MainNet' },
            ]}
            onChange={setNetwork}
          />

          <RadioGroup
            row
            name="radio-group-2"
            label="Radio group in row"
            value={network}
            options={[
              { value: 'devnet', label: 'DevNet' },
              { value: 'testnet', label: 'TestNet' },
              { value: 'mainnet', label: 'MainNet' },
            ]}
            onChange={setNetwork}
          />

          <RadioGroup
            disabled
            name="radio-group-3"
            label="Radio group disabled"
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

export default Radios;
