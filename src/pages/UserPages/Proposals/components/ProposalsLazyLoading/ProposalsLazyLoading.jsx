/* eslint-disable */
import React, { useEffect, useState } from "react";

import LoadingSpinner from "components/Base/LoadingSpinner";
import { LoadingWrap } from "constants/style";
import ProposalsList from "./ProposalsList";
import { useDispatch } from "react-redux";
import { getProposalsList } from "store/voting/proposals/action-creators";
import Button from "components/Base/Buttons/Button";
import { slice, concat } from "lodash";

const LIMIT = 10;

function ProposalsLazyLoading({ proposals, proposalsKind, loading, errorMessage, activeTab, proposalsCount, types }) {
    const dispatch = useDispatch();

    const [list, setList] = useState([]);
    const [index, setIndex] = useState(LIMIT);

    const [blocks, setBlocks] = useState([550000, "latest"]); // [500000, "latest"], [400000, 500000]
    const [allProposals, setAllProposals] = useState([]);

    function getNextProposals() {
        const newIndex = index + LIMIT;
        console.log('new index', newIndex)
      
        const showMore = newIndex < allProposals.length - 1;
        const newList = concat(list, slice(allProposals, index, newIndex));
        console.log('new list', newList)
        setIndex(newIndex);
        setList(newList);
        if (!showMore) {
            console.log('going to fetch proposals')
            fetchNextProposals();
        }
    }

    function fetchNextProposals() {
        if (blocks[0]) {
            const newBlocks = [blocks[0] - 50000, blocks[0]];
            setBlocks(newBlocks);
            dispatch(getProposalsList(proposalsKind, types, newBlocks));
        }
    }

    function getProposals() {
        if (!(proposals.length === allProposals.length)) {
            if (!list.length) {
                // console.log("first time");
                setList(slice(proposals, 0, LIMIT));
                setAllProposals([...allProposals, ...proposals]);
            } else {
                const arrivedProposals = slice(proposals, allProposals.length);
                // console.log("else", arrivedProposals);
                setAllProposals([...allProposals, ...arrivedProposals]);
                getNextProposals();
            }
        }
    }

    useEffect(() => {
        dispatch(getProposalsList(proposalsKind, types, blocks));
    }, [dispatch]);

    useEffect(() => {
        getProposals();
    }, [proposals]);

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
                    {proposals.length === proposalsCount || loading ? null : (
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
