from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from playerDefaultDeck import player_default_deck
from playerGame import player_game


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    profile_img = db.Column(db.String)
    wins = db.Column(db.Integer)
    losses = db.Column(db.Integer)
    
    #relationships
    user_decks = db.relationship('CustomDeck', back_populates='user', cascade = 'all, delete')
    default_deck = db.relationship('DefaultDeck', secondary=player_default_deck, back_populates = 'all_players', cascade='all,delete')
    joinedGames = db.relationship('Game', secondary=player_game, back_populates = 'game_players', cascade='all,delete')
    createdGames = db.relationship('Game', back_populates = 'user_games', cascade = 'all, delete')
    

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'decks': [deck.to_dict() for deck in self.user_decks],
            'defaultDeck': [deck.to_dict() for deck in self.default_deck],
            'profileImg': self.profile_img,
            'joinedGames': [game.to_dict() for game in self.joinedGames],
            'createdGames': [game.to_dict() for game in self.createdGames],
            'wins': self.wins,
            'losses': self.losses
        }
