import { useHistory } from "react-router-dom";

const PageNotFound = () => {
    const history = useHistory();
	const routeChangeToHome = (e) => {
		history.push("/");
	};
    return (
        <div className="pageNotFound">
            <h1>404: PAGE NOT FOUND</h1>
        </div>
    )
}

export default PageNotFound;