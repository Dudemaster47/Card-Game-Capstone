from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, ValidationError, URL, Length,InputRequired
from app.models import Game

class GameForm(FlaskForm):
    user_id = StringField('userId', validators=[DataRequired()])
    timer = IntegerField('timer', validators=[DataRequired()])
    game_type = StringField('gameType', validators=[DataRequired()])