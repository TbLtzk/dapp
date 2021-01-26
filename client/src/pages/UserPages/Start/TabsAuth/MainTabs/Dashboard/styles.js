import styled from 'styled-components';

import { Row } from 'react-bootstrap';

export const WrapTab = styled(Row)`
  padding-top: 14px;
`;
export const WrapContainer = styled.div`
  padding-top: 30px;
`;

export const Title = styled.p`
 ${(props) => props.theme.fontStyles.title.subtitle};
 text-align: center;
`;

export const BlockAlign = styled.div`
 text-align: center;
   p:first-child{
    margin-bottom: 3px;
   }
   p{
    word-wrap: break-word;
   }
   a{
     color: ${props => props.theme.colors.main};
     text-decoration: none;
   }
`;
