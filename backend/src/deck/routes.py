from flask import Blueprint, jsonify, request
from flask_cors import cross_origin
try:
    from .. import firebase
except ImportError:
    from __init__ import firebase

deck_bp = Blueprint(
    'deck_bp', __name__
)

db = firebase.database()

@deck_bp.route('/deck/<id>', methods = ['GET'])
@cross_origin(supports_credentials=True)
def get_deck(id):
    # called when we want to fetch one of the decks, we pass deck id of this deck
    try:
        deck = db.child("deck").child(id).get()
        return jsonify(
            deck = deck.val(),
            message = 'The deck is fetched successfully',
            status = 200
        ), 200
    except Exception as e:
        return jsonify(
            decks = [],
            message = f"An error occurred: {e}",
            status = 400
        ), 400

@deck_bp.route('/deck/all', methods=['GET'])
@cross_origin(supports_credentials=True)
def get_decks():
    # called when 