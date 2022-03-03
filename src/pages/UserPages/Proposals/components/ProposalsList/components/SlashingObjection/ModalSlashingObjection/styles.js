import styled from 'styled-components'

export const SlashingObjectionContainer = styled.div`
  .list-card__tow-colm {
    display: grid;
    grid-template-columns: 1fr 1fr;
    margin-bottom: 20px;
  }

  h6 {
    padding-bottom: 10px;
  }
  .action__buttons {
    float: right;

    div {
      display: flex;
    }
  }

  @media screen and (max-width: 1150px) {
    .list-card__tow-colm {
      grid-template-columns: 1fr;
    }
    .action__buttons {
      float: none;
      display: flex;
      flex-direction: column;
      div {
        display: flex;
        flex-direction: column;
        grid-template-columns: 1fr;
      }
    }
  }

  @media screen and (max-width: 1250px) {
    .action__buttons {
      float: none;
      display: flex;

      div {
        display: flex;
        flex-direction: column;
        grid-template-columns: 1fr;
      }
    }
  }
`
