const LOAD_CUSTOM_DECKS =  "/decks/getalldecks"
const DELETE_CUSTOM_DECK = "/decks/deletedeck"

const loadDecks = (payload) => ({
	type: LOAD_CUSTOM_DECKS,
	payload,
});

const deleteDeck = (payload) => {
	return {
		type: DELETE_CUSTOM_DECK,
		payload,
	};
};

export const getAllDecksThunk = (id) => async (dispatch) => {
	const res = await fetch(`/api/users/${id}/decks`);

	if (res.ok) {
		const payload = await res.json();
		dispatch(loadDecks(payload));
		return payload;
	}
};

export const getSingleDeck = (id) => async (dispatch) => {
	const res = await fetch(`/api/decks/${id}`);

	if (res.ok) {
		const payload = await res.json();
		dispatch(loadDecks(payload));
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

export const createDeckThunk = (data) => async (dispatch) => {
	const newDeck = JSON.stringify(data);

	const response = await fetch("/api/decks", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: newDeck,
	});

	if (response.ok) {
		const data = await response.json();
		dispatch(loadDecks(data));
		return null;
	} else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
};

export const editDeckThunk = (data) => async (dispatch) => {
	const editedDeck = JSON.stringify(data);

	const res = await fetch(`/api/decks/${data.id}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: editedDeck,
	});

	if (res.ok) {
		const data = await res.json();
		dispatch(loadDecks(data));
		return null;
	} else if (res.status < 500) {
		const data = await res.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
};

export const deleteDeckThunk = (data) => async (dispatch) => {
	const body = JSON.stringify(data);

	const res = await fetch(`/api/decks/${data.id}`, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
		},
		body,
	});

	if (res.ok) {
		dispatch(deleteDeck(data.id));
		return data;
	}
};

const customDeckReducer = (state = {}, action) => {
    let newState = { ...state };
	switch (action.type) {
		case LOAD_CUSTOM_DECKS:
			return { ...newState, ...action.payload };
		case DELETE_CUSTOM_DECK:
			delete newState[action.payload];
			return newState;
		default:
			return state;
	}
};

export default customDeckReducer;