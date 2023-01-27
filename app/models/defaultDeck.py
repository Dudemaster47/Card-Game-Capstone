from .db import db, environment, SCHEMA, add_prefix_for_prod
from playerDefaultDeck import player_default_deck

class DefaultDeck(db.Model):
    __tablename__ = 'default_deck'
    
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
    
    id = db.Column(db.Integer, primary_key=True)
    card_art = db.Column(db.String)
    is_selected = db.Column(db.Boolean)
    
    #relationships
    deck_cards = db.relationship('Card', back_populates='default_deck', cascade = 'all, delete')
    all_players = db.relationship('User', secondary=player_default_deck, back_populates = 'default_deck', cascade='all,delete')

    
    def to_dict(self):
        return{
            'cardArt': self.card_art,
            'isSelected': self.is_selected,
            'cards': [card.to_dict() for card in self.deck_cards]
        }
