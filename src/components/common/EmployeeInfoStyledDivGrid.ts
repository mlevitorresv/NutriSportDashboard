import styled from "styled-components";
import { EmployeeInfoStyledDivGridInterface } from "../../interfaces/componentsInterface";


export const EmployeeInfoStyledDivGrid = styled.div<EmployeeInfoStyledDivGridInterface>`
    width:${props => props.col ? '100%' : '40%;'};
    display: grid;
    grid-template-columns: ${props => props.col ? 'repeat(' + props.col  + ', 1fr);' : 'repeat(2, 1fr);'}
    align-items: center;
    max-height: 225px;
    padding: .5em;
    color: #393939;
    font-size: 1.2em;
    font-family: 'Poppins';
    font-weight: 800;
`