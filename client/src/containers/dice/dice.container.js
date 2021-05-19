import { connect } from "react-redux";
import PlayerCard from "../../components/playersCard/playersCard.component";
import { playersColors } from "../../consts";
import ReactDice from "react-dice-complete";
import "react-dice-complete/dist/react-dice-complete.css";
import React, { useRef } from "react";
import { rollDice } from "../../store/actions/gameActions";
import { StyledGameButton } from "../../style";

class DiceContainer extends React.Component {
  // diceRef = useRef(0);
  constructor(props) {
    super(props);
    this.state = {
      dice1: 0,
      dice2: 0,
      showRollBtn:false
    };
  }
  componentDidUpdate() {
    if (this.state.dice1 !== 0 && this.state.dice2 !== 0) {
      // this.setState({showRollBtn:false})
      this.props.rollDice(
        this.props.game._id,
        this.state.dice1 + this.state.dice2
      );
      this.setState({ dice1: 0, dice2: 0 });
    }
  }

  

  rollDice() {
    this.reactDice1.rollAll();
    this.reactDice2.rollAll();
    // this.setState({showRollBtn:false})
  }
  render() {
    return (
      <div style={{ gridArea: this.props.gridArea, padding: "20px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            padding: "0 20px",
          }}
        >
          <ReactDice
            numDice={1}
            rollDone={(num) => this.setState({ dice1: num })}
            faceColor="#FFFF00"
            dotColor="#000000"
            outline={true}
            ref={(dice) => (this.reactDice1 = dice)}
            dieSize={50}
            disableIndividual={true}
            rollTime={1}
          />
          <ReactDice
            numDice={1}
            rollDone={(num) => this.setState({ dice2: num })}
            faceColor="#FF0000"
            dotColor="#FFFF00"
            outline={true}
            ref={(dice) => (this.reactDice2 = dice)}
            dieSize={50}
            disableIndividual={true}
            rollTime={1}
            
          />
        </div>
        {this.props.phase==='GAME' && this.props.dice ===0 && !this.props.isRolled && (
          <StyledGameButton onClick={() => this.rollDice()}>
            roll
          </StyledGameButton>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { game: state.game, phase:state.phase, dice:state.dice,isRolled:state.game.diceRolledInCurrentTurn};
};

export default connect(mapStateToProps, { rollDice })(DiceContainer);
