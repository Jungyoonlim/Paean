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
def index():
    return "Hello"

@auth_bp.route('/signup', methods=['POST'])
@cross_origin(supports_credentials=True)
# create new users and register in firebase
def signup():
    try:
        data = request.get_json()
        email = data['email']
        password = data['password']

        user = auth.create_user_with_email_and_password(email, password)
        # if the registration process is successful, this msg is shown
        return jsonify(
            user = user,
            message = 'Registered Successfully',
            status = 201
        ), 201
    except:
        # if the registration process isn't successful, this msg is displayed
        return jsonify(
            message = 'Registration Failed',
            status = 400
        ), 400

@auth_bp.route('/login', methods=['POST'])
@cross_origin(supports_credentials=True)
def login():
    # used by registered used users to sign in to their account
    try: 
        data = request.get_json()
        email = data['email']
        password = data['password']

        user=auth.sign_in_with_email_and_password(email, password)
        # if login is successful, this msg is displayed
        return jsonify(
            user=user,
            message = 'Login Successful',
            status=200
        ), 200
    except:
        # if login is not successful, this message is displayed
        return jsonify(
            message = 'Login Failed',
            status = 400
        ), 400

if __name__ == '__main__':
    app.debug=True
    app.run()
