import './datepicker.css'
import React, { forwardRef } from 'react'
import DatePicker from 'react-datepicker'
import { Controller } from 'react-hook-form'
import FormInput from '../Form/FormInput'

const filterPassedTime = (time) => {
  const currentDate = new Date()
  const selectedDate = new Date(time)
  return currentDate.getTime() < selectedDate.getTime()
}

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
  disabled,
  isCorrectDate
}) {
  const CustomInput = forwardRef(({ value, onClick }, ref) => (
        <FormInput
            controlId={title}
            valid={isCorrectDate}
            name={name}
            value={value}
            onChange={() => {}}
            ref={ref}
            disabled={disabled}
            onClick={onClick}
        />
  ))

  return (
        <div>
            <h4>{title}</h4>
            <Controller
                control={control}
                name={name}
                defaultValue={''}
                render={({ onChange, onBlur }) => (
                    <DatePicker
                        onChange={(date) => {
                          setDate(date)
                          onChange(date)
                        }}
                        selectsStart={selectsStart}
                        selectsEnd={selectsEnd}
                        onBlur={onBlur}
                        minDate={minDate}
                        selected={selected}
                        startDate={startDate}
                        endDate={endDate}
                        dateFormat="h:mm, MMMM d, yyyy aa"
                        showTimeSelect
                        filterTime={filterPassedTime}
                        timeFormat="HH:mm"
                        timeIntervals={1}
                        customInput={<CustomInput />}
                    />
                )}
            />
        </div>
  )
}

export default Calendar
