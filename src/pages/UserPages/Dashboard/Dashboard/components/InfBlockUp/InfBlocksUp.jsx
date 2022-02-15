import React, { useEffect, useState } from 'react'
import LoadingSpinner from 'components/Base/LoadingSpinner'
import SmallBlock from './SmallBlock'
import Button from 'components/Base/Buttons/Button'
import CopyToClipboard from 'components/Base/CopyToClipboard'

import { useDispatch, useSelector } from 'react-redux'
import { constitutionHash } from 'store/voting/proposals/selectors'
import { getConstitutionHash } from 'store/voting/proposals/action-creators'
import { latestConstitution, archiveConstitution } from 'constants/constitution'
import { Link } from 'react-router-dom'
import {
  qActiveProposalsCountSelector,
  qEndedProposalsCountSelector,
  qLoadingProposalsCountSelector
} from 'store/voting/q-proposals/selectors'
import {
  rootActiveProposalsCountSelector,
  rootEndedProposalsCountSelector,
  rootLoadingProposalsCountSelector
} from 'store/voting/root-node-proposals/selectors'
import {
  expertActiveProposalsCountSelector,
  expertEndedProposalsCountSelector,
  expertLoadingProposalsCountSelector
} from 'store/voting/expert-proposals/selectors'
import {
  slashingActiveProposalsCountSelector,
  slashingEndedProposalsCountSelector,
  slashingLoadingProposalsCountSelector
} from 'store/voting/slashing-proposals/selectors'
import { getContractRegistryInstance } from 'contracts/contract-instance'
import { mode } from 'store/dashboard-mode/selectors'
import { MODE } from 'components/Base/DashboardMode/DashboardMode'
import {
  contractUpdatesActiveProposalsCountSelector,
  contractUpdatesEndedProposalsCountSelector,
  contractUpdatesLoadingProposalsCountSelector
} from 'store/voting/contract-updates/selectors'

function InfBlocksUp () {
  const appMode = useSelector(mode)
  const [contractRegistryAddress, setContractRegistryAddress] = useState('0x00')

  const [blockNumber, setBlockNumber] = useState('0')

  const dispatch = useDispatch()
  const constitutionHashShow = useSelector(constitutionHash)

  const qActiveProposalsCount = useSelector(qActiveProposalsCountSelector)
  const qEndedProposalsCount = useSelector(qEndedProposalsCountSelector)
  const qLoadingProposalsCount = useSelector(qLoadingProposalsCountSelector)

  const rootActiveProposalsCount = useSelector(rootActiveProposalsCountSelector)
  const rootEndedProposalsCount = useSelector(rootEndedProposalsCountSelector)
  const rootLoadingProposalsCount = useSelector(rootLoadingProposalsCountSelector)

  const expertActiveProposalsCount = useSelector(expertActiveProposalsCountSelector)
  const expertEndedProposalsCount = useSelector(expertEndedProposalsCountSelector)
  const expertLoadingProposalsCount = useSelector(expertLoadingProposalsCountSelector)

  const slashingActiveProposalsCount = useSelector(slashingActiveProposalsCountSelector)
  const slashingEndedProposalsCount = useSelector(slashingEndedProposalsCountSelector)
  const slashingLoadingProposalsCount = useSelector(slashingLoadingProposalsCountSelector)

  const contractUpdatesActiveProposalsCount = useSelector(contractUpdatesActiveProposalsCountSelector)
  const contractUpdatesEndedProposalsCount = useSelector(contractUpdatesEndedProposalsCountSelector)
  const contractUpdatesLoadingProposalsCount = useSelector(contractUpdatesLoadingProposalsCountSelector)

  const activeAdvancedProposals =
        appMode === MODE.basic
          ? 0
          : expertActiveProposalsCount + slashingActiveProposalsCount + contractUpdatesActiveProposalsCount

  const activeProposals = qActiveProposalsCount + rootActiveProposalsCount + activeAdvancedProposals

  const endedAdvancedProposals =
        appMode === MODE.basic
          ? 0
          : expertEndedProposalsCount + slashingEndedProposalsCount + contractUpdatesEndedProposalsCount

  const endedProposals = rootEndedProposalsCount + qEndedProposalsCount + endedAdvancedProposals

  const loadingAdvancedProposals =
        appMode === MODE.basic
          ? false
          : expertLoadingProposalsCount || slashingLoadingProposalsCount || contractUpdatesLoadingProposalsCount

  const loadingProposals = qLoadingProposalsCount || rootLoadingProposalsCount || loadingAdvancedProposals

  useEffect(() => {
    dispatch(getConstitutionHash())
    getContractRegistryInstance().then((contract) => setContractRegistryAddress(contract.address))
    window.web3.eth.getBlock('latest').then((response) => setBlockNumber(response.number || 0))
  }, [dispatch])

  return (
        <>
            <SmallBlock
                title="Blockchain"
                firstSubtitle="Block Height"
                secondSubtitle="System Contract Registry:"
                firstContent={<p> {blockNumber}</p>}
                secondContent={
                    <CopyToClipboard valueToCopy={contractRegistryAddress}>
                        <p>{contractRegistryAddress}</p>
                    </CopyToClipboard>
                }
            />
            <SmallBlock
                title="Constitution"
                firstSubtitle="Hash:"
                secondSubtitle={null}
                firstContent={
                    <CopyToClipboard valueToCopy={constitutionHashShow}>
                        <p>{constitutionHashShow}</p>
                    </CopyToClipboard>
                }
                secondContent={
                    <div className="card__actions">
                        <a href={latestConstitution} target="_blank" rel="noreferrer">
                            <Button icon="download" title={'Download Latest'} handleButton={() => {}} />
                        </a>
                        <a href={archiveConstitution} target="_blank" rel="noreferrer">
                            <Button icon="archive-outline" title={'Check Archive'} handleButton={() => {}} />
                        </a>
                    </div>
                }
            />
            <SmallBlock
                display="columns"
                title="Governance"
                firstSubtitle="Active Proposals"
                secondSubtitle="Past Proposals"
                firstContent={
                    loadingProposals
                      ? (
                        <LoadingSpinner className="card__spinner" />
                        )
                      : (
                        <div>
                            <p>{activeProposals}</p>
                            <div className="card__actions">
                                <Link to="/q-governance">
                                    <Button
                                        type="white"
                                        icon="arrow-right"
                                        title="Go to Governance"
                                        handleButton={() => {}}
                                    />
                                </Link>
                            </div>
                        </div>
                        )
                }
                secondContent={
                    loadingProposals
                      ? (
                        <LoadingSpinner className="card__spinner" />
                        )
                      : (
                        <>
                            <p>{endedProposals}</p>
                        </>
                        )
                }
            />
        </>
  )
}

export default InfBlocksUp
