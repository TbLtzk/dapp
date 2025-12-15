import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import ParametersBlock from '../ParametersBlock';

import { useConstitution } from 'store/constitution/hooks';

import { getConstitutionInstance } from 'contracts/contract-instance';

function QConstitutionParameters () {
  const { t } = useTranslation();
  const {
    constitutionParams,
    isLoadingConstitution,
    constitutionError,
    getConstitutionParameters
  } = useConstitution();

  const [constitutionParametersAddress, setConstitutionParametersAddress] = useState('0x00');

  useEffect(() => {
    getConstitutionParameters();
    getConstitutionInstance().then((contract) => setConstitutionParametersAddress(contract.address));

    return () => {
      setConstitutionParametersAddress('0x00');
    };
  }, []);

  return (
    <ParametersBlock
      title={t('QGOV_CONSTITUTION_PARAMETERS')}
      subtitle={`(${constitutionParametersAddress})`}
      docsId="#q-constitution-parameters"
      parameters={constitutionParams}
      loading={isLoadingConstitution}
      errorMsg={constitutionError}
    />
  );
}

export default QConstitutionParameters;
