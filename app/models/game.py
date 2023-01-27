from .db import db, environment, SCHEMA, add_prefix_for_prod
from playerGame import player_game

class Game(db.Model):
    __tablename__ = 'games'
    
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
        
    id = db.Column(db.Integer, primary_key=True)
    timer = db.Column(db.Integer, default=500, nullable=False)
    game_type = db.Column(db.String, default="War", nullable=False)
    
    #relationship
    game_players = db.relationship('User', secondary=player_game, back_populates = 'game_players', cascade='all,delete')

    
    def to_dict(self):
        return {
            'id': self.id,
            'timeLimit': self.timer,
            'gameType': self.game_type,
            'players': [player.to_dict() for player in self.game_players]
        }