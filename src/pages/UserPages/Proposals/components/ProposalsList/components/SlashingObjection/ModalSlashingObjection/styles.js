import styled from 'styled-components'

export const SlashingObjectionContainer = styled.div`
  h6 {
    padding-bottom: 10px;
  }
  .action__buttons {
    float: right;
    div {
      float: right;
    }
  }
  .list-card__tow-colm {
    display: grid;
    grid-template-columns: 1fr 1fr;
    margin-bottom: 20px;
  }
  @media screen and (max-width: 1200px) {
    .list-card__tow-colm {
      grid-template-columns: 1fr;
    }
    .action__buttons {
      float: none;
      display: grid;
      grid-template-columns: 1fr;
      width: 50%;

      div {
        display: grid;
        grid-template-columns: 1fr;
      }
    }
  }
`
