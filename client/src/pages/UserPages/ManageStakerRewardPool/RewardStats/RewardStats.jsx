import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { Block } from 'constants/style';
import { useForm } from 'react-hook-form';
import FormInput from 'components/Base/Form/FormInput';
import Button from 'components/Base/Buttons/Button';
import { errorHandler, fN } from 'func/useful';
import { useDispatch, useSelector } from 'react-redux';
import { userAddressMetamask } from 'store/selectors/user-inf';
import Handler from './handler';

export default function RewardStats() {
  const { register: reg1, handleSubmit: submit1, errors: err1 } = useForm();
  const { register: reg2, handleSubmit: submit2, errors: err2 } = useForm();

  const [amountRP, setAmountRP] = useState(0);
  const [delShare, setDelShare] = useState(0);
  const [intRate, setIntRate] = useState(0);

  const address = useSelector(userAddressMetamask);
  const handler = new Handler(address, useDispatch());

  useEffect(() => {
    handler.getAmountOfRewardPool(setAmountRP);
    handler.getDelegatorShare(setDelShare);
    handler.getInterestRate(setIntRate);
  }, []);

  const setInterestRate = (formData) => {
    handler.setInterestRate(formData, setIntRate);
  };

  const setValidatorShare = (formData) => {
    handler.setValidatorShare(formData, setDelShare);
  };

  return (
    <Block>
      <p className="title type-1">Reward Stats</p>
      <div>
        <span>Amount of Pool Rewards:</span>
        <span>
          {fN(amountRP)}
          Q
        </span>
      </div>
      <div>
        <span>Validator Share:</span>
        <span>
          {delShare === 0 ? 0 : fN(100 - delShare)}
          %
        </span>
      </div>
      <div>
        <span>Delegators Share:</span>
        <span>
          {fN(delShare)}
          %
        </span>
      </div>
      <div>
        <span>Payout Interest:</span>
        <span>
          {fN(intRate)}
          %
        </span>
      </div>

      <p className="title type-2">Manage Rewards</p>
      <Row>
        <Col xs={6} className="form-container">
          <span>Set Validator Share</span>
          <div>
            <FormInput
              name="amount"
              type="number"
              placeholder="10%"
              ref={reg1({ required: true, min: 0, max: 100.0001 })}
              valid={errorHandler(err1, 'amount')}
            />
            <Button
              type="outline"
              title="Set"
              width="94px"
              handleButton={submit1(setValidatorShare)}
            />
          </div>
        </Col>
        <Col xs={6} className="form-container">
          <span>Set Payout Interest</span>
          <div>
            <FormInput
              name="amount"
              type="number"
              placeholder="10%"
              ref={reg2({ required: true, min: 0, max: 100.0001 })}
              valid={errorHandler(err2, 'amount')}
            />
            <Button
              type="outline"
              title="Set"
              width="94px"
              handleButton={submit2(setInterestRate)}
            />
          </div>
        </Col>
      </Row>
    </Block>
  );
}
