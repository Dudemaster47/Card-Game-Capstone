# CARD GAME APP

By Alex Hiller

## Intro

This is an app with which one can play card games against other people and compete to be the ultimate card champion! Ideally. Right now I'm still working on getting the simplest card game I can think of, War, to a state where it's playable. 


## Index

- [API DOCUMENTATION](https://github.com/Dudemaster47/Card-Game-Capstone/wiki/API-ROUTES)
- [DATABASE SCHEMA](https://github.com/Dudemaster47/Card-Game-Capstone/wiki/Database-Schema)
- [FRONTEND ROUTES](https://github.com/Dudemaster47/Card-Game-Capstone/wiki/Front-End-Routes)
- [USER STORIES](https://github.com/Dudemaster47/Card-Game-Capstone/wiki/User-Stories)
- [MVP LIST](https://github.com/Dudemaster47/Card-Game-Capstone/wiki/MVP-LIST)
- [OH GOD IT'S RECURSING](https://github.com/Dudemaster47/Card-Game-Capstone/wiki/README)

## Technologies Used

- Javascript
- React/Redux
- Python
- CSS
- Flask/SQLAlchemy

## Overview

A full stack application with heavy front end focus in developing card games for users to play against each other.

The currently functional CRUDS are extremely simple: the ability to add a game to the database (it'll be playable soon i promise) and the ability to create custom decks for use in the game. Custom decks being decks with art on the backs of cards that you upload yourself. The cards aren't customizable. For good reason.

The next set of CRUDs require a fully functional game as well as multiplayer to implement: leaderboards that compare users against each other and a messaging system so users can trash talk each other while playing. 

![image](https://user-images.githubusercontent.com/97640520/218576811-eb2c59ec-0e3e-4443-96d7-61fb7135b8de.png)
(This is the home page)

The home page is variable, having different renders for when a user is logged out, logged in but has no game rooms created, and logged in with a game room. Thus far all you can do is create an inaccessible game room as well as modify the settings and delete a game room, but eventually it will be the primary hub through which games are searched for, created, joined, etc. 

![image](https://user-images.githubusercontent.com/97640520/218577241-8a3b558e-83ea-4038-8524-a2fd1add1912.png)
(This is the profile page)

The profile page is where the stuff that you show off to other players is managed. You can see your winning and losing statistics as well as manage which deck is to be used in game (that's also pending). That's really it.

Also some of the image links I used ended up being bad links, but that can be fixed at a later date. Kind of low priority.


...So far, there's not really anything else. 

## Sample Code

Sorry, this is going to wait until there's actual interesting code to show off. Like a functional game.

## My journey

Listen, I wanna impress by going above and beyond but god a tad bogged down during the first month of work. Now that I have a stable work flow, I foresee the second month going much smoother and rocketing ahead to something truly cool. Or at least, kind of impressive to have built from scratch.

## Future updates (in order)

- Implement Deck Selection
- Implement a 1P game of War that can be played against a computer
- Implement animations
- Implement Multiplayer functionality
- Implement Leaderboards
- Implement P2P chat ingame
- Implement Better Card Games- Gin Rummy and Blackjack are on the table. It's unlikely that Gin Rummy will have a 1P mode, but Blackjack can.
- Yassify the website. It's pretty barebones, tbh. Needs more clip art and animated gifs.
- Responsive design also. I need to do that.
