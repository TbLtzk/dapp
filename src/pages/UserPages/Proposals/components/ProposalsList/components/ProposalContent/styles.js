import styled from 'styled-components'

export const ProposalContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 2fr;

  @media screen and (max-width: 1150px) {
    display: flex;
    flex-direction: column;
    align-self: flex-start;
  }
`

export const ContentWrapper = styled.div`
  text-align: center;
  .content__item {
    display: inline-block;
    text-align: left;
    opacity: ${(p) => p.opacity};
    user-select: none;
    &:hover {
      cursor: "pointer";
    }
  }
`
