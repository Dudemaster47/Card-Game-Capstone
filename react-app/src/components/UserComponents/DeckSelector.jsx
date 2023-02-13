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

    useEffect(() => {
        dispatch(getAllDecksThunk(userId));
        deckArray = [defaultDeck].concat(realDeckArray)
    }, [dispatch, userId, realDeckArray])

    return (
        <div className="innerDeckSelector">
            <div className="deckSelectorTitleBar">
                <div className="buttonShrinker2">
                    <button onClick={() => setIsOpen(true)} className="mainButton">Create New Deck</button>
                </div>
                <h2 className="deckSelectorTitle">Deck Selector</h2>
            </div>
            <div className="deckContainer">
                {(deckArray && deckArray.includes(defaultDeck)) && deckArray.map((el) => (
                    <li key={el.id} className="selectorBox">
                        <Deck deckID={el.id} deckArray={deckArray} />
                    </li>
                ))}
            </div>

            { isOpen && (
                <CreateDeckModal
                    setIsOpen={setIsOpen}
                />
            )}
        </div>
    )
}

export default DeckSelector;