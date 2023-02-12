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
        <div onClick={() => setIsOpen(false)} />
			<div>
				<div>
					<div>
						<h5>Deck Creation</h5>
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
								<label htmlFor="deck name">Deck Name:</label>
								<input
									type="text"
									name="deck name"
									value={deckName}
									placeholder={deck.deckName}
									onChange={(e) => setDeckName(e.target.value)}
								/>
							</div>
                            <div>
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

export default EditDeckModal;