import { connect } from "react-redux";
import {setCurrentAction,endTurn, buyDevelopmentCard} from '../../store/actions/gameActions'
import { StyledGameButton } from "../../style";
import React,{useState,useEffect} from 'react';
const PlayerActionsContainer = (props) => {
  const actions = {};
  // props.game? console.log(props.game.dice !==0):null;

  if (props.actions && props.actions.length >0 && props.game && (props.dice !==0 || props.phase !== 'GAME')) 
  props.actions.forEach((action) => {
    switch (action) {
      case "BUILD_SETTELMENT":
        actions.settelment = true;
        break;
      case "BUILD_ROAD":
        actions.road = true;
        break;
      case "BUILD_CITY":
        actions.city = true;
        break;
      case "BUY_DEVELOPMENT_CARD":
        actions.developmentCard = true;
        break;
      case "ACTIVATE_KNIGHT":
        actions.activateKnight = true;
        break;
    }
  });


  return (
    <div
      style={{ display: "flex",padding:'20px', gridArea:props.gridArea,flexDirection: "column", alignItems: "center" }}
    >
      {actions.road && <StyledGameButton active={props.currentAction==='BUILD_ROAD'} onClick={() => props.setCurrentAction(props.gameId,'BUILD_ROAD')}> new road</StyledGameButton>}
      {actions.settelment && <StyledGameButton active={props.currentAction==='BUILD_SETTELMENT'} onClick={() => props.setCurrentAction(props.gameId,'BUILD_SETTELMENT')}> new settelment</StyledGameButton>}
      {actions.city && <StyledGameButton active={props.currentAction==='BUILD_CITY'} onClick={() => props.setCurrentAction(props.gameId,'BUILD_CITY')}> new city</StyledGameButton>}
      {actions.developmentCard && <StyledGameButton  onClick={() => props.buyDevelopmentCard(props.gameId,'BUY_DEVELOPMENT_CARD')}> development card</StyledGameButton>}
      {actions.activateKnight && <StyledGameButton active={props.currentAction==='ACTIVATE_KNIGHT'} onClick={() => props.setCurrentAction(props.gameId,'ACTIVATE_KNIGHT')}>use knight card</StyledGameButton>}
      {props.game && (props.dice!==0 || (props.phase !=='GAME' && Object.keys(actions).length===0))  &&<StyledGameButton onClick={() => props.endTurn(props.gameId)}>end turn</StyledGameButton>}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {game:state.game, currentAction: state.currentAction,dice:state.dice,phase:state.phase,error:state.error.error};
};

export default connect(mapStateToProps, { setCurrentAction, endTurn,buyDevelopmentCard })(
  PlayerActionsContainer
);
