import styled from 'styled-components'

export const AccordionElementsWrapper = styled.div`
  margin: ${(p) => p.margin};

  .accordion__header {
    color: ${(props) => props.theme.colors.oxfordBlueTint3};
    display: flex;
    width: 100px;
    justify-content: space-between;
    font-size: 14px;

    .accordion__title {
      display: block;
    }
    .accordion__icon {
      transform: rotate(${(props) => (props.state ? '180deg' : '0')});
      transition-duration: 0.1s;
      transition-property: transform;
    }
  }

  button {
    margin: 0;
    padding: 0;
    background: transparent;
    color: ${(props) => props.theme.colors.white};
    border: none;
  }
`
