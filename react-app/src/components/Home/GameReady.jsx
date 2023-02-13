import { useDispatch, useSelector } from "react-redux";
import { deleteGameThunk } from "../../store/games";
import GameSettingsModal from "../Modals/GameSettingsModal";
import { useState, useEffect } from "react";
import { refreshSessionuser } from "../../store/session";

function GameReady() {
    const sessionUser = useSelector((state) => state.session.user);
    const dispatch = useDispatch();
    const game = sessionUser.createdGames && sessionUser.createdGames[0];
    const [isOpen, setIsOpen] = useState(false);
    const [exists, setExists] = useState(true);
    const [edited, setEdited] = useState(false);

    const sendDataToHome = (i) => {
        setEdited(i)
        setEdited(false)
        setEdited(true)
    }

    useEffect(() => {
        dispatch(refreshSessionuser(sessionUser.id))
    }, [exists, edited])

    const deleteGame = (e) => {
        e.preventDefault();
        window.alert("insert are you sure modal here")
        setExists(false);
        return dispatch(deleteGameThunk(game));
    }

    const notYetImplemented = (e) => {
        e.preventDefault();
        window.alert("Not yet implemented!")
    }

    return (
        <>  { sessionUser && (
            <div>
                <div>
                    <div>Game ID# {sessionUser.createdGames[0].id}</div>
                    <div>Time Limit: {sessionUser.createdGames[0].timer}</div>
                    <div>Game Type: {sessionUser.createdGames[0].gameType}</div>
                </div>
                <button onClick={notYetImplemented} className="mainButton">1P GAME START</button>
                <button onClick={notYetImplemented} className="mainButton">2P GAME HOST</button>
                <button onClick={() => setIsOpen(true)} className="mainButton">GAME SETTINGS</button>
                <button onClick={deleteGame} className="mainButton">DELETE GAME</button>
    
                { isOpen && (
                    <GameSettingsModal 
                        setIsOpen={setIsOpen}
                        game={game}
                        sendDataToHome={sendDataToHome}
                    />
                )}
            </div>
        )}
        </>
    )

}

export default GameReady;