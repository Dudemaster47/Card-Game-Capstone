import { useDispatch, useSelector } from "react-redux";
import { createGameThunk } from "../../store/games";

function LoggedIn() {
    const sessionUser = useSelector((state) => state.session.user);
    const dispatch = useDispatch();
    const gameCreator = {
        user_id: `${sessionUser.id}`,
        time_limit: "300",
        game_type: "War"
    }
    
    const handleClick = (e) => {
		e.preventDefault();
        if (sessionUser.createdGames.length === 0){
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
            <button onClick={handleClick}>CREATE A GAME</button>
            <button onClick={notYetImplemented}>JOIN A GAME</button>
            <button onClick={notYetImplemented}>RESUME GAME</button>
        </>
    )
}

export default LoggedIn;