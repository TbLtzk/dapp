import React, { useEffect, useState } from 'react'
import KeyAddressViewer from '../KeyAddressViewer'

import { useDispatch, useSelector } from 'react-redux'
import {
  getContractRegistryKV,
  getConstitutionParametersKV,
  getFeesIncentivesExpertPanelParametersKV,
  getEPDRParametersKV
} from 'store/parameters-addresses/action-creators'
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
} from 'store/parameters-addresses/selectors'
import {
  getConstitutionInstance,
  getContractRegistryInstance,
  getEpdrParametersInstance,
  getEpqfiParametersInstance
} from 'contracts/contract-instance'

function QParameters () {
  const [contractRegistryAddress, setContractRegistryAddress] = useState('0x00')
  const [constitutionParametersAddress, setConstitutionParametersAddress] = useState('0x00')
  const [ePDRParametersAddress, setEPDRParametersAddress] = useState('0x00')
  const [ePQFIParametersAddress, setEPQFIParametersAddress] = useState('0x00')

  const loadingCR = useSelector(contractRegistryKVLoading)
  const errorMessageCR = useSelector(contractRegistryKVError)
  const kvCR = useSelector(contractRegistryKV)

  const loadingCP = useSelector(constitutionParametersKVLoading)
  const errorMessageCP = useSelector(constitutionParametersKVError)
  const kvCP = useSelector(constitutionParametersKV)

  const loadingFI = useSelector(feesIncentivesExpertPanelParametersKVLoading)
  const errorMessageFI = useSelector(feesIncentivesExpertPanelParametersKVError)
  const kvFI = useSelector(feesIncentivesExpertPanelParametersKV)

  const loadingEPDRP = useSelector(ePDRParametersKVLoading)
  const errorMessageEPDRP = useSelector(ePDRParametersKVError)
  const kvEPDRP = useSelector(ePDRParametersKV)

  const dispatch = useDispatch()

  useEffect(() => {
    getAddresses()
    return () => {
      setContractRegistryAddress('0x00')
      setConstitutionParametersAddress('0x00')
      setEPDRParametersAddress('0x00')
      setEPQFIParametersAddress('0x00')
    }
  }, [])

  async function getAddresses () {
    const contractRegistryInstance = await getContractRegistryInstance()
    const constitutionParameters = await getConstitutionInstance()
    const epdrParametersInstance = await getEpdrParametersInstance()
    const epqfiParametersInstance = await getEpqfiParametersInstance()
    setConstitutionParametersAddress(contractRegistryInstance.address)
    setContractRegistryAddress(constitutionParameters.address)
    setEPDRParametersAddress(epdrParametersInstance.address)
    setEPQFIParametersAddress(epqfiParametersInstance.address)
  }

  useEffect(() => {
    dispatch(getContractRegistryKV())
    dispatch(getConstitutionParametersKV())
    dispatch(getFeesIncentivesExpertPanelParametersKV())
    dispatch(getEPDRParametersKV())
  }, [dispatch])

  return (
        <>
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
                    emptyMsg="No data"
                />

                <KeyAddressViewer
                    tableData={kvEPDRP}
                    loading={loadingEPDRP}
                    errorMsg={errorMessageEPDRP}
                    subHeader={`(${ePDRParametersAddress})`}
                    header="Q DeFi Risk Expert Panel Parameters"
                    emptyMsg="No addresses"
                />
            </div>
            <div>
                <KeyAddressViewer
                    tableData={kvCP}
                    loading={loadingCP}
                    errorMsg={errorMessageCP}
                    subHeader={`(${constitutionParametersAddress})`}
                    header="Q Constitution Parameters"
                    emptyMsg="No data"
                />
            </div>
        </>
  )
}

export default QParameters
