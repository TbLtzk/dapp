import React, { useEffect } from 'react';
import KeyAddressViewer from './components/KeyAddressViewer';

import { Row, Col } from 'react-bootstrap';
import { WrapTab } from '../Dashboard/styles';
import { useDispatch, useSelector } from 'react-redux';
import {
  getContractRegistryKV,
  getConstitutionParametersKV,
  getFeesIncentivesExpertPanelParametersKV,
  getEPDRParametersKV
} from 'store/actions/action-creaters/parameters-addresses';
import {
  contractRegistryKV,
  contractRegistryKVLoading,
  contractRegistryKVError,

  constitutionParametersKVLoading,
  constitutionParametersKVError,
  constitutionParametersKV,

  feesIncentivesExpertPanelParametersKV,
  feesIncentivesExpertPanelParametersKVLoading,
  feesIncentivesExpertPanelParametersKVError,

  ePDRParametersKV,
  ePDRParametersKVLoading,
  ePDRParametersKVError
} from 'store/selectors/parameters-addresses';
import { contractsToAddresses } from 'contracts/mapping/contract-to-address';

function Manage() {
  const loadingCR = useSelector(contractRegistryKVLoading);
  const errorMessageCR = useSelector(contractRegistryKVError);
  const kvCR = useSelector(contractRegistryKV);

  const loadingCP = useSelector(constitutionParametersKVLoading);
  const errorMessageCP = useSelector(constitutionParametersKVError);
  const kvCP = useSelector(constitutionParametersKV);

  const loadingFI = useSelector(feesIncentivesExpertPanelParametersKVLoading);
  const errorMessageFI = useSelector(feesIncentivesExpertPanelParametersKVError);
  const kvFI = useSelector(feesIncentivesExpertPanelParametersKV);

  const loadingEPDRP = useSelector(ePDRParametersKVLoading);
  const errorMessageEPDRP = useSelector(ePDRParametersKVError);
  const kvEPDRP = useSelector(ePDRParametersKV);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getContractRegistryKV());
    dispatch(getConstitutionParametersKV());
    dispatch(getFeesIncentivesExpertPanelParametersKV());
    dispatch(getEPDRParametersKV());
  }, [dispatch]);

  return (
    <WrapTab>
      <Col md={6}>
        <Row>
          <Col md={12}>
            <KeyAddressViewer
              tableData={kvCR}
              loading={loadingCR}
              errorMessage={errorMessageCR}
              subHeader={`(${contractsToAddresses.ContractRegistry})`}
              header={'Q Contract Registry'}
              emptyMsg={'No addresses'}
            />
          </Col>
        </Row>
        <Row>
          <Col md={12} style={{ marginTop: '20px' }}>
            <KeyAddressViewer
              tableData={kvFI}
              loading={loadingFI}
              errorMessage={errorMessageFI}
              subHeader={`(${contractsToAddresses.EPQFI_Parameters})`}
              header={'Q Fees & Incentives Expert Panel Parameters'}
              emptyMsg={'No data'}
            />
          </Col>
        </Row>
      </Col>
      <Col md={6}>
        <Row>
          <Col md={12}>
            <KeyAddressViewer
              tableData={kvCP}
              loading={loadingCP}
              errorMessage={errorMessageCP}
              subHeader={`(${contractsToAddresses.ConstitutionParameters})`}
              header={'Q Constitution Parameters'}
              emptyMsg={'No data'}
            />
          </Col>
        </Row>
        <Row>
          <Col md={12} style={{ marginTop: '20px' }}>
            <KeyAddressViewer
              tableData={kvEPDRP}
              loading={loadingEPDRP}
              errorMessage={errorMessageEPDRP}
              subHeader={`(${contractsToAddresses.EPDR_Parameters})`}
              header={'Q DeFi Risk Expert Panel Parameters'}
              emptyMsg={'No addresses'}
            />
          </Col>
        </Row>
      </Col>
    </WrapTab>
  );
}

export default Manage;

