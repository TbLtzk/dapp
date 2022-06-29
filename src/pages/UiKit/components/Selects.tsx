import { useState } from 'react';

import Select from 'ui/Select';

function Selects () {
  const [text, setText] = useState('');

  const options = [
    { value: '', label: 'No option' },
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' },
    { value: '3', label: 'Option 3' },
  ];

  return (
    <div className="block">
      <h2 className="typo-h2">Selects</h2>
      <div className="block-content">
        <div className="input-list">
          <Select
            label="Regular select"
            placeholder="Type some value"
            value={text}
            options={options}
            onChange={setText}
          />

          <Select
            disabled
            label="Disabled select"
            placeholder="Type some value"
            value={text}
            options={options}
            onChange={setText}
          />

          <Select
            chips
            placeholder="Chips"
            value={text}
            options={options}
            onChange={setText}
          />

          <Select
            chips
            disabled
            placeholder="Chips disabled"
            value={text}
            options={options}
            onChange={setText}
          />
        </div>
      </div>
    </div>
  );
}

export default Selects;
