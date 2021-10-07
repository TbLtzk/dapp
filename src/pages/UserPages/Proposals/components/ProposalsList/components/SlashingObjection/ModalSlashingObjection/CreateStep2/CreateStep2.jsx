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

  const showCommonData = (children) => {
    return (
      <div>
        <h2>Chosen Data:</h2>
        <h5>Type:</h5>
        <p>{formData?.first?.replace(/-/g, ' ')}</p>
        {children}
      </div>
    )
  }

  const contentSwitcher = useCallback(() => {
    switch (activeTab) {
      case 'cast-objection':
        return showCommonData(
        <>
          <h5>External Link</h5>
          <p>{formData['external-link']}</p>
        </>
        )
      case 'proposer-remark':
        return showCommonData(
        <>
          <h5>Proposer Remark</h5>
          <p>{formData['proposer-remark']}</p>
        </>
        )
      case 'propose-decision' :
        return showCommonData(
          <>
            <h5>External Link</h5>
            <p>{formData['external-link']}</p>
            <h5>Adjusted Percentage for Slashing</h5>
            <p>{formData['%-value']}</p>
            <h5>Did the Target of the Slashing Neglect a Formal Appeal?</h5>
            <p>{formData['target-slashing-appeal']}</p>
          </>
        )
      default:
        return null
    }
  }, [activeTab, register, errors])

  return (
    <>
      {contentSwitcher()}
    </>
  )
}

export default CreateStep2
