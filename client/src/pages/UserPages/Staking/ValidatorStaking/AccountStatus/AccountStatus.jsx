import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { userAddressMetamask } from 'store/selectors/user-inf';
import Button from 'components/Base/Buttons/Button';
import { useForm } from 'react-hook-form';
import CustomBlock from 'components/Base/CustomBlock';
import FormInput from 'components/Base/Form/FormInput';
import { errorHandler, fN } from 'func/useful';
import { fromSolDateFormattingT1 } from 'func/date';
import { useAlert } from 'react-alert';
import Handler from './handler';
import { Headline, AccountContainer } from './styles';
import {
  getAccTotalStake,
  getDelegatedStake,
  getOwnStake,
  getTotalStake
} from '../../../../../store/actions/action-creaters/validators';

export default function AccountStatus() {
  const { register: reg, handleSubmit: submit, errors } = useForm();
  const dispatch = useDispatch();

  const [validatorExist, setValidatorExist] = useState(false);
  const [accountableTotalStake, setAccountableTotalStake] = useState(0);
  const [validatorsList, setValidatorsList] = useState([]);
  const [validatorRank, setValidatorRank] = useState(0);
  const [accountBalance, setAccountBalance] = useState(0);
  const [annToWithdraw, setAnnToWithdraw] = useState(0);
  const [annToWithdrawEndTime, setAnnToWithdrawEndTime] = useState(0);

  const address = useSelector(userAddressMetamask);
  const handler = new Handler(address, useDispatch(), useAlert());

  useEffect(() => {
    dispatch(getTotalStake(address));
    dispatch(getOwnStake(address));
    dispatch(getDelegatedStake(address));
    dispatch(getAccTotalStake(address));
  }, [accountableTotalStake, accountBalance, annToWithdraw, annToWithdrawEndTime]);

  useEffect(() => {
    handler.setValidatorExist(setValidatorExist);
    handler.setAccountableTotalStake(setAccountableTotalStake);
    handler.setValidatorsList(setValidatorsList);
    handler.setAccountBalance(setAccountBalance);
    handler.setAnnToWithdrawData(setAnnToWithdraw, setAnnToWithdrawEndTime);
  }, []);

  useEffect(() => {
    if (Array.isArray(validatorsList) && validatorsList.length > 0) {
      validatorsList.forEach((el, key) => {
        if (address === el.validator) {
          setValidatorRank(key + 1);
        }
      });
    }
  }, [validatorsList]);

  const stakeToRanking = (formData) => {
    handler.stakeToRanking(formData.amount, setValidatorExist, setAccountableTotalStake, setValidatorsList,
      setAccountBalance);
  };

  const announce = (formData) => {
    handler.announce(formData.amount, setAccountableTotalStake, setAnnToWithdraw, setAnnToWithdrawEndTime);
  };

  const withdrawFromRanking = (formData) => {
    handler.withdrawFromRanking(formData.amount, setValidatorExist, setAccountableTotalStake, setValidatorsList,
      setAccountBalance, setAnnToWithdraw, setAnnToWithdrawEndTime);
  };

  const confirmValidation = () => {
    handler.confirmValidation();
  };

  const renderValidatorRanking = () => {
    if (validatorExist === true) {
      return (
        <>
          <div className="list_1">
            <div className="marker" />
            <span>Inside Validator Ranking</span>
          </div>
          <div className="list_2_container">
            <div className="list_2">
              <div className="marker" />
              <span>Active Validator</span>
            </div>
          </div>
          <div className="list_2_container">
            <div className="list_2">
              <div className="marker" />
              <span>
                Current Rank is: #
                {validatorRank}
              </span>
            </div>
          </div>
        </>
      );
    }
    return (
      <div className="list_1">
        <div className="marker" />
        <span>Not inside Validator Ranking</span>
      </div>
    );
  };

  const renderConfValBtn = () => {
    if (accountableTotalStake > 0) {
      return (
        <Col xs={12} style={{ marginTop: '10px' }}>
          <Button
            type="default"
            title="Confirm Validation"
            width="100%"
            handleButton={() => confirmValidation()}
          />
        </Col>
      );
    }
    return '';
  };

  return (
    <CustomBlock>
      <AccountContainer>
        <Headline>Manage balance</Headline>
        <Row>
          <Col xs={12}>
            {renderValidatorRanking()}
            <div className="stats_container">
              <div>
                <span>Stake in Validator Ranking</span>
                <span className="num">
                  {fN(accountableTotalStake)}
                  Q
                </span>
              </div>
              <div className="list_2_container">
                <div className="list_2">
                  <div className="marker" />
                  <span>Announced for withdrawal</span>
                </div>
                <span className="num">
                  {fN(annToWithdraw)}
                  Q
                </span>
              </div>
              <div className="list_2_container">
                <div className="list_2">
                  <div className="marker" />
                  <span>After</span>
                </div>
                <span className="num">
                  {annToWithdrawEndTime === 0 ? '-' : fromSolDateFormattingT1(annToWithdrawEndTime)}
                </span>
              </div>
            </div>
            <div className="stats_container">
              <div>
                <span>Personal Balance</span>
                <span className="num">
                  {fN(accountBalance)}
                  Q
                </span>
              </div>
            </div>
          </Col>
        </Row>
        <Row style={{ marginTop: '16px' }}>
          <Col xs={8} className="input_label">
            <span>Amount (Q):</span>
          </Col>
          <Col xs={4}>
            <FormInput
              name="amount"
              type="number"
              placeholder="Q"
              ref={reg({ required: 'Field is required!', min: 0 })}
              valid={errorHandler(errors, 'amount')}
            />
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <div className="btn_container">
              <Button
                type="default"
                title="Stake to Ranking"
                width="35%"
                handleButton={submit(stakeToRanking)}
              />
              <Button
                type="default"
                title="Announce"
                width="30%"
                handleButton={submit(announce)}
              />
              <Button
                type="default"
                title="Withdraw from Ranking"
                width="35%"
                handleButton={submit(withdrawFromRanking)}
              />
            </div>
          </Col>
          {renderConfValBtn()}
        </Row>
      </AccountContainer>
    </CustomBlock>
  );
}
