import React, { useEffect, useMemo, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { userAddressMetamask } from 'store/selectors/user-inf';

import FormInput from 'components/Base/Form/FormInput';
import Button from 'components/Base/Buttons/Button';

import { useForm } from 'react-hook-form';
import Handler from './handler';

import { errorHandler, fN } from 'func/useful';

import { Row, Col } from 'react-bootstrap';
import { Block } from 'constants/style';

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

  const rewardStatsArr = useMemo(() => {
    return [
      {
        label: 'Amount of Pool Rewards:',
        value: fN(amountRP) + 'Q'
      },
      {
        label: 'Validator Share:',
        value: delShare === 0 ? 0 : fN(100 - delShare) + '%'
      },
      {
        label: 'Delegators Share:',
        value: fN(delShare) + '%'
      },
      {
        label: 'Payout Interest:',
        value: fN(intRate) + '%'
      },
    ];

  }, [amountRP, delShare, intRate]);

  return (
    <Block>
      <p className="title type-1">Reward Stats</p>
      {rewardStatsArr?.map(el => {
        return (
          <div key={el.label + 'reward-stats'}>
            <span>{el.label}</span>
            <span>{el.value}</span>
          </div>
        );
      })}
      <p className="title type-2">Manage Rewards</p>
      <Row>
        <Col xs={6} className="form-container">
          <span>Set Validator Share</span>
          <div>
            <FormInput
              name="amount"
              type="number"
              placeholder="10%"
              ref={reg1({
                required: true,
                min: 0,
                max: 100.0001
              })}
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
              ref={reg2({
                required: true,
                min: 0,
                max: 100.0001
              })}
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
