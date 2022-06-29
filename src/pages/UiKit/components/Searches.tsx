import { useState } from 'react';

import Search from 'ui/Search';

function Searches () {
  const [text, setText] = useState('');

  return (
    <div
      className="block"
      style={{ backgroundColor: 'transparent' }}
    >
      <h2 className="typo-h2">Search</h2>
      <div className="block-content">
        <div className="input-list">
          <Search
            value={text}
            placeholder="Search"
            onChange={setText}
          />

          <Search
            disabled
            value={text}
            placeholder="Search disabled"
            onChange={setText}
          />
        </div>
      </div>
    </div>
  );
}

export default Searches;
