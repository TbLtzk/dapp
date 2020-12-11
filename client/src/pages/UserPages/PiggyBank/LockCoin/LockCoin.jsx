import React, {useState} from "react";
import {Row, Col} from "react-bootstrap";
import CustomBlock from "components/Base/CustomBlock";
import {Headline, TextWrapGrey} from "../styles";
import FormInput from "components/Base/FormInput";
import {useForm} from "react-hook-form";
import Button from "components/Base/Button";
import {useDispatch, useSelector} from "react-redux";
import {setLockAmount, setNewExpiration, setUnlockAmount} from "store/actions/action-creaters/q-piggy-bank";
import {userAddressMetamask} from "store/selectors/user-inf";
import DatePicker from "react-datepicker";
import {DatePickerContainer} from "./styles";
import {InputWrapper} from "components/Base/FormInput/styles";

import "react-datepicker/dist/react-datepicker.css";


export default function LockCoin(props) {
    const { register: reg1, handleSubmit: submit1, errors: err1 } = useForm();
    const { register: reg2, handleSubmit: submit2, errors: err2 } = useForm();
    const { register: reg3, handleSubmit: submit3, errors: err3 } = useForm();

    const dispatch = useDispatch();
    const address = useSelector(userAddressMetamask);

    const [selDate, setSelDate] = useState(getClearDate(new Date()));
    const [selDateExp, setSelDateExp] = useState(getClearDate(new Date()));

    function lockCoinL(formData) {
        let expiration = selDate.getTime() / 1000 + formData.hours * 3600 + formData.minutes * 60;
        dispatch(setLockAmount(address, formData.amountQ, expiration));
    }

    function extendExpiration(formData) {
        let expiration = selDateExp.getTime() / 1000 + formData.hours * 3600 + formData.minutes * 60;
        dispatch(setNewExpiration(address, expiration));
    }

    function unlockCoinL(formData) {
        console.log(formData);
        dispatch(setUnlockAmount(address, formData.amountQ));
    }

    function getClearDate(date) {
        return new Date(`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`)
    }

    return (
        <CustomBlock>
            <Headline>Lock Your Coins for Voting</Headline>
            <Row>
                <Col xs={3}>
                    <TextWrapGrey>Lock Amount</TextWrapGrey>
                </Col>
                <Col xs={9}>
                    <TextWrapGrey>Until</TextWrapGrey>
                </Col>

                <Col xs={3}>
                    <FormInput
                        name="amountQ"
                        type="number"
                        placeholder={"666Q"}
                        ref={reg1({required: "Field is required!"})}
                        valid={err1.amountQ?.message}
                    />
                </Col>
                <DatePickerContainer xs={5}>
                    <InputWrapper>
                        <DatePicker
                            className={'form-control'}
                            selected={selDate}
                            onChange={date => setSelDate(getClearDate(date))}
                            dateFormat="d-M-yyyy"
                        />
                    </InputWrapper>
                    <FormInput
                        name="hours"
                        type="number"
                        placeholder={"HH"}
                        ref={reg1({required: "Field is required!", min: 0, max: 24})}
                        valid={undefined !== err1.hours ? 'Min value is 0. Max value is 23' : ''}
                    />
                    <FormInput
                        name="minutes"
                        type="number"
                        placeholder={"MM"}
                        ref={reg1({required: "Field is required!", min: 0, max: 59})}
                        valid={undefined !== err1.minutes ? 'Min value is 0. Max value is 59' : ''}
                    />
                </DatePickerContainer>
                <Col>
                    <Button
                        type="outline"
                        title="Lock"
                        width={'100%'}
                        handleButton={submit1(lockCoinL)}
                    />
                </Col>
            </Row>

            <Row>
                <Col xs={12}>
                    <TextWrapGrey>Extend currently locked balance until</TextWrapGrey>
                </Col>
                <DatePickerContainer xs={8}>
                    <InputWrapper>
                        <DatePicker
                            className={'form-control'}
                            selected={selDateExp}
                            onChange={date => setSelDateExp(getClearDate(date))}
                            dateFormat="d-M-yyyy"
                        />
                    </InputWrapper>
                    <FormInput
                        name="hours"
                        type="number"
                        placeholder={"HH"}
                        ref={reg2({required: "Field is required!", min: 0, max: 24})}
                        valid={undefined !== err1.hours ? 'Min value is 0. Max value is 23' : ''}
                    />
                    <FormInput
                        name="minutes"
                        type="number"
                        placeholder={"MM"}
                        ref={reg2({required: "Field is required!", min: 0, max: 59})}
                        valid={undefined !== err1.minutes ? 'Min value is 0. Max value is 59' : ''}
                    />
                </DatePickerContainer>
                <Col>
                    <Button
                        type="outline"
                        title="Extend"
                        width={'100%'}
                        handleButton={submit2(extendExpiration)}
                    />
                </Col>
            </Row>

            <Row>
                <Col xs={12}>
                    <TextWrapGrey>Unlock Amount</TextWrapGrey>
                </Col>
                <Col xs={8}>
                    <FormInput
                        name="amountQ"
                        type="number"
                        placeholder={"666Q"}
                        ref={reg3({required: "Field is required!"})}
                        valid={err3.amountQ?.message}
                    />
                </Col>
                <Col>
                    <Button
                        type="outline"
                        title="Unlock"
                        width={'100%'}
                        handleButton={submit3(unlockCoinL)}
                    />
                </Col>
            </Row>
            <Row>
                <Col xs={8}>
                    <TextWrapGrey>Participate in Q Governance with your locked<br />amount</TextWrapGrey>
                </Col>
                <Col xs={4}>
                    <TextWrapGrey className={'go-governance'}>Go to Governance</TextWrapGrey>
                </Col>

            </Row>
        </CustomBlock>
    );
}