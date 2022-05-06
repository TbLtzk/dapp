import styled from 'styled-components';

export const WrapContainer = styled.div`
  background-color: ${(props) => props?.theme?.colors?.oxfordBlue || '#07172B'};
  color: ${(props) => props?.theme?.colors?.white || '#FFFFF'};
  flex-direction: ${(p) => p?.direction};
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: auto;
  margin-right: auto;
  height: ${(p) => p?.height ? p.height : 'calc(100vh - 70px)'} ;
`;
