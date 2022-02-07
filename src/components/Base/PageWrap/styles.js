import styled from 'styled-components'

import { indents } from 'constants/style'
import { Container } from 'react-bootstrap'
import { scrollbarStyle } from 'constants/globalStyle'

export const WrapContainer = styled(Container)`
  position: relative;
  height: calc(100vh - 80px);
  overflow-x: hidden;
  overflow-y: auto;

  background: ${(props) => props.theme.colors.oxfordBlue};
  padding: 0 ${indents['45']} 0 ${indents['40']};
`

export const Page = styled.div`
  height: 100%;
  .page__elements {
    display: flex;
  }
`

export const WrapContent = styled.div`
  min-height: 490px;
  max-width: 100%;
  ${scrollbarStyle}

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

  .wrap-content__colm-3 {
    display: flex;
    grid-template-columns: minmax(100px, 1fr) minmax(100px, 1fr) minmax(100px, 1fr);
    grid-column-gap: ${indents['15']};
  }
`
