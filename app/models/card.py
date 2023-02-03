from .db import db, environment, SCHEMA, add_prefix_for_prod
from .cardDeck import card_decks

class Card(db.Model):
    __tablename__ = 'cards'
    
    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}
    
    id = db.Column(db.Integer, primary_key=True)
    number = db.Column(db.String)
    suit = db.Column(db.String)
    value = db.Column(db.Integer)
    card_art = db.Column(db.String)
    deck_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('default_deck.id')))
    
    #relationships
    default_deck = db.relationship('DefaultDeck', back_populates = 'deck_cards')
    card_decks = db.relationship('CustomDeck', secondary=card_decks, back_populates = 'cards_in_deck', cascade='all,delete')

    
    def to_dict(self):
        return{
           'id': self.id,
           'number': self.number,
           'suit': self.suit,
           'value': self.value,
           'cardArt': self.card_art, 
           'deckId': self.deck_id
        }