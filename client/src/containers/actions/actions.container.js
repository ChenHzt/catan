import { connect } from "react-redux";
import {setCurrentAction,endTurn} from '../../store/actions/gameActions'
import { StyledGameButton } from "../../style";

const PlayerActionsContainer = (props) => {
  const actions = {};
  if (props.actions && props.actions.length >0) 
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
    }
  });


  return (
    <div
      style={{ display: "flex",padding:'20px', gridArea:props.gridArea,flexDirection: "column", alignItems: "center" }}
    >
      {actions.road && <StyledGameButton onClick={() => props.setCurrentAction(props.gameId,'BUILD_ROAD')}> new road</StyledGameButton>}
      {actions.settelment && <StyledGameButton onClick={() => props.setCurrentAction(props.gameId,'BUILD_SETTELMENT')}> new settelment</StyledGameButton>}
      {actions.city && <StyledGameButton onClick={() => props.setCurrentAction(props.gameId,'BUILD_CITY')}> new city</StyledGameButton>}
      {actions.developmentCard && <StyledGameButton onClick={() => props.setCurrentAction(props.gameId,'BUY_DEVELOPMENT_CARD')}> development card</StyledGameButton>}
      <StyledGameButton onClick={() => props.endTurn(props.gameId)}>end turn</StyledGameButton>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { currentAction: state.currentAction };
};

export default connect(mapStateToProps, { setCurrentAction, endTurn })(
  PlayerActionsContainer
);
