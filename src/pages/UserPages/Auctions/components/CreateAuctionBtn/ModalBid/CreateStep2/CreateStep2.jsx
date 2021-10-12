import React, { useCallback } from 'react'

import { useSelector } from 'react-redux'
import { formObject } from 'store/selectors/auctions/modalHandler'

function CreateStep2 (props) {
  const {
    activeTab,
    register,
    errors
  } = props
  const formData = useSelector(formObject)

  const contentSwitcher = useCallback(() => {
    return (
      <div>
        <h2>Chosen Data:</h2>
        <h5>Type</h5>
        <p>{formData?.first?.replace(/-/g, ' ')}</p>
        <h5>Bid</h5>
        <p>{formData?.bid}</p>
      </div>
    )
  }, [activeTab, register, errors])

  return (
    <>
      {contentSwitcher()}
    </>
  )
}

export default CreateStep2
