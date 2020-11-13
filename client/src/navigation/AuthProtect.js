import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Redirect} from "react-router";

import {detectEthereumProvider} from "store/actions/action-creaters/user-auth";
import {loadingCheckProvider, provider} from "store/selectors/user-auth";

export function AuthProtect(ProtectComponent) {
    function ProtectRoute(props) {

        const dispatch = useDispatch();
        useEffect(() => {
            dispatch(detectEthereumProvider())
        }, []);

        const providerObj = useSelector(provider);
        const loading = useSelector(loadingCheckProvider);

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

