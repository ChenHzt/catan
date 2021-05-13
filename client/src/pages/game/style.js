import styled from "styled-components";

export const StyledGridContainer = styled.div`
    display:grid;
    height:100%;

    background: url(/static/images/tableBackground.jpg) no-repeat center center/cover ;
    grid-template-columns: 20% 60% 20%;
    grid-template-rows: 40% 30% 30%;
    grid-template-areas: 
                         "players gameBoard actions"
                         "players gameBoard resources"
                         "players gameBoard dice"
`