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
        getValues
    } = useForm();

    return (
        <ModalWindow
            show={modalShow}
            onHide={() => {
                setModalShow(false);
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
                                required: true,
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
                                    />
                                )}
                            />
                        </div>
                        <div onClick={() => getValues()}>
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
                            handleButton={handleSubmit(setDeposit)} // handle close window
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
