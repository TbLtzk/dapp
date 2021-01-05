import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { drizzleReactHooks } from '@drizzle/react-plugin';
import { userAddressMetamask } from 'store/selectors/user-inf';
import { getUserBalance, getLockedAssets } from 'store/actions/action-creaters/q-piggy-bank';
import { userBalance, votingWeight, votingLockingEnd } from 'store/selectors/q-piggy-bank';
import { roundBalance, WeiToQ } from 'func/balance';
import { fromSolDateFormattingT1 } from 'func/date';
import { TextPanelSmallBlack, TextPanelSmallGrey, TextPanel, CustomBlockPanel } from '../styles';

const { useDrizzle } = drizzleReactHooks;

export default function Panel() {
  const userAddressL = useSelector(userAddressMetamask);
  const userPBBalanceL = roundBalance(useSelector(userBalance));
  const userVotingWeight = roundBalance(useSelector(votingWeight));
  const userLockingEnd = fromSolDateFormattingT1(useSelector(votingLockingEnd));

  const dispatch = useDispatch();
  const { drizzle } = useDrizzle();

  const [userBalanceL, setUSerBalanceL] = useState();

  useEffect(() => {
    dispatch(getUserBalance(userAddressL));
    dispatch(getLockedAssets(userAddressL));
  }, []);

  useEffect(() => {
    drizzle.web3.eth.getBalance(userAddressL).then((res) => {
      setUSerBalanceL(roundBalance(WeiToQ(res)));
    });
  });

  return (
    <CustomBlockPanel>
      <TextPanel>
        <span>Piggy Bank balance: </span>
        <span>
          {userPBBalanceL}
          Q
        </span>
      </TextPanel>
      <TextPanel>
        <span>Q address balance: </span>
        <span>
          {userBalanceL}
          Q
        </span>
      </TextPanel>
      <TextPanel type="parentNode">
        <span>Voting Weigh</span>
        <TextPanelSmallGrey style={{ margin: '0 8px 0 16px' }}>PiggyBank Voting Weight:</TextPanelSmallGrey>
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
        <TextPanelSmallBlack style={{ marginLeft: '8px' }}>Root Node</TextPanelSmallBlack>
      </TextPanel>
    </CustomBlockPanel>
  );
}
