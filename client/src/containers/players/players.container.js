import { connect } from "react-redux";
import PlayerCard from "../../components/playersCard/playersCard.component";


const PlayersContainer = (props) =>{
    console.log(props.game.players);
    const style = {position:'absolute',left:0, top:0, width:'100%', height:'100%', position:'relative'}

    return (
        <div style={{display:'flex', flexDirection:'column', justifyContent:'center', overflow:'hidden', height:'100%'}}>
            {props.game.players && <PlayerCard style={style} currentPlayer={props.game.currentTurn === 1} player={props.game.players[0]}></PlayerCard>} 
            {props.game.players && <PlayerCard style={style} currentPlayer={props.game.currentTurn === 2} player={props.game.players[1]}></PlayerCard>} 
            {props.game.players && <PlayerCard style={style} currentPlayer={props.game.currentTurn === 3} player={props.game.players[2]}></PlayerCard>} 
        </div>
    )
}


const mapStateToProps = (state) => {
    return { game: state.game};
  };
  
  export default connect(mapStateToProps, { })(PlayersContainer);
  