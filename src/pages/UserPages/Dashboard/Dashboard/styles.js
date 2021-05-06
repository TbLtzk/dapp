import styled from 'styled-components';

import { Row } from 'react-bootstrap';

export const WrapContainer = styled.div`
  padding-top: 30px;
`;

export const Title = styled.p`
 ${(props) => props.theme.fontStyles.title.subtitle};
`;
export const TitleNotAlign = styled.p`
 ${(props) => props.theme.fontStyles.title.subtitle};
 margin-bottom: 0;
`;

export const BlockAlign = styled.div`
   p:first-child{
    margin-bottom: 3px;
    color: ${props => props.theme.colors.grey};
   }
   p{
    ${(props) => props.theme.fontStyles.text.middle};
    word-wrap: break-word;
    overflow-wrap: break-word;
   }
   a{
     color: ${props => props.theme.colors.white};
     text-decoration: none;
     &:hover {
       text-decoration: revert;
     }
   }
`;

export const BlockAlignBlock = styled(BlockAlign)`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;
