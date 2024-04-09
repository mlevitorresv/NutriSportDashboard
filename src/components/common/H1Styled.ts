import styled from "styled-components";
import { H1PropsInterface } from "../../interfaces/componentsInterface";

export const H1Styled = styled.h1<H1PropsInterface>`
    font-size: 1.7em;
    font-weight: 600;
    font-family: 'poppins';
    display: inline;
    margin: 0 auto;
    grid-column: span 2;
    text-align: ${props => props.center? 'center' : ''}
`