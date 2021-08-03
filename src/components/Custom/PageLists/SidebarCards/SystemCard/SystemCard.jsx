import React, { useCallback } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { loadingPerformNetting } from 'store/selectors/system-balance'
import { onPerformNetting } from 'store/actions/action-creaters/system-balance'

import CustomBlock from 'components/Base/CustomBlock'
import Button from 'components/Base/Buttons/Button'
import LoadingSpinner from 'components/Base/LoadingSpinner'

function SystemCard (props) {
  const {
    data,
    title
  } = props

  const dispatch = useDispatch()
  const loadingPerfNetting = useSelector(loadingPerformNetting)

  const onHandlePerformNetting = useCallback(() => {
    dispatch(onPerformNetting())
  }, [])

  return (
    <CustomBlock>
      <h1>{title}</h1>
      {data?.map((elem) => {
        return (
          <div key={elem.title}>
            <h5>{elem.title}</h5>
            <p>{elem.value}</p>
          </div>
        )
      })}
      {title === 'QUSD System Balance'
        ? <div className="card__actions">
          <Button
            title={!loadingPerfNetting ? 'Perform Netting' : <LoadingSpinner/>}
            type="white"
            handleButton={onHandlePerformNetting}
          />
        </div>
        : null
      }
    </CustomBlock>
  )
}

export default SystemCard
