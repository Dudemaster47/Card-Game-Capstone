from .db import db, environment, SCHEMA, add_prefix_for_prod

player_game = db.Table(
    "player_game",
    db.Model.metadata,
    db.Column('player1_id', db.Integer,  db.ForeignKey(add_prefix_for_prod('users.id')), primary_key=True),
    db.Column('player2_id', db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), primary_key=True, nullable=True),
    db.Column('game', db.Integer,  db.ForeignKey(add_prefix_for_prod('games.id')), primary_key=True)
)

if environment == "production":
    player_game.schema = SCHEMA

