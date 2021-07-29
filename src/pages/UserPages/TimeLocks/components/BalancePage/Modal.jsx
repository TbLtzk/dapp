import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import ModalWindow from 'components/Base/ModalWindow';
import FormInput from 'components/Base/Form/FormInput';
import Button from 'components/Base/Buttons/Button';
import { Controller, useForm } from 'react-hook-form';
import { CalendarWraper } from '../../styles';
import "react-datepicker/dist/react-datepicker.css";

function Modal({ modalShow, setModalShow, setDeposit, contract }) {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const {
        register,
        control,
        handleSubmit,
        errors,
        getValues,
        reset
    } = useForm();

    const handleSetDeposit = () => {
        const values = getValues();
        const isEmpty = Object.values(values).every(x => (x === null || x === ''));
        handleSubmit(setDeposit)()
        if (!isEmpty) {
            setModalShow(false)
        }
    }

    return (
        <ModalWindow
            show={modalShow}
            onHide={() => {
                setModalShow(false);
                setStartDate('');
                setEndDate('');
                reset();
            }}
            modalTitle="Deposit & withdraw time locked tokens"
            content={
                <>  <p>Recipient Address</p>
                    <FormInput
                        name="token"
                        type="string"
                        placeholder='0x000'
                        ref={register({
                            required: "Address Required!",
                            pattern: {
                                value: /^.{42}$/gim,
                                message: "Invalid Address!"
                            }
                        })}
                        valid={errors?.token?.message}
                    />
                    <CalendarWraper >
                        <div>
                            <p>Start date</p>
                            <Controller
                                control={control}
                                name='startDate'
                                defaultValue={''}

                                render={({ onChange, onBlur, value, ref }) => (
                                    <DatePicker
                                        name='end'
                                        onChange={(date) => {
                                            setStartDate(date)
                                            onChange(date)
                                        }}
                                        selectsStart
                                        onBlur={onBlur}
                                        selected={startDate}
                                        startDate={startDate}
                                        endDate={endDate}
                                        minDate={new Date()}
                                        dateFormat="d, MM, yyyy"
                                    />
                                )}
                            />
                        </div>
                        <div>
                            <p>End Date</p>
                            <Controller
                                control={control}
                                name='endDate'
                                defaultValue={''}
                                render={({ onChange, onBlur, value }) => (
                                    <DatePicker
                                        name='end'
                                        onChange={(date) => {
                                            setEndDate(date)
                                            onChange(date)
                                        }}
                                        onBlur={onBlur}
                                        selectsEnd
                                        selected={endDate}
                                        startDate={startDate}
                                        endDate={endDate}
                                        minDate={startDate}
                                        dateFormat="d, MM, yyyy"
                                    />
                                )}
                            />
                        </div>
                    </CalendarWraper>
                    <p>Amount</p>
                    <FormInput
                        lbl={'Q'}
                        min={0}
                        name="amountQ"
                        type="number"
                        placeholder="0.0"
                        ref={register({ required: 'Field is required!' })}
                        valid={errors.amountQ?.message}
                    />
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Button
                            type="outline"
                            title="Confirm"
                            width="80px"
                            handleButton={handleSetDeposit} // handle close window
                        />
                        <Button
                            type="outline"
                            title="Purge expired time locks"
                            width="200px"
                            handleButton={() => console.log(contract)}
                        />
                    </div>

                </>
            }
        />
    )
}

export default Modal
