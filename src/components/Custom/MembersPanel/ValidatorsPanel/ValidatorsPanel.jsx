import React, { lazy, Suspense, useEffect, useMemo } from 'react';

import LoadingSpinner from 'components/Base/LoadingSpinner';
import CustomBlock from 'components/Base/CustomBlock';
import Button from 'components/Base/Buttons/Button';

const MemberTable = lazy(() => import('components/Custom/MembersPanel/MemberTable'));

import { useDispatch, useSelector } from 'react-redux';
import { getValidatorMembers } from 'store/actions/action-creaters/validators';
import { tableHeaderShort, tableHeaderWidened } from './constants';
import { useHistory } from 'react-router-dom';
import { LoadingWrap } from '../styles';
import {
  loadingMembers,
  errorMembers,
  validatorMembers
} from 'store/selectors/validators';

function ValidatorsPanel(props) {
  const {
    bottom,
    widened
  } = props;

  const loading = useSelector(loadingMembers);
  const errorMessage = useSelector(errorMembers);
  const validators = useSelector(validatorMembers);

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(getValidatorMembers());
  }, [dispatch]);

  const tableHeader = useMemo(() => {
    if (!widened) {
      return tableHeaderShort;
    } else {
      return tableHeaderWidened;
    }
  }, [widened]);

  return (
    <CustomBlock>
      <h1>Validator Ranking</h1>
      <Suspense fallback={<LoadingWrap xs={12}><LoadingSpinner/></LoadingWrap>}>
        {loading ? <LoadingWrap xs={12}><LoadingSpinner/></LoadingWrap> :
          errorMessage || validators?.length === 0 ? <p>No validators</p> :
            <MemberTable
              type={!widened ? 'validators' : 'validators-widened'}
              arrayData={validators}
              tableHeader={tableHeader}
              widened
            />
        }
      </Suspense>
      {!bottom
        ? <div className={'card__actions'}>
          <Button
            type={'white'}
            icon="arrow-right"
            title={'See more details'}
            handleButton={() => history.push({
              pathname: '/staking',
              state: {
                activeTab: 'validator-staking'
              }
            })}
          />
        </div>
        :
        <div className={'card__actions'}>
          <Button
            type={'white'}
            icon="arrow-right"
            title={'Go to Q Vault'}
            handleButton={() => history.push({
              pathname: '/piggy-bank',
            })}
          />
        </div>
      }
    </CustomBlock>
  );
}

export default ValidatorsPanel;

