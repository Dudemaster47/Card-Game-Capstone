import { useDispatch, useSelector } from "react-redux";
import { createGameThunk } from "../../store/games";
import { useEffect, useState } from "react";
import { refreshSessionuser } from "../../store/session";
import { useHistory } from "react-router-dom";
import { editUserThunk } from "../../store/users";

function LoggedIn() {
    const history = useHistory();
    const sessionUser = useSelector((state) => state.session.user);
    const dispatch = useDispatch();
    const [gameExists, setGameExists] = useState(sessionUser.createdGames.length > 0)
    const gameCreator = sessionUser && {
        user_id: `${sessionUser.id}`,
        timer: "300",
        game_type: "War"
    }
    const defaultImg = 'https://www.pngitem.com/pimgs/m/150-1503945_transparent-user-png-default-user-image-png-png.png'

    useEffect(() => {
        const userAndDeck = JSON.parse(localStorage.getItem('userAndDeck'))
        if(userAndDeck){
            if((userAndDeck[0] === sessionUser.id) && userAndDeck[1]){
            } else {
                const userAndDeckArray = [sessionUser.id, 0]
                localStorage.setItem('userAndDeck', JSON.stringify(userAndDeckArray))
            }
        } else {
            const userAndDeckArray = [sessionUser.id, 0]
            localStorage.setItem('userAndDeck', JSON.stringify(userAndDeckArray))
        }
    }, [])

    useEffect(() => {
        if(!sessionUser.profileImg){
            let editedUser = { id: sessionUser.id, username: sessionUser.username, email: sessionUser.email, profile_img: defaultImg, wins: sessionUser.wins, losses: sessionUser.losses }
            dispatch(editUserThunk(editedUser));
        }
    }, [])

    useEffect(() => {
        dispatch(refreshSessionuser(sessionUser.id))
    }, [gameExists])

    const handleClick = (e) => {
		e.preventDefault();
        if (!gameExists){   
            const gameState = ["", "", "", "", "", "", "", "", "", "", "", ""]
            localStorage.setItem('gameState', JSON.stringify([gameState]))
            return dispatch(createGameThunk(gameCreator));
        } else {
            window.alert("Can't have more than one active game at a time!")
        }
	};

    const notYetImplemented = (e) => {
        e.preventDefault();
        window.alert("Not yet implemented!")
    }
    
    const help = (e) => {
        e.preventDefault();
        history.push('/help')
    }

    return (
        <>
            <div className="homeOption">
                <button onClick={(e) => {
                    handleClick(e)
                    setGameExists(true)}} className="mainButton">CREATE A GAME</button>
            </div>
            <div className="homeOption">
                <button onClick={notYetImplemented} className="mainButton">JOIN A GAME</button>
            </div>
            <div className="homeOption">
                <button onClick={help} className="mainButton">HELP</button>
            </div>
        </>
    )
}

export default LoggedIn;