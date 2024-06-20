import styled from "styled-components";
import { ProductInfoStyledDivInterface } from "../../interfaces/componentsInterface";


export const ProductInfoStyledDiv = styled.div<ProductInfoStyledDivInterface>`
    width: 80%;
    display: grid;
    grid-template-columns: ${props => props.col ? `repeat(${props.col}, 1fr)` : 'repeat(2, 50%)'};
    gap: 0px 20px;
    flex-direction: ${props => props.dir === 'col' ? 'column' : 'row'};
    padding: .5em;
    color: #393939;
    font-size: 1.2em;
    font-family: 'Poppins';
    font-weight: 800;
`