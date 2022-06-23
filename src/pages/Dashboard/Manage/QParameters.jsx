import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ParametersBlock from './components/ParametersBlock';
import { ParametersWrapper } from './styles';

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
import { getContractOwner } from 'contracts/helpers/parameters-helper';

function QParameters () {
  const [contractRegistryAddress, setContractRegistryAddress] = useState('0x00');
  const [constitutionParametersAddress, setConstitutionParametersAddress] = useState('0x00');
  const [ePDRParametersAddress, setEPDRParametersAddress] = useState('0x00');
  const [ePQFIParametersAddress, setEPQFIParametersAddress] = useState('0x00');
  const [ePRSParametersAddress, setEPRSParametersAddress] = useState('0x00');

  const [safesMap, setSafesMap] = useState({
    upgradeVoting: '',
    tokenBridgeAdminProxy: ''
  });

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
    loadGnosisSafes();

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

  const loadGnosisSafes = async () => {
    const [upgradeSafe, tokenBridgeSafe] = await Promise.all([
      getContractOwner('upgradeVoting'),
      getContractOwner('tokenBridgeAdminProxy')
    ]);

    setSafesMap({
      upgradeVoting: upgradeSafe,
      tokenBridgeAdminProxy: tokenBridgeSafe
    });
  };

  return (
    <ParametersWrapper>
      <div>
        <ParametersBlock
          title="Q Contract Registry"
          subtitle={`(${contractRegistryAddress})`}
          parameters={kvCR}
          gnosisSafeAddress={safesMap.upgradeVoting}
          loading={loadingCR}
          errorMsg={errorMessageCR}
          emptyMsg="No addresses"
        />
        <ParametersBlock
          title="Q Fees & Incentives Expert Panel Parameters"
          subtitle={`(${ePQFIParametersAddress})`}
          docsId="#q-fees-and-incentives-expert-panel-epqfi-parameters"
          parameters={kvFI}
          loading={loadingFI}
          errorMsg={errorMessageFI}
        />
        <ParametersBlock
          title="Q DeFi Risk Expert Panel Parameters"
          subtitle={`(${ePDRParametersAddress})`}
          docsId="#q-defi-risk-expert-panel-epdr-parameters"
          parameters={kvEPDRP}
          gnosisSafeAddress={safesMap.tokenBridgeAdminProxy}
          loading={loadingEPDRP}
          errorMsg={errorMessageEPDRP}
        />
      </div>
      <div>
        <ParametersBlock
          title="Q Constitution Parameters"
          subtitle={`(${constitutionParametersAddress})`}
          docsId="#q-constitution-parameters"
          parameters={kvCP}
          loading={loadingCP}
          errorMsg={errorMessageCP}
        />
        <ParametersBlock
          title="Q Root Node Selection Expert Panel Parameters"
          subtitle={`(${ePRSParametersAddress})`}
          parameters={kvEPRS}
          loading={loadingEPRS}
          errorMsg={errorMessageEPRS}
        />
      </div>
    </ParametersWrapper>
  );
}

export default QParameters;
