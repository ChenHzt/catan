import styled from "styled-components";

export const StyledResourcesContainer = styled.div`
    display:flex;
    flex-direction:row;
    justify-content:space-between;
    flex-wrap:wrap;
    padding:0 20%;
    grid-area:${props => props.gridArea},
`

export const StyledResource = styled.div`
    display:flex;
    width:40%;
    flex-direction:row;
    align-items:center
    
`