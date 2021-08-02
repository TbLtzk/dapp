import React from 'react'
import { PieChart } from 'react-minimal-pie-chart'

import { WrapChart } from './styles'

function PieChartCustom (props) {
  const { data } = props

  return (
        <WrapChart>
            {
                !data
                  ? null
                  : <PieChart
                        data={[
                          { title: 'One', value: 10, color: '#283FFF', style: { strokeWidth: 9 } },
                          { title: 'Two', value: 40, color: '#FFA000', style: { strokeWidth: 10 } },
                          { title: 'Three', value: 20, color: '#FF5A3A', style: { strokeWidth: 12 } },
                          { title: 'Four', value: 30, color: '#00C3F8', style: { strokeWidth: 8 } }
                        ]}
                        startAngle={40}
                        // segmentsShift={(index) => (index === 1 ? 2 : 0)}
                        lengthAngle={360}
                        paddingAngle={0}
                        animation
                        animationDuration={500}
                        animationEasing="ease-out"
                        center={[50, 50]}
                        lineWidth={40}
                        viewBoxSize={[100, 100]}
                        // label={({ dataEntry }) => dataEntry.value}
                        // radius={PieChart.defaultProps.radius - 6}
                        // segmentsStyle={{ transition: 'stroke .3s', cursor: 'pointer' }}
                    >
                        <p style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0 }}>64%</p>
                    </PieChart>
            }
        </WrapChart>
  )
}

export default PieChartCustom
