import { connect } from "react-redux";
import {setCurrentAction} from '../../store/actions/gameActions'

const PlayerActionsContainer = (props) => {
  const actions = {};
  if (!props.actions || props.actions.length === 0) return <></>;
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
  console.log(actions);

  const endTurn = () => {};

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      {actions.road && <button onClick={() => props.setCurrentAction('BUILD_ROAD')}> new road</button>}
      {actions.settelment && <button onClick={() => props.setCurrentAction('BUILD_SETTELMENT')}> new settelment</button>}
      {actions.city && <button onClick={() => props.setCurrentAction('BUILD_CITY')}> new city</button>}
      {actions.developmentCard && <button onClick={() => props.setCurrentAction('BUY_DEVELOPMENT_CARD')}> development card</button>}
      <button>end turn</button>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { currentAction: state.currentAction };
};

export default connect(mapStateToProps, { setCurrentAction })(
  PlayerActionsContainer
);
