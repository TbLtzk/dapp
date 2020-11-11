import React from "react";
import {Route, Switch, withRouter} from "react-router-dom";

import Dashboard from "pages/Dashboard"

import UserOpenActions from "pages/UserOpenActions"
import QGovernance from "pages/QGovernance"
import Executive from "pages/Executive"

function Routes() {
    return (
        <Switch>
            <Route exact path='/' component={Dashboard}/>
            <Route path="/my-open-actions" component={UserOpenActions}/>
            <Route path="/q-governance" component={QGovernance}/>
            <Route path="/executive" component={Executive}/>
        </Switch>
    );
}

export default Routes;
