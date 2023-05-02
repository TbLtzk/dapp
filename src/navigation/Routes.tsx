import { lazy, useEffect } from 'react';
import { Redirect, Route, RouteComponentProps, Switch } from 'react-router-dom';

import * as Sentry from '@sentry/react';
import { ProposalContractType } from 'typings/contracts';
import { Asset } from 'typings/defi';

import LazyLoading from 'components/Base/LazyLoading';
import ErrorBoundary from 'components/Custom/ErrorBoundary';

import useNetworkConfig from 'hooks/useNetworkConfig';

import { getState } from 'store';

import { RoutePaths } from 'constants/routes';
import { captureError } from 'utils/errors';

const TimeLocks = lazy(() => import('pages/TimeLocks'));
const QVault = lazy(() => import('pages/QVault'));
const Manage = lazy(() => import('pages/Parameters'));
const Dashboard = lazy(() => import('pages/Dashboard'));
const Auctions = lazy(() => import('pages/Auctions'));

const AccountAliasing = lazy(() => import('pages/AccountAliasing'));
const Auction = lazy(() => import('pages/Auctions/components/Auction'));
const NewAuction = lazy(() => import('pages/Auctions/components/NewAuction'));
const DataPrivacy = lazy(() => import('pages/DataPrivacy'));
const Governance = lazy(() => import('pages/Governance'));
const VotingPower = lazy(() => import('pages/Governance/components/VotingPower'));
const NewProposal = lazy(() => import('pages/Governance/NewProposal'));
const Proposal = lazy(() => import('pages/Governance/Proposal'));
const Imprint = lazy(() => import('pages/Imprint'));
const NotFound = lazy(() => import('pages/NotFound'));
const SavingBorrowing = lazy(() => import('pages/SavingBorrowing'));
const BorrowingPair = lazy(() => import('pages/SavingBorrowing/BorrowingPair'));
const Staking = lazy(() => import('pages/Staking'));
const ManageDelegations = lazy(() => import('pages/Staking/components/DelegationStaking/components/ManageDelegations'));
const ValidatorManage = lazy(() => import('pages/Staking/components/ValidatorStaking/components/ManageValidator'));
const Validator = lazy(() => import('pages/Staking/components/ValidatorStaking/components/Validator'));

function addSentryContext () {
  try {
    const { chainId } = getState().user;
    Sentry.setContext('additional', { network: chainId });
  } catch (error) {
    captureError(error);
  }
}

function Routes () {
  const { featureFlags } = useNetworkConfig();

  useEffect(() => {
    addSentryContext();
  }, []);

  return (
    <ErrorBoundary>
      <LazyLoading>
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

          <Route component={NotFound} />

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
        </Switch>
      </LazyLoading>
    </ErrorBoundary>
  );
}

export default Routes;
