from flask.cli import AppGroup
from .users import seed_users, undo_users
from .cards import seed_cards, undo_cards
from .defaultDecks import seed_default_deck, undo_default_deck
from .customDecks import seed_custom_decks, undo_custom_decks
from .games import seed_games, undo_games

from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo 
        # command, which will  truncate all tables prefixed with 
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_users()
        undo_cards()
        undo_default_deck()
        undo_custom_decks()
        undo_games()
    seed_users()
    seed_cards()
    seed_default_deck()
    seed_custom_decks()
    seed_games()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_cards()
    undo_default_deck()
    undo_custom_decks()
    undo_games()
    # Add other undo functions here