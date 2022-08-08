import { lazy, Suspense, useEffect } from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router-dom';

import * as Sentry from '@sentry/react';

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
import Dashboard from '../pages/Dashboard';
import Manage from '../pages/Parameters';
import QVault from '../pages/QVault';
import SavingAndBorrowing from '../pages/SavingAndBorrowing';
import TimeLocks from '../pages/TimeLocks';

import { store } from 'store/index';

import { captureError } from 'utils/errors';

function addSentryContext () {
  try {
    const { network, loadType } = store.getState().userInf;
    Sentry.setContext('additional', {
      network,
      loadType,
    });
  } catch (error) {
    captureError(error);
  }
}

const UiKit = lazy(() => import('pages/UiKit'));

function Routes () {
  const isAliasesEnabled = useFeatureFlag('aliases');

  useEffect(() => {
    addSentryContext();
  }, []);

  return (
    <ErrorBoundary>
      <Switch>
        <Route exact path="/">
          <Dashboard />
        </Route>

        <Route exact path="/q-parameters/:type?">
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
    </ErrorBoundary>
  );
}

export default Routes;
