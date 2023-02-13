import { useSelector } from 'react-redux';
import LoggedOut from './LoggedOut';
import LoggedIn from './LoggedIn';
import GameReady from './GameReady';
import "./home.css"


function Home() {
    const sessionUser = useSelector((state) => state.session.user);
 
    return (
        <div className="homeContainer">
        <h1 className="appTitle">CARD GAME APP VER 0.0.1</h1>
        <img src="" alt="logo pending" />
        {sessionUser ? (
            <div className="loggedInBox">
                {sessionUser && sessionUser.createdGames.length > 0 ? (
                    <div><GameReady /></div>
                ) : (
                    <div><LoggedIn /></div>
                )}
            </div>
        ) : (
        <div className="loggedOutBox"><LoggedOut /></div>
        )}
        </div>
    )
}

export default Home;