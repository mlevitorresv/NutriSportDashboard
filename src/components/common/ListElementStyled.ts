import styled from "styled-components";


export const ListElementStyled = styled.li`
    padding: 1em;
    border-bottom: 1px solid #6e6e6e;
    display: inline;
    font-size: 1em;
    font-family: 'Poppins';
    color: #6e6e6e;

    &.active{
        color: #5AD07A;
        border-bottom: 1px solid #5AD07A;
    }
`