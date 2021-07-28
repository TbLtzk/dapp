import React, { useEffect } from 'react'
import KeyAddressViewer from './components/KeyAddressViewer'

import { useDispatch, useSelector } from 'react-redux'
import {
  getContractRegistryKV,
  getConstitutionParametersKV,
  getFeesIncentivesExpertPanelParametersKV,
  getEPDRParametersKV
} from 'store/actions/action-creaters/parameters-addresses'
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
} from 'store/selectors/parameters-addresses'
import { contractsToAddresses } from 'contracts/mapping/contract-to-address'
import Button from 'components/Base/Buttons/Button'
import PageWrap from 'components/Base/PageWrap'
import { Link } from 'react-router-dom'

function Manage () {
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
    dispatch(getContractRegistryKV())
    dispatch(getConstitutionParametersKV())
    dispatch(getFeesIncentivesExpertPanelParametersKV())
    dispatch(getEPDRParametersKV())
  }, [dispatch])

  return (
    <PageWrap
      wrapContentClasses={'wrap-content__tow-colm'}
      headerTitle={'Q parameters'}
      headerExtra={(
        <Link to={'/'}>
          <Button
            type={'white'}
            title={'Dashboard'}
            handleButton={() => {
            }}
          />
        </Link>
      )}
    >
      <div>
        <KeyAddressViewer
          tableData={kvCR}
          loading={loadingCR}
          errorMsg={errorMessageCR}
          subHeader={`(${contractsToAddresses.ContractRegistry})`}
          header={'Q Contract Registry'}
          emptyMsg={'No addresses'}
        />
        <KeyAddressViewer
          tableData={kvFI}
          loading={loadingFI}
          errorMsg={errorMessageFI}
          subHeader={`(${contractsToAddresses.EPQFI_Parameters})`}
          header={'Q Fees & Incentives Expert Panel Parameters'}
          emptyMsg={'No data'}
        />
      </div>
      <div>
        <KeyAddressViewer
          tableData={kvCP}
          loading={loadingCP}
          errorMsg={errorMessageCP}
          subHeader={`(${contractsToAddresses.ConstitutionParameters})`}
          header={'Q Constitution Parameters'}
          emptyMsg={'No data'}
        />
        <KeyAddressViewer
          tableData={kvEPDRP}
          loading={loadingEPDRP}
          errorMsg={errorMessageEPDRP}
          subHeader={`(${contractsToAddresses.EPDR_Parameters})`}
          header={'Q DeFi Risk Expert Panel Parameters'}
          emptyMsg={'No addresses'}
        />
      </div>
    </PageWrap>
  )
}

export default Manage
