import { useSelector } from 'react-redux';
import LoggedOut from './LoggedOut';
import LoggedIn from './LoggedIn';
import GameReady from './GameReady';

function Home() {
    const sessionUser = useSelector((state) => state.session.user);


    return (
        <>
        <h1>CARD GAME APP VER 0.0.1</h1>
        {sessionUser.createdGames.length > 0 ? (
            <div>Game ID# {sessionUser.createdGames[0].id}</div>
        ) : null }

        <img src="" alt="logo of hand holding cardes" />
        {sessionUser ? (
            <div>
                {sessionUser.createdGames.length > 0 ? (
                    <div><GameReady /></div>
                ) : (
                    <div><LoggedIn /></div>
                )}
            </div>
        ) : (
        <div><LoggedOut /></div>
        )}
        </>
    )
}

export default Home;