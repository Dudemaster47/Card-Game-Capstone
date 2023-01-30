from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import User, CustomDeck, db
from app.forms import UserForm

user_routes = Blueprint('users', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


@user_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict()

#Edit user profile by ID
@user_routes.route('/<int:id>', methods=['PUT','PATCH'])
@login_required
def edit_user(id):
    user= User.query.get(id)
    form = UserForm()


    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        form.populate_obj(user)
        db.session.commit()
        return {user.id: user.to_dict()}
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


#Delete user profile by ID
@user_routes.route('/<int:id>', methods = ["DELETE"])
@login_required
def delete_user(id):
    User = User.query.get(id)

    if user.id != current_user.id:
        return {'error': "You are not authorized to delete this profile"}, 401

    db.session.delete(user)
    db.session.commit()

    return {"msg": "Successfully deleted the profile"}

#Get all Custom Decks by user id
@user_routes.route('/<int:id>/decks')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    decks = user.user_decks.query.get()
    
    return {'decks': [deck.to_dict() for deck in decks]}