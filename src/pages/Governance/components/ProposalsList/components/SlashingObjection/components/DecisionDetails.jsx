import React from 'react';

import ListDetails from './ListDetails';

function DecisionDetails ({ decision }) {
  const list = [
    {
      title: 'Current Decision Proposer',
      value: decision.proposer
    },
    {
      title: 'Current Decision End Time',
      value: decision.endDate
    },
    {
      title: 'Remark',
      value: decision.externalReference,
      link: true
    },
    {
      title: 'Adjusted Slashing Percentage',
      value: decision.percentage + ' %'
    },
    {
      title: 'Current Confirmation Count',
      value: decision.confirmationCount
    },
    {
      title: 'Required Confirmations',
      value: decision.requiredConfirmations
    },
    {
      title: 'Current Confirmation Percentage',
      value: decision.currentConfirmationPercentage + ' %'
    }
  ];

  return (
    <div>
      <h6>Decision</h6>
      <ListDetails list={list} />
    </div>
  );
}

export default DecisionDetails;
