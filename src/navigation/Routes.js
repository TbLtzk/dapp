import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import { AuthProtect } from './AuthProtect'
import { PROPOSALS_TYPES, AUCTIONS_TYPES } from 'constants/statuses'

import StartConfigurations from 'pages/StartConfigurations'
import Dashboard from '../pages/UserPages/Dashboard/Dashboard'
import Manage from '../pages/UserPages/Dashboard/Manage'
import Governance from '../pages/UserPages/Governance'
import Proposals from '../pages/UserPages/Proposals'
import Auctions from '../pages/UserPages/Auctions'
import QVault from '../pages/UserPages/QVault'
import Staking from '../pages/UserPages/Staking'
import OneProposalPage from '../pages/UserPages/OneProposalPage'
import SavingAndBorrowing from '../pages/UserPages/SavingAndBorrowing'
import TimeLocks from '../pages/UserPages/TimeLocks'

import AlertTemplate from 'components/Custom/Alerts/AlertTemplate'

function Routes () {
  const options = {
    position: positions.TOP_RIGHT,
    timeout: 100000,
    offset: '10px',
    transition: transitions.SCALE
  }

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <AlertProvider template={AlertTemplate} {...options}>
      <Switch>
        <Route exact path="/" component={AuthProtect(Dashboard)} />
        <Route exact path="/q-parameters" component={AuthProtect(Manage)} />
        <Route exact path="/start-configurations" component={StartConfigurations} />
      </Switch>
      <Switch>
        <Route exact path="/q-governance" component={AuthProtect(Governance)} />
        <Route
          exact
          path="/q-proposals"
          component={AuthProtect(Proposals, { proposalsType: PROPOSALS_TYPES.proposals })}
        />
        <Route
          exact
          path="/q-root-node-panel"
          component={AuthProtect(Proposals, { proposalsType: PROPOSALS_TYPES.rootNodePanel })}
        />
        <Route
          exact
          path="/q-expert-proposals"
          component={AuthProtect(Proposals, { proposalsType: PROPOSALS_TYPES.expertProposals })}
        />
        <Route
          exact
          path="/slashing-proposals"
          component={AuthProtect(Proposals, { proposalsType: PROPOSALS_TYPES.slashingProposals })}
        />
        <Route
          exact
          path="/liquidation"
          component={AuthProtect(Auctions, { auctionsType: AUCTIONS_TYPES.liquidation })}
        />
        <Route
          exact
          path="/system-debt"
          component={AuthProtect(Auctions, { auctionsType: AUCTIONS_TYPES.systemDebt })}
        />
        <Route
          exact
          path="/system-surplus"
          component={AuthProtect(Auctions, { auctionsType: AUCTIONS_TYPES.systemSurplus })}
        />
        <Route exact path="/q-vault" component={AuthProtect(QVault)} />
        <Route exact path="/staking" component={AuthProtect(Staking)} />
        <Route exact path="/saving-and-borrowing" component={AuthProtect(SavingAndBorrowing)} />
        <Route exact path="/time-locks" component={AuthProtect(TimeLocks)} />
        <Route exact path="/q-governance/proposal/:contract?/:id?" component={AuthProtect(OneProposalPage)} />
      </Switch>
    </AlertProvider>
  )
}

export default Routes
