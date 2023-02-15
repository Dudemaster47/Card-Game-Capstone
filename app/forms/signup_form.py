from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')
    
def bad_password(form, field):
    password = field.data
    if password == "bad_password$$$912387132asdasdghkecbrv23787dfscbn2373721@#&#^BN7CN#&":
        raise ValidationError("password and repeat password must match")


class SignUpForm(FlaskForm):
    username = StringField(
        'username', validators=[DataRequired(), username_exists])
    email = StringField('email', validators=[DataRequired(), user_exists, Email("this field requires a valid email address")])
    password = StringField('password', validators=[DataRequired(), bad_password])