import { useEffect, useState } from "react";
import Deck from "./Deck";
import CreateDeckModal from "../Modals/CreateDeckModal";
import { useSelector, useDispatch } from "react-redux";
import { getAllDecksThunk } from "../../store/customDecks";

function DeckSelector({user}) {
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);
    let defaultDeck = user.defaultDeck;
    defaultDeck.id = 0;
    const realDeckArray = useSelector((state) => state.session.user.decks)
    let deckArray = [defaultDeck].concat(realDeckArray)
    const sessionUser = useSelector((state) => state.session.user);
    const userId = sessionUser.id;
    console.log(deckArray);

    useEffect(() => {
        dispatch(getAllDecksThunk(userId));
        deckArray = [defaultDeck].concat(realDeckArray)
    }, [dispatch, userId, realDeckArray])

    return (
        <>
            <button onClick={() => setIsOpen(true)} className="mainButton">Create New Deck</button>
            {(deckArray && deckArray.includes(defaultDeck)) && deckArray.map((el) => (
                <li key={el.id}>
                    <Deck deckID={el.id} deckArray={deckArray} />
                </li>
            ))}

            { isOpen && (
                <CreateDeckModal
                    setIsOpen={setIsOpen}
                />
            )}
        </>
    )
}

export default DeckSelector;