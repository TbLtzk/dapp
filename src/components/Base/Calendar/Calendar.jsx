import DatePicker from 'react-datepicker';

import ErrorInputMessage from '../ErrorInputMessage';

import { CalendarWrapper } from './styles';

import './datepicker.css';

function Calendar ({
  value,
  label,
  error,
  invertedColors,
  onChange,
  ...rest
}) {
  return (
    <CalendarWrapper $invertedColors={invertedColors} $error={error}>
      <h4>{label}</h4>
      <DatePicker
        showTimeSelect
        selected={value}
        dateFormat="h:mm, MMMM d, yyyy aa"
        filterTime={d => new Date(d).getTime() > Date.now()}
        timeFormat="HH:mm"
        timeIntervals={1}
        {...rest}
        onChange={onChange}
      />
      {error && <ErrorInputMessage message={error} />}
    </CalendarWrapper>
  );
}

export default Calendar;
