import { useTranslation } from 'react-i18next';

import parametersDictionary from 'json/parameters.json';

import CopyToClipboard from 'components/CopyToClipboard';
import ExplorerAddress from 'components/Custom/ExplorerAddress';

import { TableWrapper } from './styles';

import { fromWei } from 'utils/balance';
import { formatAsset, formatDuration, formatFactor, formatFraction, formatNumber } from 'utils/formatters';

interface Props {
  parameters: any[];
  simplified: boolean;
}

function ParametersTable ({ parameters, simplified }: Props) {
  const { t } = useTranslation();

  const renderKey = (item: any) => {
    return simplified
      ? (parametersDictionary as any)[item.key]?.name || item.key
      : (
        <div>
          <span>{item.key}</span>
          <CopyToClipboard value={item.key} />
        </div>
      );
  };

  const renderValue = (item: any) => {
    const type = (parametersDictionary as any)[item.key]?.type;
    if (type === 'address' || item.type === 'ADDR') {
      return (
        <ExplorerAddress
          short={simplified}
          address={item.value}
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
        return formatFraction(item.value);
      case 'rate':
        return `${formatNumber(fromWei(item.value), 2)}%`;
      case 'gas':
        return `${formatNumber(item.value, 2)} ${t('GAS')}`;
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
