import React from "react";
import {Route, Switch, withRouter} from "react-router-dom";

import StartPage from "pages/StartPage"
import StartConfigurations from "pages/StartConfigurations"

//Root user
import RootUserPages from "pages/RootUserPages"

//Just user
import UserPages from "pages/UserPages"

function Routes() {
    return (
        <Switch>
            <Route exact path='/' component={StartPage}/>
            <Route exact path='/start-configurations' component={StartConfigurations}/>

            <Route exact path='/dashboard' component={RootUserPages}/>

            <Route path="/my-open-actions" component={UserPages}/>
            <Route path="/q-governance" component={UserPages}/>
            <Route path="/executive" component={UserPages}/>
        </Switch>
    );
}

export default Routes;
