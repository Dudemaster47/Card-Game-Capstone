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
    }
    
    useEffect(() => {
            dispatch(refreshSessionuser(sessionUser.id))
    }, [edited, deleted])

    const deleteDeck = (e) => {
        e.preventDefault();
        window.alert("insert are you sure modal here")
        dispatch(deleteDeckThunk(deck[0]))
        setDeleted(true)
    }

    return (
        <>  { deck && (
            <div>
                <div>
                    <div>
                        <img src={deck[0].cardArt} alt={deck[0].cardArt} />
                    </div>
                    {deck[0].deckName ? (
                        <p>{deck[0].deckName}</p>
                    ) : (
                        <p>Default Deck</p>
                    )}
                </div>
                
                {deck[0].deckName ? (
                    <div>
                        <button onClick={() => setIsOpen(true)}>Change Deck</button>
                        <button onClick={(e) => {
                            deleteDeck(e)
                            }}>
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
        </>
    )
}

export default Deck;