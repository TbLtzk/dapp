import { useState } from 'react';

import { Icon } from '@q-dev/q-ui-kit';

import Input from 'ui/Input';

function Inputs () {
  const [text, setText] = useState('');

  return (
    <div className="block">
      <h2 className="text-h2">Inputs</h2>
      <div className="block-content">
        <div className="input-list">
          <Input
            label="Regular input"
            placeholder="Type some value"
            value={text}
            onChange={setText}
          />

          <Input
            type="number"
            label="Input with max button"
            placeholder="Type some value"
            max="1000"
            value={text}
            onChange={setText}
          />

          <Input
            label="Input with icon"
            placeholder="Type some value"
            value={text}
            onChange={setText}
          >
            <Icon name="share" />
          </Input>

          <Input
            disabled
            label="Disabled input with icon"
            placeholder="Type some value"
            value={text}
            onChange={setText}
          >
            <Icon name="share" />
          </Input>

          <Input
            label="Input with hint"
            placeholder="Type some value"
            value={text}
            hint="Some hint"
            onChange={setText}
          />

          <Input
            disabled
            label="Disabled input with hint"
            placeholder="Type some value"
            value={text}
            hint="Some hint"
            onChange={setText}
          />

          <Input
            label="Error input with icon"
            placeholder="Type some value"
            value={text}
            error="Some error"
            onChange={setText}
          >
            <Icon name="check-circle" />
          </Input>

          <Input
            disabled
            label="Disabled error input"
            placeholder="Type some value"
            value={text}
            error="Some error"
            onChange={setText}
          />
        </div>
      </div>
    </div>
  );
}

export default Inputs;
