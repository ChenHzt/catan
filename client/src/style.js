import styled from "styled-components";

export const StyledInput = styled.input`
  color: white;
  border: white 2px solid;
  background-color: transparent;
  width: 100%;
  min-width: 100%;
  outline: none;
  padding: 8px;
  margin: 10px 0;
  border-radius:5px;
    &::placeholder{
        color:white;
    }
`;

export const StyledButton = styled.button`
  color: #604f47;
  border: #604f47 2px solid;
  background-color: #eab833;
  padding: 8px;
  text-align: center;
  margin: 10px 0;
  width: 100%;
  outline: none;
  border-radius:5px;
  cursor:pointer;

`;

export const StyledLogo = styled.div`
    background: url(/static/images/catanLogo.png) no-repeat center center/cover;
    width:100%;
    height:120px;
`
export const StyledLink = styled.button`
    color:#818181;
    background-color:transparent;
    border:none;
    outline:none;
    text-decoration:underline;
    font-size:0.9rem;
    margin:20px 0;
    cursor:pointer;
    
`

export const StyledGameButton = styled.button`
    width:100%;
    padding:5px;
    margin:2px 0;
    border-radius: 10px;
    border: 2px solid ${props => props.active ? 'red' : 'black'}
`