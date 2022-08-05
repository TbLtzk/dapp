import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import ParametersBlock from '../ParametersBlock';

import { getConstitutionParametersKV } from 'store/parameters-addresses/action-creators';
import {
  constitutionParametersKV,
  constitutionParametersKVError,
  constitutionParametersKVLoading
} from 'store/parameters-addresses/selectors';

import { getConstitutionInstance } from 'contracts/contract-instance';

function QConstitutionParameters () {
  const { t } = useTranslation();

  const [constitutionParametersAddress, setConstitutionParametersAddress] = useState('0x00');

  const loadingCP = useSelector(constitutionParametersKVLoading);
  const errorMessageCP = useSelector(constitutionParametersKVError);
  const kvCP = useSelector(constitutionParametersKV);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getConstitutionParametersKV());

    getConstitutionInstance().then((contract) => setConstitutionParametersAddress(contract.address));

    return () => {
      setConstitutionParametersAddress('0x00');
    };
  }, [dispatch]);

  return (
    <ParametersBlock
      title={t('Q_CONSTITUTION_PARAMETERS')}
      subtitle={`(${constitutionParametersAddress})`}
      docsId="#q-constitution-parameters"
      parameters={kvCP}
      loading={loadingCP}
      errorMsg={errorMessageCP}
    />
  );
}

export default QConstitutionParameters;
