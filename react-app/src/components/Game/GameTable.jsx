import { useSelector } from "react-redux";
import "./game.css"

import War1P from "./War1P";

function GameTable() {
    const sessionUser = useSelector((state) => state.session.user);
    const game = sessionUser.createdGames[0];
    return (
        <>
            <div className="playArea">
                {/* <p>Play Area</p>
                <p>Conditionally Renders Relevant Game Type</p> */}
                {game.gameType === "War" ? (
                    <War1P />
                ) : null }

            </div>
        </>
    )
}

export default GameTable;