import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Redirect} from "react-router";
import {drizzleReactHooks} from "@drizzle/react-plugin";

import RootService from "api/contracts/RootService";
import {detectEthereumProvider} from "store/actions/action-creaters/user-auth";
import {checkIsUserRootNode} from "store/actions/action-creaters/root-contract";
import {userAddressMetamask} from "store/selectors/user-inf";
import ContractRegistryService from "api/contracts/ContractRegistryService";

const {useDrizzle, useDrizzleState} = drizzleReactHooks;

export function AuthProtect(ProtectComponent) {
    function ProtectRoute(props) {
        const {drizzle} = useDrizzle();
        const drizzleStatus = useDrizzleState(state => state.drizzleStatus);
        const rootService = new RootService(drizzle);

        const contractRegistry = new ContractRegistryService(drizzle);

        const ethereum = window.ethereum;
        const dispatch = useDispatch();

        const userAddress = useSelector(userAddressMetamask);
        console.log("userAddress", userAddress);

        useEffect(() => {
            // contractRegistry.getAddress().then((address) => {
            //     console.log('QRootNodePanel address', address);
            // });
            if (userAddress) {
                // dispatch(checkIsUserRootNode(rootService, "0x66316FfA38490d4d072F34EF7D7BA64Ce6b4478e"))
                dispatch(checkIsUserRootNode(rootService, userAddress))
            }
        }, [userAddress, dispatch]);

        useEffect(() => {
            if (ethereum) {
                ethereum.on('accountsChanged', function (accounts) {
                    dispatch(detectEthereumProvider());
                    if (drizzle) {
                        window.location.reload();
                    }
                });
            }
        }, [ethereum]);

        if (!drizzleStatus && !ethereum) {
            return <Redirect
                to="/start-configurations"
                children={<ProtectComponent {...props} />}
            />;
        } else {
            return drizzleStatus ? (
                <ProtectComponent {...props} />
            ) : (
                <Redirect
                    to="/start-configurations"
                    children={<ProtectComponent {...props}/>}
                />
            );
        }
    }

    return ProtectRoute;
}

