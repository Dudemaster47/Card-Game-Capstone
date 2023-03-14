import { useDispatch } from "react-redux";
import { useState } from "react";
import { editGameThunk } from "../../store/games";

function GameSettingsModal({setIsOpen, game, sendDataToHome}) {
    const dispatch = useDispatch();
	const [timeLimit, setTimeLimit] = useState(game.timer);
	const [gameType, setGameType] = useState(game.gameType);
	const [errors, setErrors] = useState([]);

	const handleSubmit = async (e) => {
		e.preventDefault();

		const editedGame = {
			id: game.id,
			user_id: game.userId,
			timer: timeLimit,
			game_type: gameType,
		};
		if (editedGame && editedGame.game_type !== "War"){
			setErrors([`${editedGame.game_type} is not yet implemented.`]);
		} else {
			let data = await dispatch(editGameThunk(editedGame));
			if (data) {
				setErrors(data);
			} else {
				setIsOpen(false)
				sendDataToHome(true)
			}
		}
	};

    return (
        <>
        <div className="darkBG" onClick={() => setIsOpen(false)} />
			<div className="centered">
				<div className="modal">
					<div className="modalHeader">
						<h5 className="modalHeading">Game Settings</h5>
					</div>
					<button
						onClick={() => setIsOpen(false)}
						className="closeBtn"
					>
						X
					</button>
					<div className="modalContent">
						<form onSubmit={handleSubmit}>
						<div className="errors-section">
								{errors.map((error, ind) => (
									<div className="error-body" key={ind}>
										<ul>
											<li className="error-item">
												{error}
											</li>
										</ul>
									</div>
								))}
							</div>
							<div className="input">
								<label htmlFor="time limit">Time Limit:</label>
								<input
									type="text"
									name="time limit"
									value={timeLimit}
									placeholder={game.timeLimit}
									onChange={(e) => setTimeLimit(parseInt(e.target.value) || 0)}
								/>
							</div>
							<div className="input">
								<label>Game Type: </label>
								<select
									value={gameType}
									onChange={(e) => setGameType(e.target.value)}
								>
									<option value="War">War</option>
									<option value="Gin Rummy">Gin Rummy</option>
									<option value="Blackjack">Blackjack</option>
									<option value="Spite & Malice">Spite & Malice</option>
								</select>
							</div>
						</form>
					</div>

					<div className="modalActions">
						<div className="actionsContainer">
							<button
								className="submitBtn"
								onClick={handleSubmit}
							>
								Submit
							</button>
							<button
								onClick={() => setIsOpen(false)}
								className="cancelBtn"
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