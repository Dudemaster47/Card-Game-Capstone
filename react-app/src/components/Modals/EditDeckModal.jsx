import { useDispatch } from "react-redux";
import { useState } from "react";
import { editDeckThunk } from "../../store/customDecks";

function EditDeckModal({setIsOpen, deck, sendDataToDecks}) {
    const dispatch = useDispatch();
    const [deckName, setDeckName] = useState(deck.deckName);
    const [cardArt, setCardArt] = useState(deck.cardArt)
    const [errors, setErrors] = useState([]);
	

    const handleSubmit = async (e) => {
		e.preventDefault();

		const editedDeck = {
			id: deck.id,
			user_id: deck.userId,
			deck_name: deckName,
			card_art: cardArt,
		};
		let data = await dispatch(editDeckThunk(editedDeck));
		if (data) {
			setErrors(data);
		} else {
			setIsOpen(false);
			sendDataToDecks(true)
		}
	};    

    return (
        <>
        <div className="darkBG" onClick={() => setIsOpen(false)} />
			<div className="centered">
				<div className="modal">
					<div className="modalHeader">
						<h5 className="modalHeading">Deck Editing</h5>
					</div>
					<button
						className="closeBtn"
						onClick={() => setIsOpen(false)}
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
									placeholder={deck.deckName}
									onChange={(e) => setDeckName(e.target.value)}
								/>
							</div>
                            <div className="input">
								<label htmlFor="card art">Deck Art:</label>
								<input
									type="text"
									name="card art"
									value={cardArt}
									placeholder={deck.cardArt}
									onChange={(e) => setCardArt(e.target.value)}
								/>
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

export default EditDeckModal;