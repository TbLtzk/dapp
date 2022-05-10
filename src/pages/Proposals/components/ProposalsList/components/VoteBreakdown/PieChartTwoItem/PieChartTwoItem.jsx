import React from 'react';

import { Cell, Pie, PieChart } from 'recharts';

import colors from 'constants/colors';

export const circles = [colors.white, colors.oxfordBlueTint2];

const PieChartTwoItem = ({ data }) => (
  <div>
    {data
      ? (
        <PieChart width={60} height={60}>
          <Pie
            data={data}
            cx={''}
            cy={''}
            labelLine={false}
            innerRadius={23}
            outerRadius={29}
            fill="#8884d8"
            stroke={0}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={circles[index % circles.length]} />
            ))}
          </Pie>
        </PieChart>
      )
      : (
        <PieChart width={60} height={60}>
          <Pie
            data={[
              {
                name: 'For',
                value: 100
              }
            ]}
            cx={''}
            cy={''}
            labelLine={false}
            innerRadius={23}
            outerRadius={29}
            stroke={0}
            fill={colors.oxfordBlueTint3}
            dataKey="value"
          ></Pie>
        </PieChart>
      )}
  </div>
);

export default PieChartTwoItem;
