import React from 'react';
import PropTypes from 'prop-types';

import Header from 'components/Navigations/Header';
import QGovernance from './QGovernance';
import PiggyBank from './PiggyBank';
import Staking from './Staking';
import ManageStakerRewardPool from './ManageStakerRewardPool';
import SavingAndBorrowing from './SavingAndBorrowing';
import EndedProposals from './QGovernance/EndedProposals';
import EndedAuctions from './SavingAndBorrowing/DecentralizedAuctions/EndedAuctions';
import LoadingTransaction from 'components/Custom/LoadingTransaction';
import OneProposalPage from './QGovernance/OneProposalPage';

import { WrapContainer } from './styles';
import DecentralizedAuctions from './SavingAndBorrowing/DecentralizedAuctions';

export default function UserPages(props) {
  const { location, match } = props;

  const componentSwitcher = () => {
    // if (location.pathname.includes("/proposal/")){
    if (location.pathname.includes("/q-governance/proposal/")){
      return <OneProposalPage params={match.params}/>
    }else {
      switch (location.pathname) {
        case '/q-governance':
          return <QGovernance/>;
        case '/piggy-bank':
          return <PiggyBank/>;
        case '/staking':
          return <Staking/>;
        case '/manage-staker-reward-pool':
          return <ManageStakerRewardPool/>;
        case '/saving-and-borrowing':
          return <SavingAndBorrowing/>;
        case '/ended-proposals':
          return <EndedProposals/>;
        case '/ended-auctions':
          return <EndedAuctions/>;
        case '/decentralized-auctions':
          return <DecentralizedAuctions/>;
        default:
          return <QGovernance/>;
      }
    }
  };

  return (
    <>
      <Header/>
      <WrapContainer fluid>
        {componentSwitcher()}
      </WrapContainer>
      <LoadingTransaction/>
    </>
  );
}

UserPages.propTypes = {
  location: PropTypes.object,
};

UserPages.defaultProps = {
  location: '',
};
