import React,{useEffect, useState} from "react";
import { connect } from 'react-redux';
import { Group } from "@visx/group";
import GameBoard from "../../components/gameBoard/gameBoard.component";
import { getGameData } from '../../store/actions/gameActions';
import Dice from '../../components/dice/dice.component'
import Settlement from "../../components/vertix/settelment.component";
import {useParams} from "react-router-dom";

function Game(props) {
  const { id } = useParams();
  useEffect(() => {
    const getData = async() => {
      await props.getGameData(id);
    }
    getData();
  },[])
  return (
    <div style={{height:'100%' , background:'url(/static/images/tableBackground.jpg) no-repeat center center/cover '}}>
      <svg width={800} height={600}>
      <image xlinkHref={'/static/images/boardBackground.png'} width={800} height={600} x='0' y="0" />
        <rect width="100%" height="100%" fillOpacity={0} />
        <Group>
         { Object.keys(props.game).length && <GameBoard tileRadius='50' topRowX='200'/>}
         {/* <Settlement color="red"/> */}
        </Group>
      </svg>
      <Dice/>
      

    </div>
  );
}

const mapStateToProps = state => {
  console.log(state.game);
  return { game:state.game};
};

export default connect(mapStateToProps,{getGameData})(Game);
