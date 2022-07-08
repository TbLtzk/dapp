import { HTMLAttributes, useMemo } from 'react';
import { Doughnut } from 'react-chartjs-2';

import { ArcElement, Chart, ChartData, Legend, Tooltip } from 'chart.js';
import { useTheme } from 'styled-components';

import DonutLegend from './components/DonutLegend';
import DonutTooltip from './components/DonutTooltip';
import useDonutTooltip from './hooks/useDonutTooltip';
import { getDonutChartColor } from './colors';
import { DonutChartContainer } from './styles';
import { DonutOption } from './types';

import { formatNumber, formatPercent } from 'func/formatters';

Chart.register(ArcElement, Tooltip, Legend);

interface Props extends HTMLAttributes<HTMLDivElement> {
  options: DonutOption[]
  totalLabel?: string;
  maxSections?: number;
  formatValue?: (val: string | number) => string;
}

function DonutChart ({
  options,
  totalLabel,
  maxSections = 5,
  formatValue = formatNumber,
  ...rest
}: Props) {
  const theme = useTheme();
  const { tooltipOpts, updateTooltip } = useDonutTooltip();

  const arcColors = [
    getDonutChartColor(theme, 'section1'),
    getDonutChartColor(theme, 'section2'),
    getDonutChartColor(theme, 'section3'),
    getDonutChartColor(theme, 'section4'),
    getDonutChartColor(theme, 'section5'),
    getDonutChartColor(theme, 'section6'),
  ];

  const chartOptions = useMemo(() => {
    const result = options.slice(0, maxSections);
    if (options.length > maxSections) {
      result.push({
        label: 'Other',
        value: options.slice(maxSections)
          .reduce((acc, cur) => acc + cur.value, 0),
      });
    }

    return result;
  }, [options, maxSections]);

  const totalValue = useMemo(() => {
    return options.reduce((acc, curr) => acc + curr.value, 0);
  }, [options]);

  const legendItems = useMemo(() => {
    return chartOptions.map((option, i) => ({
      color: arcColors[i % arcColors.length],
      label: option.label,
      icon: option.icon,
      value: formatValue(option.value),
      percent: formatPercent(option.value / totalValue * 100),
    }));
  }, [chartOptions, arcColors]);

  const chartData: ChartData<'doughnut'> = {
    labels: chartOptions.map(({ label }) => label),
    datasets: [
      {
        data: chartOptions.map(({ value }) => value),
        borderColor: getDonutChartColor(theme, 'border'),
        hoverBorderColor: getDonutChartColor(theme, 'border'),
        borderWidth: 4,
        backgroundColor: arcColors,
        hoverBackgroundColor: arcColors,
      }
    ]
  };

  if (options.length === 0) return null;

  return (
    <DonutChartContainer {...rest}>
      <div className="donut-chart-wrp">
        <Doughnut
          className="donut-chart"
          data={chartData}
          options={{
            cutout: '75%',
            plugins: {
              legend: { display: false },
              tooltip: { enabled: false, external: updateTooltip }
            }
          }}
        />

        {totalLabel && (
          <div className="donut-total">
            <p className="text-md font-light">{totalLabel}</p>
            <p className="text-md font-semibold">{formatValue(totalValue)}</p>
          </div>
        )}

        {chartOptions[tooltipOpts.index] && (
          <DonutTooltip
            option={chartOptions[tooltipOpts.index]}
            style={tooltipOpts.style}
            position={tooltipOpts.position}
            percent={legendItems[tooltipOpts.index]?.percent}
          />
        )}
      </div>

      <DonutLegend items={legendItems} colors={arcColors} />
    </DonutChartContainer>
  );
};

export default DonutChart;
