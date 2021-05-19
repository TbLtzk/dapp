import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router';

import RootService from 'contracts/src/Root';
import { detectEthereumProvider } from 'store/actions/action-creaters/user-auth';
import { checkIsUserRootNode } from 'store/actions/action-creaters/root-contract';
import { userAddressMetamask } from 'store/selectors/user-inf';

export function AuthProtect(ProtectComponent, additionalProps = {}) {
  function ProtectRoute(props) {
    const rootService = new RootService();

    const ethereum = window.ethereum;
    const dispatch = useDispatch();

    const userAddress = useSelector(userAddressMetamask);

    useEffect(() => {
      if (userAddress) {
        // dispatch(checkIsUserRootNode(rootService, "0x66316FfA38490d4d072F34EF7D7BA64Ce6b4478e"))
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

    const prop = { ...props, ...additionalProps };
    if (!ethereum) {
      return <Redirect
        to="/start-configurations"
        children={<ProtectComponent {...prop} />}
      />;
    } else {
      return <ProtectComponent {...prop} />;
    }
  }

  return ProtectRoute;
}

