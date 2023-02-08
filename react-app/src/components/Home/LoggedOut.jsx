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
        <h2>This is Card Games!! To continue, please <Link to='/sign-up'>SIGN UP</Link>, <Link to='/login'>LOG IN</Link>, or <button onClick={handleClick}>CONTINUE AS GUEST</button></h2>
    );

}

export default LoggedOut;