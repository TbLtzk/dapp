import React from 'react'
import { useSelector } from 'react-redux'

import RootNodePanel from 'components/Custom/MembersPanel/RootNodePanel'
import ValidatorsPanel from 'components/Custom/MembersPanel/ValidatorsPanel'
import DefiMembersPanel from 'components/Custom/MembersPanel/DefiMembersPanel'
import QFeesMembersPanel from 'components/Custom/MembersPanel/QFeesMembersPanel'
import EprsMembersPanel from 'components/Custom/MembersPanel/EprsMembersPanel'

import InfBlock from './components/InfBlockUp'
import TokenomicsBlock from './components/TokenomicsBlock'
import SavingBorrowingBlock from './components/SavingBorrowingBlock'
import Button from 'components/Base/Buttons/Button'
import PageWrap from 'components/Base/PageWrap'

import { Link } from 'react-router-dom'

import { mode } from 'store/dashboard-mode/selectors'
import { MODE } from 'components/Base/DashboardMode/DashboardMode'
import TABLE_TYPES from 'constants/tableTypes'

function Dashboard () {
  const appMode = useSelector(mode)

  const advancedMode = appMode === MODE.advanced

  const parametersButton = advancedMode
    ? (
        <Link to="/q-parameters">
            <Button alwaysEnabled type="white" title="Q Parameters" handleButton={() => {}} />
        </Link>
      )
    : null

  const infoBlock = <InfBlock />
  const tokenomiks = advancedMode ? <TokenomicsBlock /> : null
  const savingAndBorrowing = <SavingBorrowingBlock />

  const rootAndValidatorsPanels = (
        <>
            <RootNodePanel tableType={TABLE_TYPES.rootNodesShort} />
            <ValidatorsPanel buttons="details" tableType={TABLE_TYPES.validatorsShort} />
        </>
  )

  const defiAndQFeesPanels = (
        <>
            {advancedMode
              ? (
                <>
                    <DefiMembersPanel />
                    <QFeesMembersPanel />
                    <EprsMembersPanel />
                </>
                )
              : null}
        </>
  )

  return (
        <PageWrap headerTitle="Dashboard" headerExtra={parametersButton}>
            <div className="content__colm-1">
                {infoBlock}
                {rootAndValidatorsPanels}
                {tokenomiks}
                {rootAndValidatorsPanels}
                {defiAndQFeesPanels}
            </div>
            <div className="content__colm-2">
                <div>
                    {infoBlock}
                    {tokenomiks}
                    {savingAndBorrowing}
                </div>
                <div>
                    {rootAndValidatorsPanels}
                    {defiAndQFeesPanels}
                </div>
            </div>
        </PageWrap>
  )
}

export default Dashboard
