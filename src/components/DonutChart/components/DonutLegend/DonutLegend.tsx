import { HTMLAttributes } from 'react';

import ExplorerAddress from 'components/Custom/ExplorerAddress';

import { DonutLegendItem } from '../../types';

import { LegendContainer } from './styles';

import { isAddress } from 'utils/web3';

interface Props extends HTMLAttributes<HTMLDivElement> {
  items: DonutLegendItem[];
  colors: string[];
}

function DonutLegend ({ items }: Props) {
  const hasIcon = items.some(({ icon }) => icon);

  return (
    <LegendContainer>
      {items.map((item) => (
        <div key={item.label} className="donut-legend-item">
          <div
            className="donut-legend-color"
            style={{ backgroundColor: item.color }}
          />

          <div className="donut-legend-lbl">
            {hasIcon && (
              <div className="donut-legend-icon">{item.icon}</div>
            )}
            {isAddress(item.label)
              ? (
                <ExplorerAddress
                  short
                  semibold
                  className="text-md"
                  address={item.label}
                />
              )
              : <p className="text-md font-semibold ellipsis">{item.label}</p>
            }
          </div>

          <p className="donut-legend-val text-md">{item.percent}</p>
          <p className="donut-legend-val text-md">{item.value}</p>
        </div>
      ))}
    </LegendContainer>
  );
};

export default DonutLegend;
