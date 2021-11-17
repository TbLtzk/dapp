import styled from 'styled-components'

import { indents } from 'constants/style'
import { Container } from 'react-bootstrap'

export const WrapContainer = styled(Container)`
  height: 100%;
  overflow: hidden;
  position: relative;
  background: ${(props) => props.theme.colors.oxfordBlue};
  padding: 0 ${indents['45']} 0 ${indents['40']};
`

export const Page = styled.div`
  display: flex;
  height: 100%;
`

export const WrapContent = styled.div`
  height: calc(100vh - 108px);
  min-height: 490px;
  max-width: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  
  &.wrap-content__tow-colm {
    display: grid;
    grid-template-columns: minmax(100px, 1fr) minmax(100px, 1fr);
    grid-column-gap: ${indents['15']};
  }

  &.wrap-content__column-2-1 {
    display: grid;
    grid-template-columns: minmax(100px, 2fr) minmax(100px, 1fr);
    grid-column-gap: ${indents['15']};
  }

  &.wrap-content__three-colm {
    display: grid;
    grid-template-columns: minmax(100px, 1fr) minmax(100px, 1fr) minmax(100px, 1fr);
    grid-column-gap: ${indents['15']};
  }
`
