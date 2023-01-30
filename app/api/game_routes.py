from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Game, db
from app.forms import GameForm

game_routes = Blueprint('games', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

#get all games
@game_routes.route('')
def get_all_games():
    games = Game.query.all()

    res = {game.id: game.to_dict() for game in games}
 
    return res

#get game by id
@game_routes.route('/<int:id>')
def get_game_by_id(id):
    game = Game.query.get(id)

    res = {game.id: game.to_dict()}
    return res

#post a game
@game_routes.route('',methods=['POST'])
@login_required
def  add_game():
    form = GameForm()

    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        game = Game()
        form.populate_obj(game)

        db.session.add(game)
        db.session.commit()
        return {game.id: game.to_dict()}
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

#update a game
@game_routes.route('/<int:id>', methods = ["PATCH", "PUT"])
@login_required
def edit_game(id):
    game = Game.query.get(id)
    form = GameForm()
 
    if form.data["user_id"] != current_user.id:
        return {'error': "You are not authorized to edit this game"}, 401

    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        form.populate_obj(game)

        db.session.commit()
        return {game.id: game.to_dict()}
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

#delete a game
@game_routes.route('/<int:id>', methods = ["DELETE"])
@login_required
def delete_game(id):
    game = Game.query.get(id)

    db.session.delete(game)
    db.session.commit()

    return {"msg": "Successfully deleted the game"}