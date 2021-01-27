import React, { useCallback, useEffect, useState, useMemo } from 'react';
import { drizzleReactHooks } from '@drizzle/react-plugin';
import { contractsToAddresses } from 'contracts/mapping/contract-to-address';
import { StableCoinQUSD } from 'contracts/StableCoin';
import SystemReserve from 'contracts/src/SystemReserve';
import DefaultAllocationProxy from 'contracts/src/DefaultAllocationProxy';

import { useDispatch, useSelector } from 'react-redux';
import { userAddressMetamask } from 'store/selectors/user-inf';
import { balanceSelector } from 'store/selectors/validation-reward-pools';
import { getVRPBalance } from 'store/actions/action-creaters/validation-reward-pools';

import CustomBlock from 'components/Base/CustomBlock';
import CardBlock from '../CardBlock';

import { fN } from 'func/useful';

import { Container, Col, Row } from 'react-bootstrap';
import { LoadingWrap } from 'components/Custom/MembersPanel/styles';
import LoadingSpinner from 'components/Base/LoadingSpinner';

import { TitleNotAlign } from '../../styles';
import { bn } from 'contracts/handler/AuctionHandler';
import { drizzleRegistry } from '../../../../../../../../contracts/config/drizzle-config';

const { useDrizzle, useDrizzleState } = drizzleReactHooks;

function TokenomicsBlock() {
  const { drizzle } = useDrizzle();
  const state = useDrizzleState(state => state);
  const userAddress = useSelector(userAddressMetamask);
  const dispatch = useDispatch();
  const StableCoin = new StableCoinQUSD();
  const DefaultAllocationProxyContract = new DefaultAllocationProxy();
  const SystemReserveContract = new SystemReserve();
  const [defaultAllocationProxy, setDefaultAllocationProxy] = useState('0');
  const [rootNodeRewardProxy, setRootNodeRewardProxy] = useState('0');
  const [validationRewardProxy, setValidationRewardProxy] = useState('0');
  const [systemReserveAvailable, setSystemReserveAvailable] = useState('0');
  const balanceVRP = useSelector(balanceSelector);
  //
  useEffect(async () => {
    dispatch(getVRPBalance(userAddress));
    const defaultAllocationProxy = await StableCoin.allowance(userAddress, contractsToAddresses.DefaultAllocationProxy);
    setDefaultAllocationProxy(bn(defaultAllocationProxy));
    const rootNodeRewardProxy = await StableCoin.allowance(userAddress, contractsToAddresses.RootNodeRewardProxy);
    setRootNodeRewardProxy(bn(rootNodeRewardProxy));
    const validationRewardProxy = await StableCoin.allowance(userAddress, contractsToAddresses.ValidationRewardProxy);
    setValidationRewardProxy(bn(validationRewardProxy));
    const systemReserveAvailable = await SystemReserveContract.availableAmount();
    setSystemReserveAvailable(systemReserveAvailable);
    console.log('defaultAllocationProxy', defaultAllocationProxy);
    console.log('rootNodeRewardProxy', rootNodeRewardProxy);
    console.log('validationRewardProxy', validationRewardProxy);
    console.log('systemReserveAvailable', systemReserveAvailable);
    const result = await drizzle.web3.eth.getBalance(contractsToAddresses.DefaultAllocationProxy);
    console.log('result', result);
    const result1 = await DefaultAllocationProxyContract.allocate();
    console.log('result1', result1);
  }, [dispatch]);

  const onAllocate = useCallback((type) => {
    console.log('click onAllocate', type);

  }, []);

  const onRefresh = useCallback(() => {
    console.log('click onRefresh');

  }, []);

  const dataArr = useMemo(() => {
    return [
      {
        title: 'Default Allocation Proxy',
        firstContent: fN(defaultAllocationProxy) + ' Q',
        btnTitle: 'Allocate',
        btnType: 'default-allocation',
      },
      {
        title: 'Validation Reward Proxy',
        firstContent: fN(validationRewardProxy) + ' Q',
        btnTitle: 'Allocate',
        btnType: 'validation-reward-allocation',
      },
      {
        title: 'Q Holdre Reward Pool',
        firstContent: '749 Q',
        btnTitle: null,
      },
      {
        title: 'Q System Reserve',
        firstContent: systemReserveAvailable + ' Q',
        btnTitle: null,
      },
      {
        title: 'Root Node Reward Proxy',
        firstContent: fN(rootNodeRewardProxy) + ' Q',
        btnTitle: 'Allocate',
        btnType: 'root-node-allocation',
      },
      {
        title: 'Validation Reward Pools',
        firstContent: fN(balanceVRP) + ' Q',
        btnTitle: null,
      },
      {
        title: 'Time Since Q Holder Reward Update',
        firstContent: '0d 1h 34m',
        btnTitle: 'Refresh',
      },
    ];
  }, [defaultAllocationProxy, validationRewardProxy, systemReserveAvailable, balanceVRP]);

  return (
    <CustomBlock style={{
      padding: '14px 10px',
      width: '100%',
      marginTop: '20px'
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
                  btnTitle={el.btnTitle}
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

