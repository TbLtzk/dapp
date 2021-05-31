import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { transitions, positions, Provider as AlertProvider } from 'react-alert';
import { AuthProtect } from './AuthProtect';
import { PROPOSALS_TYPES } from 'constants/statuses';

import AlertTemplate from 'react-alert-template-basic';

import StartConfigurations from 'pages/StartConfigurations';
import Dashboard from '../pages/UserPages/Dashboard/Dashboard';
import Manage from '../pages/UserPages/Dashboard/Manage';
import Governance from '../pages/UserPages/Governance';
import Proposals from '../pages/UserPages/Proposals';
import PiggyBank from '../pages/UserPages/PiggyBank';
import Staking from '../pages/UserPages/Staking';
import OneProposalPage from '../pages/UserPages/OneProposalPage';
import SavingAndBorrowing from '../pages/UserPages/SavingAndBorrowing';
import EndedAuctions from '../pages/UserPages/OldSavingAndBorrowing/DecentralizedAuctions/EndedAuctions';
import OldSavingAndBorrowing from '../pages/UserPages/OldSavingAndBorrowing';
import DecentralizedAuctions from '../pages/UserPages/OldSavingAndBorrowing/DecentralizedAuctions';

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
        <Route exact path="/q-governance" component={AuthProtect(Governance)}/>
        <Route exact path="/q-proposals"
               component={AuthProtect(Proposals, { proposalsType: PROPOSALS_TYPES.proposals })}/>
        <Route exact path="/q-root-node-panel"
               component={AuthProtect(Proposals, { proposalsType: PROPOSALS_TYPES.rootNodePanel })}/>
        <Route exact path="/q-expert-proposals"
               component={AuthProtect(Proposals, { proposalsType: PROPOSALS_TYPES.expertProposals })}/>
        <Route exact path="/slashing-proposals"
               component={AuthProtect(Proposals, { proposalsType: PROPOSALS_TYPES.slashingProposals })}/>
        <Route exact path="/piggy-bank" component={AuthProtect(PiggyBank)}/>
        <Route exact path="/staking" component={AuthProtect(Staking)}/>
        <Route exact path="/saving-and-borrowing" component={AuthProtect(SavingAndBorrowing)}/>
        <Route exact path="/Old-saving-and-borrowing" component={AuthProtect(OldSavingAndBorrowing)}/>
        <Route exact path="/Old-decentralized-auctions" component={AuthProtect(DecentralizedAuctions)}/>
        <Route exact path="/Old-ended-auctions" component={AuthProtect(EndedAuctions)}/>
        <Route exact path="/q-governance/proposal/:contract?/:id?" component={AuthProtect(OneProposalPage)}/>
      </Switch>
    </AlertProvider>
  );
}

export default Routes;
