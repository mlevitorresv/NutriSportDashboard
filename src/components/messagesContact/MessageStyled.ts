import styled from "styled-components";


export const MessageStyled = styled.div`
    display: flex;
    flex-direction: column;
    padding: 1em;
    width: 20em;
    border: 1px solid #EBEBEB;
    border-radius: 20px;

    .bottom{
        display: flex;
        justify-content: space-between;
        width: 100%;
        align-items: end;
    }

    .comment{
        font-size: .9em;
        font-family: 'Poppins';
        color: #4E4E4E;
    }

    .check{
        color: #5AD07A;
        width: 2em;
        cursor: pointer;
    }

    .remove{
        color: #E23428;
        width: 2em;
        cursor: pointer;
    }
`