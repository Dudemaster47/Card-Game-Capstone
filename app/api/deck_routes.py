from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import DefaultDeck, CustomDeck, Card, db
from app.forms import CustomDeckForm, DeckSelectorForm
# from app.seeds import card_list

deck_routes = Blueprint('decks', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

#Get the Default Deck
@deck_routes.route('')
def get_default_deck():
    deck = DefaultDeck.query.get(1)
    res = {"deck": deck.to_dict()}
    return res


#Get a Custom Deck by id
@deck_routes.route('/<int:id>')
def get_deck_by_id(id):
    deck = CustomDeck.query.get(id)

    res = {deck.id: deck.to_dict()}
    return res

#Post a Custom Deck
@deck_routes.route('',methods=['POST'])
@login_required
def  add_deck():
    form = CustomDeckForm()

    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        deck = CustomDeck()
        cards = Card.query.all()
        form.populate_obj(deck)
        deck.cards_in_deck.extend(cards)
        # query for all cards

        db.session.add(deck)
        db.session.commit()
        return {deck.id: deck.to_dict()}
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

#Update a Custom Deck
@deck_routes.route('/<int:id>', methods = ["PATCH", "PUT"])
@login_required
def edit_deck(id):
    deck = CustomDeck.query.get(id)
    form = CustomDeckForm()
 
    if form.data["user_id"] != current_user.id:
        return {'error': "You are not authorized to edit this deck"}, 401

    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        form.populate_obj(deck)

        db.session.commit()
        return {deck.id: deck.to_dict()}
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

#Delete a Custom Deck
@deck_routes.route('/<int:id>', methods = ["DELETE"])
@login_required
def delete_product(id):
    deck = CustomDeck.query.get(id)

    if deck.user_id != current_user.id:
        return {'error': "You are not authorized to delete this deck"}, 401

    db.session.delete(deck)
    db.session.commit()

    return {"msg": "Successfully deleted the deck"}