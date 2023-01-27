from .db import db, environment, SCHEMA, add_prefix_for_prod
from .cardDeck import card_decks

class CustomDeck(db.Model):
    __tablename__ = 'custom_decks'
    
    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}
    
    id = db.Column(db.Integer, primary_key=True)
    deck_name = db.Column(db.String(20), nullable=False)
    card_art = db.Column(db.String, nullable=False)
    is_selected = db.Column(db.Boolean)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
    
    #relationships
    user = db.relationship('User', back_populates = 'user_decks')
    cards_in_deck = db.relationship('Card', secondary=card_decks, back_populates = 'card_decks', cascade='all,delete')

    def to_dict(self):
        return {
            'id': self.id,
            'deckName': self.deck_name,
            'cardArt': self.card_art,
            'isSelected': self.is_selected,
            'userId': self.user_id,
            'user': self.user.to_dict(),
            'cards': [card.to_dict() for card in self.cards_in_deck]
        }