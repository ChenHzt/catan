import { connect } from "react-redux";
import PlayerCard from "../../components/playersCard/playersCard.component";
import {playersColors} from '../../consts'

const PlayersContainer = (props) =>{
    const style = {position:'absolute',left:0, top:0, width:'100%', height:'100%', position:'relative'}
    console.log()
    return (
        <div style={{display:'flex',gridArea:props.gridArea, flexDirection:'column', justifyContent:'space-around', overflow:'hidden', height:'100%'}}>
            {props.game.players && props.game.players.map((player,i) =>{
                return <PlayerCard color={playersColors[i]} style={style} currentPlayer={props.currentTurn === i} player={player}></PlayerCard>
            } )}
        </div>
    )
}


const mapStateToProps = (state) => {
    return { game: state.game,currentTurn:state.currentTurn};
  };
  
  export default connect(mapStateToProps, { })(PlayersContainer);
  