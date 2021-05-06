import React, { lazy, Suspense } from 'react';

import LoadingSpinner from 'components/Base/LoadingSpinner';
import CustomBlock from 'components/Base/CustomBlock';

import { tableHeader } from './constants';

import { Col } from 'react-bootstrap';
import {
  H5Headline, ContainerWrap, HeadlineWrap,
  LoadingWrap
} from '../styles';

const MemberTable = lazy(() => import('components/Custom/MembersPanel/MemberTable'));

function ExpertsPanel(props) {
  const {
    members,
    loading,
    errorMessage,
    title
  } = props;
  return (
    <CustomBlock>
      <h1>List of {title} Experts</h1>
      <Suspense fallback={<LoadingWrap xs={12}><LoadingSpinner/></LoadingWrap>}>
        {loading ? <LoadingWrap xs={12}><LoadingSpinner/></LoadingWrap> :
          errorMessage || members?.length === 0 ? <p>No members</p> :
            <MemberTable
              type="members"
              arrayData={members}
              tableHeader={tableHeader}
            />
        }
      </Suspense>
    </CustomBlock>
  );
}

export default ExpertsPanel;

