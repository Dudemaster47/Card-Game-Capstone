from flask_wtf import FlaskForm
from wtforms import BooleanField
from wtforms.validators import DataRequired, ValidationError, URL, Length,InputRequired
from app.models import DefaultDeck, CustomDeck

class DeckSelectorForm(FlaskForm):
    is_selected = BooleanField('isSelected')