from flask_wtf import FlaskForm
from wtforms import IntegerField
from app.models import User

class UserWinLoseForm(FlaskForm):
    wins=IntegerField('wins')
    losses= IntegerField('losses')