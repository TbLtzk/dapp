import React from 'react'
import { Block } from './styles'

const CustomBlock = ({ children, style, onClick }) => (
    <Block onClick={onClick} style={style}>
        {children}
    </Block>
)

export default CustomBlock
