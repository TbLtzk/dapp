import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import ModalWindow from 'components/Base/ModalWindow';
import FormInput from 'components/Base/Form/FormInput';
import Button from 'components/Base/Buttons/Button';
import { Controller, useForm } from 'react-hook-form';
import { CalendarWraper } from '../../styles';
import "react-datepicker/dist/react-datepicker.css";

function Modal({ modalShow, setModalShow, setDeposit }) {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const {
        register,
        control,
        handleSubmit,
        errors
    } = useForm();

    return (
        <ModalWindow
            show={modalShow}
            onHide={() => {
                setModalShow(false);
            }}
            modalTitle="Deposit & withdraw time locked tokens"
            content={
                <>
                    <FormInput
                        name="token"
                        type="string"
                        placeholder='User address'
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
                                        onChange={onChange}
                                        onBlur={onBlur}
                                        selected={value}
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
                                        onChange={onChange}
                                        onBlur={onBlur}
                                        selected={value}
                                    />
                                )}
                            />
                        </div>
                    </CalendarWraper>

                    <FormInput
                        lbl={'Q'}
                        min={0}
                        name="amountQ"
                        type="number"
                        placeholder="0.0"
                        ref={register({ required: 'Field is required!' })}
                        valid={errors.amountQ?.message}
                    />
                    <Button
                        type="outline"
                        title="Confirm"
                        width="80px"
                        handleButton={handleSubmit(setDeposit)}
                    />
                </>
            }
        />
    )
}

export default Modal
