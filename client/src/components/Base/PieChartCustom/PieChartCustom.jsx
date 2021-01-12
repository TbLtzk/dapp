import React, {useState, useEffect} from "react";
import {useSelector} from "react-redux";
import {rootMembersData} from "store/selectors/root-contract"

import {PieChart, Pie, Cell} from 'recharts';

import {circles} from "components/Custom/MembersPanel/RootNodePanel/constants"

import colors from "constants/colors"
import {WrapChart} from "./styles"

const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({cx, cy, midAngle, innerRadius, outerRadius, percent, index,}) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
};

function PieChartCustom(props) {
    const rootMembersArray = useSelector(rootMembersData);
    // const {data} = props;
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
                !transformData ? null :
                    <PieChart width={200} height={200}>
                      {/*<text x={108} y={102} dy={8} textAnchor="middle"*/}
                        <text x={"40%"} y={"50%"} dy={8} textAnchor="middle"

                              fill={colors.darkBlue}
                              fontSize="24"
                              fontWeight="bold"
                        >
                            {maxValue + '%'}
                        </text>
                        <Pie
                            data={transformData}
                            cx={"37%"}
                            // cx={100}
                            cy={"50%"}
                            // cy={100}
                            labelLine={false}
                            // label={renderCustomizedLabel}
                            innerRadius={47}
                            fill="#8884d8"
                            dataKey="value"
                        >
                            {rootMembersArray.map((entry, index) =>
                                <Cell
                                    key={`cell-${index}`}
                                    fill={circles[index % circles.length]}
                                />
                            )}
                        </Pie>
                    </PieChart>
            }
        </WrapChart>
    );
}

export default PieChartCustom;

