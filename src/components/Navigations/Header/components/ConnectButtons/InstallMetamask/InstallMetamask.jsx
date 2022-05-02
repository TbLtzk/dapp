import React from 'react'
import ModalWindow from 'components/Base/ModalWindow'
import { InstallMetamaskContainer } from 'components/Navigations/Header/styles'

const metamaskIcon =
    'https://images.ctfassets.net/9sy2a0egs6zh/4zJfzJbG3kTDSk5Wo4RJI1/1b363263141cf629b28155e2625b56c9/mm-logo.svg'

function InstallMetamask ({ modalShow, setModalShow }) {
  function onHide () {
    setModalShow(false)
  }
  function continueBtnHandler () {
    setModalShow(false)
  }

  const content = (
        <InstallMetamaskContainer>
            <div className="list-card__line" />
            <p className="install-metamask__info">
                MetaMask is a browser plugin that allows users to make EVM compatible transactions through regular
                websites.
            </p>
            <h4>Get started:</h4>
            <p>
                1. Install <strong>MetaMask</strong> for your browser (Supported Browsers: Chrome, Firefox, Brave, Edge)
            </p>
            <div className="install-metamask__download">
                <img src={metamaskIcon} alt="metamask logo" />
                <div>
                    <a target="_blank" href="https://metamask.io/download/" rel="noreferrer">
                        Install MetaMask
                    </a>
                </div>
            </div>
            <p>2. Follow instructions.</p>
            <p>3. Refresh the page.</p>
            <p>
                4. Click <strong>"Connect wallet"</strong>
            </p>
        </InstallMetamaskContainer>
  )

  return (
        <div>
            <ModalWindow
                onHide={onHide}
                iconRight="check-bold"
                modalTitle="Install Metamask"
                continueBtnTitle="Done"
                show={modalShow}
                content={content}
                continueBtnHandler={continueBtnHandler}
            />
        </div>
  )
}

export default InstallMetamask
