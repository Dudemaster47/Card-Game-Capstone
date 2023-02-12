from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, ValidationError, URL, Length,InputRequired
from app.models import CustomDeck

class CustomDeckForm(FlaskForm):
    user_id = IntegerField('userId', validators=[DataRequired()])
    deck_name = StringField('deckName', validators=[DataRequired()])
    card_art = StringField('cardArt', validators=[DataRequired(), URL(require_tld=True,message="Please provide a valid url")])