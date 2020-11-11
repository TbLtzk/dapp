import React from "react";
import {Route, Switch, withRouter} from "react-router-dom";

import Dashboard from "../pages/Dashboard"

function Routes() {
    return (
        <Switch>
            <Route exact path='/' component={Dashboard}/>
        </Switch>
    );
}

export default Routes;
