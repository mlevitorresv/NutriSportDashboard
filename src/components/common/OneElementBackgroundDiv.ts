import styled from "styled-components";
import { OneElementBackgroundDivInterface } from "../../interfaces/componentsInterface";


export const OneElementBackgroundDiv = styled.div<OneElementBackgroundDivInterface>`
    width: 80%;
    margin: 0 10%;
    display: flex;
    flex-direction: ${props => props.direction ? props.direction : 'row'};
    justify-content: space-around;
    align-items: ${props => props.direction == 'column' ? 'center' : ''};
;
`