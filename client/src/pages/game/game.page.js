import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import GameBoard from "../../components/gameBoard/gameBoard.component";
import {
  getGameData,
  setGamesDimentions,
} from "../../store/actions/gameActions";
import Dice from "../../components/dice/dice.component";
import { useParams } from "react-router-dom";
import { StyledGridContainer } from "./style";
import {
  calcTileCenterByLocationMap,
  calcNodeCenterByLocationMap,
} from "../../helper";
import PlayersContainer from "../../containers/players/players.container";
import PlayerActionsContainer from "../../containers/actions/actions.container";

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

  const firstRound = () => {

  };

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
            height={props.gameDims.height}
            width={props.gameDims.width}
            tileRadius={props.gameDims.tileRadius}
          />
        )}
      </div>
      <div style={{ gridArea: "players" }}></div>
      <div style={{ gridArea: "nav" }}>
        <PlayersContainer />
      </div>
      <div style={{ gridArea: "actions" }}>
        <PlayerActionsContainer/>
      </div>
      <div style={{ gridArea: "dice" }}></div>
      <div style={{ gridArea: "resources" }}></div>
    </StyledGridContainer>
  );
}

const mapStateToProps = (state) => {
  console.log(state.gameDims);
  return { game: state.game, gameDims: state.gameDims };
};

export default connect(mapStateToProps, { getGameData, setGamesDimentions })(
  Game
);
