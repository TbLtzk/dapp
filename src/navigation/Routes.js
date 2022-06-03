import React, { useEffect } from 'react';
import { positions, Provider as AlertProvider, transitions } from 'react-alert';
import { Route, Switch } from 'react-router-dom';

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

import Auctions from '../pages/Auctions';
import Dashboard from '../pages/Dashboard/Dashboard';
import Manage from '../pages/Dashboard/Manage';
import Governance from '../pages/Governance';
import OneProposalPage from '../pages/OneProposalPage';
import Proposals from '../pages/Proposals';
import QVault from '../pages/QVault';
import SavingAndBorrowing from '../pages/SavingAndBorrowing';
import TimeLocks from '../pages/TimeLocks';

import { store } from 'store/index';

import { isAliasesEnabled } from 'constants/config';
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
  useEffect(() => {
    addSentryContext();
  }, []);

  return (
    <StyleLayout>
      <ErrorBoundary>
        <AlertProvider template={AlertTemplate} {...options}>
          <Switch>
            <Route
              exact
              path="/"
              component={(props) => <Dashboard {...props} />}
            />
            <Route
              exact
              path="/q-parameters"
              component={(props) => <Manage {...props} />}
            />
            <Route
              exact
              path="/q-governance"
              component={(props) => <Governance {...props} />}
            />
            <Route
              exact
              path="/monitoring"
              component={(props) => <Monitoring {...props} />}
            />
            <Route
              exact
              path="/q-proposals"
              component={(props) => <Proposals type={PROPOSALS_TYPES.proposals} {...props} />}
            />
            <Route
              exact
              path="/q-root-node-panel"
              component={(props) => <Proposals type={PROPOSALS_TYPES.rootNodePanel} {...props} />}
            />
            <Route
              exact
              path="/q-expert-proposals"
              component={(props) => <Proposals type={PROPOSALS_TYPES.expertProposals} {...props} />}
            />
            <Route
              exact
              path="/slashing-proposals"
              component={(props) => <Proposals type={PROPOSALS_TYPES.slashingProposals} {...props} />}
            />
            <Route
              exact
              path="/contract-updates"
              component={(props) => <Proposals type={PROPOSALS_TYPES.contractUpdates} {...props} />}
            />
            <Route
              exact
              path="/liquidation"
              component={(props) => <Auctions auctionsType={AUCTIONS_TYPES.liquidation} {...props} />}
            />
            <Route
              exact
              path="/system-debt"
              component={(props) => <Auctions auctionsType={AUCTIONS_TYPES.systemDebt} {...props} />}
            />
            <Route
              exact
              path="/system-surplus"
              component={(props) => <Auctions auctionsType={AUCTIONS_TYPES.systemSurplus} {...props} />}
            />
            <Route
              exact
              path="/q-vault"
              component={(props) => <QVault {...props} />}
            />
            <Route
              exact
              path="/root-node-staking"
              component={(props) => <RootNodeStaking {...props} />}
            />
            <Route
              exact
              path="/validator-staking"
              component={(props) => <ValidatorStaking {...props} />}
            />

            <Route
              exact
              path="/saving-and-borrowing"
              component={(props) => <SavingAndBorrowing {...props} />}
            />
            <Route
              exact
              path="/time-locks"
              component={(props) => <TimeLocks {...props} />}
            />
            <Route
              exact
              path="/auction/:contract?/:id?"
              component={(props) => <OneAuctionPage {...props} />}
            />
            <Route
              exact
              path="/q-governance/proposal/:contract?/:id?"
              component={(props) => <OneProposalPage {...props} />}
            />
            {isAliasesEnabled && (
              <Route
                exact
                path="/account-aliasing"
                component={(props) => <AccountAliasing {...props} />}
              />
            )}
            <Route component={NotFound} />
          </Switch>
        </AlertProvider>
      </ErrorBoundary>
    </StyleLayout>
  );
}

export default Routes;
