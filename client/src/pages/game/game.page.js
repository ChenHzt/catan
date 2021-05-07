import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import { Group } from "@visx/group";
import GameBoard from "../../components/gameBoard/gameBoard.component";
import { getGameData, setGamesDimentions} from "../../store/actions/gameActions";
import Dice from "../../components/dice/dice.component";
import Settlement from "../../components/vertix/settelment.component";
import { useParams } from "react-router-dom";
import { StyledGridContainer } from "./style";
import PlayerCard from "../../components/playersCard/playersCard.component";
import {calcTileCenterByLocationMap} from '../../helper'

function Game(props) {
  const gameContainer= useRef(null);
  const { id } = useParams();
  useEffect(() => {
    // if(props.gameDims.tileRadius)
    const getData = async () => {
      await props.getGameData(id);
    };
    getData();
    if(gameContainer && gameContainer.current)
    {
      props.setGamesDimentions(gameContainer.current.clientWidth,gameContainer.current.clientHeight);
      gameContainer.current.addEventListener('resize',(event) =>{
        props.setGamesDimentions(gameContainer.current.clientWidth,gameContainer.current.clientHeight)
      
      })
    }
  }, []);
  
  useEffect(() =>{
    if(props.gameDims.tileRadius)
    calcTileCenterByLocationMap(props.gameDims.tileRadius,props.gameDims.centerLine,props.gameDims.topRowX);

  },[props.gameDims])

  return (
    <StyledGridContainer>
      <div ref={gameContainer} style={{ gridArea: "gameBoard", display:'flex' ,justifyContent:'center' }}>
        {Object.keys(props.game).length && (
          <GameBoard height={props.gameDims.height} width={props.gameDims.width}  tileRadius={props.gameDims.tileRadius} />
        )}
      </div>
      <div style={{ gridArea: "players" }}>

      </div>
      <div style={{ gridArea: "nav", display:'flex', flexDirection:'column', justifyContent:'center', overflow:'hidden'}}>
        <PlayerCard style={{position:'absolute',left:0, top:0, width:'100%', height:'100%', position:'relative'}} player={{name:'chen'}}></PlayerCard>
        <PlayerCard style={{position:'absolute',left:0, top:0, width:'100%', height:'100%', position:'relative'}} player={{name:'chen'}}></PlayerCard>
        <PlayerCard style={{position:'absolute',left:0, top:0, width:'100%', height:'100%', position:'relative'}} player={{name:'chen'}}></PlayerCard>
        <PlayerCard style={{position:'absolute',left:0, top:0, width:'100%', height:'100%', position:'relative'}} player={{name:'chen'}}></PlayerCard>
      </div>
      <div style={{ gridArea: "actions" }}></div>
      <div style={{ gridArea: "dice" }}></div>
      <div style={{ gridArea: "resources" }}></div>

    </StyledGridContainer>
  );
}

const mapStateToProps = (state) => {
  console.log(state.gameDims);
  return { game: state.game ,gameDims:state.gameDims};
};

export default connect(mapStateToProps, { getGameData ,setGamesDimentions})(Game);
