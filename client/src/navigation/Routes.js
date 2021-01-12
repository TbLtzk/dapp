import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Start from 'pages/UserPages/Start';
import StartConfigurations from 'pages/StartConfigurations';

import UserPages from 'pages/UserPages';
import { AuthProtect } from './AuthProtect';

function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={Start} />
      <Route exact path="/start-configurations" component={StartConfigurations} />

      <Route path="/q-governance" component={AuthProtect(UserPages)} />
      <Route path="/piggy-bank" component={AuthProtect(UserPages)} />
      <Route path="/staking" component={AuthProtect(UserPages)} />
      <Route path="/manage-staker-reward-pool" component={AuthProtect(UserPages)} />
      <Route path="/saving-and-borrowing" component={AuthProtect(UserPages)} />
      <Route path="/ended-proposals" component={AuthProtect(UserPages)} />
    </Switch>
  );
}

export default Routes;
