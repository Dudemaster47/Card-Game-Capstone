import { useDispatch, useSelector } from "react-redux";
import { deleteGameThunk } from "../../store/games";
import GameSettingsModal from "../Modals/GameSettingsModal";
import { useState, useEffect } from "react";
import { refreshSessionuser } from "../../store/session";
import { Link, useLocation, useHistory } from "react-router-dom";
import { editUserThunk } from "../../store/users";
import { getAllUsersThunk } from "../../store/users";


function GameReady() {
    const sessionUser = useSelector((state) => state.session.user);
    const dispatch = useDispatch();
    const game = sessionUser.createdGames && sessionUser.createdGames[0];
    const [isOpen, setIsOpen] = useState(false);
    const [exists, setExists] = useState(true);
    const [edited, setEdited] = useState(false);
    const [areYouSure, setAreYouSure] = useState(false);
    const [gameInProgCheck, setGameInProgCheck] = useState(false);
    const location = useLocation();
    const history = useHistory();

    const sendDataToHome = (i) => {
        setEdited(i)
        setEdited(false)
        setEdited(true)
    }

    useEffect(() => {
          const game = sessionUser.createdGames[0];
          const intlState = JSON.parse(localStorage.getItem('gameState'))
          if (intlState){
              if((intlState[0] !== game.id) || intlState[11]) {
                if(intlState[1] < game.timer){
                  setGameInProgCheck(true);
                } else {
                  setGameInProgCheck(false);
                }
              } else {
                setGameInProgCheck(false);
              } 
          } else {
            setGameInProgCheck(false);
          }
    }, [location, sessionUser])

    useEffect(() => {
        dispatch(refreshSessionuser(sessionUser.id))
    }, [exists, edited])

    const deleteGame = (e) => {
        e.preventDefault();
        setExists(false);
        const gameState = ["", "", "", "", "", "", "", "", "", "", "", ""]
        localStorage.setItem('gameState', JSON.stringify([gameState]))
        dispatch(deleteGameThunk(game));
        return dispatch(refreshSessionuser(sessionUser.id))
    }

    const forfeitGame = (e) => {
        e.preventDefault();
        setExists(false);
        const gameState = ["", "", "", "", "", "", "", "", "", "", "", ""]
        localStorage.setItem('gameState', JSON.stringify([gameState]))
        let losses = (sessionUser.losses + 1)
        let editedUser = { id: sessionUser.id, username: sessionUser.username, email: sessionUser.email, profile_img: sessionUser.profileImg, wins: sessionUser.wins, losses: losses }
        dispatch(editUserThunk(editedUser));
        dispatch(deleteGameThunk(game));
        dispatch(refreshSessionuser(sessionUser.id))
        dispatch(getAllUsersThunk())
    }

    const notYetImplemented = (e) => {
        e.preventDefault();
        window.alert("Not yet implemented!")
    }
    
    const help = (e) => {
        e.preventDefault();
        history.push('/help')
    }

    return (
        <>  { sessionUser && (
            <div>
                <div>
                    <div>Game ID# {sessionUser.createdGames[0].id}</div>
                    <div>Time Limit: {sessionUser.createdGames[0].timer}</div>
                    <div>Game Type: {sessionUser.createdGames[0].gameType}</div>
                </div>
                {gameInProgCheck ? (
                    <div className="homeOption">
                    <Link to={`/games/${sessionUser.createdGames[0].id}`} className="mainButton">RESUME GAME</Link>
                    </div>
                ): (
                    <div className="homeOption">
                        <Link to={`/games/${sessionUser.createdGames[0].id}`} className="mainButton">1P GAME START</Link>
                    </div>
                )}
                {gameInProgCheck ? null : (
                    <div className="homeOption">
                        <button onClick={notYetImplemented} className="mainButton">2P GAME HOST</button>
                    </div>
                )}
                {gameInProgCheck ? null : (
                    <div className="homeOption">
                        <button onClick={() => setIsOpen(true)} className="mainButton">GAME SETTINGS</button>
                    </div>
                )}
                {gameInProgCheck ? (
                    <div className="homeOption">
                        <button onClick={() => setAreYouSure(true)} className="mainButton">FORFEIT GAME</button>
                    </div>
                ): (
                    <div className="homeOption">
                        <button onClick={() => setAreYouSure(true)} className="mainButton">DELETE GAME</button>
                    </div>
                )}
                <div className="homeOption">
                    <button onClick={help} className="mainButton">HELP</button>
                </div>
                
    
                { isOpen && (
                    <GameSettingsModal 
                        setIsOpen={setIsOpen}
                        game={game}
                        sendDataToHome={sendDataToHome}
                    />
                )}
                { areYouSure && (
                <>
                <div className="darkBG" onClick={() => setAreYouSure(false)} />
                <div className="centered">
                    <div className="modal2">
                        <div className="modalHeader">
                            <h5 className="modalHeading"> Are You Sure?</h5>
                        </div>
                        <button 
                            onClick={() => setAreYouSure(false)}  
                            className="closeBtn">
                            X
                        </button>
                        <div className="modalActions">
                        <div className="actionsContainer">
                            {gameInProgCheck ? (
                                 <button
                                 onClick={(e) => {
                                     forfeitGame(e)
                                     setAreYouSure(false)
                                 }}
                                 className="submitBtn"
                             >
                                 Forfeit
                             </button>
                            ) : (
                                <button
                                    onClick={(e) => {
                                        deleteGame(e)
                                        setAreYouSure(false)
                                    }}
                                    className="submitBtn"
                                >
                                    Delete
                                </button>
                            )}
							<button
								onClick={() => setAreYouSure(false)}
								className="cancelBtn"
							>
								Cancel
							</button>
						</div>
                        </div>
                    </div>    
                </div> 
                </>
            )}
            </div>
        )}
        </>
    )

}

export default GameReady;