import styled from 'styled-components'

import {Container} from "react-bootstrap";

import {colors, indents} from "constants/style";

export const WrapContainer = styled.div`
    background-color: ${colors.main};
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
`;
