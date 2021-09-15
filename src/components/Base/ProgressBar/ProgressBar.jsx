import React from 'react'
import { ProgressBarWrapper } from './styles'

const ProgressBar = ({ value }) => {
  return (
        <ProgressBarWrapper persentage={value}>
            <p>{value}%</p>
        </ProgressBarWrapper>
  )
}

export default ProgressBar

// green until 80%
// orange between 80% to 98%
// red above 98%

// (props) =>
//       props.persentage < 80
//         ? props.theme.colors.neonGreen
//         : props.persentage <= 98
//         ? props.theme.colors.validationError
//         : "red"
