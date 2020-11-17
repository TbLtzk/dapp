import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Redirect} from "react-router";

import {detectEthereumProvider} from "store/actions/action-creaters/user-auth";
import {loadingCheckProvider, provider} from "store/selectors/user-auth";

export function AuthProtect(ProtectComponent) {
    function ProtectRoute(props) {
        const ethereum = window.ethereum;
        const dispatch = useDispatch();

        const providerObj = useSelector(provider);
        const loading = useSelector(loadingCheckProvider);

        useEffect(() => {

            if (ethereum) {
                ethereum.on('accountsChanged', function (accounts) {
                    dispatch(detectEthereumProvider());
                    // history.push("/dashboard");
                    if (providerObj){
                        window.location.reload();
                    }
                });
            }
        }, [ethereum]);

        if (!providerObj && !ethereum) {
            return <Redirect to="/start-configurations"/>;
        } else {
            return providerObj ? (
                <ProtectComponent {...props} />
            ) : (
                <Redirect to="/start-configurations"/>
            );
        }
    }

    return ProtectRoute;
}

