import * as actionTypes from 'store/actions/action-types/voting/expert-voting';

export const getQExpertProposals = (drizzle) => ({
    type: actionTypes.GET_QEXPERT_PROPOSALS,
    drizzle
});

export const getQExpertProposalsSuccess = (result) => ({
    type: actionTypes.GET_QEXPERT_PROPOSALS_SUCCESS,
    result,
});

export const getQExpertProposalsError = (result) => ({
    type: actionTypes.GET_QEXPERT_PROPOSALS_ERROR,
    result,
});

export const getQExpertProposal = (contract, id) => ({
    type: actionTypes.GET_QEXPERT_PROPOSAL,
    contract,
    id
});

export const getQExpertProposalSuccess = (result) => ({
    type: actionTypes.GET_QEXPERT_PROPOSAL_SUCCESS,
    result,
});

export const getQExpertProposalError = (result) => ({
    type: actionTypes.GET_QEXPERT_PROPOSAL_ERROR,
    result,
});

