import DatePicker, { ReactDatePickerProps } from 'react-datepicker';
import { useTranslation } from 'react-i18next';

import { CalendarWrapper } from './styles';

import 'react-datepicker/dist/react-datepicker.css';

interface Props extends Omit<ReactDatePickerProps, 'value'> {
  value: Date | null;
  label?: string;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  onChange: (val: Date) => void;
}

function Calendar ({ value, label, error, placeholder, disabled = false, onChange, ...rest }: Props) {
  const { t, i18n } = useTranslation();

  return (
    <CalendarWrapper $error={error} $disabled={disabled}>
      {label && <p className="calendar-lbl text-md">{label}</p>}

      <DatePicker
        showTimeSelect
        locale={i18n.language}
        selected={value}
        dateFormat="dd.MM.yyyy, HH:mm"
        timeFormat="HH:mm"
        filterTime={(d) => new Date(d).getTime() > Date.now()}
        timeIntervals={30}
        disabled={disabled}
        timeCaption={t('TIME')}
        placeholderText={placeholder || t('CHOOSE_DATE_AND_TIME')}
        {...rest}
        onChange={onChange}
      />

      {error && <span className="calendar-error text-md font-light">{error}</span>}
    </CalendarWrapper>
  );
}

export default Calendar;
