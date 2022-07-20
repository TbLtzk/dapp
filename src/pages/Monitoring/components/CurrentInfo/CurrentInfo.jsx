import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import CustomBlock from 'components/Base/CustomBlock/CustomBlock';
import InfoTooltip from 'components/Tooltips/InfoTooltip';

import { rootMembersMonitoringSelector } from 'store/root-node/selectors';
import { inactiveValidatorsSelector, validatorsMonitoringSelector } from 'store/validators/selectors';

import { getNowTimeWithGMT } from 'func/convertDate';
import { fetchBlockNumber } from 'func/useful';

function CurrentInfo () {
  const { t } = useTranslation();

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
        <h1>
          <span>{t('VALIDATORS')}</span>
          <InfoTooltip topic="monitoring-validators" placement="bottom" />
        </h1>
        <h5>{t('INACTIVE_VALIDATORS')}</h5>
        <p>{inactiveValidators}</p>
        <h5>{t('VALIDATORS_IN_RANKING')}</h5>
        <p>{validators.length}</p>
      </CustomBlock>
      <CustomBlock>
        <h1>
          <span>{t('ROOT_NODES')}</span>
          <InfoTooltip topic="monitoring-root-nodes" placement="bottom" />
        </h1>
        <h5>{t('INACTIVE_ROOT_NODES')}</h5>
        <p>0</p>
        <h5>{t('ROOT_NODES_IN_PANEL')}</h5>
        <p>{rootNodes.length}</p>
      </CustomBlock>
      <CustomBlock>
        <h1>
          <span>{t('STATUS')}</span>
          <InfoTooltip topic="monitoring-status" placement="bottom" />
        </h1>
        <h5>{t('CURRENT_BLOCK_HEIGHT')}</h5>
        <p>{blockHeight}</p>
        <h5>{t('CURRENT_TIME')}</h5>
        <p>{time}</p>
      </CustomBlock>
    </div>
  );
}

export default CurrentInfo;
