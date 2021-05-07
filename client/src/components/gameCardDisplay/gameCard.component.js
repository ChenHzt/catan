import AuthService from "../../services/auth.service";

import React, { useState,useEffect } from "react";
import { useHistory } from "react-router-dom";
import { getUserGames ,setCurrentUser} from "../../store/actions/userActions";
import { connect } from 'react-redux';

function GameCard(props) {
    return (
        <a href={`/game/${props.game._id}`}>
           <div>{`game id: ${props.game._id}`}</div> 
        </a>
    )
}

export default GameCard;

