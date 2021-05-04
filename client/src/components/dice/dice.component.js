import React,{useState,useRef,useEffect} from "react";
import { connect } from "react-redux";
import {} from "../../store/actions";
import ReactDice from 'react-dice-complete'

function Dice() {
    // const [showDice]
    // useEffect
  return (
    <ReactDice
      numDice={ 2}
      rollTime={1}
    //   rollDone={rollDoneCallback}
      // ref={(dice) => (this.reactDice = dice)}
      dieSize={20}
      disableIndividual={true}
    />
  );
}

const mapStateToProps = (state) => {
  return {game:state.game}  ;
};

export default connect(mapStateToProps, {})(Dice);
