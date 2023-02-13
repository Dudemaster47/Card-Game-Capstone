from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, ValidationError, URL, Length,InputRequired
from app.models import Game
import math

def timer_check(form, field):
    timer=field.data
    if(timer<1):
        raise ValidationError("provide a valid time limit")
        

class GameForm(FlaskForm):
    user_id = StringField('userId', validators=[DataRequired()])
    timer = IntegerField('timer', validators=[DataRequired(), timer_check])
    game_type = StringField('gameType', validators=[DataRequired()])