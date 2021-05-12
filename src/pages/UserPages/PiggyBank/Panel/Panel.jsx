import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userAddressMetamask } from 'store/selectors/user-inf';
import { getUserBalance, getLockedAssets, getPBBalance } from 'store/actions/action-creaters/q-piggy-bank';
import { userBalance, votingWeight, votingLockingEnd, pbBalance } from 'store/selectors/q-piggy-bank';

import { useAlert } from 'react-alert';

import VoterStatus from 'components/Custom/PageLists/VoterStatus';
import CustomBlock from 'components/Base/CustomBlock';

import PiggyBankHandler from '../handler';
import { fN } from 'func/useful';
import { fromSolDateFormattingT1 } from 'func/date';
import { uintPerSecondToPerYearNumber } from 'func/useful';

export default function Panel() {
  const userAddressL = useSelector(userAddressMetamask);
  const balanceDetails = useSelector(pbBalance);
  const userPBBalanceL = useSelector(userBalance);
  const userVotingWeight = fN(useSelector(votingWeight));
  const userLockingEnd = fromSolDateFormattingT1(useSelector(votingLockingEnd));

  const [accountBalance, setAccountBalance] = useState();
  const [yearlyExpectedEarnings, setYearlyExpectedEarnings] = useState(0);

  const dispatch = useDispatch();
  const address = useSelector(userAddressMetamask);
  const pBHandler = new PiggyBankHandler(address, useDispatch(), useAlert());

  useEffect(() => {
    dispatch(getUserBalance(userAddressL));
    dispatch(getLockedAssets(userAddressL));
    dispatch(getPBBalance());
  }, [dispatch]);

  useEffect(() => {
    pBHandler.setAccountBalance(setAccountBalance);
  });

  useEffect(() => {
    const interestRate = balanceDetails?.interestRate
      ? uintPerSecondToPerYearNumber(balanceDetails.interestRate)
      : 0;
    let yearlyExpectedEarningsCalc = 0;
    if (userPBBalanceL) {
      yearlyExpectedEarningsCalc = userPBBalanceL * ((1 + interestRate) / 100);
    }
    setYearlyExpectedEarnings(yearlyExpectedEarningsCalc);
  }, [balanceDetails, userPBBalanceL]);

  return (
    <CustomBlock>
      <h1>Overview</h1>
      <div>
        <h5>Q Vault balance</h5>
        <p>{fN(userPBBalanceL) + ' Q'}</p>
        <h5>Q Token Holder reward rate (p.a.)</h5>
        <p>{(balanceDetails?.interestRate ? fN(uintPerSecondToPerYearNumber(balanceDetails.interestRate)) : 0) + '%'}</p>
        <h5>Yearly expected reward</h5>
        <p>{fN(yearlyExpectedEarnings) + ' Q'}</p>
        <h5>Q address balance</h5>
        <p>{fN(accountBalance) + ' Q'}</p>

        <div className={'card__line'}/>

        <h5>Q Voting Weight</h5>
        <p>{userVotingWeight + ' Q'}</p>
        <h5>Voting Locking End</h5>
        <p>{userLockingEnd}</p>
        <h5>Voting Status</h5>
        <VoterStatus/>
      </div>
    </CustomBlock>
  );
}
