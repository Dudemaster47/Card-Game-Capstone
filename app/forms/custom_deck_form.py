from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError, URL, Length,InputRequired
from app.models import CustomDeck

class CustomDeckForm(FlaskForm):
    deck_name = StringField('deckName', validators=[DataRequired()])
    card_art = StringField('cardArt', validators=[DataRequired()])