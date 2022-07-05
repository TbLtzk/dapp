import { useState } from 'react';

import Range from 'ui/Range';

function Ranges () {
  const [value, setValue] = useState('');

  return (
    <div className="block">
      <h2 className="text-h2">Ranges</h2>
      <div className="block-content">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
          <Range
            label="Range"
            value={value}
            max="100"
            onChange={setValue}
          />

          <Range
            disabled
            label="Range disabled"
            value={value}
            max="100"
            onChange={setValue}
          />
        </div>
      </div>
    </div>
  );
}

export default Ranges;
