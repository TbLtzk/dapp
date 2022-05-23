import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Button from 'components/Base/Button';
import CustomBlock from 'components/Base/CustomBlock';
import LoadingSpinner from 'components/Base/LoadingSpinner';
import InfoTooltip from 'components/Custom/InfoTooltip';

import useInterval from 'hooks/useInterval';

import Handler from './handler';

import { getQVBalance, getUpdateCompoundRate } from 'store/q-vault/action-creators';
import { qvBalance, updateCompoundRate } from 'store/q-vault/selectors';
import { getSystemReserveBalance } from 'store/system-reserve/action-creators';
import { reserveBalanceSelector } from 'store/system-reserve/selectors';
import { setTransactionLoadingError } from 'store/transaction-handler/action-creators';
import { userAddressMetamask } from 'store/user-inf/selectors';
import { getRewardPoolsBalance } from 'store/validation-reward-pools/action-creators';
import { rewardPoolsBalanceSelector } from 'store/validation-reward-pools/selectors';

import { remainDateTimeSince } from 'func/convertDate';
import { fN, uintPerSecondToPerYearNumber } from 'func/useful';

const BTN_TYPES = {
  defaultAllocation: 'default-allocation',
  validationRewardAllocation: 'validation-reward-allocation',
  rootNodeAllocation: 'root-node-allocation',
  timeSinceHolder: 'time-since-q-holder',
};

function TokenomicsBlock () {
  const dispatch = useDispatch();
  const userAddress = useSelector(userAddressMetamask);
  const isUpdateCompoundRate = useSelector(updateCompoundRate);
  const balanceDetails = useSelector(qvBalance);
  const reserveBalance = useSelector(reserveBalanceSelector);
  const rewardPoolsBalance = useSelector(rewardPoolsBalanceSelector);

  const [defaultAllocationProxy, setDefaultAllocationProxy] = useState('...');
  const [loadingDefaultAllocation, setLoadingDefaultAllocation] = useState(false);

  const [rootNodeRewardProxy, setRootNodeRewardProxy] = useState('...');
  const [loadingRootNodeReward, setLoadingRootNodeReward] = useState(false);

  const [validationRewardProxy, setValidationRewardProxy] = useState('...');
  const [loadingValidationReward, setLoadingValidationReward] = useState(false);

  const [timeSinceQHolderRewardUpdate, setTimeSinceQHolderRewardUpdate] = useState('...');
  const [timeSinceUnixTimestamp, setTimeSinceUnixTimestamp] = useState('...');

  const handler = new Handler(userAddress, dispatch, setTransactionLoadingError);

  useEffect(() => {
    dispatch(getQVBalance());
    handler.getValidationRewardProxy(setValidationRewardProxy, () => {}, false);
    handler.getRootNodeRewardProxy(setRootNodeRewardProxy, () => {}, false);
  }, [defaultAllocationProxy]);

  useEffect(() => {
    if (!isUpdateCompoundRate) {
      handler.getTimeSinceQHolderRewardUpdate(setTimeSinceQHolderRewardUpdate, setTimeSinceUnixTimestamp);
    }
  }, [isUpdateCompoundRate]);

  useEffect(() => {
    dispatch(getQVBalance());
    dispatch(getSystemReserveBalance());
    dispatch(getRewardPoolsBalance());
    handler.getTimeSinceQHolderRewardUpdate(setTimeSinceQHolderRewardUpdate, setTimeSinceUnixTimestamp);
    handler.getDefaultAllocationProxy(setDefaultAllocationProxy, () => {}, false);
    handler.getRootNodeRewardProxy(setRootNodeRewardProxy, () => {}, false);
    handler.getValidationRewardProxy(setValidationRewardProxy, () => {}, false);
  }, []);

  useInterval(() => {
    setTimeSinceQHolderRewardUpdate(remainDateTimeSince(timeSinceUnixTimestamp));
  }, 60000);

  const tokenimicsInfo = [
    {
      id: 'default-allocation',
      title: 'Default Allocation Proxy',
      content: defaultAllocationProxy + ' Q',
      btnTitle: 'Allocate',
      btnType: BTN_TYPES.defaultAllocation,
      btnIcon: 'cube-outline',
      loading: loadingDefaultAllocation,
      loadingSpinner: <LoadingSpinner
        size="sm"
        className="mr-2"
        type="light"
      />,
      handleClick: () =>
        handler.getDefaultAllocationProxy(setDefaultAllocationProxy, setLoadingDefaultAllocation, true),
    },
    {
      id: 'validation-proxy',
      title: 'Validation Reward Proxy',
      content: validationRewardProxy + ' Q',
      btnTitle: 'Allocate',
      btnIcon: 'cube-outline',
      loading: loadingValidationReward,
      btnType: BTN_TYPES.validationRewardAllocation,
      loadingSpinner: <LoadingSpinner
        size="sm"
        className="mr-2"
        type="light"
      />,
      handleClick: () => handler.getValidationRewardProxy(setValidationRewardProxy, setLoadingValidationReward, true),
    },
    {
      id: 'root-proxy',
      title: 'Root Node Reward Proxy',
      content: rootNodeRewardProxy + ' Q',
      btnTitle: 'Allocate',
      btnIcon: 'cube-outline',
      btnType: BTN_TYPES.rootNodeAllocation,
      brakeLine: true,
      loading: loadingRootNodeReward,
      loadingSpinner: <LoadingSpinner
        size="sm"
        className="mr-2"
        type="light"
      />,
      handleClick: () => handler.getRootNodeRewardProxy(setRootNodeRewardProxy, setLoadingRootNodeReward, true),
    },
    {
      id: 'reward-pool',
      title: 'Q Token Holder Reward Pool',
      content: fN(balanceDetails.qHolderRewardPool) + ' Q',
      btnTitle: null,
    },
    {
      id: 'reward-rate',
      title: 'Q Token Holder Reward Rate (p.a.)',
      content: fN(uintPerSecondToPerYearNumber(balanceDetails.interestRate)) + ' %',
      btnTitle: null,
    },
    {
      id: 'reward-update',
      title: 'Time since Q Token holder reward update',
      content: timeSinceQHolderRewardUpdate || '0 day(s) 0 hours 0 minutes',
      btnIcon: 'cached',
      iconFontSize: '20px',
      btnType: BTN_TYPES.timeSinceHolder,
      brakeLine: true,
      loading: isUpdateCompoundRate,
      loadingSpinner: <LoadingSpinner
        size="sm"
        className="m-1"
        type="light"
      />,
      handleClick: () => dispatch(getUpdateCompoundRate(userAddress)),
    },
    {
      id: 'system-reserve',
      title: 'Q System Reserve',
      content: reserveBalance + ' Q',
      btnTitle: null,
    },
    {
      id: 'reward-pools',

      title: 'Validation Reward Pools',
      content: rewardPoolsBalance + ' Q',
      btnTitle: null,
    },
  ];

  return (
    <CustomBlock>
      <h1>
        <span>Tokenomics</span>
        <InfoTooltip topic="tokenomics" />
      </h1>
      {tokenimicsInfo.map((item) => (
        <Fragment key={item.id}>
          <div className="card_block">
            <div>
              <h5>{item.title}</h5>
              <p>{item.content}</p>
            </div>
            <div>
              {item?.btnType && (
                <Button
                  disabled={item.loading}
                  style={{ width: '100%' }}
                  onClick={item.handleClick}
                >
                  {item.loading
                    ? item.loadingSpinner
                    : (
                      <i
                        className={`mdi mdi-${item.btnIcon}`}
                        style={{ fontSize: item.iconFontSize }}
                      />
                    )
                  }
                  {item.btnTitle && <span>{item.btnTitle}</span>}
                </Button>
              )}
            </div>
          </div>
          {item.brakeLine ? <div style={{ margin: '10px 0px 20px 0px' }} className="card__line" /> : null}
        </Fragment>
      ))}
    </CustomBlock>
  );
}

export default TokenomicsBlock;
