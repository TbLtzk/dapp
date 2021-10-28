import React, { Fragment } from 'react'
import { useHistory } from 'react-router-dom'

import CustomBlock from 'components/Base/CustomBlock'
import Button from 'components/Base/Buttons/Button'

function Stats (props) {
  const {
    statsData,
    type
  } = props
  const history = useHistory()

  return (
    <CustomBlock>
      <h1>{type} Stats</h1>
      {statsData?.map((elem) => {
        return (
          <Fragment key={elem.title}>
            <h5>{elem.title}</h5>
            <p title={elem.value}>{elem.value}</p>
          </Fragment>
        )
      })}
      <div className="card__actions">
        <Button
          title="Manage vault"
          type="white"
          handleButton={() => {
            history.push('q-vault')
          }}
        />
      </div>
    </CustomBlock>
  )
}

export default Stats
