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
import { getLatestBlockNumber } from "func/useful";

const LIMIT = 10;
const BLOCKS_LIMIT = 100000;

function ProposalsLazyLoading({ proposals, proposalsKind, loading, errorMessage, activeTab, proposalsCount, types }) {
    const dispatch = useDispatch();

    const [blocks, setBlocks] = useState(null);
    const [index, setIndex] = useState(LIMIT);
    const [count, setCount] = useState(20);
    const [disableButton, setDisableButton] = useState(false);
    const [currentProposals, setCurrentProposals] = useState([]);
    const [loadingSpinner, setLoadingSpinner] = useState(true);

    useEffect(() => {
        getLatestBLocks();
        return () => dispatch(getProposalsList(proposalsKind, PROPOSAL_STATUS_TYPES.reset));
    }, [dispatch]);

    const getLatestBLocks = async () => {
        const latestBlockNumber = await getLatestBlockNumber();
        const blocks = [latestBlockNumber - BLOCKS_LIMIT, "latest"];
        setBlocks(blocks);
        dispatch(getProposalsList(proposalsKind, types, blocks));
    };

    function handleNextProposals() {
        const newIndex = index + LIMIT;
        const newList = concat(currentProposals, slice(proposals, index, newIndex));
        if (newIndex + LIMIT > proposals.length) {
            setCount(newIndex + LIMIT);
            if (proposals.length < proposalsCount) {
                fetchNextProposals();
            }
        }
        if (currentProposals.length === proposals.length) {
            setDisableButton(false);
        }
        setIndex(newIndex);
        setCurrentProposals(newList);
    }

    function fetchNextProposals() {
        const newBlocks = [blocks[0] - BLOCKS_LIMIT < 0 ? 0 : blocks[0] - BLOCKS_LIMIT, blocks[0]];
        setBlocks(newBlocks);
        dispatch(getProposalsList(proposalsKind, types, newBlocks));
    }

    function getProposals() {
        if (!currentProposals.length && !(proposals.length < count)) {
            setCurrentProposals(slice(proposals, 0, LIMIT));
            setDisableButton(true);
            setLoadingSpinner(false);
        }
        if (!proposalsCount) {
            setLoadingSpinner(false);
        }
        if (proposals.length < count && blocks[0] > 0) {
            fetchNextProposals();
        }
    }

    useEffect(() => {
        if (blocks) {
            getProposals();
        }
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

//types === "active"

export default ProposalsLazyLoading;
