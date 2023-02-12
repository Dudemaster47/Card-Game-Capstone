const LOAD_GAMES = "/games/getallgames";
const DELETE_GAME = "/products/deletegame";

const loadGames = (payload) => ({
	type: LOAD_GAMES,
	payload,
});

const deleteGame = (payload) => {
	return {
		type: DELETE_GAME,
		payload,
	};
};

// GET all games
export const getAllGamesThunk = () => async (dispatch) => {
	const response = await fetch(`/api/games`);
	if (response.ok) {
		const data = await response.json();
		dispatch(loadGames(data));
		return data;
	}
};

//GET specific game by gameId
export const getGameById = (id) => async (dispatch) => {
	const response = await fetch(`/api/games/${id}`);
	if (response.ok) {
		const data = await response.json();
		dispatch(loadGames(data));
		return data;
	}
};

// CREATE A GAME
export const createGameThunk = (data) => async (dispatch) => {
	const newGame = JSON.stringify(data);

	const response = await fetch(`/api/games`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: newGame,
	});

	if (response.ok) {
		const data = await response.json();
		dispatch(loadGames(data));
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

// EDIT A GAME
export const editGameThunk = (game) => async (dispatch) => {
	const editedGame = JSON.stringify(game);
	console.log(editedGame, "test2")
	const response = await fetch(`/api/games/${game.id}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: editedGame,
	});
	if (response.ok) {
		const data = await response.json();
		dispatch(loadGames(data));
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

// DELETE a GAME
export const deleteGameThunk = (data) => async (dispatch) => {
	const response = await fetch(`/api/games/${data.id}`, {
		method: "DELETE",
	});
	if (response.ok) {
		dispatch(deleteGame(data.id));
	}
};

const gameReducer = (state = {}, action) => {
	let newState = { ...state };
	switch (action.type) {
		case LOAD_GAMES:
			return { ...newState, ...action.payload };
		case DELETE_GAME:
			delete newState[action.payload];
			return newState;
		default:
			return state;
    }
};

export default gameReducer;