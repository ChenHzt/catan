import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import GameBoard from "../../components/gameBoard/gameBoard.component";
import {
  getGameData,
  setGamesDimentions,
  getValidActions,
  getPlacesForSettelment,
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
  const { id } = useParams();
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
      props.setGamesDimentions(
        gameContainer.current.clientWidth,
        gameContainer.current.clientHeight
      );
      gameContainer.current.onResize = (event) => {
        console.log("resized", event);
      };
    }
  }, [gameContainer.current]);

  useEffect(() => {
    props.getValidActions(id);
  }, [props.game.currentTurn, props.currentAction]);

 

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
            onAction={true}
            height={props.gameDims.height}
            width={props.gameDims.width}
            tileRadius={props.gameDims.tileRadius}
          />
        )}
      </div>
      {/* {props.error.error && props.error.error} */}

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
    validActions: state.validActions,
    error: state.error,
  };
};

export default connect(mapStateToProps, {
  getGameData,
  setGamesDimentions,
  getValidActions,
  getPlacesForSettelment,
  placeRobber
})(Game);
