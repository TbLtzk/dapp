import React from "react";

import {drizzleReactHooks} from "@drizzle/react-plugin";
import LoadingSpinner from "components/Base/LoadingSpinner";

import {WrapContainer} from "./styles";

const {useDrizzle, useDrizzleState} = drizzleReactHooks;

function LoadingDrizzle({children}) {
    const {drizzle} = useDrizzle();
    const drizzleState = useDrizzleState(state => state);
    const drizzleStatus = useDrizzleState(state => state.drizzleStatus);
    // console.log('drizzleStatus', drizzleStatus);
    // console.log('drizzleState', drizzleState);
    // console.log('drizzle', drizzle);
    const ethereum = window.ethereum;
    // console.log('ethereum', ethereum);

    if (drizzleStatus.initialized === false && ethereum) {
        // console.log('drizzleStatus.initialized === false && ethereum');
        return (
            <WrapContainer>
                <LoadingSpinner/>
            </WrapContainer>
        )
    } else if (!ethereum){
        // console.log("install metamask loading");
        return children;
    }

    return (
        children
    );
}

export default LoadingDrizzle;

