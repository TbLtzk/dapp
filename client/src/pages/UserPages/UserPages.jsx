import React from 'react';
import PropTypes from 'prop-types';

import Header from 'components/Navigations/Header';
import QGovernance from './QGovernance';
import PiggyBank from './PiggyBank';
import Staking from './Staking';
import ManageStakerRewardPool from './ManageStakerRewardPool';
import SavingAndBorrowing from './SavingAndBorrowing';
import EndedProposals from "./QGovernance/EndedProposals";

import { WrapContainer } from './styles';

export default function UserPages(props) {
  const { location } = props;

  const componentSwitcher = () => {
    switch (location.pathname) {
      case '/q-governance':
        return <QGovernance />;
      case '/piggy-bank':
        return <PiggyBank />;
      case '/staking':
        return <Staking />;
      case '/manage-staker-reward-pool':
        return <ManageStakerRewardPool />;
      case '/saving-and-borrowing':
        return <SavingAndBorrowing />;
      case '/ended-proposals':
        return <EndedProposals />;
      default:
        return <QGovernance />;
    }
  };

  return (
    <>
      <Header />
      <WrapContainer fluid>
        {componentSwitcher()}
      </WrapContainer>
    </>
  );
}

UserPages.propTypes = {
  location: PropTypes.object,
};

UserPages.defaultProps = {
  location: '',
};
