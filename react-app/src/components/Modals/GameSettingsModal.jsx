import { useDispatch } from "react-redux";
import { useState } from "react";
import { editGameThunk } from "../../store/games";

function GameSettingsModal({setIsOpen, game, sendDataToHome}) {
    const dispatch = useDispatch();
	const [timeLimit, setTimeLimit] = useState("300");
	const [gameType, setGameType] = useState("War");
	const [errors, setErrors] = useState([]);

	const handleSubmit = async (e) => {
		e.preventDefault();

		const editedGame = {
			id: game.id,
			user_id: game.userId,
			timer: timeLimit,
			game_type: gameType,
		};
		let data = await dispatch(editGameThunk(editedGame));
		if (data) {
			setErrors(data);
		} else {
			setIsOpen(false)
			sendDataToHome(true)
		}
	};
    return (
        <>
        <div onClick={() => setIsOpen(false)} />
			<div>
				<div>
					<div>
						<h5>Game Settings</h5>
					</div>
					<button
						onClick={() => setIsOpen(false)}
					>
					</button>
					<div>
						<form onSubmit={handleSubmit}>
							<div>
								{errors.map((error, ind) => (
									<div key={ind}>{error}</div>
								))}
							</div>
							<div>
								<label htmlFor="time limit">Time Limit:</label>
								<input
									type="text"
									name="time limit"
									value={timeLimit}
									placeholder={game?.timeLimit}
									onChange={(e) => setTimeLimit(parseInt(e.target.value))}
								/>
							</div>
							<label>Game Type: </label>
							<select
								value={gameType}
								onChange={(e) => setGameType(e.target.value)}
							>
								<option value="--">--</option>
								<option value="War">War</option>
							</select>
						</form>
					</div>

					<div>
						<div>
							<button
								onClick={handleSubmit}
							>
								Submit
							</button>
							<button
								onClick={() => setIsOpen(false)}
							>
								Cancel
							</button>
						</div>
					</div>
				</div>
			</div>
        </>
    )
}

export default GameSettingsModal;