import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { createDeckThunk } from "../../store/customDecks";
import { refreshSessionuser } from "../../store/session";

function CreateDeckModal({setIsOpen}){
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const [deckName, setDeckName] = useState("");
    const [cardArt, setCardArt] = useState("")
    const [errors, setErrors] = useState([]);

    const handleSubmit = async (e) => {
		e.preventDefault();

		const newDeck = {
			user_id: sessionUser.id,
			deck_name: deckName,
			card_art: cardArt,
		};
		let data = await dispatch(createDeckThunk(newDeck));
		if (data) {
			setErrors(data);
		} else {
			dispatch(refreshSessionuser(newDeck.user_id))
			setIsOpen(false);
		}
	};    

    return (
        <>
        <div className="darkBG" onClick={() => setIsOpen(false)} />
			<div className="centered">
				<div className="modal">
					<div className="modalHeader">
						<h5 className="modalHeading">Deck Creation</h5>
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
								<label htmlFor="deck name">Deck Name:</label>
								<input
									type="text"
									name="deck name"
									value={deckName}
									placeholder="Name your deck something unique"
									onChange={(e) => setDeckName(e.target.value)}
								/>
							</div>
                            <div className="input">
								<label htmlFor="card art">Deck Art:</label>
								<input
									type="text"
									name="card art"
									value={cardArt}
									placeholder="Paste a valid URL here"
									onChange={(e) => setCardArt(e.target.value)}
								/>
							</div>
						</form>
					</div>

					<div className="modalActions">
						<div className="actionsContainer">
							<button
								onClick={handleSubmit}
								className="submitBtn"
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

export default CreateDeckModal;