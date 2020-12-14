import * as actionTypes from 'store/actions/action-types/voting/qproposals';

/* getQExpertProposals */
export const getQExpertProposals = (contracts) => ({
    type: actionTypes.GET_QEXPERT_PROPOSALS,
    contracts
});

export const getQExpertProposalsSuccess = (result) => ({
    type: actionTypes.GET_QEXPERT_PROPOSALS_SUCCESS,
    result,
});

export const getQExpertProposalsError = (result) => ({
    type: actionTypes.GET_QEXPERT_PROPOSALS_ERROR,
    result,
});

