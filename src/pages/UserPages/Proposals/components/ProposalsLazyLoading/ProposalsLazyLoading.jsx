/* eslint-disable */
import React from "react";

import LoadingSpinner from "components/Base/LoadingSpinner";
import { LoadingWrap } from "constants/style";
import ActiveProposals from "./ActiveProposals";
import EndedProposals from "./EndedProposals";

function ProposalsLazyLoading({ proposals, proposalsKind, loading, errorMessage, activeTab, proposalsCount, types }) {
    return (
        <div>
            {errorMessage ? (
                <p>Error loading proposals</p>
            ) : types === "active" ? (
                <ActiveProposals
                    proposalsCount={proposalsCount}
                    proposalsKind={proposalsKind}
                    activeTab={activeTab}
                    proposals={proposals}
                    activeTab={activeTab}
                    types={types}
                />
            ) : (
                <EndedProposals
                    proposalsCount={proposalsCount}
                    proposalsKind={proposalsKind}
                    activeTab={activeTab}
                    proposals={proposals}
                    activeTab={activeTab}
                    types={types}
                />
            )}
            {loading ? (
                <LoadingWrap>
                    <LoadingSpinner />
                </LoadingWrap>
            ) : !loading && !proposalsCount ? (
                <p>No proposals</p>
            ) : null}
        </div>
    );
}

export default ProposalsLazyLoading;

/* <EndedProposals
                    proposalsKind={proposalsKind}
                    activeTab={activeTab}
                    proposals={proposals}
                    activeTab={activeTab}
                    types={types}
                /> */
