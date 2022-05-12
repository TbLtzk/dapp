import React from 'react';
import { useHistory } from 'react-router-dom';

import Button from 'components/Base/Button';
import CustomBlock from 'components/Base/CustomBlock';
import LoadingSpinner from 'components/Base/LoadingSpinner';

function InfoBlock ({ header, activeProposalsNumber, endedProposalsNumber, detailsLink, isLoading }) {
  const history = useHistory();

  return (
    <CustomBlock>
      <h1>{header}</h1>
      {isLoading
        ? (
          <LoadingSpinner />
        )
        : (
          <>
            <h5>Active Proposals</h5>
            <h2>{activeProposalsNumber}</h2>
            <h5>Ended Proposals</h5>
            <p>{endedProposalsNumber}</p>
          </>
        )}
      <div className="card__actions">
        <Button
          alwaysEnabled
          title="View Page"
          onClick={() => history.push(detailsLink)}
        />
      </div>
    </CustomBlock>
  );
}

export default InfoBlock;
