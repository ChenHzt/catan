import React,{useEffect, useState} from "react";
import { connect } from 'react-redux';
import { Group } from "@visx/group";
import GameBoard from "../../components/gameBoard/gameBoard.component";
import { getGameData } from '../../store/actions/gameActions';
import Dice from '../../components/dice/dice.component'

function Game(props) {
  useEffect(() => {
    const getData = async() => {
      await props.getGameData('6090ece36cb47453bcc134cf');
    }
    getData();
  },[])
  return (
    <div style={{height:'100%' , background:'url(/static/images/tableBackground.jpg) no-repeat center center/cover '}}>
      <svg width={800} height={500}>
      <image xlinkHref={'/static/images/boardBackground.png'} width={800} height={500} x='0' y="0" />
        <rect width="100%" height="100%" fillOpacity={0} />
        <Group>
          <GameBoard />
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
