import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { deleteGameThunk } from "../../store/games";
import { editUserThunk } from "../../store/users";

function War1P() {
    const history = useHistory()
    const { gameId } = useParams()
    const sessionUser = useSelector((state) => state.session.user);
    const [playerDeck, setPlayerDeck] = useState([]);
    const [computerDeck, setComputerDeck] = useState([]);
    const [playerDiscard, setPlayerDiscard] = useState([]);
    const [computerDiscard, setComputerDiscard] = useState([]);
    const [playerInPlay, setPlayerInPlay] = useState([]);
    const [computerInPlay, setComputerInPlay] = useState([]);
    const [turnAlert, setTurnAlert] = useState(false);
    const [tieAlert, setTieAlert] = useState(false);
    const [tieCounter, setTieCounter] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [playerWin, setPlayerWin] = useState(false);
    const [playerLose, setPlayerLose] = useState(false);

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
    }, []);

    const inPlayChecker = (card1, card2) => {
        if(card1.value !== card2.value) {
            setTurnAlert(true);
        } else {
            setTieAlert(true);
        }
    };

    const endDaGame = () => {
        if (playerWin) {
            //um. fuck this has to write to the database. ugh. i actually need a specialized form and thunk for this. rip me.
            let wins = (sessionUser.wins + 1)
            let losses = (sessionUser.losses)
            let editedUser = { wins: wins, losses: losses }
            editUserThunk(editedUser);
        } else if (playerLose) {
            //um. fuck this has to write to the database. ugh. i actually need a specialized form and thunk for this. rip me.
            let wins = (sessionUser.wins)
            let losses = (sessionUser.losses + 1)
            let editedUser = { wins: wins, losses: losses }
            editUserThunk(editedUser);
        }
        deleteGameThunk(gameId);
        history.push('/');
    }

    const deckCheck = () => {
     // DECK CHECK. 
    // it checks before cards are drawn to see if there are 0 cards in the deck
    // if there are 0 cards it checks the discard pickle
    // if there are cards in the discard pcikle it, put them in a shallow copy, shuffle that copy, flatten that shuffle, then put that shit
    // IN THE DECK
    // and make the disclard pickle into an empty array
    // BUT IF THE DISCARD PILE IS ZERO AND THE DECK IS ZRO.LENGTH
    // OHH BABY THAT MEANS THE GAME
    // IS OVARRRRR
        if (playerDeck.length === 0 && playerDiscard.length !== 0){
            let shallowCopy = playerDiscard;
            let shuffledDeck = [];
            shuffle(shallowCopy, shuffledDeck);
            shuffledDeck = shuffledDeck.flat();
            setPlayerDeck(shuffledDeck);
        } else if (playerDeck.length === 0 && playerDiscard.length === 0){
            setGameOver(true);
        }
        if (computerDeck.length === 0 && computerDiscard.length !== 0){
            let shallowCopy = computerDiscard;
            let shuffledDeck = [];
            shuffle(shallowCopy, shuffledDeck);
            shuffledDeck = shuffledDeck.flat();
            setComputerDeck(shuffledDeck);
        } else if (computerDeck.length === 0 && computerDiscard.length === 0){
            setGameOver(true);
        }
    }

    const discard = () => {
        // this just handles where cards go after a winner of a turn is decided
        let playerDiscardCopy = playerDiscard;
        let computerDiscardCopy = computerDiscard;
        if(playerInPlay[0].value > computerInPlay[0].value) {
            playerDiscardCopy = playerDiscardCopy.concat(playerInPlay);
            playerDiscardCopy = playerDiscardCopy.concat(computerInPlay);
        }
        else {
            computerDiscardCopy = computerDiscardCopy.concat(computerInPlay);
            computerDiscardCopy = computerDiscardCopy.concat(playerInPlay);
        }
        setPlayerDiscard(playerDiscardCopy);
        setComputerDiscard(computerDiscardCopy);
        setPlayerInPlay([]);
        setComputerInPlay([])
    }

    const tieBreak = (e) => {
        e.preventDefault();
        //acts as Advance Turn does but adds three more cards to each In Play state. 
        //only the final cards added are compared. 
        //if one card is greater than another, it moves to the winner announcement
        //if there's a tie again, another tiebreaker must occur. repeat until the tie is broken
        //maybe count how many ties occur in a row to be smarmier in the announcement box each time
        //that means more state tho...
        let tieUpdate = tieCounter + 1
        setTieCounter(tieUpdate);
        let shallowDeck1 = playerDeck;
        let shallowDeck2 = computerDeck;
        let inPlay1 = playerInPlay;
        let inPlay2 = computerInPlay;
        for(let i = 0; i < 3; i++){
            if(shallowDeck1.length > 0){
                inPlay1.push(shallowDeck1.shift());
            }
            if(shallowDeck2.length > 0){
                inPlay2.push(shallowDeck2.shift());
            }
        }
        setPlayerInPlay(inPlay1);
        setComputerInPlay(inPlay2);
        setPlayerDeck(shallowDeck1);
        setComputerDeck(shallowDeck2);
        inPlayChecker(inPlay1[(inPlay1.length - 1)], inPlay2[(inPlay2.length - 1)]);
    }
 

    const advanceTurn = (e) => {
        e.preventDefault();
        //what this does is simple:
        /* create shallow copies of both decks as mutating state is bad(tm) 
        shifts the first element of each into their respective IN PLAY states.
        replaces the deck state with the now shortened shallow copy
        compares the value of the two in play cards
        if one is greater than the other, opens a div that says which one won
        if there's a tie, opens a div that announces a tie
        */
        let shallowDeck1 = playerDeck;
        let shallowDeck2 = computerDeck;
        let inPlay1 = []
        let inPlay2 = []
        inPlay1.push(shallowDeck1.shift())
        inPlay2.push(shallowDeck2.shift())
        setPlayerInPlay(inPlay1)
        setComputerInPlay(inPlay2);
        setPlayerDeck(shallowDeck1);
        setComputerDeck(shallowDeck2);
        inPlayChecker(inPlay1[0], inPlay2[0])
    }

    // alright. problem. the setInPlay state methods do not update the in play state "fast" enough for me to. immediately turn
    // around and use it for checks.
    // even though the deck state methods do update fast enough. 


    const endTurn = (e) => {
        e.preventDefault();
        //moves in play cards to the winner's discard pile
        //then removes the announcement window and re-enables the advance turn button.
        discard();
        setTieCounter(0);
        setTurnAlert(false);
    }



    return(
        <>
            <div>
                <p>OPPONENT PLAY AREA</p>
                <div>OPPONENT PROFILE</div>
                <div>OPPONENT DISCARD PILE: {`${computerDiscard.length}`} CARDS</div>
                <div>OPPONENT DECK: {`${computerDeck.length}`} CARDS</div>
                <div>OPPONENT IN PLAY</div>
            </div>
            <div>
                <div>
                    <p>ANNOUNCEMENTS</p>
                    {turnAlert ? (
                        <div>
                            {playerInPlay[0].value > computerInPlay[0].value ? (
                                <p>
                                    Player wins!
                                </p>
                            ) : (
                                <p>
                                    Computer Wins!
                                </p>
                            )}
                            <p>
                                Player Card: {`${playerInPlay[playerInPlay.length - 1].number}`} of {`${playerInPlay[playerInPlay.length - 1].suit}`}
                            </p>
                            <p>
                                Opponent Card: {`${computerInPlay[computerInPlay.length - 1].number}`} of {`${computerInPlay[computerInPlay.length - 1].suit}`}
                            </p>
                            <button className="mainButton" onClick={endTurn}>CONTINUE</button>
                        </div>
                    ) : null}
                    {tieAlert ? (
                        <div>
                            <p>
                                It's a tie!
                            </p>
                            <p>
                                Ties in a row: {`${tieCounter}`}
                            </p>
                            {tieCounter === 2 ? (
                                <p>
                                    This is unlikely.
                                </p>
                            ) : tieCounter === 3 ? (
                                <p>
                                    This is exceptionally unlikely.
                                </p>
                            ) : tieCounter === 4 ? (
                                <p>
                                    Really?!
                                </p>
                            ) : tieCounter === 5 ? (
                                <p>
                                    How are you doing this?
                                </p>
                            ) : tieCounter > 5 ? (
                                <p>
                                    Congratulations, you're the only person seeing this probably ever.
                                </p>
                            ) : null}
                            <p>
                                Player Card: {`${playerInPlay[(playerInPlay.length - 1)].number}`} of {`${playerInPlay[(playerInPlay.length - 1)].suit}`}
                            </p>
                            <p>
                                Opponent Card: {`${computerInPlay[(computerInPlay.length - 1)].number}`} of {`${computerInPlay[(computerInPlay.length - 1)].suit}`}
                            </p>
                            <button className="mainButton" onClick={(e) => {
                                setTieAlert(false);
                                tieBreak(e);
                                }}>TIEBREAK!</button>
                        </div>
                    ) : null}
                    { gameOver ? (
                        <div>
                            {(playerDeck.length + playerDiscard.length + playerInPlay.length) > (computerDeck.length + computerDiscard.length + computerInPlay.length) ? (
                                <div>
                                    <p>
                                        Player wins!
                                    </p>
                                    <button className="mainButton" onClick={endDaGame}>END GAME</button>
                                </div>
                            ) : (playerDeck.length + playerDiscard.length + playerInPlay.length) < (computerDeck.length + computerDiscard.length + computerInPlay.length) ? (
                                <div>
                                    <p>
                                        Computer wins!
                                    </p>
                                    <button className="mainButton" onClick={endDaGame}>END GAME</button>
                                </div>
                            ) : (
                                <div>
                                    <p>
                                        It's a tie!
                                    </p>
                                    <button className="mainButton">SUDDEN DEATH!!!</button>
                                </div>
                            )}
                        </div>
                    ) : null }
                </div>
                {(!turnAlert && !tieAlert && !gameOver) ? (
                    <div>
                        <button onClick={(e) => {
                            advanceTurn(e)
                            }} className="mainButton">ADVANCE TURN</button>
                    </div>
                ) : (
                    <div>
                        <button className="mainButtonDisabled" disabled>DISABLED</button>
                    </div>
                )}
            </div>
            <div>
                <div>PLAYER IN PLAY</div>
                <div>PLAYER DECK: {`${playerDeck.length}`} CARDS</div>
                <div>PLAYER DISCARD PILE: {`${playerDiscard.length}`} CARDS</div>
                <div>PLAYER PROFILE</div>
                <p>PLAYER PLAY AREA</p>
            </div>
        </>
    )
}

export default War1P;