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
  const {
    register: reg1,
    handleSubmit: submit1,
    errors: err1
  } = useForm();
  const {
    register: reg3,
    handleSubmit: submit3,
    errors: err3
  } = useForm();

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
      <h1>Lock Your Q Tokens for Voting</h1>
      <h4>Increase Voting Weight by</h4>
      <div className={'card-form-one-line'}>
        <FormInput
          min={0}
          lbl={'Q'}
          name="amountQ"
          type="number"
          placeholder="0.0"
          ref={reg1({ required: 'Field is required!' })}
          valid={err1.amountQ?.message}
        />
        <Button
          type="outline"
          title="Increase"
          width="82px"
          handleButton={submit1(lockCoinL)}
        />
      </div>

      <h4>Reduce Voting Weight by</h4>
      <div className={'card-form-one-line'}>
        <FormInput
          min={0}
          name="amountQ"
          type="number"
          lbl={'Q'}
          placeholder="0.0"
          ref={reg3({ required: 'Field is required!' })}
          valid={err3.amountQ?.message}
        />
        <Button
          type="outline"
          title="Reduce"
          width="82px"
          handleButton={submit3(unlockCoinL)}
        />
      </div>
      <div className="actions">
        <ButtonLinkArrow
          title="Go to Governance"
          path="/q-governance"
        />
      </div>
    </CustomBlock>
  );
}
