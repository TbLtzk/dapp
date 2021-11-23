// /* eslint-disable */
// import Button from "components/Base/Buttons/Button";
// import { PROPOSAL_STATUS_TYPES } from "constants/statuses";
// import { LoadingWrap } from "constants/style";
// import React, { useEffect, useState } from "react";
// import { useDispatch } from "react-redux";
// import { getProposalsList } from "store/voting/proposals/action-creators";
// import ProposalsList from "./ProposalsList";
// import { slice, concat } from "lodash";
// import { getLatestBlockNumber } from "func/useful";

// const LIMIT = 10;
// const BLOCKS_LIMIT = 50000;

// function EndedProposals({ proposals, proposalsKind, loading, errorMessage, activeTab, proposalsCount, types }) {
//     const dispatch = useDispatch();

//     const [list, setList] = useState([]);
//     const [index, setIndex] = useState(LIMIT);
//     const [disableButton, setDisableButton] = useState(true);
//     const [count, setCount] = useState(20);

//     const [blocks, setBlocks] = useState(null);

//     useEffect(() => {
//         getLatestBLocks();
//         return () => dispatch(getProposalsList(proposalsKind, PROPOSAL_STATUS_TYPES.reset));
//     }, [dispatch]);

//     const getLatestBLocks = async () => {
//         const latestBlockNumber = await getLatestBlockNumber();
//         const blocks = [latestBlockNumber - BLOCKS_LIMIT, "latest"];
//         setBlocks(blocks);
//         dispatch(getProposalsList(proposalsKind, types, blocks));
//     };

//     function handleNextProposals() {
//         const newIndex = index + LIMIT;
//         const newList = concat(list, slice(proposals, index, newIndex));
//         if (newIndex + LIMIT > proposals.length) {
//             setCount(newIndex + LIMIT);
//             if (proposals.length < proposalsCount) {
//                 fetchNextProposals();
//             }
//         }
//         setIndex(newIndex);
//         setList(newList);
//     }

//     function fetchNextProposals() {
//         const newBlocks = [blocks[0] - BLOCKS_LIMIT < 0 ? 0 : blocks[0] - BLOCKS_LIMIT, blocks[0]];
//         setBlocks(newBlocks);
//         dispatch(getProposalsList(proposalsKind, types, newBlocks));
//     }

//     function getProposals() {
//         if (!list.length && !(proposals.length < count)) {
//             setList(slice(proposals, 0, LIMIT));
//         }
//         if (proposals.length < count && blocks[0] > 0) {
//             fetchNextProposals();
//         }
//     }

//     useEffect(() => {
//         if (blocks) {
//             getProposals();
//         }
//     }, [proposals]);

//     return (
//         <div>
//             <div>
//                 <ProposalsList currentProposals={list} proposalsKind={proposalsKind} activeTab={activeTab} />

//                 {disableButton ? (
//                     <LoadingWrap>
//                         <Button title="Show more" handleButton={handleNextProposals} />
//                     </LoadingWrap>
//                 ) : null}
//             </div>
//         </div>
//     );
// }

// export default EndedProposals;
