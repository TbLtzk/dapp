import { lazy, Suspense, useEffect } from 'react';
import { positions, Provider as AlertProvider, transitions } from 'react-alert';
import { Route, RouteComponentProps, Switch } from 'react-router-dom';

import * as Sentry from '@sentry/react';
import Toast from 'ui/Toast';

import Layout from 'components/Base/Layout';
import ErrorBoundary from 'components/Custom/ErrorBoundary';
import AccountAliasing from 'pages/AccountAliasing';
import Auction from 'pages/Auctions/components/Auction';
import NewAuction from 'pages/Auctions/components/NewAuction';
import DataPrivacy from 'pages/DataPrivacy';
import Governance from 'pages/Governance';
import NewProposal from 'pages/Governance/NewProposal';
import Proposal from 'pages/Governance/Proposal';
import Imprint from 'pages/Imprint';
import Monitoring from 'pages/Monitoring';
import NotFound from 'pages/NotFound';
import Staking from 'pages/Staking';

import useFeatureFlag from 'hooks/useFeatureFlag';

import Auctions from '../pages/Auctions';
import Dashboard from '../pages/Dashboard/Dashboard';
import Manage from '../pages/Dashboard/Manage';
import QVault from '../pages/QVault';
import SavingAndBorrowing from '../pages/SavingAndBorrowing';
import TimeLocks from '../pages/TimeLocks';

import { store } from 'store/index';

import ErrorHandler from 'func/ErrorHandler';

function addSentryContext () {
  try {
    const { network, loadType } = store.getState().userInf;
    Sentry.setContext('additional', {
      network,
      loadType,
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
    <Layout>
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
            zIndex: '10001',
            pointerEvents: 'all',
            top: '80px',
            left: 'unset',
            right: '24px',
            gap: '12px',
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

            <Route exact path="/governance/:type/new">
              <NewProposal />
            </Route>

            <Route exact path="/governance/:type?">
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

            <Route exact path="/auctions/:type?">
              <Auctions />
            </Route>

            <Route exact path="/auctions/:type/new">
              <NewAuction />
            </Route>

            <Route
              exact
              path="/auction/:type?/:slug?"
              component={Auction}
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
    </Layout>
  );
}

export default Routes;
