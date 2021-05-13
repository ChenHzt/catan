import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import GameBoard from "../../components/gameBoard/gameBoard.component";
import {
  getGameData,
  setBoardGameDims,
  getValidActions,
  // getPlacesForSettelment,
  placeRobber,
} from "../../store/actions/gameActions";
import { useParams } from "react-router-dom";
import { StyledGridContainer } from "./style";
import {
  calcTileCenterByLocationMap,
  calcNodeCenterByLocationMap,
} from "../../helper";
import PlayersContainer from "../../containers/players/players.container";
import PlayerActionsContainer from "../../containers/actions/actions.container";
import DiceContainer from "../../containers/dice/dice.container";
import ResourcesContainer from "../../containers/resources/resources.container";

function Game(props) {
  const gameContainer = useRef(null);
  let id;
  
  id  = useParams().id;
  // if(!id) id=props.gameId;

  useEffect(() => {
    const getData = async () => {
      await props.getGameData(id);
    };
    getData();
  }, []);

  useEffect(() => {
    if (props.gameDims.tileRadius) {
      calcTileCenterByLocationMap(
        props.gameDims.tileRadius,
        props.gameDims.centerLine,
        props.gameDims.topRowX
      );
    }
  }, [props.gameDims]);

  useEffect(() => {
    if (gameContainer && gameContainer.current) {
      props.setBoardGameDims(
        gameContainer.current.clientWidth,
        gameContainer.current.clientHeight
      );

    }
  }, [gameContainer.current]);

  useEffect(() => {
    // if(props.currentAction === 'NONE' && props.phase==='GAME')
      props.getValidActions(id);
  }, [props.currentTurn,props.phase]);
 
  useEffect(() => {
    if(props.currentAction === 'NONE')
      props.getValidActions(id);
  }, [props.currentAction]);
 

  return (
    <StyledGridContainer>
      <div
        ref={gameContainer}
        style={{
          gridArea: "gameBoard",
          display: "flex",
          justifyContent: "center",
        }}
      >
        {Object.keys(props.game).length && (
          <GameBoard
            // height={props.gameDims.height}
            // width={props.gameDims.width}
            // tileRadius={props.gameDims.tileRadius}
          />
        )}
      </div>

      <PlayersContainer gridArea='players' />

        <PlayerActionsContainer
          gridArea='actions'
          gameId={id}
          actions={props.validActions}
        />
        <DiceContainer gridArea='dice' />
        <ResourcesContainer gridArea='resources' />

    </StyledGridContainer>
  );
}

const mapStateToProps = (state) => {
  console.log(state.currentAction);
  return {
    game: state.game,
    gameDims: state.gameDims,
    currentAction: state.currentAction,
    currentTurn:state.currentTurn,
    phase:state.phase,
    validActions: state.validActions,
    error: state.error,
  };
};

export default connect(mapStateToProps, {
  getGameData,
  setBoardGameDims,
  getValidActions,
  // getPlacesForSettelment,
  placeRobber
})(Game);
