import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

function UserStats() {
    const { userId } = useParams();

    const users = useSelector((state) => state.users.users)
    let user;

    if (users){
        user = users.filter(el => el.id == userId)   
    }

    return (
        <>
        { user && (
            <div>
                <p>Wins: <span>{user[0].wins}</span></p>
                <p>Losses: <span>{user[0].losses}</span></p>
            </div>
        )}
        </>
    )
};

export default UserStats;