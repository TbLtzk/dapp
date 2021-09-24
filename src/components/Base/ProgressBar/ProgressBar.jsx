import React from 'react'
import { ProgressBarWrapper } from './styles'

const ProgressBar = ({ value }) => {
  return (
        <ProgressBarWrapper value={value}>
            <span> </span>
            {value}%
        </ProgressBarWrapper>
  )
}

export default ProgressBar
