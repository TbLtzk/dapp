import React, { useCallback } from 'react'

import { useSelector } from 'react-redux'
import { formObject } from 'store/modal-handler/selectors'

function CreateStep2 ({ activeTab, register, errors }) {
  const formData = useSelector(formObject)

  const contentSwitcher = useCallback(() => {
    return (
            <div>
                <h2>Chosen Data:</h2>
                <h5>Type</h5>
                <p>{activeTab.replace('-', ' ')}</p>
                <h5>Bid</h5>
                <p>{formData?.bid}</p>
            </div>
    )
  }, [activeTab, register, errors])

  return <>{contentSwitcher()}</>
}

export default CreateStep2
