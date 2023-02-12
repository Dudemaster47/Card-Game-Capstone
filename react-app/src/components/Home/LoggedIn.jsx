import { useDispatch, useSelector } from "react-redux";
import { createGameThunk } from "../../store/games";
import { useEffect, useState } from "react";
import { refreshSessionuser } from "../../store/session";

function LoggedIn() {
    const sessionUser = useSelector((state) => state.session.user);
    const dispatch = useDispatch();
    const [gameExists, setGameExists] = useState(sessionUser.createdGames.length > 0)
    const gameCreator = sessionUser && {
        user_id: `${sessionUser.id}`,
        time_limit: "300",
        game_type: "War"
    }

    useEffect(() => {
        dispatch(refreshSessionuser(sessionUser.id))
    }, [gameExists])

    const handleClick = (e) => {
		e.preventDefault();
        if (!gameExists){   
            return dispatch(createGameThunk(gameCreator));
        } else {
            window.alert("Can't have more than one active game at a time!")
        }
	};

    const notYetImplemented = (e) => {
        e.preventDefault();
        window.alert("Not yet implemented!")
    }

    return (
        <>
            <button onClick={(e) => {
                handleClick(e)
                setGameExists(true)}}>CREATE A GAME</button>
            <button onClick={notYetImplemented}>JOIN A GAME</button>
            <button onClick={notYetImplemented}>RESUME GAME</button>
        </>
    )
}

export default LoggedIn;