const PlayerActionsContainer=(props ) =>{
    const actions = {};
    if(!props.actions || props.actions.length === 0) return <></>;
    props.actions.forEach((action) =>{
        switch(action){
            case 'BUILD_SETTELMENT':
                actions.settelment = true;
                break;
            case 'BUILD_ROAD':
                actions.road = true;
                break;
            case 'BUILD_CITY':
                actions.city = true;
                break;
            case 'BUY_DEVELOPMENT_CARD':
                actions.developmentCard = true;
                break;
        }
    })
    console.log(actions)

    const endTurn = () =>{

    }

    return (
        <div style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
            {actions.road && <button> new road</button>}
            {actions.settelment && <button> new settelment</button>}
            {actions.city && <button> new city</button>}
            {actions.developmentCard && <button> development card</button>}
            <button>end turn</button>
        </div>
    )
}

export default PlayerActionsContainer;