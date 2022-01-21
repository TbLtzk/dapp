import PageWrap from 'components/Base/PageWrap'
import RootNodePanel from 'components/Custom/MembersPanel/RootNodePanel/RootNodePanel'
import ValidatorsPanel from 'components/Custom/MembersPanel/ValidatorsPanel'
import TABLE_TYPES from 'constants/tableTypes'
import React from 'react'
import CurrentInfo from './components/CurrentInfo'

function Monitoring () {
  return (
        <div>
            <PageWrap headerTitle="Monitoring">
                <CurrentInfo />
                <div>
                    <ValidatorsPanel buttons="none" tableType={TABLE_TYPES.validatorsMonitoring} />
                    <RootNodePanel tableType={TABLE_TYPES.rootNodesMonitoring} />
                </div>
            </PageWrap>
        </div>
  )
}

export default Monitoring
