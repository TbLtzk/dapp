import React from 'react';

import CustomBlock from 'components/Base/CustomBlock';
import LoadingSpinner from 'components/Base/LoadingSpinner';
import { LoadingWrap } from 'components/Custom/MemberTables/styles';

import { QParametersTextContainer } from '../../styles';
import KeyAddressesTable from '../KeyAddressesTable';

function KeyAddressViewer ({ tableData, loading, errorMsg, header, subHeader, tableHeaders = [], emptyMsg }) {
  return (
    <CustomBlock>
      <h1>{header}</h1>
      <h5>{subHeader}</h5>
      {loading
        ? (
          <LoadingWrap>
            <LoadingSpinner />
          </LoadingWrap>
        )
        : errorMsg
          ? (
            <QParametersTextContainer>{errorMsg}</QParametersTextContainer>
          )
          : !tableData?.length
            ? (
              <QParametersTextContainer>{emptyMsg}</QParametersTextContainer>
            )
            : (
              <KeyAddressesTable tableData={tableData} tableHeaders={tableHeaders} />
            )}
    </CustomBlock>
  );
}

export default KeyAddressViewer;
