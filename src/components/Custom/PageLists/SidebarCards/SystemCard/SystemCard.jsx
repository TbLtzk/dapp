import React, { Fragment, useCallback } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { loadingPerformNetting } from 'store/selectors/system-balance';
import { onPerformNetting } from 'store/actions/action-creaters/system-balance';

import CustomBlock from 'components/Base/CustomBlock';
import Button from 'components/Base/Buttons/Button';
import LoadingSpinner from 'components/Base/LoadingSpinner';

import { Row } from 'react-bootstrap';
import { Title, BlockWrap } from './styles';
import { WrapBtn, WrapDescr, WrapDescrTitle, WrapTitle } from '../styles';

function SystemCard(props) {
  const { data, title } = props;

  const dispatch = useDispatch();
  const loadingPerfNetting = useSelector(loadingPerformNetting);

  const onHandlePerformNetting = useCallback(() => {
    dispatch(onPerformNetting());
  }, []);

  return (
    <BlockWrap>
      <CustomBlock>
        <Row>
          <WrapTitle md={12}><Title>{title}</Title></WrapTitle>
          {data?.map((elem) => {
            return (
              <Fragment key={elem.title}>
                <WrapDescrTitle md={6}>{elem.title}</WrapDescrTitle>
                <WrapDescr md={6}>{elem.value}</WrapDescr>
              </Fragment>
            );
          })}
          {title === 'QUSD System Balance' ?
            <WrapBtn md={12}>
              <Button
                title={!loadingPerfNetting ? 'Perform Netting' : <LoadingSpinner/>}
                width="100%"
                handleButton={onHandlePerformNetting}
              />
            </WrapBtn>
            : null
          }
        </Row>
      </CustomBlock>
    </BlockWrap>
  );
}

export default SystemCard;

