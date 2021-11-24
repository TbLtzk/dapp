/* eslint-disable */
import React, { useEffect, useState } from "react";

import LoadingSpinner from "components/Base/LoadingSpinner";
import { LoadingWrap } from "constants/style";
import Button from "components/Base/Buttons/Button";
import { PROPOSAL_STATUS_TYPES } from "constants/statuses";
import { useDispatch } from "react-redux";
import { getProposalsList } from "store/voting/proposals/action-creators";
import ProposalsList from "./ProposalsList";
import { slice, concat } from "lodash";

const LIMIT = 9;
const PROPOSALS_LIMIT = 18;

function ProposalsLazyLoading({ proposals, proposalsKind, loading, errorMessage, activeTab, proposalsCount, types }) {
    const dispatch = useDispatch();

    const [range, setRange] = useState([0, 6]);
    const [index, setIndex] = useState(LIMIT);
    const [count, setCount] = useState(20);
    const [disableButton, setDisableButton] = useState(false);
    const [currentProposals, setCurrentProposals] = useState([]);
    const [loadingSpinner, setLoadingSpinner] = useState(true);

    useEffect(() => {
        dispatch(getProposalsList(proposalsKind, types, range));
        return () => dispatch(getProposalsList(proposalsKind, PROPOSAL_STATUS_TYPES.reset));
    }, [dispatch]);

    function handleNextProposals() {
        const newIndex = index + LIMIT;
        const newList = concat(currentProposals, slice(proposals, index, newIndex));
        if (newIndex + PROPOSALS_LIMIT > proposals.length) {
            setCount(newIndex + PROPOSALS_LIMIT);
            fetchNextProposals();
        }
        if (currentProposals.length === proposals.length) {
            setDisableButton(false);
        }
        setIndex(newIndex);
        setCurrentProposals(newList);
    }

    function fetchNextProposals() {
        const newRange = [range[0] + 6, range[1] + 6];
        setRange(newRange);
        dispatch(getProposalsList(proposalsKind, types, newRange));
    }

    function getProposals() {
        if (index === LIMIT) {
            setCurrentProposals(slice(proposals, 0, LIMIT));
        }
        if (proposals.length) {
            setDisableButton(true);
            setLoadingSpinner(false);
        }
    }

    useEffect(() => {
        getProposals();
    }, [proposals]);

    return (
        <div>
            {errorMessage ? (
                <p>Error loading proposals</p>
            ) : !loadingSpinner && !currentProposals.length ? (
                <p>No proposals</p>
            ) : (
                <ProposalsList
                    currentProposals={currentProposals}
                    proposalsKind={proposalsKind}
                    activeTab={activeTab}
                />
            )}
            {loadingSpinner ? (
                <LoadingWrap>
                    <LoadingSpinner />
                </LoadingWrap>
            ) : null}
            {disableButton ? (
                <LoadingWrap>
                    <Button title="Show more" handleButton={handleNextProposals} />
                </LoadingWrap>
            ) : null}
        </div>
    );
}

export default ProposalsLazyLoading;
