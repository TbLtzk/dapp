import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import ParametersBlock from '../ParametersBlock';

import { getContractRegistryKV } from 'store/parameters-addresses/action-creators';
import {
  contractRegistryKV,
  contractRegistryKVError,
  contractRegistryKVLoading
} from 'store/parameters-addresses/selectors';

import { contractRegistryInstance } from 'contracts/contract-instance';
import { getContractOwner } from 'contracts/helpers/parameters-helper';

function QContractRegistryParameters () {
  const { t } = useTranslation();

  const [upgradeVoting, setUpgradeVoting] = useState('');

  const loadingCR = useSelector(contractRegistryKVLoading);
  const errorMessageCR = useSelector(contractRegistryKVError);
  const kvCR = useSelector(contractRegistryKV);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getContractRegistryKV());
    getContractOwner('upgradeVoting').then(setUpgradeVoting);

    return () => {
      setUpgradeVoting('');
    };
  }, [dispatch]);

  return (
    <ParametersBlock
      title={t('Q_CONTRACT_REGISTRY')}
      subtitle={`(${contractRegistryInstance?.address ?? '0x00'})`}
      parameters={kvCR}
      gnosisSafeAddress={upgradeVoting}
      loading={loadingCR}
      errorMsg={errorMessageCR}
      emptyMsg={t('Q_CONTRACT_REGISTRY_EMPTY_MSG')}
    />
  );
}

export default QContractRegistryParameters;
