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
export const TitleNotAlign = styled.p`
 ${(props) => props.theme.fontStyles.title.subtitle};
 margin-bottom: 0;
`;

export const BlockAlign = styled.div`
 text-align: center;
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
     color: ${props => props.theme.colors.main};
     text-decoration: none;
   }
`;

export const BlockAlignBlock = styled(BlockAlign)`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 100%;
  padding-top: 13px;
  padding-bottom: 13px;
  overflow-wrap: break-word;
  word-wrap: break-word;
  word-break: break-all;
  word-break: break-word;
  hyphens: auto;

  > div:first-child{
    height: 100%;
  }
`;
