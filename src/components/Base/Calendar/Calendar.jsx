import React from 'react'
import DatePicker, { CalendarContainer } from 'react-datepicker'
import { useSelector } from 'react-redux'
import { theme } from 'store/selectors/theme'
import { Controller } from 'react-hook-form'
import { WrapperCalendar, Wrapper } from './styles'
import 'react-datepicker/dist/react-datepicker.css'

function Calendar ({
  title,
  control,
  name,
  selected,
  startDate,
  endDate,
  minDate,
  setDate,
  selectsStart,
  selectsEnd,
  disabled
}) {
  const currentTheme = useSelector(theme)

  const CalendarStyles = ({ className, children }) => {
    return (
            <CalendarContainer className={className}>
                <Wrapper palette={currentTheme}>{children}</Wrapper>
            </CalendarContainer>
    )
  }

  return (
        <WrapperCalendar palette={currentTheme}>
            <h4>{title}</h4>
            <Controller
                control={control}
                name={name}
                defaultValue={''}
                render={({ onChange, onBlur, value, ref }) => (
                    <DatePicker
                        name={name}
                        onChange={(date) => {
                          setDate(date)
                          onChange(date)
                        }}
                        disabled={disabled}
                        selectsStart={selectsStart}
                        selectsEnd={selectsEnd}
                        onBlur={onBlur}
                        selected={selected}
                        startDate={startDate}
                        endDate={endDate}
                        minDate={minDate}
                        dateFormat="d/MM/yyyy"
                        calendarContainer={CalendarStyles}
                    />
                )}
            />
        </WrapperCalendar>
  )
}

export default Calendar
