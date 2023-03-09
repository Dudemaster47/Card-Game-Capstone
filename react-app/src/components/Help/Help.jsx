import { useHistory } from "react-router-dom";

const Help  = () => {
    const history = useHistory();

    const returnHome = (e) => {
        e.preventDefault();
        history.push('/');
    }

    return (
        <>
            <h1>HELP</h1>
            <div>
                PLACEHOLDER INDEX BOX
            </div>
            <div>
                <p>This is a quick guide on how to utilize the Card Game App (better name pending).</p>
            </div>
            <div>
                <h2>YOUR PROFILE</h2>
                <p>On your profile page, you can check your win statistics, modify your profile picture, and create new decks to use!</p>
                <p>Don't get too excited, your deck is really just what art appears on the back of the card. You've got the same 52 cards everyone else does.</p>
                <p>BUT! By clicking on a deck in your list of decks at the bottom of the page, you can select the deck you want to display during games!</p>
                <p>Or, if you're not feeling very spicy, just use the default deck.</p>
                <p>(Bicycle cards please don't sue)</p>
                <p>GUEST users cannot view their stats, change their decks, or change their profiles in any way. However, they can still enjoy the games available fully!</p>
                <p>For the sake of App Academy requirements: there will be a DEMO log in button as well- this is separate from GUEST, as it allows you to demo the full user experience!</p>
            </div>
            <div>
                <h2>CREATING A GAME ROOM AND RELATED FEATURES</h2>
                <p>Currently only single player functionality exists.</p>
                <p>Creating a game room is simple! When you're logged in, just hit the "Create a Game" button on the home screen.</p>
                <p>This creates a room to play card games in!</p>
                <p>Currently, it defaults to the gametype "War". That's because War is the only game currently implemented.</p>
                <p>It also defaults to a time limit for the game of 5 minutes!</p>
                <p>The time limit feature is exclusive to the War game type, and any future game type that can similarly go on indefinitely.</p>
                <p>Whoever is in the lead at the end of the time limit wins!</p>
                <p>Of course, you can use the Game Settings button to change what game you're playing (eventually) as well as change the time limit!</p>
                <p>You can't do this if you've got an active game, though!</p>
                <p>Similarly, if you don't want to host a game room anymore you can just delete it by pressing the delete button!</p>
                <p>But naturally, you can't delete a game that's in progress; that's poor sportsmanship! Take your loss on the chin and move on.</p>
            </div>
            <div>
                <h2>PLAYING THE GAME OF WAR SOLO</h2>
                <p>Once you're ready to play, hit 1P Game Start and you'll be taken to the game room!</p>
                <p>Playing War is very simple.</p>
                <p>You and your opponent (in this case the computer) each play with half a deck of cards.</p>
                <p>Every time you press the "Advance Turn" button, you and the computer will draw a card from the top.</p>
                <p>Whoever has the highest card wins the turn! (Aces are high in this game).</p>
                <p>If there's a tie, three more cards will be drawn by each player with the final one being revealed.</p>
                <p>The tiebreaking process continues until one player gets a high card!</p>
                <p>Once a winner has been decided, all cards in play are moved to the winner's discard pile.</p>
                <p>And then the game continues!</p>
                <p>When you run out of cards in your deck, simply shuffle your discard pile and move it to the deck position!</p>
                <p>But if you run out of cards in your deck and don't have a discard pile?</p>
                <p>Then it's GAME OVER. You lose! Sorry.</p>
                <p>Lastly, if time runs out and both players have an equal number of cards in play, in their decks, and in their discard piles?</p>
                <p>Then it's time for a SUDDEN DEATH round- both players keep drawing until one gets a high card and wins the game!</p>
                <p>If that's a bit too intense, that's okay.</p>
                <p>During solo play, you have the option to pause the game- this will pause the timer as well as prevent any turns from progressing until play resumes.</p>
                <p>You can also suspend the game- this will return you to the home page and save the game's progress, allowing you to enjoy the myriad other features of my app.</p>
                <p>(Pressing the Home, Log Out, Help, and Profile buttons in the Nav bar will also do this.)</p>
                <p>Lastly, if you're just not feeling the game you can choose to forfeit! This is a loss, but ends the game so that you can play different games.</p>
                <p>(Different games coming eventually.)</p>
                <p>Note that pausing and suspending the game will be disabled in 2 Player Mode when it is eventually implemented!</p>
            </div>
            <button className="mainButton" onClick={returnHome}>RETURN</button>
        </>
    )
}

export default Help;