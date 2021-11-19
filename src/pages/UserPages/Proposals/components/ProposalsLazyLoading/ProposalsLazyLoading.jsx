/* eslint-disable */
import React, { useEffect, useState } from "react";

import LoadingSpinner from "components/Base/LoadingSpinner";
import { LoadingWrap } from "constants/style";
import ProposalsList from "./ProposalsList";
import { useDispatch } from "react-redux";
import { getProposalsList } from "store/voting/proposals/action-creators";
import Button from "components/Base/Buttons/Button";
import { slice, concat } from "lodash";
import { PROPOSAL_STATUS_TYPES } from "constants/statuses";
import { getLatestBlockNumber } from "func/useful";

const LIMIT = 10;

function ProposalsLazyLoading({ proposals, proposalsKind, loading, errorMessage, activeTab, proposalsCount, types }) {
    const dispatch = useDispatch();

    const [list, setList] = useState([]);
    const [index, setIndex] = useState(LIMIT);
    const [disableButton, setDisableButton] = useState(false);

    const [allProposals, setAllProposals] = useState([]);

    const [blocks, setBlocks] = useState(null); // [500000, "latest"], [400000, 500000]

    useEffect(() => {
        getLatestBLocks();
        return () => dispatch(getProposalsList(proposalsKind, PROPOSAL_STATUS_TYPES.reset));
    }, [dispatch]);

    const getLatestBLocks = async () => {
        const latestBlockNumber = await getLatestBlockNumber();
        const blocks = [latestBlockNumber - 50000, "latest"];
        setBlocks(blocks);
        if (proposalsCount < LIMIT) {
            dispatch(getProposalsList(proposalsKind, types, [0, "latest"]));
            setDisableButton(true);
        } else {
            dispatch(getProposalsList(proposalsKind, types, blocks));
        }
    };

    function getNextProposals() {
        const newIndex = index + LIMIT;

        const showMore = newIndex < allProposals.length - 1;
        const newList = concat(list, slice(allProposals, index, newIndex));

        setIndex(newIndex);
        setList(newList);
    }

    function fetchNextProposals() {
        const newBlocks = [blocks[0] - 50000 < 0 ? 0 : blocks[0] - 50000, blocks[0]];
        setBlocks(newBlocks);
        dispatch(getProposalsList(proposalsKind, types, newBlocks));
    }

    function getProposals() {
        if (!list.length) {
            setList(slice(proposals, 0, LIMIT));
        }
        if (proposals.length < index && blocks[0] > 0) {
            fetchNextProposals();
        }
        // else {
        //     const arrivedProposals = slice(proposals, allProposals.length);
        //     setAllProposals([...allProposals, ...arrivedProposals]);
        // }
    }

    useEffect(() => {
        setList(slice(proposals, 0, LIMIT));
    }, [proposals]);

    // useEffect(() => {
    //     if (!!blocks) {
    //         getProposals();
    //     }
    //     setAllProposals([allProposals, ...proposals]);
    // }, [proposals]);

    return (
        <div>
            {errorMessage ? (
                <p>Error loading proposals</p>
            ) : !loading && !proposals.length ? (
                <p>No proposals</p>
            ) : (
                <div>
                    <ProposalsList currentProposals={list} proposalsKind={proposalsKind} activeTab={activeTab} />
                    {loading ? (
                        <LoadingWrap>
                            <LoadingSpinner />
                        </LoadingWrap>
                    ) : null}
                    {disableButton ? null : (
                        <LoadingWrap>
                            <Button title="Show more" handleButton={getNextProposals} />
                        </LoadingWrap>
                    )}
                </div>
            )}
        </div>
    );
}

export default ProposalsLazyLoading;
