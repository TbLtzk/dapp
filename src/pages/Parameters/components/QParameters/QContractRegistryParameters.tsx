import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import ParametersBlock from '../ParametersBlock';

import { useParameters } from 'store/parameters/hooks';

import { contractRegistryInstance } from 'contracts/contract-instance';
import { getContractOwner } from 'contracts/helpers/parameters-helper';

function QContractRegistryParameters () {
  const { t } = useTranslation();
  const {
    contractRegistry,
    contractRegistryLoading,
    contractRegistryError,
    getContractRegistry
  } = useParameters();

  const [upgradeVoting, setUpgradeVoting] = useState('');

  useEffect(() => {
    getContractRegistry();
    getContractOwner('upgradeVoting').then(setUpgradeVoting);
    return () => setUpgradeVoting('');
  }, []);

  return (
    <ParametersBlock
      title={t('Q_CONTRACT_REGISTRY')}
      subtitle={`(${contractRegistryInstance?.address ?? '0x00'})`}
      parameters={contractRegistry}
      gnosisSafeAddress={upgradeVoting}
      loading={contractRegistryLoading}
      errorMsg={contractRegistryError}
      emptyMsg={t('Q_CONTRACT_REGISTRY_EMPTY_MSG')}
    />
  );
}

export default QContractRegistryParameters;
