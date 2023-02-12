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
									placeholder="Name your deck something unique"
									onChange={(e) => setDeckName(e.target.value)}
								/>
							</div>
                            <div>
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

export default CreateDeckModal;