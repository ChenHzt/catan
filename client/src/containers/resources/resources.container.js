import { connect } from "react-redux";
import React,{useEffect,useState} from 'react';
import {StyledResourcesContainer,StyledResource} from './style'
const ResourcesContainer = (props) =>{
    console.log((props.game));
    if(!props.game || Object.keys(props.game).length === 0) return <></>
    const playerResources = props.game.players[props.currentTurn].resourceCards;


    return (
        <StyledResourcesContainer>
            {Object.keys(playerResources).map((resource) => 
                <StyledResource key={resource}>
                    <img src={`/static/images/icons/${resource}.png`} width={30} height={30}/>
                    <span>{playerResources[resource]}</span>
                </StyledResource>
            )}
        </StyledResourcesContainer>
    )
}

const mapStateToProps = (state) => {
    return {
      game: state.game,
      currentTurn:state.currentTurn
    };
  };
  
  export default connect(mapStateToProps, {})(ResourcesContainer);
  