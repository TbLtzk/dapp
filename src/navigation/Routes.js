import React, { useLayoutEffect } from 'react'
import { Route, Switch, useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import { PROPOSALS_TYPES, AUCTIONS_TYPES, LOAD_TYPES } from 'constants/statuses'
import { loadTypeSelector } from 'store/user-inf/selectors'

import StartConfigurations from 'pages/StartConfigurations'
import Dashboard from '../pages/UserPages/Dashboard/Dashboard'
import Manage from '../pages/UserPages/Dashboard/Manage'
import Governance from '../pages/UserPages/Governance'
import Proposals from '../pages/UserPages/Proposals'
import Auctions from '../pages/UserPages/Auctions'
import QVault from '../pages/UserPages/QVault'
import OneProposalPage from '../pages/UserPages/OneProposalPage'
import SavingAndBorrowing from '../pages/UserPages/SavingAndBorrowing'
import TimeLocks from '../pages/UserPages/TimeLocks'

import AlertTemplate from 'components/Custom/Alerts/AlertTemplate'
import RootNodeStaking from 'pages/UserPages/RootNodeStaking'
import ValidatorStaking from 'pages/UserPages/ValidatorStaking'
import OneAuctionPage from 'pages/UserPages/OneAuctionPage'
import NotFound from 'pages/UserPages/NotFound'
import Monitoring from 'pages/UserPages/Monitoring'
import ErrorBoundary from 'components/Custom/ErrorBoundary'
import StyleLayout from 'components/Base/StyleLayout'

const options = {
  position: positions.TOP_RIGHT,
  timeout: 5000,
  offset: '10px',
  transition: transitions.SCALE,
  containerStyle: {
    zIndex: 9999
  }
}

function Routes () {
  const history = useHistory()
  const loadType = useSelector(loadTypeSelector)

  useLayoutEffect(() => {
    if (loadType !== LOAD_TYPES.loaded) {
      history.push('/start-configurations')
    }
  }, [history, loadType])

  return (
    <StyleLayout>
      <ErrorBoundary>
        <AlertProvider template={AlertTemplate} {...options}>
          <Switch>
            <Route exact path="/" component={() => <Dashboard />} />
            <Route exact path="/q-parameters" component={() => <Manage />} />
            <Route exact path="/start-configurations" component={() => <StartConfigurations />} />
            <Route exact path="/q-governance" component={() => <Governance />} />
            <Route exact path="/monitoring" component={() => <Monitoring />} />
            <Route
              exact
              path="/q-proposals"
              component={() => <Proposals proposalsType={PROPOSALS_TYPES.proposals} />}
            />
            <Route
              exact
              path="/q-root-node-panel"
              component={() => <Proposals proposalsType={PROPOSALS_TYPES.rootNodePanel} />}
            />
            <Route
              exact
              path="/q-expert-proposals"
              component={() => <Proposals proposalsType={PROPOSALS_TYPES.expertProposals} />}
            />
            <Route
              exact
              path="/slashing-proposals"
              component={() => <Proposals proposalsType={PROPOSALS_TYPES.slashingProposals} />}
            />
            <Route
              exact
              path="/contract-updates"
              component={() => <Proposals proposalsType={PROPOSALS_TYPES.contractUpdates} />}
            />
            <Route exact path="/liquidation" component={() => <Auctions auctionsType={AUCTIONS_TYPES.liquidation} />} />
            <Route exact path="/system-debt" component={() => <Auctions auctionsType={AUCTIONS_TYPES.systemDebt} />} />
            <Route
              exact
              path="/system-surplus"
              component={() => <Auctions auctionsType={AUCTIONS_TYPES.systemSurplus} />}
            />
            <Route exact path="/q-vault" component={() => <QVault />} />
            <Route exact path="/root-node-staking" component={() => <RootNodeStaking />} />
            <Route exact path="/validator-staking" component={() => <ValidatorStaking />} />

            <Route exact path="/saving-and-borrowing" component={() => <SavingAndBorrowing />} />
            <Route exact path="/time-locks" component={() => <TimeLocks />} />
            <Route exact path="/auction/:contract?/:id?" component={() => <OneAuctionPage />} />
            <Route exact path="/q-governance/proposal/:contract?/:id?" component={() => <OneProposalPage />} />
            <Route component={NotFound} />
          </Switch>
        </AlertProvider>
      </ErrorBoundary>
    </StyleLayout>
  )
}

export default Routes
