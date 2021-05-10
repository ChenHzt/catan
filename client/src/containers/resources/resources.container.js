import { connect } from "react-redux";
import React,{useEffect,useState} from 'react';
import {StyledResourcesContainer,StyledResource} from './style'
const ResourcesContainer = (props) =>{
    console.log(Object.keys(props.game));
    if(!props.game || Object.keys(props.game).length === 0) return <></>
    const playerResources = props.game.players[props.game.currentTurn - 1].resourceCards;


    return (
        <StyledResourcesContainer>
            {/* <img src={`/static/images/icons/${'brick'}.png`} width={20} height={20}/> */}
            {Object.keys(playerResources).map((resource) => 
                <StyledResource>
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
    };
  };
  
  export default connect(mapStateToProps, {})(ResourcesContainer);
  