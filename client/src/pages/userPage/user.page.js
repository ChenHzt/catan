import AuthService from "../../services/auth.service";
import GameCard from '../../components/gameCardDisplay/gameCard.component'
import React, { useState,useEffect } from "react";
import { useHistory } from "react-router-dom";
import { getUserGames ,setCurrentUser} from "../../store/actions/userActions";
import { createNewGame} from "../../store/actions/gameActions";
import { connect } from 'react-redux';
import { GamePreviewCard } from "../../components/previewCard/gamePreview.component";
import { NewGameForm } from "../../components/newGameForm/newGameForm.component";

function UserPage(props) {
  const history = useHistory();

    useEffect(()=>{
        const userData = AuthService.getCurrentUser();
        if (userData) {
          props.setCurrentUser(userData.user);
          props.getUserGames();
        } else history.push("/");
    },[])

    useEffect(() => {
      if(Object.keys(props.game).length > 0)
        history.push(`/game/${props.game._id}`)
    },[props.game])

  return (
      <div>
          <ul>
              {props.games.map((game) => <a href={`/game/${game._id}`}><GamePreviewCard game={game}></GamePreviewCard></a>)}
          </ul>
          <NewGameForm submit={props.createNewGame}/>
      </div>
  )
}

const mapStateToProps = (state) => {
  return { user: state.user, games:state.games,game:state.game};
};

export default connect(mapStateToProps, { getUserGames ,setCurrentUser,createNewGame})(UserPage);
