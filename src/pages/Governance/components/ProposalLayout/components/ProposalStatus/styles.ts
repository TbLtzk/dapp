import styled from 'styled-components';

export const StyledStatus = styled.p`
  display: flex;
  align-items: center;
  font-size: 13px;
  line-height: 18px;
  color: ${(props) => props.theme.colors.oxfordBlueTint3};
  border: 1px solid ${(props) => props.theme.colors.oxfordBlueTint3};
  border-radius: 13px;
  padding: 1px 9px;
  margin-left: 10px;
  margin-bottom: 0 !important;

  &.executed,
  &.passed,
  &.accepted {
    border-color: ${(props) => props.theme.colors.neonGreen};
    color: ${(props) => props.theme.colors.neonGreen};
  }

  &.rejected,
  &.expired {
    border-color: ${(props) => props.theme.colors.validationError};
    color: ${(props) => props.theme.colors.validationError};
  }

  &.pending {
    border-color: ${(props) => props.theme.colors.yellow};
    color: ${(props) => props.theme.colors.yellow};
  }
`;
