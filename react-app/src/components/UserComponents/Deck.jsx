import { useDispatch, useSelector } from "react-redux";
import { deleteDeckThunk } from "../../store/customDecks";
import EditDeckModal from "../Modals/EditDeckModal";
import { useEffect, useState } from "react";
import { refreshSessionuser } from "../../store/session";

function Deck({deckID, deckArray}){
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user)
    const deck = deckArray.filter((el) => el.id === deckID)
    const [isOpen, setIsOpen] = useState(false);
    const [edited, setEdited] = useState(false);
    const [deleted, setDeleted] = useState(false);

    const sendDataToDecks = (i) => {
        setEdited(i)
        setEdited(false)
        setEdited(true)
    }
    
    useEffect(() => {
            dispatch(refreshSessionuser(sessionUser.id));
            deckArray && setDeleted(false);
            
    }, [edited, deleted, dispatch])

    const deleteDeck = (e) => {
        e.preventDefault();
        window.alert("insert are you sure modal here")
        dispatch(deleteDeckThunk(deck[0]));
        setDeleted(true);
    }

    return (
        <div className = "innerSelectorBox">  
            { deck && (
                <div className = "innerInnerSelectorBox">
                    <div className = "deckInfoBox">
                        <div className = "deckPictureBox">
                            <img src={deck[0].cardArt} alt={deck[0].cardArt} className="deckPicture" />
                        </div>
                        {deck[0].deckName ? (
                            <p className="deckName">{deck[0].deckName}</p>
                        ) : (
                            <p className="deckName">Default Deck</p>
                        )}
                    </div>
                    
                    {deck[0].deckName ? (
                        <div className="deckButtonBox">
                            <button onClick={() => setIsOpen(true)} className="mainButton">Change Deck</button>
                            <button onClick={(e) => {
                                deleteDeck(e)
                                }} className="mainButton">
                                Delete Deck
                            </button>
                        </div>
                    ) : null}

                    { isOpen && (
                        <EditDeckModal
                            setIsOpen={setIsOpen}
                            sendDataToDecks={sendDataToDecks}
                            deck={deck[0]}
                        />
                    )}
                </div>
            )}
        </div>
    )
}

export default Deck;