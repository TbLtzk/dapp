import styled from 'styled-components';

export const ColorTitle = styled.div`
  font-size: 13px;
  line-height: 18px;
  color: ${(props) => {
    switch (props.color) {
      case 'white':
        return props.theme.colors.white;
      case 'dark':
        return props.theme.colors.oxfordBlueTint2;
      default:
        return props.theme.colors.white;
    }
  }};
`;

export const VoteBreakdownContainer = styled.div`
  position: relative;

  .vote-breakdown__items {
    display: grid;
    grid-template-columns: 1fr 1fr;

    h3 {
      margin-top: 35px;
    }
  }

  .list-card__line {
    position: absolute;
  }

  .vote-breakdown__requirement-objection {
    margin-top: 90px;
  }

  @media screen and (max-width: 1150px) {
    display: flex;
    flex-direction: column;
    .vote-breakdown__items {
      grid-template-columns: 1fr;
    }

    h3 {
      display: none;
    }

    .vote-breakdown__requirement-quorum,
    .vote-breakdown__requirement-objection {
      margin-top: 20px;
    }

    .list-card__line {
      display: none;
    }
  }
`;

export const Circle = styled.div`
  display: inline-block;
  width: 10px;
  height: 10px;
  background-color: ${(props) => {
    switch (props.color) {
      case 'circle-white':
        return props.theme.colors.white;
      case 'circle-dark':
        return props.theme.colors.oxfordBlueTint2;
      default:
        return props.theme.colors.white;
    }
  }};
  border-radius: 50%;
  margin-right: 7px;
`;
