import React, { useEffect, useState } from 'react'
import ModalWindow from 'components/Base/ModalWindow'
import VersionsTable from '../VersionsTable'

import { WrpVersion } from './styles'
import { Web3Adapter } from '@q-dev/q-js-sdk'
import pkg from '../../../../../../package.json'
import { getNowTimeWithGMT } from 'func/convertDate'

function Version () {
  const web3Adapter = new Web3Adapter(window.web3)
  const versionInfoGroups = {
    main: 'Main',
    modules: 'Modules',
    client: 'Q client'
  }

  const [modalShow, setModalShow] = useState(false)
  const [mainVersionInfo, setMainVersionInfo] = useState([])
  const [modulesVersionInfo, setModulesVersionInfo] = useState([])
  const [clientVersionInfo, setClientVersionInfo] = useState([])

  useEffect(async () => {
    if (!web3Adapter) return [] // not initialized

    const connectionInfo = await web3Adapter.getConnectionInfo()

    setMainVersionInfo([
      [
        {
          group: versionInfoGroups.main,
          name: 'dApp',
          value: pkg.version
        },
        {
          group: versionInfoGroups.main,
          name: 'Your Current Time',
          value: getNowTimeWithGMT()
        }
      ]
    ])
    setModulesVersionInfo([
      [
        {
          group: versionInfoGroups.modules,
          name: 'Web3.js',
          value: web3Adapter.web3.version
        },
        {
          group: versionInfoGroups.modules,
          name: 'Q.js SDK',
          value: web3Adapter.SDK_VERSION
        }
      ]
    ])
    setClientVersionInfo([
      [
        {
          group: versionInfoGroups.client,
          name: 'RPC URL',
          value: connectionInfo.rpcUrl
        },
        {
          group: versionInfoGroups.client,
          name: 'Network ID',
          value: connectionInfo.networkId
        }
      ],
      [
        {
          group: versionInfoGroups.client,
          name: 'Node Info',
          value: connectionInfo.nodeInfo
        }
      ]
    ])
  }, [])

  return (
        <>
            <WrpVersion
                onClick={() => {
                  setModalShow(true)
                }}
            >
                {pkg.version}
            </WrpVersion>
            <ModalWindow
                show={modalShow}
                onHide={() => {
                  setModalShow(false)
                }}
                modalTitle="Version Information"
                content={
                    <>
                        <div className="modal-line" />
                        <VersionsTable data={mainVersionInfo} header={versionInfoGroups.main} />
                        <div className="modal-line" />
                        <VersionsTable data={modulesVersionInfo} header={versionInfoGroups.modules} />
                        <div className="modal-line" />
                        <VersionsTable data={clientVersionInfo} header={versionInfoGroups.client} />
                    </>
                }
            />
        </>
  )
}

export default Version
