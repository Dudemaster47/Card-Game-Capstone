from .db import db, environment, SCHEMA, add_prefix_for_prod

class DefaultDeck(db.Model):
    __tablename__ = 'default_deck'
    
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
    
    id = db.Column(db.Integer, primary_key=True)
    card_art = db.Column(db.String)
    
    #relationships
    deck_cards = db.relationship('Card', back_populates='default_deck')
    all_players = db.relationship('User', back_populates = 'default_deck')

    
    def to_dict(self):
        return{
            'id': self.id,
            'cardArt': self.card_art,
            'cards': [card.to_dict() for card in self.deck_cards[:52]]
        }
