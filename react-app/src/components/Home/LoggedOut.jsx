import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/session";

function LoggedOut() {
    const dispatch = useDispatch();
    const guest = useSelector((state) => state.users.users)
    
    const guestUser = guest && {
		email: guest[0]?.email,
		password: "password",
	};

    const handleClick = (e) => {
		e.preventDefault();
		return dispatch(login(guestUser.email, guestUser.password));
	};
    return (
    <div className="loggedOutContainer">   
        <h2 className="loginBlurb">This is Card Games (better name pending)!! To continue, please:</h2>
        <ul className="loginList">
            <li className="loginListButton">
                <Link to='/sign-up' className="mainButton">SIGN UP</Link>
            </li>
            <li className="loginListButton">
                <Link to='/login' className="mainButton">LOG IN</Link>
            </li>
            <li className="loginListButton">
                <button onClick={handleClick} className="mainButton">CONTINUE AS GUEST</button>
            </li>
        </ul>
    </div>
    );

}

export default LoggedOut;