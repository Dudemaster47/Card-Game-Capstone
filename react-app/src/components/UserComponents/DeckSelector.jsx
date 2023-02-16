import { useEffect, useState } from "react";
import Deck from "./Deck";
import CreateDeckModal from "../Modals/CreateDeckModal";
import { useSelector, useDispatch } from "react-redux";
import { getAllDecksThunk } from "../../store/customDecks";

function DeckSelector({user}) {
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState([]);
    let defaultDeck = user.defaultDeck;
    defaultDeck.id = 0;
    const realDeckArray = useSelector((state) => state.session.user.decks)
    let deckArray = [defaultDeck].concat(realDeckArray)
    const sessionUser = useSelector((state) => state.session.user);
    const userId = sessionUser.id;
    
    const sendSelectedToSelector = (select) => {
        setSelected(select)
    };   

    /* note to self: localstorage method used to save which deck belonging to a user is currently selected overwrites any other user's decks 
    that may be stored locally. don't know if this will be a problem during multiplayer, but have resolved it so it resets the selected deck
    to default when a new user checks their profile page. at the very least it shouldn't break anything now, but will need to return to this
    and revise how it works eventually to ensure multiple users' decks can be stored locally.*/

    useEffect(() => {
        dispatch(getAllDecksThunk(userId));
        deckArray = [defaultDeck].concat(realDeckArray)
    }, [dispatch, userId, realDeckArray])

    useEffect(() => {
        const userAndDeck = JSON.parse(localStorage.getItem('userAndDeck'))
        if((userAndDeck[0] === userId) && userAndDeck[1]){
            setSelected(userAndDeck[1])
        } else {
            setSelected(0)
        }
    }, [])

    useEffect(() => {
        const userAndDeckArray = [userId, selected]
        localStorage.setItem('userAndDeck', JSON.stringify(userAndDeckArray))
    }, [selected, userId]);


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
                        <Deck deckID={el.id} deckArray={deckArray} selector={sendSelectedToSelector} select={selected}/>
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