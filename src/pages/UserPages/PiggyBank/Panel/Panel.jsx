import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userAddressMetamask } from 'store/selectors/user-inf';
import { getUserBalance, getLockedAssets, getPBBalance } from 'store/actions/action-creaters/q-piggy-bank';
import { userBalance, votingWeight, votingLockingEnd, pbBalance } from 'store/selectors/q-piggy-bank';

import { useAlert } from 'react-alert';
import VoterStatus from 'components/Custom/PageLists/VoterStatus';

import PiggyBankHandler from '../handler';
import { fN } from 'func/useful';
import { fromSolDateFormattingT1 } from 'func/date';
import { uintPerSecondToPerYearNumber } from 'func/useful';

import { TextPanelSmallBlack, TextPanelSmallGrey, TextPanel, CustomBlockPanel, PanelAlign } from '../styles';

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
    <CustomBlockPanel>
      <TextPanel>
        <div>
          <span>Q Vault balance: </span>
          <span>{fN(userPBBalanceL) + 'Q'}</span>
        </div>
        <div>
          <span>Q Token Holder reward rate (p.a.): </span>
          <span>
            {(balanceDetails?.interestRate ? fN(uintPerSecondToPerYearNumber(balanceDetails.interestRate)) : 0) + '%'}
          </span>
        </div>
        <div>
          <span>Yearly expected reward: </span>
          <span>
            {fN(yearlyExpectedEarnings) + 'Q'}
        </span>
        </div>
      </TextPanel>
      <TextPanel>
        <PanelAlign>
          <span>Q address balance: </span>
          <span>
            {fN(accountBalance)}
            Q
          </span>
        </PanelAlign>
      </TextPanel>
      <TextPanel type="parentNode">
        {/*<span>Voting Weight</span>*/}
        <TextPanelSmallGrey style={{ margin: '0 8px 0 16px' }}>Q Voting Weight:</TextPanelSmallGrey>
        <TextPanelSmallBlack>
          {userVotingWeight}
          Q
        </TextPanelSmallBlack>
        <TextPanelSmallGrey style={{ margin: '0 16px' }}>|</TextPanelSmallGrey>
        <TextPanelSmallGrey>Voting Locking End:</TextPanelSmallGrey>
        <TextPanelSmallBlack style={{ margin: '0 16px 0 8px' }}>
          {userLockingEnd}
          {' '}
        </TextPanelSmallBlack>
        <TextPanelSmallGrey>Voting Status:</TextPanelSmallGrey>
        <TextPanelSmallBlack style={{ marginLeft: '8px' }}>
          <VoterStatus/>
        </TextPanelSmallBlack>
      </TextPanel>
    </CustomBlockPanel>
  );
}
