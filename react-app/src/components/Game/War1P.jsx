import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { deleteGameThunk } from "../../store/games";
import { editUserThunk } from "../../store/users";
import { refreshSessionuser } from "../../store/session";
import { getAllUsersThunk } from "../../store/users";

function War1P() {
    const history = useHistory()
    const dispatch = useDispatch()
    const { gameId } = useParams()
    const games = useSelector((state) => state.games)
    const thisGame = games[gameId]
    const sessionUser = useSelector((state) => state.session.user);
    const suddenDeathDeck = useSelector((state) => state.defaultDeck.deck);
    const [timeLeft, setTimeLeft] = useState(thisGame.timer);
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
    const [pause, setPause] = useState(false);
    const [forfeit, setForfeit] = useState(false);
    const [playerDeckInfo, setPlayerDeckInfo] = useState([]);
    let winCheck = false;
    let loseCheck = false;

    // note to self: ask for help un-spaghetti-ing this
    // namely: deck check doesn't work due to how state functions and i'm having trouble figuring out how to work around that issue when it comes
    // to reshuffling decks

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
        let deck = [];
        let deckCards = [];
        let shuffledDeck = [];
        let deckHalf1 = [];
        let deckHalf2 = [];
        if(userAndDeck[1] === 0){
            deck.push(sessionUser.defaultDeck);
        } else {
            deck = sessionUser.decks.filter((el) => el.id === userAndDeck[1]) 
        }
        deckCards = global.structuredClone(deck[0].cards);
        shuffle(deckCards, shuffledDeck);
        shuffledDeck = shuffledDeck.flat();
        deckHalf1 = shuffledDeck.slice(0, 26);
        deckHalf2 = shuffledDeck.slice(26);
        setPlayerDeck(deckHalf1);
        setComputerDeck(deckHalf2);
        setPlayerDeckInfo(deck);
    }, []);

    const suddenDeathChecker = (card1, card2) => {
        let playerDiscardCopy = global.structuredClone(playerDiscard);
        let computerDiscardCopy = global.structuredClone(computerDiscard);
        if(card1.value > card2.value) {
            playerDiscardCopy = playerDiscardCopy.concat(card1);
            playerDiscardCopy = playerDiscardCopy.concat(card2);
        }
        else if (card1.value < card2.value){
            computerDiscardCopy = computerDiscardCopy.concat(card1);
            computerDiscardCopy = computerDiscardCopy.concat(card2);
        }
        setPlayerDiscard(playerDiscardCopy);
        setComputerDiscard(computerDiscardCopy);
        setPlayerInPlay([]);
        setComputerInPlay([]);
        setGameOver(true);
    }

    const suddenDeath = () => {
        let deck = [];
        let shuffledDeck = [];
        let inPlay1;
        let inPlay2;
        deck = global.structuredClone(suddenDeathDeck.cards);
        shuffle(deck, shuffledDeck);
        shuffledDeck = shuffledDeck.flat();
        inPlay1 = shuffledDeck.shift()
        inPlay2 = shuffledDeck.shift()
        setPlayerInPlay(inPlay1);
        setComputerInPlay(inPlay2);
        suddenDeathChecker(inPlay1, inPlay2)
    }

    const inPlayChecker = (card1, card2) => {
        if(card1.value !== card2.value) {
            setTurnAlert(true);
        } else {
            setTieAlert(true);
        }
    };

    const endDaGame = () => {
        if (winCheck) {
            let wins = (sessionUser.wins + 1)
            let losses = (sessionUser.losses)
            let editedUser = { id: sessionUser.id, username: sessionUser.username, email: sessionUser.email, profile_img: sessionUser.profileImg, wins: wins, losses: losses }
            dispatch(editUserThunk(editedUser));
        } else if (loseCheck) {
            let wins = (sessionUser.wins)
            let losses = (sessionUser.losses + 1)
            let editedUser = { id: sessionUser.id, username: sessionUser.username, email: sessionUser.email, profile_img: sessionUser.profileImg, wins: wins, losses: losses }
            dispatch(editUserThunk(editedUser));
        }
        let gameData = {id: gameId}
        dispatch(deleteGameThunk(gameData));
        dispatch(refreshSessionuser(sessionUser.id));
        dispatch(getAllUsersThunk())
        history.push('/');
    }

    const deckCheck = (deck1, deck2, discard1, discard2, gOBool) => {
    // DECK CHECK. 
    // it checks before cards are drawn to see if there are 0 cards in the deck
    // if there are 0 cards it checks the discard pickle
    // if there are cards in the discard pcikle it, put them in a shallow copy, shuffle that copy, flatten that shuffle, then put that shit
    // IN THE DECK
    // and make the disclard pickle into an empty array
    // BUT IF THE DISCARD PILE IS ZERO AND THE DECK IS ZRO.LENGTH
    // OHH BABY THAT MEANS THE GAME
    // IS OVARRRRR
        if (deck1.length === 0 && discard1.length !== 0){
            let shuffledDeck = [];
            shuffle(discard1, shuffledDeck);
            shuffledDeck = shuffledDeck.flat();
            setPlayerDeck(shuffledDeck);
            setPlayerDiscard([])
            deck1 = shuffledDeck;
            if(deck1.length > 0){
                discard1 = [];
            }
  
        } else if (deck1.length === 0 && discard1.length === 0){
            setGameOver(true);
            gOBool = true;
        }
        if (deck2.length === 0 && discard2 !== 0){
            let shuffledDeck = [];
            shuffle(discard2, shuffledDeck);
            shuffledDeck = shuffledDeck.flat();
            setComputerDeck(shuffledDeck);
            setComputerDiscard([])
            deck2 = shuffledDeck;
            if(deck2.length > 0){
                discard2 = [];
            }
            
        } else if (deck2.length === 0 && discard2 === 0){
            setGameOver(true);
            gOBool = true;
        }
        return [deck1, deck2, discard1, discard2, gOBool];
    }

    const discard = () => {
        // this just handles where cards go after a winner of a turn is decided
        let playerDiscardCopy = global.structuredClone(playerDiscard);
        let computerDiscardCopy = global.structuredClone(computerDiscard);
        if(playerInPlay[playerInPlay.length - 1].value > computerInPlay[computerInPlay.length - 1].value) {
            playerDiscardCopy = playerDiscardCopy.concat(playerInPlay);
            playerDiscardCopy = playerDiscardCopy.concat(computerInPlay);
        }
        else if(playerInPlay[playerInPlay.length - 1].value < computerInPlay[computerInPlay.length - 1].value){
            computerDiscardCopy = computerDiscardCopy.concat(computerInPlay);
            computerDiscardCopy = computerDiscardCopy.concat(playerInPlay);
        }
        setPlayerDiscard(playerDiscardCopy);
        setComputerDiscard(computerDiscardCopy);
        setPlayerInPlay([]);
        setComputerInPlay([]);
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
        let deepDeck1 = global.structuredClone(playerDeck);
        let deepDeck2 = global.structuredClone(computerDeck);
        let deepDiscard1 = global.structuredClone(playerDiscard);
        let deepDiscard2 = global.structuredClone(computerDiscard);
        let inPlay1 = global.structuredClone(playerInPlay);
        let inPlay2 = global.structuredClone(computerInPlay);
        let gOBool = false
        let deckArr = deckCheck(deepDeck1, deepDeck2, deepDiscard1, deepDiscard2, gOBool)
        for(let i = 0; i < 3; i++){
            // deckCheck(deepDeck1, deepDeck2, deepDiscard1, deepDiscard2, gOBool);
            if(!deckArr[4]){
                deepDeck1 = deckArr[0];
                deepDeck2 = deckArr[1];
                deepDiscard1 = deckArr[2];
                deepDiscard2 = deckArr[3];
                inPlay1.push(deepDeck1.shift());
                inPlay2.push(deepDeck2.shift());
                deckArr = deckCheck(deepDeck1, deepDeck2, deepDiscard1, deepDiscard2, gOBool)
            }
        }
        if(!deckArr[4]){
            setPlayerInPlay(inPlay1);
            setComputerInPlay(inPlay2);
            setPlayerDeck(deepDeck1);
            setComputerDeck(deepDeck2);
            inPlayChecker(inPlay1[(inPlay1.length - 1)], inPlay2[(inPlay2.length - 1)]);
        }
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
       console.log(playerDeck)
       console.log(computerDeck, "WHAT IS FUCKING HAPPENING????")
       let deepDeck1 = global.structuredClone(playerDeck);
       let deepDeck2 = global.structuredClone(computerDeck);
       let deepDiscard1 = global.structuredClone(playerDiscard);
       let deepDiscard2 = global.structuredClone(computerDiscard);
       let gOBool = false;
       let deckArr = deckCheck(deepDeck1, deepDeck2, deepDiscard1, deepDiscard2, gOBool)
       if(!deckArr[4]){
        deepDeck1 = deckArr[0]
        deepDeck2 = deckArr[1]
        let inPlay1 = []
        let inPlay2 = []
            inPlay1.push(deepDeck1.shift())
            inPlay2.push(deepDeck2.shift())
            setPlayerInPlay(inPlay1)
            setComputerInPlay(inPlay2);
            setPlayerDeck(deepDeck1);
            setComputerDeck(deepDeck2);
            inPlayChecker(inPlay1[inPlay1.length - 1], inPlay2[inPlay2.length - 1])
        }
    }

    const endTurn = (e) => {
        e.preventDefault();
        //moves in play cards to the winner's discard pile
        //then removes the announcement window and re-enables the advance turn button.
        discard();
        setTieCounter(0);
        setTurnAlert(false);
    }

    useEffect(() => {
        // exit early when we reach 0
        if (!timeLeft){
            setGameOver(true);
            return;  
        } 
        // save intervalId to clear the interval when the
        // component re-renders
        const intervalId = setInterval(() => {
            if(!pause){
                setTimeLeft(timeLeft - 1);
            }
        }, 1000);
        // clear interval on re-render to avoid memory leaks
        return () => clearInterval(intervalId);
        // add timeLeft as a dependency to re-rerun the effect
        // when we update it
        }, [timeLeft, pause]);

        const handlePause = (e) => {
            e.preventDefault();
            setPause(!pause)
        }

        const handleForfeit = (e) => {
            e.preventDefault();
            setForfeit(true);
            setPlayerDeck([])
            setComputerDeck(["dummy"])
        }

        useEffect(() => {
            const intlState = JSON.parse(localStorage.getItem('gameState'))
            if((intlState[0] !== gameId) || intlState[11]) {
            } else {
                setTimeLeft(intlState[1]);
                setPlayerDeck(intlState[2]);
                setComputerDeck(intlState[3]);
                setPlayerDiscard(intlState[4]);
                setComputerDiscard(intlState[5]);
                setPlayerInPlay(intlState[6]);
                setComputerInPlay(intlState[7]);
                setTurnAlert(intlState[8]);
                setTieAlert(intlState[9]);
                setTieCounter(intlState[10]);
            }
        }, [])

        useEffect(() => {
            const gameState = [gameId, timeLeft, playerDeck, computerDeck, playerDiscard, computerDiscard, playerInPlay, computerInPlay, turnAlert, tieAlert, tieCounter, gameOver];
            localStorage.setItem('gameState', JSON.stringify(gameState))
        }, [timeLeft, playerDeck, computerDeck, playerDiscard, computerDiscard, playerInPlay, computerInPlay, turnAlert, tieAlert, tieCounter, gameOver])

        const suspendGame = ((e) => {
            e.preventDefault();
            if(gameOver){
                endDaGame();
            } else {
                history.push('/')
            }
        })
 
    return(
        <>
            <div>
                <span>Time Remaining: {timeLeft}</span>
            </div>
            <div>
                <p>OPPONENT PLAY AREA</p>
                <div>OPPONENT PROFILE</div>
                <div>OPPONENT DISCARD PILE: {computerDiscard && computerDiscard.length > 0 ? (
                    <div>
                        <img src={computerDiscard[0].cardArt} />({`${computerDiscard.length}`})
                    </div>
                ) : null}
                </div>
                <div>OPPONENT DECK:  {suddenDeathDeck ? (
                    <div><img src={suddenDeathDeck.cardArt}/>({`${computerDeck.length}`})</div>
                ) : null}
                </div>
                <div>OPPONENT IN PLAY: {computerInPlay && computerInPlay.length > 0 ? (
                    <div><img src={computerInPlay[computerInPlay.length - 1].cardArt} />({`${computerInPlay.length}`})</div>
                ) : null}
                </div>
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
                                Opponent Card: {`${computerInPlay[computerInPlay.length - 1].number}`} of {`${computerInPlay[computerInPlay.length - 1].suit}`}
                            </p>
                            <p>
                                Player Card: {`${playerInPlay[playerInPlay.length - 1].number}`} of {`${playerInPlay[playerInPlay.length - 1].suit}`}
                            </p>
                            {!pause ? (
                                <div>
                                    <button className="mainButton" onClick={endTurn}>CONTINUE</button>
                                </div>
                            ) : (
                                <div>
                                    <button className="mainButtonDisabled" disabled>DISABLED</button>
                                </div>
                            )}
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
                                Opponent Card: {`${computerInPlay[(computerInPlay.length - 1)].number}`} of {`${computerInPlay[(computerInPlay.length - 1)].suit}`}
                            </p>
                            <p>
                                Player Card: {`${playerInPlay[(playerInPlay.length - 1)].number}`} of {`${playerInPlay[(playerInPlay.length - 1)].suit}`}
                            </p>
                            {!pause ? (
                                <div>
                                    <button className="mainButton" onClick={(e) => {
                                        setTieAlert(false);
                                        tieBreak(e);
                                        }}>
                                        TIEBREAK!
                                    </button>
                                </div>
                            ) : (
                                <div>
                                    <button className="mainButtonDisabled" disabled>DISABLED</button>
                                </div>
                            )}
                        </div>
                    ) : null}
                    { gameOver ? (
                        <div>
                            {(playerDeck.length + playerDiscard.length + playerInPlay.length) > (computerDeck.length + computerDiscard.length + computerInPlay.length) ? (
                                <div>
                                    <p>
                                        Player wins!
                                    </p>
                                    <button className="mainButton" onClick={(e) => {
                                        winCheck = true;
                                        endDaGame(e);
                                    }}>END GAME</button>
                                </div>
                            ) : (playerDeck.length + playerDiscard.length + playerInPlay.length) < (computerDeck.length + computerDiscard.length + computerInPlay.length) ? (
                                <div>
                                    <p>
                                        Computer wins!
                                    </p>
                                    <button className="mainButton" onClick={(e) => {
                                        loseCheck = true;
                                        endDaGame(e);
                                    }}>END GAME</button>
                                </div>
                            ) : (
                                <div>
                                    <p>
                                        It's a tie!
                                    </p>
                                    <button className="mainButton" onClick={(e) => {
                                        setGameOver(false);
                                        suddenDeath(e);
                                    }}>SUDDEN DEATH!!!</button>
                                </div>
                            )}
                        </div>
                    ) : null }
                </div>
                {(!turnAlert && !tieAlert && !gameOver && !pause) ? (
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
                <div>PLAYER IN PLAY: {playerInPlay && playerInPlay.length > 0 ? (
                    <div>   <img src={playerInPlay[playerInPlay.length - 1].cardArt}/>({`${playerInPlay.length}`})</div>
                ) : null} 
                </div>
                <div>PLAYER DECK: {playerDeckInfo[0] ? (
                    <div><img src={playerDeckInfo[0].cardArt}/>({`${playerDeck.length}`})</div>
                ) : null}
                    </div>
                <div>PLAYER DISCARD PILE: {playerDiscard && playerDiscard.length > 0 ? (
                    <div><img src={playerDiscard[0].cardArt} />({`${playerDiscard.length}`})</div>
                ) : null}
                </div>
                <div>PLAYER PROFILE</div>
                <p>PLAYER PLAY AREA</p>
            </div>
            <div>
                <button onClick={handlePause} className="mainButton">PAUSE</button>
            </div>
            <div>
                <button onClick={handleForfeit} className="mainButton">FORFEIT</button>
            </div>
            <div>
                <button onClick={suspendGame} className="mainButton">SUSPEND GAME</button>
            </div>

            { forfeit && (
                <>
                <div className="darkBG" onClick={() => setForfeit(false)} />
                <div className="centered">
                    <div className="modal">
                        <div className="modalHeader">
                            <h5 className="modalHeading"> Are You Sure?</h5>
                        </div>
                        <button 
                            onClick={() => setForfeit(false)}  
                            className="closeBtn">
                            X
                        </button>
                        <div className="modalActions">
                        <div className="actionsContainer">
							<button
								onClick={() => {
                                    setGameOver(true)
                                    setForfeit(false)
                                }}
								className="submitBtn"
							>
								Forfeit
							</button>
							<button
								onClick={() => setForfeit(false)}
								className="cancelBtn"
							>
								Cancel
							</button>
						</div>
                        </div>
                    </div>    
                </div> 
                </>
            )}
        </>
    )
}

export default War1P;