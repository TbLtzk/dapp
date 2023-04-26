import { lazy, Suspense, useEffect } from 'react';
import { Redirect, Route, RouteComponentProps, Switch } from 'react-router-dom';

import * as Sentry from '@sentry/react';
import { ProposalContractType } from 'typings/contracts';
import { Asset } from 'typings/defi';

import ErrorBoundary from 'components/Custom/ErrorBoundary';
import AccountAliasing from 'pages/AccountAliasing';
import Auction from 'pages/Auctions/components/Auction';
import NewAuction from 'pages/Auctions/components/NewAuction';
import DataPrivacy from 'pages/DataPrivacy';
import Governance from 'pages/Governance';
import VotingPower from 'pages/Governance/components/VotingPower';
import NewProposal from 'pages/Governance/NewProposal';
import Proposal from 'pages/Governance/Proposal';
import Imprint from 'pages/Imprint';
import NotFound from 'pages/NotFound';
import SavingBorrowing from 'pages/SavingBorrowing';
import BorrowingPair from 'pages/SavingBorrowing/BorrowingPair';
import Staking from 'pages/Staking';
import ManageDelegations from 'pages/Staking/components/DelegationStaking/components/ManageDelegations';
import ValidatorManage from 'pages/Staking/components/ValidatorStaking/components/ManageValidator';
import Validator from 'pages/Staking/components/ValidatorStaking/components/Validator';

import useNetworkConfig from 'hooks/useNetworkConfig';

import Auctions from '../pages/Auctions';
import Dashboard from '../pages/Dashboard';
import Manage from '../pages/Parameters';
import QVault from '../pages/QVault';
import TimeLocks from '../pages/TimeLocks';

import { getState } from 'store';

import { RoutePaths } from 'constants/routes';
import { captureError } from 'utils/errors';

function addSentryContext () {
  try {
    const { chainId, loadType } = getState().user;
    Sentry.setContext('additional', {
      network: chainId,
      loadType,
    });
  } catch (error) {
    captureError(error);
  }
}

const UiKit = lazy(() => import('pages/UiKit'));

function Routes () {
  const { featureFlags } = useNetworkConfig();

  useEffect(() => {
    addSentryContext();
  }, []);

  return (
    <ErrorBoundary>
      <Switch>
        <Route exact path={['/', '/dashboard/:slug']}>
          <Dashboard />
        </Route>

        <Route exact path="/q-parameters/:type?">
          <Manage />
        </Route>

        <Route exact path="/governance/:type/new">
          <NewProposal />
        </Route>

        <Route exact path={RoutePaths.votingPower}>
          <VotingPower />
        </Route>

        <Route exact path={RoutePaths.governanceTab}>
          <Governance />
        </Route>

        <Route
          exact
          path={[RoutePaths.proposal, '/q-governance/proposal/:contract?/:id?']}
          component={(props: RouteComponentProps<{ id: string; contract: ProposalContractType }>) => (
            <Proposal {...props} />
          )}
        />

        <Route exact path={RoutePaths.qVault}>
          <QVault />
        </Route>

        {featureFlags.aliases && (
          <Route exact path="/account-aliasing">
            <AccountAliasing />
          </Route>
        )}

        <Route
          exact
          path={RoutePaths.stakingSlug}
          component={Staking}
        />

        <Route
          exact
          path={[RoutePaths.stakingValidatorManage, RoutePaths.stakingValidatorStakeRewarPoolManage]}
          component={ValidatorManage}
        />

        <Route
          exact
          path={RoutePaths.stakingValidatorSlug}
          component={Validator}
        />

        <Route exact path={RoutePaths.stakingDelegationsSlug}>
          <ManageDelegations />
        </Route>

        <Route exact path={RoutePaths.savingBorrowingTab}>
          <SavingBorrowing />
        </Route>

        <Route
          exact
          path={RoutePaths.borrowingPair}
          component={(props: RouteComponentProps<{
            collateral: Asset;
            borrow: 'QUSD';
          }>) => (
            <BorrowingPair {...props} />
          )}
        />

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

        <Route exact path={RoutePaths.timeLocksTab}>
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

        {/* Old governance routes for backward compatibility */}
        <Route exact path="/q-governance">
          <Redirect to={RoutePaths.governance} />
        </Route>

        <Route exact path="/q-proposals">
          <Redirect to={RoutePaths.qProposals} />
        </Route>

        <Route exact path="/q-root-node-panel">
          <Redirect to={RoutePaths.rootNodePanel} />
        </Route>

        <Route exact path="/q-expert-proposals">
          <Redirect to={RoutePaths.expertProposals} />
        </Route>

        <Route exact path="/slashing-proposals">
          <Redirect to={RoutePaths.slashingProposals} />
        </Route>

        <Route exact path="/contract-updates">
          <Redirect to={RoutePaths.contractUpdates} />
        </Route>

        <Route component={NotFound} />
      </Switch>
    </ErrorBoundary>
  );
}

export default Routes;
