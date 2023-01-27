from .db import db, environment, SCHEMA, add_prefix_for_prod

card_decks = db.Table(
    "card_decks",
    db.Model.metadata,
    db.Column('cards', db.Integer,  db.ForeignKey(add_prefix_for_prod('cards.id')), primary_key=True),
    db.Column('decks', db.Integer,  db.ForeignKey(add_prefix_for_prod('custom_decks.id')), primary_key=True)
)

if environment == "production":
    card_decks.schema = SCHEMA