const LOAD_DEFAULT_DECK =  "/decks/getalldecks"

const loadDeck = (payload) => ({
	type: LOAD_DEFAULT_DECK,
	payload,
});

export const getDefaultDeckThunk = (id) => async (dispatch) => {
	const res = await fetch(`/api/users/decks`);

	if (res.ok) {
		const payload = await res.json();
		dispatch(loadDeck(payload));
		return payload;
	}
};

const defaultDeckReducer = (state = {}, action) => {
    let newState = { ...state };
	switch (action.type) {
		case LOAD_DECK:
			return { ...newState, ...action.payload };
		default:
			return state;
	}
};

export default defaultDeckReducer;