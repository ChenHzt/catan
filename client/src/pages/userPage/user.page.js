import AuthService from "../../services/auth.service";
import GameCard from "../../components/gameCardDisplay/gameCard.component";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { getUserGames, setCurrentUser } from "../../store/actions/userActions";
import { createNewGame } from "../../store/actions/gameActions";
import { connect } from "react-redux";
import { GamePreviewCard } from "../../components/previewCard/gamePreview.component";
import { NewGameForm } from "../../components/newGameForm/newGameForm.component";
import { StyledBackground, StyledFormContainer } from "./style";
import { StyledLogo } from "../../style";
import { calcTileCenterByLocationMap } from "../../helper";

function UserPage(props) {
  const history = useHistory();
  const gameDims = (width, height) => ({
    tileRadius: height / 10,
    centerLine: width / 2,
    topRowX: height / 2 - 3 * (height / 10),
    width,
    height,
  });

  useEffect(() => {
    const dims = gameDims(250, 200);
    calcTileCenterByLocationMap(dims.tileRadius, dims.centerLine, dims.topRowX);
    const userData = AuthService.getCurrentUser();
    if (userData) {
      props.setCurrentUser(userData.user);
      props.getUserGames();
    } else history.push("/");
  }, []);

  useEffect(() => {
    if (Object.keys(props.game).length > 0)
      history.push(`/game/${props.game._id}`);
  }, [props.game]);

  return (
    // <div>
    //     <ul>
    //         {props.games.map((game) => <a href={`/game/${game._id}`}><GamePreviewCard gameDims={gameDims(250,200)} game={game}></GamePreviewCard></a>)}
    //     </ul>
    //     <NewGameForm submit={props.createNewGame}/>
    // </div>
    <StyledBackground>
      <StyledFormContainer className="flexContainer flexContainer--col">
        <StyledLogo/>
        <NewGameForm submit={props.createNewGame} />
        
      </StyledFormContainer>
      <ul style={{display:'flex',flexWrap:'wrap', overflowY:'scroll'}}>
          {props.games.map((game) => (
              <GamePreviewCard
                gameDims={gameDims(250, 200)}
                game={game}
              ></GamePreviewCard>
          ))}
        </ul>
    </StyledBackground>
  );
}

const mapStateToProps = (state) => {
  return { user: state.user, games: state.games, game: state.game };
};

export default connect(mapStateToProps, {
  getUserGames,
  setCurrentUser,
  createNewGame,
})(UserPage);
