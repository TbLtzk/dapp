import React from "react";
import {drizzleReactHooks} from "@drizzle/react-plugin";
import LoadingSpinner from "components/Base/LoadingSpinner";
const {useDrizzleState} = drizzleReactHooks;

function LoadingDrizzle({children}) {
    const drizzleStatus = useDrizzleState(state => state.drizzleStatus);
    console.log('drizzleStatus', drizzleStatus);

    if (drizzleStatus.initialized === false){
        // return (
        //         <LoadingSpinner/>
        // )
    }

    return (
        children
    );
}

export default LoadingDrizzle;

