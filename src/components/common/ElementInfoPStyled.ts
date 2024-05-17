import styled from "styled-components";
import { ElementInfoPStyledInterface } from "../../interfaces/componentsInterface";


export const ElementInfoPStyled = styled.div<ElementInfoPStyledInterface>`
    font-family: 'Poppins';
    font-size: ${props => props.size === 'small' ? '.7em' : '.9'};
    color: ${props => props.size === 'small' ? '#828282' : 'black'};
    font-weight: normal;
`