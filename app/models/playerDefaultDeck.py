from .db import db, environment, SCHEMA, add_prefix_for_prod

player_default_deck = db.Table(
    "player_default_deck",
    db.Model.metadata,
    db.Column('players', db.Integer,  db.ForeignKey(add_prefix_for_prod('users.id')), primary_key=True),
    db.Column('deck', db.Integer,  db.ForeignKey(add_prefix_for_prod('default_deck.id')), primary_key=True)
)

if environment == "production":
    player_default_deck.schema = SCHEMA