import React, { useEffect } from 'react';

import Header from 'components/Navigations/Header';
import TabsAuth from 'pages/UserPages/Start/TabsAuth';
import NotAuth from 'pages/UserPages/Start/NotAuth';

import { WrapContainer } from 'pages/UserPages/styles';
import { useDispatch, useSelector } from 'react-redux';
import { userAddressMetamask } from 'store/selectors/user-inf';
import { checkIsUserRootNode } from 'store/actions/action-creaters/root-contract';
import { detectEthereumProvider } from 'store/actions/action-creaters/user-auth';
import RootService from 'contracts/src/Root';
import { Redirect } from 'react-router';

function Start() {
  const rootService = new RootService();

  const ethereum = window.ethereum;
  const dispatch = useDispatch();

  const userAddress = useSelector(userAddressMetamask);

  useEffect(() => {
    if (userAddress) {
      dispatch(checkIsUserRootNode(rootService, userAddress));
    }
  }, [userAddress, dispatch]);

  useEffect(() => {
    if (ethereum) {
      ethereum.on('accountsChanged', function (accounts) {
        dispatch(detectEthereumProvider());
      });
    }
  }, [ethereum]);

  if (!ethereum) {
    return <NotAuth/>;
  } else {
    return (
      <>
        <Header/>
        <WrapContainer fluid>
          <TabsAuth/>
        </WrapContainer>
      </>
    );
  }

  // return (
  //     <>
  //         <Header/>
  //         <WrapContainer fluid>
  //             <TabsAuth/>
  //         </WrapContainer>
  //     </>
  // );
}

export default Start;

