from .db import db, environment, SCHEMA, add_prefix_for_prod

class Game(db.Model):
    __tablename__ = 'games'
    
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
        
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    timer = db.Column(db.Integer, default=500, nullable=False)
    game_type = db.Column(db.String, default="War", nullable=False)
    
    #relationship
    player_1 = db.relationship('User', back_populates = 'created_games')

    
    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.user_id,
            'timeLimit': self.timer,
            'gameType': self.game_type,
        }