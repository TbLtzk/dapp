import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { drizzleReactHooks } from '@drizzle/react-plugin';
import { useDispatch, useSelector } from 'react-redux';
import { stakeToPanel, announceWithdrawal, withdraw } from 'store/actions/action-creaters/root-contract';
import { userAddressMetamask } from 'store/selectors/user-inf';

import RootService from 'contracts/src/Root';

import { Col, Row } from 'react-bootstrap';
import Button from 'components/Base/Buttons/Button';

import { bn } from '../../../../../contracts/handler/AuctionHandler';
import { toWei } from 'func/balance';

const { useDrizzle, useDrizzleState } = drizzleReactHooks;

function ActionButtons(props) {
  const { handleSubmit } = props;
  const { drizzle } = useDrizzle();
  const state = useDrizzleState(state => state);
  const dispatch = useDispatch();
  const rootService = new RootService();
  const userAddress = useSelector(userAddressMetamask);

  // const convertToWei = (amount) => {
  //   return bn(drizzle.web3.utils.toWei(amount, 'ether'));
  //   // return drizzle.web3.utils.toWei(amount, 'ether');
  // };

  const onStakeToPanel = useCallback(async (data) => {

    dispatch(stakeToPanel(rootService,
      {
        from: userAddress,
        value: toWei(data?.amount),
        // value: parseInt(convertToGWei(data?.amount)),
      }
    ));
  }, [drizzle]);

  const onWithdrawFromPanel = useCallback(async (data) => {
    dispatch(withdraw(rootService,
      toWei(data?.amount),
      // convertToGWei(data.amount),
      userAddress,
      {
        from: userAddress
      }));
  }, [dispatch]);

  const onAnnounce = useCallback(async (data) => {
    dispatch(announceWithdrawal(rootService,
      toWei(data?.amount),
      // convertToGWei(data.amount),
      {
        from: userAddress
      }));
  }, [dispatch]);

  return (
    <Row>
      <Col md={4}>
        <Button
          width="100%"
          type="full-width"
          title="Stake to Panel"
          handleButton={handleSubmit(onStakeToPanel)}
        />
      </Col>
      <Col md={4}>
        <Button
          width="100%"
          type="full-width"
          title="Announce Withdrawal"
          handleButton={handleSubmit(onAnnounce)}
        />
      </Col>
      <Col md={4}>
        <Button
          width="100%"
          type="full-width"
          title="Withdraw from Panel"
          handleButton={handleSubmit(onWithdrawFromPanel)}
        />
      </Col>
    </Row>
  );
}

ActionButtons.propTypes = {
  handleSubmit: PropTypes.func
};

export default ActionButtons;

