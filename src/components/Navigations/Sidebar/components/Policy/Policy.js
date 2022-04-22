import React, { useState } from 'react'
import ModalWindow from 'components/Base/ModalWindow'

const imprintContent = (
  <>
    <div className="modal-line" />
    <h5>Responsible for the content of the website:</h5>

    <h3>Q Development AG</h3>
    <>Landstrasse 40</>
    <>9495 Triesen</>
    <>Liechtenstein</>

    <>FL-Nummer: FL-000.2.643.198-4</>
    <>(Commercial Register of Liechtenstein)</>

    <>Supervisory Authority: Amt für Volkswirtschaft, Vaduz</>

    <h3>Contact us</h3>
    <>Email: info@qdev.li</>
    <>Phone: +423 230 00 72</>

    <h3>Disclaimer (limitation of liability)</h3>

    <>
      The information provided on this website has been carefully checked and is regularly updated. However, no
      guarantee can be given that all information is complete, correct and up-to-date at all times. This applies in
      particular to links to other websites to which direct or indirect reference is made. Q Development AG does not
      accept any liability for damages or consequential damages arising out of access to its website or parts thereof.
      All information can be supplemented, removed or changed without prior notice.
    </>

    <div className="modal-line" />
  </>
)

const privacyContent = (
  <>
    <div className="modal-line" />
    <div className="modal-line" />
    <div className="modal-line" />
  </>
)

function Policy () {
  const [privacyModalOpen, setPrivacyModalOpen] = useState(!localStorage.getItem('pravicy-policy'))
  const [imprintModalOpen, setImprintModalOpen] = useState(false)

  const handlePrivacyModal = () => {
    setPrivacyModalOpen(false)
    localStorage.setItem('pravicy-policy', '0')
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
        modalTitle="Data Privacy"
        continueBtnTitle="Agreed"
        closeButton={false}
        show={privacyModalOpen}
        content={privacyContent}
        continueBtnHandler={handlePrivacyModal}
      />
      <ModalWindow
        iconRight="check"
        modalTitle="Imprint"
        continueBtnTitle="Close"
        closeButton={false}
        content={imprintContent}
        show={imprintModalOpen}
        onHide={handleImprintModal}
        continueBtnHandler={handleImprintModal}
      />
    </>
  )
}

export default Policy
