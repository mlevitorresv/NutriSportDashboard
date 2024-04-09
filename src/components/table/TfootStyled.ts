import styled from "styled-components";


export const TfootStyled = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 80%;
    margin: auto 10%;


    & .container-pagination {
        gap: 0.5em;
        display: flex;
        color: #135846;
      }
    
      & .pagination {
        display: flex;
        list-style: none;
        padding: 0;
        gap: 1em;
      }
    
      & .pagination li {
        margin-right: 5px;
      }
    
      & .pagination a {
        text-decoration: none;
        padding: 1em;
        border: 1px solid #ddd;
        color: #333;
        font-size: .7em;
        background-color: transparent;
        border: none;
        border-radius: 12px;
        cursor: pointer;
      }
    
      & .pagination .active a {
        background-color: #135846;
        color: #fff;
      }
`