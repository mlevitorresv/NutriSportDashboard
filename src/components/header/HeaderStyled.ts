import styled from "styled-components";

interface HeaderStyledPropsInterface {
    headerWidth?: string,
}

export const HeaderStyled = styled.header<HeaderStyledPropsInterface>`
    width: ${props => props.headerWidth};
    float: right;
    background-color: white;
    box-shadow: 0px 3px 10px #00000005;
    display: flex;
    justify-content: space-between;
    padding: 1em 0em;
    margin-bottom: 2em;
`