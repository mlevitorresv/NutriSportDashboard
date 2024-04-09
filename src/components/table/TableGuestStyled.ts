import styled from "styled-components";



export const TableGuestStyled = styled.table`
    background-color: white;
    border: none;
    border-radius: 12px;
    width: 80%;
    margin: 2% 10%;
    padding: 1em;
    font-family: 'Poppins';
    text-align: left;

    &.user{
        border-collapse: separate;
        border-spacing: 2em 0;
    }

    &.room{
        border-collapse: separate;
        border-spacing: 3em 0;
    }

    &.rev{
        border-collapse: separate;
        border-spacing: 3em 0;

        && .comment{
            width: 18em;
        }
    }
`