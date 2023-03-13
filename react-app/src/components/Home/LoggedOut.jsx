import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/session";

function LoggedOut() {
    const dispatch = useDispatch();
    const guest = useSelector((state) => state.users.users);
    const guestLogin = guest.filter(el => el.id === 1);
    const demoLogin = guest.filter(el => el.id === 3);
    
    const guestUser = guest && {
		email: guestLogin[0]?.email,
		password: "password",
	};
    const demoUser = guest && {
        email: demoLogin[0]?.email,
        password: "password"
    }

    const handleClick1 = (e) => {
		e.preventDefault();
		return dispatch(login(guestUser.email, guestUser.password));
	};

    const handleClick2 = (e) => {
        e.preventDefault();
        return dispatch(login(demoUser.email, demoUser.password))
    }
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
                <button onClick={handleClick1} className="mainButton">CONTINUE AS GUEST</button>
            </li>
            <li className="loginListButton">
                <button onClick={handleClick2} className="mainButton">DEMO LOGIN</button>
            </li>
        </ul>
        <p>NOTE: DEMO LOGIN IS DIFFERENT THAN GUEST. SEE HELP PAGE FOR MORE INFO.</p>
    </div>
    );

}

export default LoggedOut;