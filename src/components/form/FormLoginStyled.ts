import styled from "styled-components";


export const FormLoginStyled = styled.form`
    width: 30em;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    padding: 4em 2em;
    background-color: white;
    border: 1px solid #E23428;
    border-radius: 30px;

    box-shadow: 10px 10px 10px #E23428;

    .loginForm__image{
        width: 150px;
        height: 150px;
        margin: 0 auto;
    }

    &:hover{
        border: 1px solid #135846;
        box-shadow: 10px 10px 10px #135846;
    }
`