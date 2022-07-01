import { lazy, Suspense, useEffect } from 'react';
import { positions, Provider as AlertProvider, transitions } from 'react-alert';
import { Redirect, Route, RouteComponentProps, Switch } from 'react-router-dom';

import * as Sentry from '@sentry/react';
import Toast from 'ui/Toast';

import StyleLayout from 'components/Base/StyleLayout';
import ErrorBoundary from 'components/Custom/ErrorBoundary';
import AccountAliasing from 'pages/AccountAliasing';
import DataPrivacy from 'pages/DataPrivacy';
import Governance from 'pages/Governance';
import Proposal from 'pages/Governance/Proposal';
import Imprint from 'pages/Imprint';
import Monitoring from 'pages/Monitoring';
import NotFound from 'pages/NotFound';
import OneAuctionPage from 'pages/OneAuctionPage';
import RootNodeStaking from 'pages/Staking/components/RootNodeStaking';
import Staking from 'pages/Staking';
import ValidatorStaking from 'pages/Staking/components/ValidatorStaking';

import useFeatureFlag from 'hooks/useFeatureFlag';

import Auctions from '../pages/Auctions';
import Dashboard from '../pages/Dashboard/Dashboard';
import Manage from '../pages/Dashboard/Manage';
import QVault from '../pages/QVault';
import SavingAndBorrowing from '../pages/SavingAndBorrowing';
import TimeLocks from '../pages/TimeLocks';

import { store } from 'store/index';

import { AUCTIONS_TYPES } from 'constants/statuses';
import ErrorHandler from 'func/ErrorHandler';

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

const UiKit = lazy(() => import('pages/UiKit'));

function Routes () {
  const isAliasesEnabled = useFeatureFlag('aliases');

  useEffect(() => {
    addSentryContext();
  }, []);

  return (
    <StyleLayout>
      <ErrorBoundary>
        <AlertProvider
          template={({ message, options, close }) => (
            <Toast
              type={options.type}
              text={String(message)}
              onClose={close}
            />
          )}
          position={positions.TOP_RIGHT}
          timeout={5000}
          transition={transitions.SCALE}
          containerStyle={{
            zIndex: '9999',
            pointerEvents: 'all',
            top: '80px',
            left: 'unset',
            right: '24px',
            gap: '16px'
          }}
        >
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

            <Route exact path="/governance">
              <Redirect to="/governance/q-proposals" />
            </Route>

            <Route exact path="/governance/:slug?">
              <Governance />
            </Route>

            <Route
              exact
              path="/governance/proposal/:contract?/:id?"
              component={(props: RouteComponentProps<any>) => <Proposal {...props} />}
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

            <Route exact path="/staking/:slug?">
              <Staking />
            </Route>

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
              component={(props: RouteComponentProps<any>) => <OneAuctionPage {...props} />}
            />

            <Route exact path="/time-locks">
              <TimeLocks />
            </Route>

            <Route exact path="/imprint">
              <Imprint />
            </Route>
            <Route exact path="/data-privacy">
              <DataPrivacy />
            </Route>

            <Route
              exact
              path="/ui-kit/:slug?"
              render={() => (
                <Suspense fallback={null}>
                  <UiKit />
                </Suspense>
              )}
            />

            <Route component={NotFound} />
          </Switch>
        </AlertProvider>
      </ErrorBoundary>
    </StyleLayout>
  );
}

export default Routes;
