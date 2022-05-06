import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import KeyAddressViewer from './components/KeyAddressViewer';
import { QParametersWrapper } from './styles';

import {
  getConstitutionParametersKV,
  getContractRegistryKV,
  getEPDRParametersKV,
  getEPRSParametersKV,
  getFeesIncentivesExpertPanelParametersKV
} from 'store/parameters-addresses/action-creators';
import {
  constitutionParametersKV,
  constitutionParametersKVError,
  constitutionParametersKVLoading,
  contractRegistryKV,
  contractRegistryKVError,
  contractRegistryKVLoading,
  ePDRParametersKV,
  ePDRParametersKVError,
  ePDRParametersKVLoading,
  ePRSParametersKV,
  ePRSParametersKVError,
  ePRSParametersKVLoading,
  feesIncentivesExpertPanelParametersKV,
  feesIncentivesExpertPanelParametersKVError,
  feesIncentivesExpertPanelParametersKVLoading
} from 'store/parameters-addresses/selectors';

import {
  contractRegistryInstance,
  getConstitutionInstance,
  getEpdrParametersInstance,
  getEpqfiParametersInstance,
  getEprsParametersInstance
} from 'contracts/contract-instance';

function QParameters () {
  const [contractRegistryAddress, setContractRegistryAddress] = useState('0x00');
  const [constitutionParametersAddress, setConstitutionParametersAddress] = useState('0x00');
  const [ePDRParametersAddress, setEPDRParametersAddress] = useState('0x00');
  const [ePQFIParametersAddress, setEPQFIParametersAddress] = useState('0x00');
  const [ePRSParametersAddress, setEPRSParametersAddress] = useState('0x00');

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

  const loadingEPRS = useSelector(ePRSParametersKVLoading);
  const errorMessageEPRS = useSelector(ePRSParametersKVError);
  const kvEPRS = useSelector(ePRSParametersKV);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getContractRegistryKV());
    dispatch(getConstitutionParametersKV());
    dispatch(getFeesIncentivesExpertPanelParametersKV());
    dispatch(getEPDRParametersKV());
    dispatch(getEPRSParametersKV());

    setContractRegistryAddress(contractRegistryInstance.address);
    getConstitutionInstance().then((contract) => setConstitutionParametersAddress(contract.address));
    getEpdrParametersInstance().then((contract) => setEPDRParametersAddress(contract.address));
    getEpqfiParametersInstance().then((contract) => setEPQFIParametersAddress(contract.address));
    getEprsParametersInstance().then((contract) => setEPRSParametersAddress(contract.address));

    return () => {
      setContractRegistryAddress('0x00');
      setConstitutionParametersAddress('0x00');
      setEPDRParametersAddress('0x00');
      setEPQFIParametersAddress('0x00');
      setEPRSParametersAddress('0x00');
    };
  }, [dispatch]);

  return (
    <QParametersWrapper>
      <div>
        <KeyAddressViewer
          tableData={kvCR}
          loading={loadingCR}
          errorMsg={errorMessageCR}
          subHeader={`(${contractRegistryAddress})`}
          header="Q Contract Registry"
          emptyMsg="No addresses"
        />
        <KeyAddressViewer
          tableData={kvFI}
          loading={loadingFI}
          errorMsg={errorMessageFI}
          subHeader={`(${ePQFIParametersAddress})`}
          header="Q Fees & Incentives Expert Panel Parameters"
          emptyMsg="No parameters"
        />

        <KeyAddressViewer
          tableData={kvEPDRP}
          loading={loadingEPDRP}
          errorMsg={errorMessageEPDRP}
          subHeader={`(${ePDRParametersAddress})`}
          header="Q DeFi Risk Expert Panel Parameters"
          emptyMsg="No parameters"
        />
      </div>
      <div>
        <KeyAddressViewer
          tableData={kvCP}
          loading={loadingCP}
          errorMsg={errorMessageCP}
          subHeader={`(${constitutionParametersAddress})`}
          header="Q Constitution Parameters"
          emptyMsg="No parameters"
        />

        <KeyAddressViewer
          tableData={kvEPRS}
          loading={loadingEPRS}
          errorMsg={errorMessageEPRS}
          subHeader={`(${ePRSParametersAddress})`}
          header="Q Root Node Selection Expert Panel Parameters"
          emptyMsg="No parameters"
        />
      </div>
    </QParametersWrapper>
  );
}

export default QParameters;
