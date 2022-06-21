import parametersDictionary from 'json/parameters.json';

import CopyToClipboard from 'components/Base/CopyToClipboard';
import ExplorerAddress from 'components/Custom/ExplorerAddress';

import { useParametersContext } from '../..';

import { TableWrapper } from './styles';

import { fromWei } from 'func/balance';
import { formatAsset, formatDuration, formatFactor, formatNumber, formatPercent } from 'func/formatters';

function ParametersTable ({ parameters }) {
  const { simplified } = useParametersContext();

  const renderKey = (item) => {
    return simplified
      ? parametersDictionary[item.key]?.name || item.key
      : (
        <div>
          <span>{item.key}</span>
          <CopyToClipboard value={item.key} />
        </div>
      );
  };

  const renderValue = (item) => {
    const type = parametersDictionary[item.key]?.type;
    if (type === 'address' || item.type === 'ADDR') {
      return (
        <ExplorerAddress
          short={simplified}
          address={item.value}
          gnosisSafeAddress={item.gnosisSafeAddress}
        />
      );
    }

    if (!simplified) {
      return (
        <div>
          <span>{item.value}</span>
          <CopyToClipboard value={item.value} />
        </div>
      );
    }

    switch (type) {
      case 'number':
        return formatNumber(item.value, 4);
      case 'factor':
        return formatFactor(item.value);
      case 'period':
        return formatDuration(item.value);
      case 'fraction':
        return formatPercent(item.value);
      case 'rate':
        return `${formatNumber(fromWei(item.value), 2)}%`;
      case 'gas':
        return `${formatNumber(item.value, 2)} gas`;
      case 'Q':
      case 'QUSD':
        return formatAsset(item.value, type);
      default:
        return item.value;
    }
  };

  return (
    <TableWrapper $simplified={simplified}>
      <table>
        <tbody>
          {parameters.map((item, index) => (
            <tr key={item.key + index}>
              <td>{renderKey(item)}</td>
              <td>{renderValue(item)}</td>
              {!simplified && <td>{item.type}</td>}
            </tr>
          ))}
        </tbody>
      </table>
    </TableWrapper>
  );
}

export default ParametersTable;
