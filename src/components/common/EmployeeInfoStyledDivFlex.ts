import styled from "styled-components";
import { EmployeeInfoStyledDivFlexInterface } from "../../interfaces/componentsInterface";


export const EmployeeInfoStyledDivFlex = styled.div<EmployeeInfoStyledDivFlexInterface>`
    width: ${props => props.box === 'grid' ? '50%' : '25%'};
    display: ${props => props.box === 'grid' ? 'grid' : 'flex'};
    grid-template-columns: repeat(2, 50%);
    gap: 0px 20px;
    flex-direction: ${props => props.dir === 'col' ? 'column' : 'row'};
    padding: .5em;
    color: #393939;
    font-size: 1.2em;
    font-family: 'Poppins';
    font-weight: 800;
`