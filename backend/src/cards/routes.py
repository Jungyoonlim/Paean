from flask import Blueprint, jsonify, request
from flask_cors import cross_origin
try:
    from .. import firebase
except ImportError:
    from __init__ import firebase

card_bp = Blueprint(
    'card_bp', __name__
)

db = firebase.database()

@card_bp.route('/deck/<deckId>/card/all', methods = ['GET'])
@cross_origin(supports_credentials=True)
def get_cards(deckId):
    ''' Called when the user wants to fetch all of the cards in a deck. 
    Only deckId is required to fetch all cards from the required deck. '''
    try: 
        user_cards=db.child("card").order_by_child("deckId").equal_to(deckId).get()
        cards = [card.val() for card in user_cards.each()]
        return jsonify(
            cards = cards,
            message = 'Fetching cards successfully',
            status = 200
        ), 200
    except Exception as e:
        return jsonify(
            cards = [],
            message = f"An error occurred {e}",
            status = 400
        ), 400
    
@card_bp.route('/deck/<deckId>/card/create', methods=['POST'])
@cross_origin(supports_credentials=True)
def createcards(deckId):
    # Routed when the user requests to create new cards in a deck. Only DeckId needed.
    try:
        data = request.get_json()
        localId = data['localId']
        cards = data['cards']

        # remove existing cards
        previous_cards = db.child("card").order_by_child("deckId").equal_to(deckId).get()
        for card in previous_cards.each():
            db.child("card").child(card.key()).remove()

        # add new cards
        for card in cards:
            db.child("card").push({
                "userId": localId,
                "deckId": deckId,
                "front": card['front'],
                "back": card['back'],
                "hint": card['hint']
            })
        
        return jsonify(
            message = 'You added cards successfully.',
            status =  201
        ), 201
    except:
        return jsonify(
            message = 'Cards are not added.',
            status = 400
        ), 400
    
@card_bp.route('/deck/<id>/update/<cardid>', methods = ['PATCH'])
@cross_origin(supports_credentials=True)
def update_card(id, cardid):
    # Called when 