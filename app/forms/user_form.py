from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError, URL, Length,InputRequired
from app.models import User

def validate_image(form,field):
    if field.data == field.default:
        return True
    url_validator = URL()
    return url_validator(form,field)

class UserForm(FlaskForm):
    username=StringField('username', validators=[DataRequired()])
    email = StringField('email', validators=[DataRequired()])
    profile_img=StringField('profile_img')
