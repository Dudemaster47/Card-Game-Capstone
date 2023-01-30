from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Card, db

card_routes = Blueprint('cards', __name__)

#Get all Cards
@card_routes.route('')
def get_all_cards():
    cards = Card.query.all()

    res = {card.id: card.to_dict() for card in cards}
    return res

#Get a Card by ID
@card_routes.route('/<int:id>')
def get_card_by_id(id):
    card = Card.query.get(id)

    res = {card.id: card.to_dict()}
    return res