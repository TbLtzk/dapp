import { useEffect, useState } from 'react';

import CustomBlock from 'components/Base/CustomBlock';
import ExplorerAddress from 'components/Custom/ExplorerAddress';

import useAnimateNumber from 'hooks/useAnimateNumber';
import useInterval from 'hooks/useInterval';

import { contractRegistryInstance } from 'contracts/contract-instance';

import { fetchBlockNumber } from 'func/useful';

const formatNumber = (num) => Math.round(num);

function Blockchain () {
  const [blockNumber, setBlockNumber] = useState(0);
  const blockNumberRef = useAnimateNumber(blockNumber, ' ', formatNumber);

  const getLatestBlock = () => {
    fetchBlockNumber('latest').then((blockNumber) => setBlockNumber(blockNumber));
  };

  useInterval(() => {
    getLatestBlock();
  }, 5000);

  useEffect(() => {
    getLatestBlock();
  }, []);

  return (
    <CustomBlock>
      <h1>Blockchain</h1>
      <h5>Block Height:</h5>
      <p ref={blockNumberRef}> 0</p>
      <h5>System Contract Registry:</h5>
      <ExplorerAddress address={contractRegistryInstance.address} />
    </CustomBlock>
  );
}

export default Blockchain;
