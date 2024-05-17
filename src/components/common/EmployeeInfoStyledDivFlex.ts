import styled from "styled-components";
import { EmployeeInfoStyledDivFlexInterface } from "../../interfaces/componentsInterface";


export const EmployeeInfoStyledDivFlex = styled.div<EmployeeInfoStyledDivFlexInterface>`
    width: 25%;
    display: flex;
    flex-direction: ${props => props.dir === 'col' ? 'column' : 'row'};
    padding: .5em;
    color: #393939;
    font-size: 1.2em;
    font-family: 'Poppins';
    font-weight: 800;
`