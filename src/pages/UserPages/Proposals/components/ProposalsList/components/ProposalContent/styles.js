import styled from 'styled-components'

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
