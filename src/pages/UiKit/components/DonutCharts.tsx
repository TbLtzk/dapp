import { useState } from 'react';

import { uniqueId } from 'lodash';

import AddressIcon from 'components/Custom/AddressIcon';
import Button from 'ui/Button';
import DonutChart from 'ui/DonutChart';
import { DonutOption } from 'ui/DonutChart/types';

import { formatNumber } from 'utils/formatters';
import { trimAddress } from 'utils/strings';

function DonutCharts () {
  const [options, setOptions] = useState<DonutOption[]>([
    {
      label: trimAddress('0xB1Dd4DCd904cFF847a3dE3687a0F9f1BF7eD9BF1'),
      value: 4234534.21,
      icon: <AddressIcon address="0xB1Dd4DCd904cFF847a3dE3687a0F9f1BF7eD9BF1" />
    },
    {
      label: trimAddress('0x6E366a6248E6324b2eff80aA7A9cD74e67C0118d'),
      value: 4234534.12,
      icon: <AddressIcon address="0x6E366a6248E6324b2eff80aA7A9cD74e67C0118d" />
    },
    {
      label: trimAddress('0xBADA551878e60B7D9173452695c1b3D190c3a3DC'),
      value: 3242123.11,
      icon: <AddressIcon address="0xBADA551878e60B7D9173452695c1b3D190c3a3DC" />
    },
    {
      label: trimAddress('0x6A39B688d591Ea00C9EA69658438794204B5cC62'),
      value: 2342543.1,
      icon: <AddressIcon address="0x6A39B688d591Ea00C9EA69658438794204B5cC62" />
    },
    {
      label: trimAddress('0x64D4edeFE8bA86d3588B213b0A053e7B910Cad68'),
      value: 1245443.12,
      icon: <AddressIcon address="0x64D4edeFE8bA86d3588B213b0A053e7B910Cad68" />
    },
    {
      label: trimAddress('0xB1Dd4DCd904cFF847a3dE3687a0F9f1BF7eD9BF1'),
      value: 1234534.21,
      icon: <AddressIcon address="0xB1Dd4DCd904cFF847a3dE3687a0F9f1BF7eD9BF1" />
    }
  ]);

  return (
    <div className="block">
      <h2 className="text-h2">Donut Charts</h2>
      <div className="block-content">
        <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
          <Button onClick={() => setOptions(prev => [{ value: 1000000, label: uniqueId() }, ...prev])}>
            Add option
          </Button>

          <Button look="danger" onClick={() => setOptions(prev => prev.slice(1))}>
            Remove option
          </Button>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 400px)',
            gap: '48px',
            justifyContent: 'space-between',
            alignItems: 'start'
          }}
        >
          <DonutChart
            options={options}
            totalLabel="Total Stake"
            formatValue={(value) => `${formatNumber(value, 2)} Q`}
          />

          <DonutChart
            options={options}
            totalLabel="Total Stake (3)"
            maxSections={3}
            formatValue={(value) => `${formatNumber(value, 2)} Q`}
          />

          <DonutChart options={options.map(({ icon: _, ...opt }) => opt)} />
        </div>
      </div>
    </div>
  );
}

export default DonutCharts;
