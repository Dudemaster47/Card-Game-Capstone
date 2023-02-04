const LOAD_CARDS = "cards/getallcards"

const loadCards = (payload) => ({
	type: LOAD_CARDS,
	payload,
});

export const getAllCardsThunk = (id) => async (dispatch) => {
	const res = await fetch(`/api/cards`);

	if (res.ok) {
		const payload = await res.json();
		dispatch(loadCards(payload));
		return payload;
	}
};

export const getSingleCard = (id) => async (dispatch) => {
	const res = await fetch(`/api/cards/${id}`);

	if (res.ok) {
		const payload = await res.json();
		dispatch(loadCards(payload));
		return payload;
	} else if (res.status < 500) {
		const data = await res.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
};

const cardReducer = (state = {}, action) => {
    let newState = { ...state };
	switch (action.type) {
		case LOAD_CARDS:
			return { ...newState, ...action.payload };
		default:
			return state;
	}
};

export default cardReducer;