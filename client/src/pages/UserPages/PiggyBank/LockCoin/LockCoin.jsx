import React, { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import CustomBlock from 'components/Base/CustomBlock';
import FormInput from 'components/Base/Form/FormInput';
import { useForm } from 'react-hook-form';
import Button from 'components/Base/Buttons/Button';
import { useDispatch, useSelector } from 'react-redux';
import { setLockAmount, setNewExpiration, setUnlockAmount } from 'store/actions/action-creaters/q-piggy-bank';
import { userAddressMetamask } from 'store/selectors/user-inf';
import DatePicker from 'react-datepicker';
import { InputWrapper } from 'components/Base/Form/FormInput/styles';
import { DatePickerContainer } from './styles';
import { Headline, TextWrapGrey } from '../styles';

import 'react-datepicker/dist/react-datepicker.css';
import ButtonLinkArrow from '../../../../components/Base/Buttons/ButtonLinkArrow/ButtonLinkArrow';

export default function LockCoin() {
  const { register: reg1, handleSubmit: submit1, errors: err1 } = useForm();
  const { register: reg2, handleSubmit: submit2 } = useForm();
  const { register: reg3, handleSubmit: submit3, errors: err3 } = useForm();

  const dispatch = useDispatch();
  const address = useSelector(userAddressMetamask);

  function getClearDate(date) {
    return new Date(`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`);
  }

  const [selDate, setSelDate] = useState(getClearDate(new Date()));
  const [selDateExp, setSelDateExp] = useState(getClearDate(new Date()));

  function lockCoinL(formData) {
    const expiration = selDate.getTime() / 1000 + formData.hours * 3600 + formData.minutes * 60;
    dispatch(setLockAmount(address, formData.amountQ, expiration));
  }

  function extendExpiration(formData) {
    const expiration = selDateExp.getTime() / 1000 + formData.hours * 3600 + formData.minutes * 60;
    dispatch(setNewExpiration(address, expiration));
  }

  function unlockCoinL(formData) {
    console.log(formData);
    dispatch(setUnlockAmount(address, formData.amountQ));
  }

  return (
    <CustomBlock>
      <Headline>Lock Your Coins for Voting</Headline>
      <Row>
        <Col xs={3}>
          <TextWrapGrey>Increase Weight</TextWrapGrey>
        </Col>
        <Col xs={9}>
          <TextWrapGrey>Lock Weight Until</TextWrapGrey>
        </Col>

        <Col xs={3}>
          <FormInput
            name="amountQ"
            type="number"
            placeholder="666Q"
            ref={reg1({ required: 'Field is required!' })}
            valid={err1.amountQ?.message}
          />
        </Col>
        <DatePickerContainer xs={5}>
          <InputWrapper>
            <DatePicker
              className="form-control"
              selected={selDate}
              onChange={(date) => setSelDate(getClearDate(date))}
              dateFormat="d-M-yyyy"
            />
          </InputWrapper>
          <FormInput
            name="hours"
            type="number"
            placeholder="HH"
            ref={reg1({ required: 'Field is required!', min: 0, max: 24 })}
            valid={undefined !== err1.hours ? 'Min value is 0. Max value is 23' : ''}
          />
          <FormInput
            name="minutes"
            type="number"
            placeholder="MM"
            ref={reg1({ required: 'Field is required!', min: 0, max: 59 })}
            valid={undefined !== err1.minutes ? 'Min value is 0. Max value is 59' : ''}
          />
        </DatePickerContainer>
        <Col>
          <Button
            type="outline"
            title="Increase"
            width="100%"
            handleButton={submit1(lockCoinL)}
          />
        </Col>
      </Row>

      <Row>
        <Col xs={12}>
          <TextWrapGrey>Extend current Voting Weight until</TextWrapGrey>
        </Col>
        <DatePickerContainer xs={8}>
          <InputWrapper>
            <DatePicker
              className="form-control"
              selected={selDateExp}
              onChange={(date) => setSelDateExp(getClearDate(date))}
              dateFormat="d-M-yyyy"
            />
          </InputWrapper>
          <FormInput
            name="hours"
            type="number"
            placeholder="HH"
            ref={reg2({ required: 'Field is required!', min: 0, max: 24 })}
            valid={undefined !== err1.hours ? 'Min value is 0. Max value is 23' : ''}
          />
          <FormInput
            name="minutes"
            type="number"
            placeholder="MM"
            ref={reg2({ required: 'Field is required!', min: 0, max: 59 })}
            valid={undefined !== err1.minutes ? 'Min value is 0. Max value is 59' : ''}
          />
        </DatePickerContainer>
        <Col>
          <Button
            type="outline"
            title="Extend"
            width="100%"
            handleButton={submit2(extendExpiration)}
          />
        </Col>
      </Row>

      <Row>
        <Col xs={12}>
          <TextWrapGrey>Reduce Weight by</TextWrapGrey>
        </Col>
        <Col xs={8}>
          <FormInput
            name="amountQ"
            type="number"
            placeholder="666Q"
            ref={reg3({ required: 'Field is required!' })}
            valid={err3.amountQ?.message}
          />
        </Col>
        <Col>
          <Button
            type="outline"
            title="Reduce"
            width="100%"
            handleButton={submit3(unlockCoinL)}
          />
        </Col>
      </Row>
      <Row>
        <Col xs={8}>
          <TextWrapGrey>
            Participate in Q Governance with your locked
            <br />
            amount
          </TextWrapGrey>
        </Col>
        <Col xs={4}>
          <div className="go-governance">
            <ButtonLinkArrow
              title="Go to Governance"
              path="/q-governance"
            />
          </div>
        </Col>

      </Row>
    </CustomBlock>
  );
}
