import { useSelector } from "react-redux";

import War1P from "./War1P";

function GameTable() {
    const sessionUser = useSelector((state) => state.session.user);
    const game = sessionUser.createdGames[0];
    return (
        <>
            <div>Timer Box</div>
            <div>
                <div>Game ID# {sessionUser.createdGames[0].id}</div>
                <div>Time Limit: {sessionUser.createdGames[0].timer}</div>
                <div>Game Type: {sessionUser.createdGames[0].gameType}</div>
            </div>
            <div>
                <p>Play Area</p>
                <p>Conditionally Renders Relevant Game Type</p>
                {game.gameType === "War" ? (
                    <War1P />
                ) : null }

            </div>
            <div>
                <ul>
                    <li>
                        <button>Pause Game</button>
                        <p>(disabled in certain contexts)</p>
                    </li>
                    <li>
                        <button>Suspend Game</button>
                        <p>(disabled in certain contexts)</p>
                    </li>
                    <li>
                        <button>Forfeit Game</button>
                    </li>
                </ul>
            </div>
        </>
    )
}

export default GameTable;