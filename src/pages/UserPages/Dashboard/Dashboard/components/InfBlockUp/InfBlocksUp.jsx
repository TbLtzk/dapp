import React, { useEffect, useState } from 'react'
import LoadingSpinner from 'components/Base/LoadingSpinner'
import SmallBlock from './SmallBlock'
import Button from 'components/Base/Buttons/Button'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { OverlayTrigger, Popover } from 'react-bootstrap'
import colors from 'constants/colors'

import { contractsToAddresses } from 'contracts/mapping/contract-to-address'
import { useDispatch, useSelector } from 'react-redux'
import { constitutionHash } from 'store/voting/proposals/selectors'
import { getConstitutionHash } from 'store/voting/proposals/action-creators'
import { latestConstitution, archiveConstitution } from 'contracts/handler/ConstitutionHandler'
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

function InfBlocksUp () {
  const [blockNumber, setBlockNumber] = useState('0')

  window.web3.eth.getBlock('latest').then((response) => {
    setBlockNumber(response.number || 0)
  })

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

  const activeProposals =
        qActiveProposalsCount + rootActiveProposalsCount + expertActiveProposalsCount + slashingActiveProposalsCount
  const endedProposals =
        rootEndedProposalsCount + qEndedProposalsCount + expertEndedProposalsCount + slashingEndedProposalsCount

  const loadingProposals =
        qLoadingProposalsCount ||
        rootLoadingProposalsCount ||
        expertLoadingProposalsCount ||
        slashingLoadingProposalsCount

  const popover = (
        <Popover id="popover-basic">
            <Popover.Content
                style={{
                  background: colors.neonGreen
                }}
            >
                Copy
            </Popover.Content>
        </Popover>
  )

  useEffect(() => {
    dispatch(getConstitutionHash())
  }, [dispatch])

  return (
        <>
            <SmallBlock
                title="Blockchain"
                firstSubtitle="Block Height"
                secondSubtitle="System Contract Registry:"
                firstContent={<p> {blockNumber}</p>}
                secondContent={
                    <OverlayTrigger key="top" placement="top" overlay={popover}>
                        <CopyToClipboard text={contractsToAddresses.ContractRegistry}>
                            <p>{contractsToAddresses.ContractRegistry}</p>
                        </CopyToClipboard>
                    </OverlayTrigger>
                }
            />
            <SmallBlock
                title="Constitution"
                firstSubtitle="Hash:"
                secondSubtitle={null}
                firstContent={
                    <OverlayTrigger key="top" placement="top" overlay={popover}>
                        <CopyToClipboard text={constitutionHashShow}>
                            <p>{constitutionHashShow}</p>
                        </CopyToClipboard>
                    </OverlayTrigger>
                }
                secondContent={
                    <div className={'card__actions'}>
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
                display={'columns'}
                title="Governance"
                firstSubtitle="Active Proposals"
                secondSubtitle="Past Proposals"
                firstContent={
                    loadingProposals
                      ? (
                        <LoadingSpinner className={'card__spinner'} />
                        )
                      : (
                        <>
                            <p>{activeProposals}</p>
                            <div className={'card__actions'}>
                                <Link to={'/q-governance'}>
                                    <Button
                                        type={'white'}
                                        icon="arrow-right"
                                        title={'Go to Governance'}
                                        handleButton={() => {}}
                                    />
                                </Link>
                            </div>
                        </>
                        )
                }
                secondContent={
                    loadingProposals
                      ? (
                        <LoadingSpinner className={'card__spinner'} />
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
