import React, {useEffect} from "react";

import {drizzleReactHooks} from "@drizzle/react-plugin";
import {newContextComponents} from "@drizzle/react-components";

const {useDrizzle, useDrizzleState} = drizzleReactHooks;
const {AccountData} = newContextComponents;

function UserData({children}) {
    const {drizzle} = useDrizzle();
    const state = useDrizzleState(state => state);
    console.log('drizzle state', state.accounts[0]);
    console.log('drizzle state', state.accountBalances[state.accounts[0]]);

    useEffect(() => {
        // const unsubscribe = drizzle.store.subscribe(() => {
        //
        //     // every time the store updates, grab the state from drizzle
        //     const drizzleState = drizzle.store.getState();
        //
        //     // check to see if it's ready, if so, update local component state
        //     if (drizzleState.drizzleStatus.initialized) {
        //         this.setState({loading: false, drizzleState});
        //     }
        // });
        //
        // return () => {
        //     unsubscribe()
        // }
    });


    return (
        <AccountData
            drizzle={drizzle}
            drizzleState={state}
            accounts={state.accounts}
            accountIndex={0}
        />
    );
}

export default UserData;

