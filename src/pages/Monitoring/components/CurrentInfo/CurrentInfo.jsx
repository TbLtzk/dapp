import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import CustomBlock from 'components/Base/CustomBlock/CustomBlock';

import { rootMembersMonitoringSelector } from 'store/root-node/selectors';
import { inactiveValidatorsSelector, validatorsMonitoringSelector } from 'store/validators/selectors';

import { getNowTimeWithGMT } from 'func/convertDate';
import { fetchBlockNumber } from 'func/useful';

function CurrentInfo () {
  const [blockHeight, setBlockHeight] = useState('...');
  const [time, setTime] = useState(getNowTimeWithGMT('DD.MM.YYYY HH:mm:ss'));

  const rootNodes = useSelector(rootMembersMonitoringSelector);
  const validators = useSelector(validatorsMonitoringSelector);

  const inactiveValidators = useSelector(inactiveValidatorsSelector);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(getNowTimeWithGMT('DD.MM.YYYY HH:mm:ss'));
    }, 1000);
    return () => clearInterval(timer);
  }, [time]);

  useEffect(() => {
    fetchBlockNumber('latest').then((blockNumber) => setBlockHeight(blockNumber));
    const subscription = window?.web3?.eth.subscribe('newBlockHeaders', (_, result) => setBlockHeight(result?.number));
    return () => {
      subscription?.unsubscribe();
      setBlockHeight('...');
    };
  }, []);

  return (
    <div className="content__colm-3">
      <CustomBlock>
        <h1>Validators</h1>
        <h5>Inactive Validators</h5>
        <p>{inactiveValidators}</p>
        <h5>Validators in Ranking</h5>
        <p>{validators.length}</p>
      </CustomBlock>
      <CustomBlock>
        <h1>Root Nodes</h1>
        <h5>Inactive Root Nodes</h5>
        <p>0</p>
        <h5>Root Nodes in Panel</h5>
        <p>{rootNodes.length}</p>
      </CustomBlock>
      <CustomBlock>
        <h1>Status</h1>
        <h5>Current Block Height</h5>
        <p>{blockHeight}</p>
        <h5>Current Time</h5>
        <p>{time}</p>
      </CustomBlock>
    </div>
  );
}

export default CurrentInfo;
