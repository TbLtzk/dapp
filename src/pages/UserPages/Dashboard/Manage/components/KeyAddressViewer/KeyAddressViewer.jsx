import React, { Suspense } from 'react'
import CustomBlock from 'components/Base/CustomBlock'
import LoadingSpinner from 'components/Base/LoadingSpinner'
import KeyAddressesTable from '../KeyAddressesTable'
import {
  LoadingWrap
} from 'components/Custom/MemberTables/styles'

function KeyAddressViewer (props) {
  const {
    tableData,
    loading,
    errorMsg,
    header,
    subHeader,
    tableHeaders = [],
    emptyMsg
  } = props
  return (
    <CustomBlock>
      <h1>{header}</h1>
      <h5>{subHeader}</h5>
      <Suspense fallback={<LoadingWrap><LoadingSpinner/></LoadingWrap>}>
        {loading
          ? <LoadingWrap><LoadingSpinner/></LoadingWrap>
          : errorMsg
            ? <p>{errorMsg}</p>
            : !tableData?.length
                ? <p>{emptyMsg}</p>
                : <KeyAddressesTable
                tableData={tableData}
                tableHeaders={tableHeaders}
              />
        }
      </Suspense>
    </CustomBlock>
  )
}

export default KeyAddressViewer
