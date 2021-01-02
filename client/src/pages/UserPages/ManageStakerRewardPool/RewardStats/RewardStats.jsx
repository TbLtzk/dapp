import React, { useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { Block } from 'constants/style';
import { useForm } from 'react-hook-form';
import FormInput from 'components/Base/Form/FormInput';
import Button from 'components/Base/Buttons/Button';
import { errorHandler, numberToUintPercent, uintPercentToNumber } from 'func/useful';
import { useDispatch, useSelector } from 'react-redux';
import {
  getDelegatorsShare,
  setDelegatorsShareSend,
  setInterestRateSend,
} from 'store/actions/action-creaters/validators';
import { userAddressMetamask } from 'store/selectors/user-inf';
import { delegatorsShareSelector, interestRateSelector } from 'store/selectors/validators';
import { getBalance } from 'store/actions/action-creaters/validation-reward-pools';
import { balanceSelector } from 'store/selectors/validation-reward-pools';

export default function RewardStats() {
  const { register: reg1, handleSubmit: submit1, errors: err1 } = useForm();
  const { register: reg2, handleSubmit: submit2, errors: err2 } = useForm();

  const address = useSelector(userAddressMetamask);
  const delegatorsShare = uintPercentToNumber(useSelector(delegatorsShareSelector));
  const interestRate = useSelector(interestRateSelector);
  const balance = useSelector(balanceSelector);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBalance(address));
    dispatch(getDelegatorsShare(address));
  }, []);

  const setInterestRate = (formData) => {
    // const rootNodes = new RootNodes();
    // rootNodes.getMembers().then((data) => console.log(data));
    // rootNodes.addMember(address).then((data) => console.log(data));
    dispatch(setInterestRateSend(address, numberToUintPercent(formData.amount)));
  };

  const setValidatorShare = (formData) => {
    dispatch(setDelegatorsShareSend(address, numberToUintPercent(formData.amount)));
  };

  return (
    <Block>
      <p className="title type-1">Reward Stats</p>
      <div>
        <span>Amount of Pool Rewards:</span>
        <span>
          {balance}
          Q
        </span>
      </div>
      <div>
        <span>Validator Share:</span>
        <span>
          {delegatorsShare === 0 ? 0 : 100 - delegatorsShare}
          %
        </span>
      </div>
      <div>
        <span>Delegators Share:</span>
        <span>
          {delegatorsShare}
          %
        </span>
      </div>
      <div>
        <span>Payout Interest:</span>
        <span>
          {interestRate}
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
