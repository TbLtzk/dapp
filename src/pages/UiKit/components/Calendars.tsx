import { useState } from 'react';

import Calendar from 'ui/Calendar';

function Calendars () {
  const [date, setDate] = useState(new Date());

  return (
    <div className="block">
      <h2 className="text-h2">Calendars</h2>
      <div className="block-content">
        <div className="input-list">
          <Calendar
            label="Regular calendar"
            placeholder="Type some date"
            value={date}
            onChange={setDate}
          />

          <Calendar
            disabled
            label="Disabled calendar"
            placeholder="Type some date"
            value={date}
            onChange={setDate}
          />
        </div>
      </div>
    </div>
  );
}

export default Calendars;
