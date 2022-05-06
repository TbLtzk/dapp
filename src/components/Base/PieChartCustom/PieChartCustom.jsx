import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { Cell, Pie, PieChart } from 'recharts';

import { WrapChart } from './styles';

import { rootMembersSelector } from 'store/root-node/selectors';

import colors from 'constants/colors';

function PieChartCustom () {
  const rootMembersArray = useSelector(rootMembersSelector);
  const [transformData, setTransformData] = useState(null);
  const [maxValue, setMaxValue] = useState(null);

  const arrayMax = (arr) => {
    return arr.reduce(function (p, v) {
      return (p > v?.share ? p : v?.share);
    }, 0);
  };

  useEffect(() => {
    if (rootMembersArray) {
      setTransformData(rootMembersArray.map((member, i) => {
        return {
          name: i,
          value: member?.share
        };
      }));
      const resMax = arrayMax(rootMembersArray);
      setMaxValue(resMax);
    }
  }, [rootMembersArray]);

  return (
    <WrapChart>
      {
        !transformData || maxValue === 0
          ? null
          : <PieChart width={200} height={200}>
            <text
              x={'40%'}
              y={'50%'}
              dy={8}
              textAnchor="middle"
              fill={colors.white}
              fontSize="24"
              fontWeight="bold"
            >
              {maxValue + '%'}
            </text>
            <Pie
              data={transformData}
              cx={'37%'}
              cy={'50%'}
              labelLine={false}
              innerRadius={47}
              fill="#8884d8"
              dataKey="value"
            >
              {rootMembersArray.map((entry, index) =>
                <Cell
                  key={`cell-${index}`}
                  fill={'#' + entry?.address?.slice(2, 8)}
                />
              )}
            </Pie>
          </PieChart>
      }
      {maxValue !== 0
        ? null
        : <div>
          <PieChart width={200} height={200}>
            <text
              x={'40%'}
              y={'50%'}
              dy={8}
              textAnchor="middle"
              fill={colors.oxfordBlueTint1}
              fontSize="24"
              fontWeight="bold"
            >
              {maxValue + '%'}
            </text>
            <Pie
              data={[{
                name: 0,
                value: 101
              }]}
              cx={'37%'}
              cy={'50%'}
              labelLine={false}
              innerRadius={47}
              fill="#9595A5"
              dataKey="value"
            />
          </PieChart>
        </div>
      }
    </WrapChart>
  );
}

export default PieChartCustom;
