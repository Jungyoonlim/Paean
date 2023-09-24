from flask import Blueprint, jsonify
from flask import current_app as app
from flask_cors import cross_origin 
from flask import request
try:
    from .. import firebase
except ImportError:
    from __init__ import firebase

auth_bp = Blueprint(
    'auth_bp', __name__
)

auth = firebase.auth()

@auth_bp.route('/', methods=['GET'])
@cross_origin(supports_credentials=True)
