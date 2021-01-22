import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { transitions, positions, Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';

import Start from 'pages/UserPages/Start';
import StartConfigurations from 'pages/StartConfigurations';

import UserPages from 'pages/UserPages';
import { AuthProtect } from './AuthProtect';

function Routes() {
  const options = {
    position: positions.TOP_RIGHT,
    timeout: 10000,
    offset: '10px',
    transition: transitions.SCALE,
  };

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <AlertProvider template={AlertTemplate} {...options}>
      <Switch>
        <Route exact path="/" component={Start} />
        <Route exact path="/start-configurations" component={StartConfigurations} />

        <Route exact path="/q-governance" component={AuthProtect(UserPages)} />
        <Route path="/piggy-bank" component={AuthProtect(UserPages)} />
        <Route path="/staking" component={AuthProtect(UserPages)} />
        <Route path="/manage-staker-reward-pool" component={AuthProtect(UserPages)} />
        <Route path="/saving-and-borrowing" component={AuthProtect(UserPages)} />
        <Route path="/ended-proposals" component={AuthProtect(UserPages)} />
        <Route path="/decentralized-auctions" component={AuthProtect(UserPages)} />
        <Route path="/ended-auctions" component={AuthProtect(UserPages)} />
        <Route path="/q-governance/proposal/:contract?/:id?" component={AuthProtect(UserPages)} />
      </Switch>
    </AlertProvider>
  );
}

export default Routes;
