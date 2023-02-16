import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

function War1P() {
    const sessionUser = useSelector((state) => state.session.user);
    const [playerDeck, setPlayerDeck] = useState([]);
    const [computerDeck, setComputerDeck] = useState([]);
    const [playerDiscard, setPlayerDiscard] = useState([]);
    const [computerDiscard, setComputerDiscard] = useState([]);
    const [playerInPlay, setPlayerInPlay] = useState([]);
    const [computerInPlay, setComputerInPlay] = useState([]);

    useEffect(() => {
        const userAndDeck = JSON.parse(localStorage.getItem('userAndDeck'))
        let deck;
        let deckCards;
        if(userAndDeck[1] === 0){
            deck = sessionUser.defaultDeck;
        } else {
            deck = sessionUser.decks.filter((el) => el.id === userAndDeck[1]) 
        }
        deckCards = deck[0].cards;
        console.log(deckCards)
        //shuffle this bitch THEN split it boyyyyy

    }, [])

    return(
        <>
            <div>
                <p>OPPONENT PLAY AREA</p>
                <div>OPPONENT DISCARD PILE</div>
                <div>OPPONENT DECK</div>
                <div>OPPONENT IN PLAY</div>
            </div>
            <div>
                <button>ADVANCE TURN</button>
            </div>
            <div>
                <div>PLAYER IN PLAY</div>
                <div>PLAYER DECK</div>
                <div>PLAYER DISCARD PILE</div>
                <p>PLAYER PLAY AREA</p>
            </div>
        </>
    )
}

export default War1P;