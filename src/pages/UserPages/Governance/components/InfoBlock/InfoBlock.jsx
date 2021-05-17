import React from 'react';
import CustomBlock from 'components/Base/CustomBlock';
import Button from 'components/Base/Buttons/Button';
import LoadingSpinner from 'components/Base/LoadingSpinner';

import { useHistory } from 'react-router-dom';

function InfoBlock(props) {
  const {
    header,
    activeProposalsNumber,
    onlyVotableNumber,
    endedProposalsNumber,
    detailsLink,
    isLoading,
    isError
  } = props;

  const history = useHistory();

  return (
    <CustomBlock>
      <h1>{header}</h1>
      {
        isLoading
          ? (<LoadingSpinner/>)
          :
          isError
            ? (<p>There was error while loading</p>)
            : (
              <>
                <h5>Active proposals</h5>
                <h2>{activeProposalsNumber}</h2>
                <h5>Only votable</h5>
                <p>{onlyVotableNumber}</p>
                <h5>Ended proposals</h5>
                <p>{endedProposalsNumber}</p>
              </>
            )
      }
      <div className="card__actions">
        <Button
          title="View page"
          handleButton={() => {
            history.push(detailsLink);
          }}
        />
      </div>
    </CustomBlock>
  );
}

export default InfoBlock;
