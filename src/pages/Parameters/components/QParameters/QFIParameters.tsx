import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import ParametersBlock from '../ParametersBlock';

import { getFeesIncentivesExpertPanelParametersKV } from 'store/parameters-addresses/action-creators';
import {
  feesIncentivesExpertPanelParametersKV,
  feesIncentivesExpertPanelParametersKVError,
  feesIncentivesExpertPanelParametersKVLoading
} from 'store/parameters-addresses/selectors';

import { getEpqfiParametersInstance } from 'contracts/contract-instance';

function QFIParameters () {
  const { t } = useTranslation();

  const [ePQFIParametersAddress, setEPQFIParametersAddress] = useState('0x00');

  const loadingFI = useSelector(feesIncentivesExpertPanelParametersKVLoading);
  const errorMessageFI = useSelector(feesIncentivesExpertPanelParametersKVError);
  const kvFI = useSelector(feesIncentivesExpertPanelParametersKV);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFeesIncentivesExpertPanelParametersKV());

    getEpqfiParametersInstance().then((contract) => setEPQFIParametersAddress(contract.address));

    return () => {
      setEPQFIParametersAddress('0x00');
    };
  }, [dispatch]);

  return (
    <ParametersBlock
      title={t('Q_FEES_INCENTIVES_EXPERT_PANEL_PARAMETERS')}
      subtitle={`(${ePQFIParametersAddress})`}
      docsId="#q-fees-and-incentives-expert-panel-epqfi-parameters"
      parameters={kvFI}
      loading={loadingFI}
      errorMsg={errorMessageFI}
    />
  );
}

export default QFIParameters;
