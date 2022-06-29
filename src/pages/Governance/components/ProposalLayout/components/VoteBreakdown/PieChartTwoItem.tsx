import { Cell, Pie, PieChart } from 'recharts';

const circles = ['#FFFFFF', '#3C516A'];

const PieChartTwoItem = ({ data }: { data: any[] | null }) => (
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
            {data.map((_, index) => (
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
            fill="#6D7C8F"
            dataKey="value"
          ></Pie>
        </PieChart>
      )}
  </div>
);

export default PieChartTwoItem;
