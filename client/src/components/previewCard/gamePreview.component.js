import { StyledCard } from "./style"

export const GamePreviewCard = (props) =>{
    console.log(props);
    return (
        <StyledCard >
            <div>
                <p>gameId:{props.game._id}</p>
                <p>number of players: {props.game.players.length}</p>
            </div>
        </StyledCard>
    )
}