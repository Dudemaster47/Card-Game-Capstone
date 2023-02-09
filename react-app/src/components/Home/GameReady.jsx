import { useDispatch, useSelector } from "react-redux";
import { deleteGameThunk } from "../../store/games";
import GameSettingsModal from "../Modals/GameSettingsModal";
import { useState } from "react";

function GameReady() {
    const sessionUser = useSelector((state) => state.session.user);
    const dispatch = useDispatch();
    const game = sessionUser.createdGames[0];
    const [isOpen, setIsOpen] = useState(false);

    const deleteGame = (e) => {
        e.preventDefault();
        window.alert("insert are you sure modal here")
        return dispatch(deleteGameThunk(game));
    }

    const notYetImplemented = (e) => {
        e.preventDefault();
        window.alert("Not yet implemented!")
    }

    return (
        <>
            <button>1P GAME START</button>
            <button onClick={notYetImplemented}>2P GAME HOST</button>
            <button onClick={() => setIsOpen(true)}>GAME SETTINGS</button>
            <button onClick={deleteGame}>DELETE GAME</button>

            { isOpen && (
                <GameSettingsModal 
                    setIsOpen={setIsOpen}
                    game={game}
                />
            )

            }
        </>
    )

}

export default GameReady;