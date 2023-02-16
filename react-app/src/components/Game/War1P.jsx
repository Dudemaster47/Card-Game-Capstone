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

    const shuffle = (intlDeck, fnlDeck) => {
        if(intlDeck.length > 0){
            let randNum = Math.floor(Math.random() * (intlDeck.length - 1));
            fnlDeck.push(intlDeck.splice(randNum, 1));
            shuffle(intlDeck, fnlDeck);
        }
    }

    // this useEffect can probably be compressed to a single line honestly. refactor it later.
    // oh right, what this (and the shuffle function above) does is shuffle the deck and then cut it in half
    // putting one half into the player's possession and the other into the computer's.
    useEffect(() => {
        const userAndDeck = JSON.parse(localStorage.getItem('userAndDeck'))
        let deck;
        let deckCards;
        let shuffledDeck = [];
        let deckHalf1 = [];
        let deckHalf2 = [];
        if(userAndDeck[1] === 0){
            deck = sessionUser.defaultDeck;
        } else {
            deck = sessionUser.decks.filter((el) => el.id === userAndDeck[1]) 
        }
        deckCards = deck[0].cards;
        shuffle(deckCards, shuffledDeck);
        shuffledDeck = shuffledDeck.flat();
        deckHalf1 = shuffledDeck.slice(0, 26);
        deckHalf2 = shuffledDeck.slice(26);
        setPlayerDeck(deckHalf1);
        setComputerDeck(deckHalf2);
    }, [])

    const advanceTurn = (e) => {
        e.preventDefault();
        console.log(playerDeck);
        console.log(computerDeck);
        //what this does is simple:
        /* create shallow copies of both decks as mutating state is bad(tm) 
        shifts the first element of each into their respective IN PLAY states.
        replaces the deck state with the now shortened shallow copy
        compares the value of the two in play cards
        if one is greater than the other, outputs a div that says which one won
        if there's a tie, outputs a div that announces a tie
        */
    }

    return(
        <>
            <div>
                <p>OPPONENT PLAY AREA</p>
                <div>OPPONENT DISCARD PILE</div>
                <div>OPPONENT DECK</div>
                <div>OPPONENT IN PLAY</div>
            </div>
            <div>
                <button onClick={advanceTurn} className="mainButton">ADVANCE TURN</button>
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