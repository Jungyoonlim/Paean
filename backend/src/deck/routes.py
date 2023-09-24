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
    ''' called when we want to fetch all the decks. Check if the user is authenticated, 
    if yes, show all the decks made by the user, including the ones with private vissibility. if the user is not 
    authenticated then only show decks that have public vissibility. '''
    args = request.args
    localId = args and args['localId']
    try:
        if localId:
            user_decks = db.child("deck").order_by_child("userId").equal_to(localId).get()
            decks = []
            for deck in user_decks.each():
                obj = deck.val()
                obj['id'] = deck.key()
                cards = db.child("card").order_by_child("deckId").equal_to(deck.key()).get()
                obj['cards_count'] = len(cards.val())
                deck.append(obj)

            return jsonify(
                decks = decks,
                message = 'Decks are fetched successfully',
                status = 200
            ), 200
        else:
            alldecks = db.child("deck").order_by_child("visibility").equal_to("public").get()
            d = alldecks.val()
            decks = []
            for deck in alldecks.each():
                obj = deck.val()
                obj['id'] = deck.key()
                cards = db.child("card").order_by_child("deckId").equal_to(deck.key()).get()
                obj['cards_count'] = len(cards.val())
                decks.append(obj)
            
            return jsonify(
                decks=decks,
                message = 'Decks are fetched successfully',
                status = 200
            ), 200
    except Exception as e:
        return jsonify(
            decks = [],
            message = f"An error occurred {e}",
            status = 400
        ), 400

@deck_bp.route('/deck/create', methods=['POST'])
@cross_origin(supports_credentials=True)
def create():
    # routed when the user requests to create a new deck. To create a new deck, userId, title, and visibility are the input.
    try:
        data = request.get_json()
        localId = data['localId']
        title = data['title']
        description = data['description']
        visibility = data['visibility']

        db.child("deck").push({
            "userId": localId, "title": title, "description": description, "visibility": visibility
        })

        return jsonify(
            message = 'Decks created successfully',
            status = 201
        ), 201
    except Exception as e:
        return jsonify(
            message = 'Decks are not created',
            status = 400
        ), 400

@deck_bp.route('/deck/update/<id>', methods=['PATCH'])
@cross_origin(supports_credentials=True)
def update(id):
    # called when the user requests to update the deck. Title / description / visibility can be updated.
    try: 
        data = request.get_json()
        localId = data['localId']
        title = data['title']
        description = data['description']
        visibility = data['visibility']

        db.child("deck").child(id).update({
            "userId": localId, "title": title, "description": description, "visibility": visibility
        })

        return jsonify(
            message = 'Deck updated successfully',
            status = 201
        ), 201
    except Exception as e:
        return jsonify(
            message = 'Decks are not updated successfully',
            status = 400
        ), 400

@deck_bp.route('/deck/delete/<id>', methods = ['DELETE'])
@cross_origin(supports_credentials=True)
def delete(id):
    # Called when the user requests to delete the deck. 
    try:
        db.child("deck").child(id).remove()

        return jsonify(
            message = 'Decks deleted successfully',
            status = 200
        ), 200
    except Exception as e:
        return jsonify(
            message = f'Deck deletion failed {e}',
            status = 400
        ), 400 