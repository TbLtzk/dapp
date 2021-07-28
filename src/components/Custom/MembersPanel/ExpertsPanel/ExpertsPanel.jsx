import React, { lazy, Suspense } from 'react'

import LoadingSpinner from 'components/Base/LoadingSpinner'
import CustomBlock from 'components/Base/CustomBlock'

import { tableHeader } from './constants'

import { LoadingWrap } from '../styles'

const MemberTable = lazy(() => import('components/Custom/MembersPanel/MemberTable'))

function ExpertsPanel (props) {
  const {
    members,
    loading,
    errorMessage,
    title
  } = props
  return (
    <CustomBlock>
      <h1>List of {title} Experts</h1>
      <Suspense fallback={<LoadingWrap><LoadingSpinner/></LoadingWrap>}>
        {loading
          ? <LoadingWrap><LoadingSpinner/></LoadingWrap>
          : errorMessage || members?.length === 0
            ? <p>No members</p>
            : <MemberTable
              type="members"
              arrayData={members}
              tableHeader={tableHeader}
            />
        }
      </Suspense>
    </CustomBlock>
  )
}

export default ExpertsPanel
