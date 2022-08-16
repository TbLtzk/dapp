import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import styled from 'styled-components';

import EprsMembersTable from 'components/Tables/EprsMembersTable';

import ParametersBlock from '../ParametersBlock';

import { getEPRSParametersKV } from 'store/parameters-addresses/action-creators';
import {
  ePRSParametersKV,
  ePRSParametersKVError,
  ePRSParametersKVLoading
} from 'store/parameters-addresses/selectors';

import { getEprsParametersInstance } from 'contracts/contract-instance';

const StyledWrapper = styled.div`
  display: grid;
  gap: 24px;
`;

function QEPRSParameters () {
  const { t } = useTranslation();

  const [ePRSParametersAddress, setEPRSParametersAddress] = useState('0x00');

  const loadingEPRS = useSelector(ePRSParametersKVLoading);
  const errorMessageEPRS = useSelector(ePRSParametersKVError);
  const kvEPRS = useSelector(ePRSParametersKV);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getEPRSParametersKV());

    getEprsParametersInstance().then((contract) => setEPRSParametersAddress(contract.address));

    return () => {
      setEPRSParametersAddress('0x00');
    };
  }, [dispatch]);

  return (
    <StyledWrapper>
      <ParametersBlock
        title={t('Q_ROOT_NODE_SELECTION_EXPERT_PANEL_PARAMETERS')}
        subtitle={`(${ePRSParametersAddress})`}
        parameters={kvEPRS}
        loading={loadingEPRS}
        errorMsg={errorMessageEPRS}
      />

      <EprsMembersTable />
    </StyledWrapper>
  );
}

export default QEPRSParameters;
