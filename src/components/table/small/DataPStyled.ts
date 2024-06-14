import styled from "styled-components";
import { DataPStyledInterface } from "../../../interfaces/componentsInterface";


export const DataPStyled = styled.p<DataPStyledInterface>`
    width: ${props => props.type === 'name' ? '70%' : '30%'};
    font-weight: ${props => props.title ? 'bold' : ''};
`