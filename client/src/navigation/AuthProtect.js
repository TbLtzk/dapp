import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Redirect} from "react-router";

import {detectEthereumProvider} from "store/actions/action-creaters/user-auth";
import {loadingCheckProvider, provider} from "store/selectors/user-auth";

export function AuthProtect(ProtectComponent) {
    function ProtectRoute(props) {
        const {history} = props;
        const ethereum = window.ethereum;
        const dispatch = useDispatch();

        useEffect(() => {
            dispatch(detectEthereumProvider())
        }, []);

        const providerObj = useSelector(provider);
        const loading = useSelector(loadingCheckProvider);

        console.log('ethereum', ethereum);
        if (ethereum){
            ethereum.on('accountsChanged', function (accounts) {
                console.log('accountsChanged !!!!!', accounts[0]);
                if (accounts[0]){
                    dispatch(detectEthereumProvider());
                    return <ProtectComponent {...props} />
                }else {
                    console.log('accountsChanged EXIT!!!!!', accounts[0]);
                    // dispatch(detectEthereumProvider());
                    // history.push("/start-configurations");
                    return <Redirect to="/start-configurations"/>
                }

                // setAddress(accounts[0])
            });
            return <ProtectComponent {...props} />
        }

        if (!providerObj) {
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

