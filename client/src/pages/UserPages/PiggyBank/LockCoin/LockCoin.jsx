import React from 'react';
import { useForm } from 'react-hook-form';

import { useDispatch, useSelector } from 'react-redux';
import { setLockAmount, setUnlockAmount } from 'store/actions/action-creaters/q-piggy-bank';
import { userAddressMetamask } from 'store/selectors/user-inf';

import ButtonLinkArrow from 'components/Base/Buttons/ButtonLinkArrow';
import CustomBlock from 'components/Base/CustomBlock';
import FormInput from 'components/Base/Form/FormInput';
import Button from 'components/Base/Buttons/Button';

import { Row, Col } from 'react-bootstrap';
import 'react-datepicker/dist/react-datepicker.css';
import { Headline, TextWrapGrey } from '../styles';

export default function LockCoin() {
  const { register: reg1, handleSubmit: submit1, errors: err1 } = useForm();
  const { register: reg3, handleSubmit: submit3, errors: err3 } = useForm();

  const dispatch = useDispatch();
  const address = useSelector(userAddressMetamask);

  function lockCoinL(formData) {
    dispatch(setLockAmount(address, formData.amountQ));
  }

  function unlockCoinL(formData) {
    dispatch(setUnlockAmount(address, formData.amountQ));
  }

  return (
    <CustomBlock>
      <Headline>Lock Your Coins for Voting</Headline>
      <Row>
        <Col xs={12}>
          <TextWrapGrey>Increase Weight</TextWrapGrey>
        </Col>
        <Col xs={8}>
          <FormInput
            min={0}
            name="amountQ"
            type="number"
            placeholder="0.0 Q"
            ref={reg1({ required: 'Field is required!' })}
            valid={err1.amountQ?.message}
          />
        </Col>
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
          <TextWrapGrey>Reduce Weight by</TextWrapGrey>
        </Col>
        <Col xs={8}>
          <FormInput
            min={0}
            name="amountQ"
            type="number"
            placeholder="0.0 Q"
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
            <br/>
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
