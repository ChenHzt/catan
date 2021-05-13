import React, { useState, useEffect } from "react";
import { StyledButton,StyledInput} from "../../style";

export const NewGameForm = (props) => {
  const [playersNum, setPlayersNum] = useState(4);
  const [playersNames, setPlayersNames] = useState([]);

  const editField = (event, i) => {
    const temp = [...playersNames];
    temp[i] = event.target.value;
    setPlayersNames(temp);
  };

  useEffect(() => {
    const tempArr = new Array(parseInt(playersNum));
    console.log(tempArr);
    setPlayersNames(tempArr.fill(""));
  }, [playersNum]);

  const renderForm = () => {
    console.log(playersNum, playersNames);
    const arr = [];
    for (let i = 0; i < playersNum; i++) {
      arr.push(
        <li style={{margin:'10px'}}>
          <StyledInput
            value={playersNames[i]}
            onChange={(event) => editField(event, i)}
            type="text"
          />
        </li>
      );
    }
    return arr;
  };

  const submit = () =>{
      if(playersNames.every(name => /^[a-zA-Z]{2,}/.test(name)))
        props.submit(playersNames)
  }

  return (
    <div style={{color:'white'}}>
      <div>
        <label for="playersNum">Amount of Players:</label>
        <select
          value={playersNum}
          onChange={(event) => setPlayersNum(event.target.value)}
          name="playersNum"
          id="playersNum"
        >
          <option value={3}>Three</option>
          <option value={4}>Four</option>
        </select>
      </div>
      <ol style={{padding:'10px'}}>{renderForm()}</ol>
      <StyledButton onClick={submit}>Create Game</StyledButton>
    </div>
  );
};
