import styled from 'styled-components'

export const SlashingObjectionContainer = styled.div`
  .list-card__tow-colm {
    display: grid;
    grid-template-columns: 1fr 1fr;
    margin-bottom: 20px;
  }
  @media screen and (max-width: 1150px) {
    .list-card__tow-colm {
      grid-template-columns: 1fr;
    }
  }
`
