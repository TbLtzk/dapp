import React, { useEffect } from 'react';
import { positions, Provider as AlertProvider, transitions } from 'react-alert';
import { Redirect, Route, Switch } from 'react-router-dom';

import * as Sentry from '@sentry/react';

import StyleLayout from 'components/Base/StyleLayout';
import AlertTemplate from 'components/Custom/Alerts/AlertTemplate';
import ErrorBoundary from 'components/Custom/ErrorBoundary';
import AccountAliasing from 'pages/AccountAliasing';
import Monitoring from 'pages/Monitoring';
import NotFound from 'pages/NotFound';
import OneAuctionPage from 'pages/OneAuctionPage';
import RootNodeStaking from 'pages/RootNodeStaking';
import ValidatorStaking from 'pages/ValidatorStaking';

import useFeatureFlag from 'hooks/useFeatureFlag';

import Auctions from '../pages/Auctions';
import Dashboard from '../pages/Dashboard/Dashboard';
import Manage from '../pages/Dashboard/Manage';
import Proposals from '../pages/Governance/Proposals';
import OneProposalPage from '../pages/OneProposalPage';
import QVault from '../pages/QVault';
import SavingAndBorrowing from '../pages/SavingAndBorrowing';
import TimeLocks from '../pages/TimeLocks';

import { store } from 'store/index';

import { AUCTIONS_TYPES, PROPOSALS_TYPES } from 'constants/statuses';
import ErrorHandler from 'func/ErrorHandler';

const options = {
  position: positions.TOP_RIGHT,
  timeout: 5000,
  offset: '10px',
  transition: transitions.SCALE,
  containerStyle: {
    zIndex: 9999
  }
};

function addSentryContext () {
  try {
    const { network, loadType } = store.getState().userInf;
    Sentry.setContext('additional', {
      network,
      loadType
    });
  } catch (error) {
    ErrorHandler.processWithoutFeedback(error);
  }
}

function Routes () {
  const isAliasesEnabled = useFeatureFlag('aliases');

  useEffect(() => {
    addSentryContext();
  }, []);

  return (
    <StyleLayout>
      <ErrorBoundary>
        <AlertProvider template={AlertTemplate} {...options}>
          <Switch>
            <Route exact path="/">
              <Dashboard />
            </Route>

            <Route exact path="/q-parameters">
              <Manage />
            </Route>

            <Route exact path="/monitoring">
              <Monitoring />
            </Route>

            <Route exact path="/q-governance">
              <Redirect to="/q-governance/q-proposals" />
            </Route>

            <Route exact path="/q-governance/q-proposals">
              <Proposals type={PROPOSALS_TYPES.proposals} />
            </Route>

            <Route exact path="/q-root-node-panel">
              <Proposals type={PROPOSALS_TYPES.rootNodePanel} />
            </Route>

            <Route exact path="/q-expert-proposals">
              <Proposals type={PROPOSALS_TYPES.expertProposals} />
            </Route>

            <Route exact path="/slashing-proposals">
              <Proposals type={PROPOSALS_TYPES.slashingProposals} />
            </Route>

            <Route exact path="/contract-updates">
              <Proposals type={PROPOSALS_TYPES.contractUpdates} />
            </Route>

            <Route
              exact
              path="/q-governance/proposal/:contract?/:id?"
              component={(props) => <OneProposalPage {...props} />}
            />

            <Route exact path="/q-vault">
              <QVault />
            </Route>

            <Route exact path="/root-node-staking">
              <RootNodeStaking />
            </Route>

            <Route exact path="/validator-staking">
              <ValidatorStaking />
            </Route>

            {isAliasesEnabled && (
              <Route exact path="/account-aliasing">
                <AccountAliasing />
              </Route>
            )}

            <Route exact path="/saving-and-borrowing">
              <SavingAndBorrowing />
            </Route>

            <Route exact path="/liquidation">
              <Auctions auctionsType={AUCTIONS_TYPES.liquidation} />
            </Route>

            <Route exact path="/system-debt">
              <Auctions auctionsType={AUCTIONS_TYPES.systemDebt} />
            </Route>

            <Route exact path="/system-surplus">
              <Auctions auctionsType={AUCTIONS_TYPES.systemSurplus} />
            </Route>

            <Route
              exact
              path="/auction/:contract?/:id?"
              component={(props) => <OneAuctionPage {...props} />}
            />

            <Route exact path="/time-locks">
              <TimeLocks />
            </Route>

            <Route component={NotFound} />
          </Switch>
        </AlertProvider>
      </ErrorBoundary>
    </StyleLayout>
  );
}

export default Routes;
