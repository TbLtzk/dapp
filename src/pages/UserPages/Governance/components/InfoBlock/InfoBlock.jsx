import React from 'react'
import CustomBlock from 'components/Base/CustomBlock'
import Button from 'components/Base/Buttons/Button'
import LoadingSpinner from 'components/Base/LoadingSpinner'

import { useHistory } from 'react-router-dom'

function InfoBlock ({ header, activeProposalsNumber, endedProposalsNumber, detailsLink, isLoading }) {
  const history = useHistory()

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
                <Button title="View Page" handleButton={() => history.push(detailsLink)} />
            </div>
        </CustomBlock>
  )
}

export default InfoBlock
