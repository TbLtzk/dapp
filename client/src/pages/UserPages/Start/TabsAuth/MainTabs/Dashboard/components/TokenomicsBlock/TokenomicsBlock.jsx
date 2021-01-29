import React, { useCallback, useEffect, useState, useMemo } from 'react';
import { drizzleReactHooks } from '@drizzle/react-plugin';
import { useSelector } from 'react-redux';
import { balanceSelector } from 'store/selectors/validation-reward-pools';
import { userAddressMetamask } from 'store/selectors/user-inf';
import Handler from './handler';

import CustomBlock from 'components/Base/CustomBlock';
import CardBlock from '../CardBlock';
import LoadingSpinner from 'components/Base/LoadingSpinner';

import { Container, Col, Row } from 'react-bootstrap';
import { TitleNotAlign } from '../../styles';

const { useDrizzle, useDrizzleState } = drizzleReactHooks;

function TokenomicsBlock() {
  const { drizzle } = useDrizzle();
  const userAddress = useSelector(userAddressMetamask);
  const [defaultAllocationProxy, setDefaultAllocationProxy] = useState('0');
  const [loadingDefaultAllocation, setLoadingDefaultAllocation] = useState(false);

  const [rootNodeRewardProxy, setRootNodeRewardProxy] = useState('0');
  const [loadingRootNodeReward, setLoadingRootNodeReward] = useState(false);

  const [validationRewardProxy, setValidationRewardProxy] = useState('0');
  const [loadingValidationReward, setLoadingValidationReward] = useState(false);

  const [systemReserve, setSystemReserve] = useState('0');
  const [validationRewardPools, setValidationRewardPools] = useState('0');
  const [QHolderRewardPool, setQHolderRewardPool] = useState('0');

  const balanceVRP = useSelector(balanceSelector);
  const handler = new Handler(drizzle, userAddress);

  useEffect(async () => {
    handler.getDefaultAllocationProxy(setDefaultAllocationProxy, () => {}, false);
    handler.getRootNodeRewardProxy(setRootNodeRewardProxy, () => {}, false);
    handler.getValidationRewardProxy(setValidationRewardProxy, () => {}, false);

    handler.getQHolderRewardPool(setQHolderRewardPool);
    handler.getSystemReserve(setSystemReserve);
    handler.getValidationRewardPools(setValidationRewardPools);
  }, []);

  const onAllocate = useCallback((type) => {
    switch (type) {
      case 'default-allocation':
        handler.getDefaultAllocationProxy(setDefaultAllocationProxy, setLoadingDefaultAllocation, true);
        break;
      case 'validation-reward-allocation':
        handler.getValidationRewardProxy(setValidationRewardProxy, setLoadingRootNodeReward, true);
        break;
      case 'root-node-allocation':
        handler.getRootNodeRewardProxy(setRootNodeRewardProxy, setLoadingValidationReward, true);
        break;
    }
  }, []);

  const onRefresh = useCallback(() => {
    console.log('click onRefresh');
  }, []);

  const dataArr = useMemo(() => {
    return [
      {
        title: 'Default Allocation Proxy',
        firstContent: defaultAllocationProxy + ' Q',
        btnTitle: 'Allocate',
        btnType: 'default-allocation',
      },
      {
        title: 'Validation Reward Proxy',
        firstContent: validationRewardProxy + ' Q',
        btnTitle: 'Allocate',
        btnType: 'validation-reward-allocation',
      },
      {
        title: 'Q Holdre Reward Pool',
        firstContent: QHolderRewardPool + ' Q',
        btnTitle: null,
      },
      {
        title: 'Q System Reserve',
        firstContent: systemReserve + ' Q',
        btnTitle: null,
      },
      {
        title: 'Root Node Reward Proxy',
        firstContent: rootNodeRewardProxy + ' Q',
        btnTitle: 'Allocate',
        btnType: 'root-node-allocation',
      },
      {
        title: 'Validation Reward Pools',
        firstContent: validationRewardPools + ' Q',
        btnTitle: null,
      },
      {
        title: 'Time Since Q Holder Reward Update',
        firstContent: '0d 1h 34m',
        btnTitle: 'Refresh',
      },
    ];
  }, [defaultAllocationProxy, validationRewardPools, validationRewardProxy, systemReserve, balanceVRP, rootNodeRewardProxy, QHolderRewardPool]);

  const showBtnTitle = (title, type) => {
    switch (type) {
      case 'default-allocation':
        if (loadingDefaultAllocation) {
          return <LoadingSpinner/>;
        } else {
          return title;
        }
      case 'validation-reward-allocation':
        if (loadingRootNodeReward) {
          return <LoadingSpinner/>;
        } else {
          return title;
        }
      case 'root-node-allocation':
        if (loadingValidationReward) {
          return <LoadingSpinner/>;
        } else {
          return title;
        }
      default:
        return title;
    }
  };

  return (
    <CustomBlock style={{
      padding: '14px 10px',
      width: '100%',
    }}>
      <Container fluid>
        <Row>
          <Col md={12}>
            <TitleNotAlign>Tokenomics</TitleNotAlign>
          </Col>
          {
            dataArr?.map((el) => {
              return (
                <CardBlock
                  key={el.title.replace(' ', '-')}
                  title={el.title}
                  firstContent={el.firstContent}
                  btnTitle={showBtnTitle(el.btnTitle, el.btnType)}
                  btnHandler={!el.btnTitle ? null : () => {
                    if (el.btnTitle === 'Allocate') {
                      onAllocate(el.btnType);
                    } else if (el.btnTitle === 'Refresh') {
                      onRefresh();
                    }
                  }}
                />
              );
            })
          }
        </Row>
      </Container>
    </CustomBlock>

  );
}

export default TokenomicsBlock;

