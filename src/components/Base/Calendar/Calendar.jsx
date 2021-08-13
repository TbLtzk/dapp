import React, { forwardRef } from "react";
import DatePicker, { CalendarContainer } from "react-datepicker";
import { useSelector } from "react-redux";
import { theme } from "store/selectors/theme";
import { Controller } from "react-hook-form";
import { WrapperCalendar, Wrapper } from "./styles";
import "react-datepicker/dist/react-datepicker.css";
import FormInput from "../Form/FormInput";

function Calendar({
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
    isCorrectDate,
}) {
    const currentTheme = useSelector(theme);

    // const CalendarStyles = ({ className, children }) => {
    //     return (
    //         <CalendarContainer className={className}>
    //             <Wrapper palette={currentTheme}>{children}</Wrapper>
    //         </CalendarContainer>
    //     );
    // };

    const CustomInput = forwardRef(({ value, onClick }, ref) => (
        <div onClick={onClick}>
            <FormInput controlId={title} valid={isCorrectDate} name={name} value={value} onChange={() => {}} ref={ref} disabled={disabled} />
        </div>
    ));

    return (
        <div>
            <h4>{title}</h4>
            <Controller
                control={control}
                name={name}
                defaultValue={""}
                render={({ onChange, onBlur }) => (
                    <DatePicker
                        onChange={(date) => {
                            setDate(date);
                            onChange(date);
                        }}
                        selectsStart={selectsStart}
                        selectsEnd={selectsEnd}
                        onBlur={onBlur}
                        selected={selected}
                        startDate={startDate}
                        endDate={endDate}
                        minDate={minDate}
                        dateFormat="h:mm, MMMM d, yyyy aa"
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={15}
                        customInput={<CustomInput />}
                    />
                )}
            />
        </div>
    );
}

export default Calendar;
//12:00, August 12, 2021
