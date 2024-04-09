import styled from "styled-components";


export const MessageInfoStyled = styled.div`
    display: flex;
    align-items: center;

    img{
        width: 4em;
        height: 4em;
        margin-right: 1em;
        border-radius: 5px
    }

    .name{
        color: #393939;
        white-space: nowrap;
        margin-bottom: 0;
    }

    .id{
        color: #799283;
        margin: 0;
    }

    .join{
        white-space: nowrap;
        margin-top: 0;
    }
`