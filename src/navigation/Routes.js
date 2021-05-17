import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { transitions, positions, Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';

import StartConfigurations from 'pages/StartConfigurations';

import { AuthProtect } from './AuthProtect';
import Dashboard from '../pages/UserPages/Dashboard/Dashboard';
import Manage from '../pages/UserPages/Dashboard/Manage';
import QGovernance from '../pages/UserPages/QGovernance';
import Governance from '../pages/UserPages/Governance';
import PiggyBank from '../pages/UserPages/PiggyBank';
import Staking from '../pages/UserPages/Staking';
import OneProposalPage from '../pages/UserPages/QGovernance/OneProposalPage';
import EndedAuctions from '../pages/UserPages/SavingAndBorrowing/DecentralizedAuctions/EndedAuctions';
import EndedProposals from '../pages/UserPages/QGovernance/EndedProposals';
import SavingAndBorrowing from '../pages/UserPages/SavingAndBorrowing';
import DecentralizedAuctions from '../pages/UserPages/SavingAndBorrowing/DecentralizedAuctions';

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
        <Route exact path="/" component={AuthProtect(Dashboard)}/>
        <Route exact path="/q-parameters" component={AuthProtect(Manage)}/>
        <Route exact path="/start-configurations" component={StartConfigurations}/>
      </Switch>
      <Switch>
        <Route exact path="/governance" component={AuthProtect(QGovernance)}/>
        <Route exact path="/q-governance" component={AuthProtect(Governance)}/>
        <Route exact path="/piggy-bank" component={AuthProtect(PiggyBank)}/>
        <Route exact path="/staking" component={AuthProtect(Staking)}/>
        <Route exact path="/saving-and-borrowing" component={AuthProtect(SavingAndBorrowing)}/>
        <Route exact path="/ended-proposals" component={AuthProtect(EndedProposals)}/>
        <Route exact path="/decentralized-auctions" component={AuthProtect(DecentralizedAuctions)}/>
        <Route exact path="/ended-auctions" component={AuthProtect(EndedAuctions)}/>
        <Route exact path="/q-governance/proposal/:contract?/:id?" component={AuthProtect(OneProposalPage)}/>
      </Switch>
    </AlertProvider>
  );
}

export default Routes;
