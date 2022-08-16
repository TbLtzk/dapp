import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import styled from 'styled-components';

import DeFiMembersTable from 'components/Tables/DeFiMembersTable';

import ParametersBlock from '../ParametersBlock';

import { getEPDRParametersKV } from 'store/parameters-addresses/action-creators';
import {
  ePDRParametersKV,
  ePDRParametersKVError,
  ePDRParametersKVLoading
} from 'store/parameters-addresses/selectors';

import { getEpdrParametersInstance } from 'contracts/contract-instance';
import { getContractOwner } from 'contracts/helpers/parameters-helper';

const StyledWrapper = styled.div`
  display: grid;
  gap: 24px;
`;

function QEPDRParameters () {
  const { t } = useTranslation();

  const [ePDRParametersAddress, setEPDRParametersAddress] = useState('0x00');

  const [tokenBridgeAdminProxy, setTokenBridgeAdminProxy] = useState('');

  const loadingEPDRP = useSelector(ePDRParametersKVLoading);
  const errorMessageEPDRP = useSelector(ePDRParametersKVError);
  const kvEPDRP = useSelector(ePDRParametersKV);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getEPDRParametersKV());
    getContractOwner('tokenBridgeAdminProxy').then(setTokenBridgeAdminProxy);

    getEpdrParametersInstance().then((contract) => setEPDRParametersAddress(contract.address));

    return () => {
      setEPDRParametersAddress('0x00');
      setTokenBridgeAdminProxy('');
    };
  }, [dispatch]);

  return (
    <StyledWrapper>
      <ParametersBlock
        title={t('Q_DEFI_RISK_EXPERT_PANEL_PARAMETERS')}
        subtitle={`(${ePDRParametersAddress})`}
        docsId="#q-defi-risk-expert-panel-epdr-parameters"
        parameters={kvEPDRP}
        gnosisSafeAddress={tokenBridgeAdminProxy}
        loading={loadingEPDRP}
        errorMsg={errorMessageEPDRP}
      />

      <DeFiMembersTable />
    </StyledWrapper>
  );
}

export default QEPDRParameters;
