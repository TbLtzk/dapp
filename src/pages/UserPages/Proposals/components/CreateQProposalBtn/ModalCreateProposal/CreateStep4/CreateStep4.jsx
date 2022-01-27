import React, { useCallback, useEffect, useState, Fragment } from 'react'

import { useSelector } from 'react-redux'
import { formObject, newParameterSelector } from 'store/voting/proposals/selectors'
import { PROPOSALS_TYPES } from 'constants/statuses'
import { getTypeName } from 'func/contractHelpers'
import { transformToParams } from 'contracts/helpers/parameters-helper'
import { warning } from '../CreateStep3/constants'

function CreateStep4 ({ activeTab }) {
  const formData = useSelector(formObject)
  const newParameter = useSelector(newParameterSelector)

  const [params, setParams] = useState([
    {
      type: '',
      key: '',
      value: ''
    }
  ])

  useEffect(() => {
    if (formData['parameter-type']?.length) {
      setParams(transformToParams(formData))
    }
  }, [])

  const contentSwitcher = useCallback(() => {
    switch (activeTab) {
      case PROPOSALS_TYPES.proposals:
        if (formData['change-constitution-parameter'] === 'yes') {
          return (
                        <div>
                            <h2>Chosen data</h2>
                            <h5>Type</h5>
                            <p>{formData?.first?.replace(/-/g, ' ')}</p>
                            <h5>Classification</h5>
                            <p>{formData?.classification?.replace(/-/g, ' ')}</p>
                            <h5>External Link</h5>
                            <p>{formData['external-link']}</p>
                            <h5>Hash</h5>
                            <p>{formData.hash}</p>
                            <h5>Change Constitution Parameter</h5>
                            <p>{formData['change-constitution-parameter']}</p>
                            <p style={{ color: '#FF8550' }}>{newParameter ? warning : null}</p>
                            {params.map((item, index) => (
                                <Fragment key={index + 'param'}>
                                    <h4>Parameter #{index + 1}</h4>
                                    <div className="modal__three-colm">
                                        <div>
                                            <h5>Type</h5>
                                            <p title={getTypeName(item.type)}>{getTypeName(item.type)}</p>
                                        </div>
                                        <div>
                                            <h5>Key</h5>
                                            <p title={item.key}>{item.key}</p>
                                        </div>
                                        <div>
                                            <h5>Value</h5>
                                            <p title={item.value}>{item.value}</p>
                                        </div>
                                    </div>
                                </Fragment>
                            ))}
                        </div>
          )
        }
        break
      default:
        return null
    }
  }, [activeTab, params])

  return <>{contentSwitcher()}</>
}

export default CreateStep4
