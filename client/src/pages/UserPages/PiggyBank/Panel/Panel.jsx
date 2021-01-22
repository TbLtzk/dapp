import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userAddressMetamask } from 'store/selectors/user-inf';
import { getLockedAssets } from 'store/actions/action-creaters/q-piggy-bank';
import { votingWeight, votingLockingEnd } from 'store/selectors/q-piggy-bank';
import { fN } from 'func/useful';
import { fromSolDateFormattingT1 } from 'func/date';
import { useAlert } from 'react-alert';
import { TextPanelSmallBlack, TextPanelSmallGrey, TextPanel, CustomBlockPanel } from '../styles';
import PiggyBankHandler from '../handler';


export default function Panel() {
  const userAddressL = useSelector(userAddressMetamask);
  const userVotingWeight = fN(useSelector(votingWeight));
  const userLockingEnd = fromSolDateFormattingT1(useSelector(votingLockingEnd));

  const [userBalance, setUserBalance] = useState(0);
  const [accountBalance, setAccountBalance] = useState(0);

  const dispatch = useDispatch();
  const address = useSelector(userAddressMetamask);
  const pBHandler = new PiggyBankHandler(address, useDispatch(), useAlert());

  useEffect(() => {
    pBHandler.setUserBalance(setUserBalance);
    pBHandler.setAccountBalance(setAccountBalance);
    dispatch(getLockedAssets(userAddressL));
  }, []);

  return (
    <CustomBlockPanel>
      <TextPanel>
        <span>Piggy Bank balance: </span>
        <span>
          {fN(userBalance)}
          Q
        </span>
      </TextPanel>
      <TextPanel>
        <span>Q address balance: </span>
        <span>
          {fN(accountBalance)}
          Q
        </span>
      </TextPanel>
      <TextPanel type="parentNode">
        <span>Voting Weight</span>
        <TextPanelSmallGrey style={{ margin: '0 8px 0 16px' }}>PiggyBank Voting Weight:</TextPanelSmallGrey>
        <TextPanelSmallBlack>
          {fN(userVotingWeight)}
          Q
        </TextPanelSmallBlack>
        <TextPanelSmallGrey style={{ margin: '0 16px' }}>|</TextPanelSmallGrey>
        <TextPanelSmallGrey>Voting Locking End:</TextPanelSmallGrey>
        <TextPanelSmallBlack style={{ margin: '0 16px 0 8px' }}>
          {userLockingEnd}
          {' '}
        </TextPanelSmallBlack>
        <TextPanelSmallGrey>Voting Status:</TextPanelSmallGrey>
        <TextPanelSmallBlack style={{ marginLeft: '8px' }}>Root Node</TextPanelSmallBlack>
      </TextPanel>
    </CustomBlockPanel>
  );
}
