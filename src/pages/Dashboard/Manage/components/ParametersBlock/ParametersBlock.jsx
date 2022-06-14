import React from 'react';

import CustomBlock from 'components/Base/CustomBlock';
import LoadingSpinner from 'components/Base/LoadingSpinner';
import { LoadingWrap } from 'components/Custom/MemberTables/styles';

import ParametersTable from '../ParametersTable';

import { BlockParagraph } from './styles';

function ParametersBlock ({
  title,
  subtitle,
  parameters = [],
  loading = false,
  errorMsg = '',
  emptyMsg = 'No parameters',
}) {
  const renderTable = () => {
    if (loading && !parameters.length) {
      return (
        <LoadingWrap>
          <LoadingSpinner />
        </LoadingWrap>
      );
    }

    return errorMsg || !parameters.length
      ? <BlockParagraph>{errorMsg || emptyMsg}</BlockParagraph>
      : <ParametersTable parameters={parameters} />;
  };

  return (
    <CustomBlock>
      <h1>{title}</h1>
      <h5>{subtitle}</h5>
      {renderTable()}
    </CustomBlock>
  );
}

export default ParametersBlock;
