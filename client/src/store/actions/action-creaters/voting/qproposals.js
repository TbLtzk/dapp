import * as actionTypes from 'store/actions/action-types/voting/qproposals';

export const getQProposals = (drizzle) => ({
    type: actionTypes.GET_Q_PROPOSALS,
    drizzle
});

export const getQProposalsSuccess = (result) => ({
    type: actionTypes.GET_Q_PROPOSALS_SUCCESS,
    result,
});

export const getQProposalsError = (result) => ({
    type: actionTypes.GET_Q_PROPOSALS_ERROR,
    result,
});


export const getQProposal = (contract, id) => ({
    type: actionTypes.GET_Q_PROPOSAL,
    contract,
    id
});

export const getQProposalSuccess = (result) => ({
    type: actionTypes.GET_Q_PROPOSAL_SUCCESS,
    result,
});

export const getQProposalError = (result) => ({
    type: actionTypes.GET_Q_PROPOSAL_ERROR,
    result,
});
