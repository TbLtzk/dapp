import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRootNodeStakes, getWithdrawals } from 'store/actions/action-creaters/root-contract';
import { isUserRootNode, loadingCheckingRootNode, rootNodeStake, withdrawals } from 'store/selectors/root-contract';
import { userAddressMetamask } from 'store/selectors/user-inf';

import { useForm } from 'react-hook-form';

import { Row } from 'react-bootstrap';

import { fN } from 'func/useful';
import { fromWei } from 'func/balance';
import CustomBlock from 'components/Base/CustomBlock';
import FormInput from 'components/Base/Form/FormInput';
import ActionButtons from 'pages/UserPages/Staking/FormStaking/ActionButtons';
import RootService from 'contracts/src/Root';

import {
  Headline, List, TextWrapBlack, Subtitle,
  TextWrapGrey, TotalText, WrapInput
} from './styles';
import { fromSolDateFormattingT1 } from '../../../../func/date';

function FormStaking() {
  const { register, errors, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const rootService = new RootService();
  const [userBalance, setUserBalance] = useState(null);

  const isUserRoot = useSelector(isUserRootNode);
  const loadingCheckingRoot = useSelector(loadingCheckingRootNode);
  const userAddress = useSelector(userAddressMetamask);
  const amountNodeStake = useSelector(rootNodeStake);
  const withdrawalsData = useSelector(withdrawals);

  useEffect(() => {
    if (userAddress) {
      // if (userAddress && isUserRoot) {
      dispatch(getRootNodeStakes(rootService, userAddress));
      dispatch(getWithdrawals(userAddress));
    }
  }, [userAddress, isUserRoot, dispatch]);

  useEffect(() => {
      window.web3.eth.getBalance(userAddress, (err, balance) => {
        const userBalance = fromWei(balance);
        setUserBalance(fN(userBalance));
      });
  }, []);

  const handleBtn = useMemo(() => {
    return handleSubmit;
  }, [handleSubmit]);

  return (
    <CustomBlock>
      <Headline>Your account status</Headline>
      <List>
        {loadingCheckingRoot ? null :
          isUserRoot
            ? <li>Member of Root Node Panel</li>
            : <li>Not a Member of Root Node Panel</li>
        }
      </List>
      <Row>
        <Subtitle md={6}>
          <p>Stake in Root Node Panel (Q)</p>
        </Subtitle>
        <TextWrapBlack md={6}>
          <p>{amountNodeStake + 'Q'}</p>
          {/*<p>{!isUserRoot ? "0Q" : amountNodeStake + "Q"}</p>*/}
        </TextWrapBlack>
        <TextWrapGrey md={6}>
          <p>Q Address Balance</p>
        </TextWrapGrey>
        <TextWrapBlack md={6}>
          <p>{userBalance ? userBalance : 0}Q</p>
        </TextWrapBlack>
        <TextWrapGrey md={6}>
          <ul>
            <li>Announcement withdrawal status</li>
            {withdrawalsData?.pending ?
              <>
                <li>Announced amount</li>
                <li>End time for announcement</li>
              </>
              : null}
          </ul>
        </TextWrapGrey>
        <TextWrapBlack md={6}>
          <ul>
            <li>{withdrawalsData?.pending ? 'pending' : 'not-active'}</li>
            {withdrawalsData?.pending ?
              <>
                <li>{withdrawalsData ? fromWei(withdrawalsData?.amount) : 0}Q</li>
                <li>{withdrawalsData?.endTime !== '0' ? fromSolDateFormattingT1(Number(withdrawalsData?.endTime)) : '-'}</li>
              </>
              : null}
          </ul>
        </TextWrapBlack>
        <TotalText md={7}>
          <p>Amount (Q):</p>
        </TotalText>
        <WrapInput md={5}>
          <FormInput
            name="amount"
            type="number"
            align="right"
            placeholder={'0'}
            ref={register({ required: 'Field is required!' })}
            valid={errors?.amount?.message}
            onChange={() => {
            }}
          />
        </WrapInput>
      </Row>
      <ActionButtons
        handleSubmit={handleBtn}
      />
    </CustomBlock>
  );
}

export default FormStaking;

