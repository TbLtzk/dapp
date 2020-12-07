import React, {useState, useEffect} from "react";
import {useSelector} from "react-redux";
import {rootMembersData} from "store/selectors/root-contract"

import {PieChart, Pie, Cell} from 'recharts';

import {WrapChart} from "./styles"
export const circles = ["#2C2B9C", "#F1F2FD" ];

function PieChartTwoItem(props) {
    const {data} = props;

    return (
        <WrapChart>
            {
                !data ? null :
                <PieChart width={100} height={100}>
                        <Pie
                            data={data}
                            cx={"34%"}
                            cy={"34%"}
                            labelLine={false}
                            innerRadius={20}
                            fill="#8884d8"
                            dataKey="value"
                        >
                            {data.map((entry, index) =>
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

export default PieChartTwoItem;

