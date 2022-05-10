import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Button from 'components/Base/Buttons/Button';
import CustomBlock from 'components/Base/CustomBlock';
import LoadingSpinner from 'components/Base/LoadingSpinner';

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

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeSinceQHolderRewardUpdate(remainDateTimeSince(timeSinceUnixTimestamp));
    }, 60000);
    return () => {
      clearInterval(interval);
    };
  }, [timeSinceUnixTimestamp]);

  const onAllocate = (type) => {
    switch (type) {
      case BTN_TYPES.defaultAllocation:
        handler.getDefaultAllocationProxy(setDefaultAllocationProxy, setLoadingDefaultAllocation, true);
        break;
      case BTN_TYPES.validationRewardAllocation:
        handler.getValidationRewardProxy(setValidationRewardProxy, setLoadingRootNodeReward, true);
        break;
      case BTN_TYPES.rootNodeAllocation:
        handler.getRootNodeRewardProxy(setRootNodeRewardProxy, setLoadingValidationReward, true);
        break;
    }
  };

  const onRefresh = () => {
    dispatch(getUpdateCompoundRate(userAddress));
  };

  const getIsLoading = (type) => {
    switch (type) {
      case BTN_TYPES.defaultAllocation:
        return loadingDefaultAllocation;
      case BTN_TYPES.validationRewardAllocation:
        return loadingRootNodeReward;
      case BTN_TYPES.rootNodeAllocation:
        return loadingValidationReward;
      case BTN_TYPES.timeSinceHolder:
        return isUpdateCompoundRate;
      default:
        return false;
    }
  };

  const tokenimicsInfo = [
    {
      title: 'Default Allocation Proxy',
      content: defaultAllocationProxy + ' Q',
      btnTitle: 'Allocate',
      btnType: BTN_TYPES.defaultAllocation,
      btnIcon: 'cube-outline',
      loadingSpinner: <LoadingSpinner size="sm" className="mr-2" />,
      handleButton: () => onAllocate(BTN_TYPES.defaultAllocation),
    },
    {
      title: 'Validation Reward Proxy',
      content: validationRewardProxy + ' Q',
      btnTitle: 'Allocate',
      btnIcon: 'cube-outline',
      btnType: BTN_TYPES.validationRewardAllocation,
      loadingSpinner: <LoadingSpinner size="sm" className="mr-2" />,
      handleButton: () => onAllocate(BTN_TYPES.validationRewardAllocation),
    },
    {
      title: 'Root Node Reward Proxy',
      content: rootNodeRewardProxy + ' Q',
      btnTitle: 'Allocate',
      btnIcon: 'cube-outline',
      btnType: BTN_TYPES.rootNodeAllocation,
      brakeLine: true,
      loadingSpinner: <LoadingSpinner size="sm" className="mr-2" />,
      handleButton: () => onAllocate(BTN_TYPES.rootNodeAllocation),
    },
    {
      title: 'Q Token Holder Reward Pool',
      content: fN(balanceDetails.qHolderRewardPool) + ' Q',
      btnTitle: null,
    },
    {
      title: 'Q Token Holder Reward Rate (p.a.)',
      content: fN(uintPerSecondToPerYearNumber(balanceDetails.interestRate)) + ' %',
      btnTitle: null,
    },
    {
      title: 'Time since Q Token holder reward update',
      content: timeSinceQHolderRewardUpdate,
      btnIcon: 'cached',
      iconFontSize: '20px',
      btnType: BTN_TYPES.timeSinceHolder,
      brakeLine: true,
      loadingSpinner: <LoadingSpinner size="sm" className="m-1" />,
      handleButton: () => onRefresh(),
    },
    {
      title: 'Q System Reserve',
      content: reserveBalance + ' Q',
      btnTitle: null,
    },
    {
      title: 'Validation Reward Pools',
      content: rewardPoolsBalance + ' Q',
      btnTitle: null,
    },
  ];

  return (
    <CustomBlock>
      <h1>Tokenomics</h1>
      {tokenimicsInfo.map((item) => (
        <Fragment key={item.title.replace(' ', '-')}>
          <div className="card_block">
            <div>
              <h5>{item.title}</h5>
              <p>{item.content}</p>
            </div>
            <div>
              {item?.btnType && (
                <Button
                  disabled={getIsLoading(item?.btnType)}
                  icon={!getIsLoading(item?.btnType) && item.btnIcon}
                  title={
                    getIsLoading(item?.btnType)
                      ? (
                        <>
                          {item.loadingSpinner}
                          {item.btnTitle}
                        </>
                      )
                      : (
                        item.btnTitle
                      )
                  }
                  width="100%"
                  handleButton={item.handleButton}
                  iconFontSize={item.iconFontSize}
                />
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
