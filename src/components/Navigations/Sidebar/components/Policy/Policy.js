import React, { useState } from 'react'
import ModalWindow from 'components/Base/ModalWindow'
import { easterEggImg, imprintContent, privacyContent } from './policy-text'
import { PolicyContainer } from './styles'

function Policy () {
  const [easterEgg, setEasterEgg] = useState(0)
  const [privacyModalOpen, setPrivacyModalOpen] = useState(!localStorage.getItem('privacy-policy'))
  const [imprintModalOpen, setImprintModalOpen] = useState(false)

  const handlePrivacyModal = () => {
    setPrivacyModalOpen(false)
    localStorage.setItem('privacy-policy', '0')
  }

  const handleImprintModal = () => {
    setImprintModalOpen(false)
  }

  return (
    <>
      <span>&nbsp;|&nbsp;</span>
      <div className="policy_container">
        <p onClick={() => setPrivacyModalOpen(true)}>Data Privacy</p>
        <span>&nbsp;|&nbsp;</span> <p onClick={() => setImprintModalOpen(true)}> Imprint</p>
      </div>
      <ModalWindow
        iconRight="check-all"
        modalTitle={<div onClick={() => setEasterEgg((val) => val + 1)}>Data Privacy</div>}
        continueBtnTitle="Agreed"
        closeButton={false}
        show={privacyModalOpen}
        content={
          <PolicyContainer>
            {privacyContent} {easterEgg > 10 && easterEggImg}
          </PolicyContainer>
        }
        continueBtnHandler={handlePrivacyModal}
      />
      <ModalWindow
        iconRight="close"
        modalTitle="Imprint"
        continueBtnTitle="Close"
        closeButton={false}
        content={<PolicyContainer>{imprintContent}</PolicyContainer>}
        show={imprintModalOpen}
        onHide={handleImprintModal}
        continueBtnHandler={handleImprintModal}
      />
    </>
  )
}

export default Policy
