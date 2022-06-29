import { useState } from 'react';

import Check from 'ui/Check';

function Checks () {
  const [isOn, setIsOn] = useState(false);

  return (
    <div className="block">
      <h2 className="text-h2">Checkboxes</h2>
      <div className="block-content">
        <div className="switch-list">
          <Check
            value={isOn}
            label="Checkbox unchecked"
            onChange={setIsOn}
          />

          <Check
            label="Checkbox checked"
            value={!isOn}
            onChange={(val) => setIsOn(!val)}
          />

          <Check
            disabled
            label="Checkbox disabled"
            value={isOn}
            onChange={setIsOn}
          />
        </div>
      </div>
    </div>
  );
}

export default Checks;
