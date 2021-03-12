import React, { useEffect, useState, useCallback } from 'react';
import { drizzleReactHooks } from '@drizzle/react-plugin';
import { useDispatch, useSelector } from 'react-redux';
import { setUserAddress } from 'store/actions/action-creaters/user-inf';

import LoadingSpinner from 'components/Base/LoadingSpinner';

import { WrapContainer } from './styles';
import { detectEthereumProvider } from '../../../store/actions/action-creaters/user-auth';
import { provider } from '../../../store/selectors/user-auth';

const {
  useDrizzleState
} = drizzleReactHooks;

function LoadingDrizzle({ children }) {
  const [isMetaMask, setIsMetaMask] = useState('loading');
  const state = useDrizzleState(state => state);
  const drizzleStatus = useDrizzleState(state => state.drizzleStatus);

  const dispatch = useDispatch();
  const providerObj = useSelector(provider);

  useEffect(() => {
    if (drizzleStatus.initialized) {
      setIsMetaMask('logged');
    } else {
      setIsMetaMask('loading');
    }
  }, [drizzleStatus]);

  useEffect(() => {
    if (!providerObj) {
      dispatch(detectEthereumProvider());
    }
  }, [dispatch]);

  const accountHandler = useCallback(() => {
    switch (isMetaMask) {
      case 'logged':
        const addressId = state.accounts[0];
        dispatch(setUserAddress(addressId));
        return children;
      case 'loading':
        return (
          <WrapContainer>
            <LoadingSpinner/>
          </WrapContainer>
        );
      default:
        return (
          <WrapContainer>
            <LoadingSpinner/>
          </WrapContainer>
        );
    }
  }, [isMetaMask]);

  return accountHandler();
}

export default LoadingDrizzle;

