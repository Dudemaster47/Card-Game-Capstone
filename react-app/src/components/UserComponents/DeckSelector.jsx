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

    useEffect(() => {
        dispatch(getAllDecksThunk(userId));
        deckArray = [defaultDeck].concat(realDeckArray)
    }, [dispatch, userId, realDeckArray])

    useEffect(() => {
        const currentDeckId = JSON.parse(localStorage.getItem('currentDeckId'))
        if(currentDeckId){
            console.log(currentDeckId, "checking")
            setSelected(currentDeckId)
        } else {
            setSelected(0)
        }
    }, [])

    useEffect(() => {

        localStorage.setItem('currentDeckId', JSON.stringify(selected))
    }, [selected]);


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