import AuthService from "../../services/auth.service";
import GameCard from '../../components/gameCardDisplay/gameCard.component'
import React, { useState,useEffect } from "react";
import { useHistory } from "react-router-dom";
import { getUserGames ,setCurrentUser} from "../../store/actions/userActions";
import { connect } from 'react-redux';

function UserPage(props) {
  const history = useHistory();

    useEffect(()=>{
        const userData = AuthService.getCurrentUser();
        if (userData) {
          props.setCurrentUser(userData.user);
          props.getUserGames();
        } else history.push("/");
    },[])

  return (
      <div>
          <ul>
              {props.games.map((game) => <GameCard game={game}></GameCard>)}
          </ul>
      </div>
  )
}

const mapStateToProps = (state) => {
  return { user: state.user, games:state.games };
};

export default connect(mapStateToProps, { getUserGames ,setCurrentUser})(UserPage);
