import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Redirect} from "react-router";
import {drizzleReactHooks} from "@drizzle/react-plugin";

import {detectEthereumProvider} from "store/actions/action-creaters/user-auth";
import {loadingCheckProvider, provider} from "store/selectors/user-auth";
import RootService from "api/contracts/RootService";

const {useDrizzle, useDrizzleState} = drizzleReactHooks;

export function AuthRootProtect(ProtectComponent) {
    function ProtectRoute(props) {
        const {drizzle} = useDrizzle();
        const state = useDrizzleState(state => state);
        const drizzleState = useDrizzleState(state => state);
        const drizzleStatus = useDrizzleState(state => state.drizzleStatus);
        const rootService = new RootService(drizzle);
        const [isRoot, setIsRoot] = useState(false);

        // console.log('AuthProtect drizzle', drizzle);
        // console.log('AuthProtect drizzleState', drizzleState);
        // console.log('AuthProtect drizzleStatus', drizzleStatus);

        const ethereum = window.ethereum;
        const dispatch = useDispatch();

        // const providerObj = useSelector(provider);
        // const loading = useSelector(loadingCheckProvider);

        useEffect(() => {
            if (drizzle) {
                rootService.checkMemberIsRoot(state.accounts[0]).then((isRootMember) => {
                    console.log('isRootMemberAuth', isRootMember);
                    // setIsRoot(isRootMember);
                    setIsRoot('0x64D4edeFE8bA86d3588B213b0A053e7B910Cad68');
                });
            }
        }, [drizzle]);

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

        if (!drizzleStatus && !ethereum && !isRoot) {
            return <Redirect
                to="/start-configurations"
                children={<ProtectComponent {...props} />}
            />;
        } else {
            return drizzleStatus && isRoot ? (
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

