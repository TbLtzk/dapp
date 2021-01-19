import React, { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { BorrowingCoreQUSD } from 'contracts/BorrowingCore';
import { userAddressMetamask } from 'store/selectors/user-inf';
import Button from 'components/Base/Buttons/Button';

import { useForm } from 'react-hook-form';
import { Headline, AccountContainer } from './styles';
import CustomBlock from '../../../../../components/Base/CustomBlock';
import FormInput from '../../../../../components/Base/Form/FormInput';
import { errorHandler } from '../../../../../func/useful';

export default function AccountStatus() {
  const { register: reg, handleSubmit: submit, errors } = useForm();
  const [actCardData, setActCardData] = useState({ type: 1 });

  const address = useSelector(userAddressMetamask);

  const createVault = (collateral) => {
    console.log(collateral);
  };

  return (
    <CustomBlock>
      <AccountContainer>
        <Headline>Manage balance</Headline>
        <Row>
          <Col xs={12}>
            <div className="list_1">
              <div className="marker" />
              <span>Inside Validator Ranking</span>
            </div>
            <div className="list_2_container">
              <div className="list_2">
                <div className="marker" />
                <span>Active Validator</span>
              </div>
              <div className="list_2">
                <div className="marker" />
                <span>Standby Validator</span>
              </div>
              <div className="list_2">
                <div className="marker" />
                <span>Current Rank is: #79</span>
              </div>
            </div>
            <div className="list_1">
              <div className="marker" />
              <span>Not inside Validator Ranking</span>
            </div>

            <div className="stats_container">
              <div>
                <span>Stake in Validator Ranking (Q)</span>
                <span>45800Q</span>
              </div>
              <div>
                <span>Personal Balance (Q)</span>
                <span>45800Q</span>
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
              placeholder="666Q"
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
                handleButton={submit(createVault)}
              />
              <Button
                type="default"
                title="Announce"
                width="30%"
                handleButton={submit(createVault)}
              />
              <Button
                type="default"
                title="Withdraw from Ranking"
                width="35%"
                handleButton={submit(createVault)}
              />
            </div>
          </Col>
          <Col xs={12} style={{ marginTop: '10px' }}>
            <Button
              type="default"
              title="Confirm Validation"
              width="100%"
              handleButton={submit(createVault)}
            />
          </Col>
        </Row>
      </AccountContainer>
    </CustomBlock>
  );
}
