from flask import Flask, jsonify, request
from flask_jwt_extended import (
    JWTManager, jwt_required, create_access_token,
    get_jwt_identity
)
from os import environ
from models.database import DatabaseService
from flask_cors import CORS, cross_origin


app = Flask(__name__)
CORS(app)

# Setup the Flask-JWT-Extended extension
#app.config['JWT_SECRET_KEY'] = environ.get('JWT_SECRET_KEY')
app.config['JWT_SECRET_KEY'] = 'Set up a secure secrete key'
jwt = JWTManager(app)

# Provide a method to create access tokens. The create_access_token()
# function is used to actually generate the token, and you can return
# it to the caller however you choose.
@app.route('/login', methods=['POST'])
@cross_origin()
def login():
    if not request.is_json:
        return jsonify({"msg": "Missing JSON in request"}), 400

    username = request.json.get('username', None)
    password = request.json.get('password', None)
    if not username:
        return jsonify({"msg": "Missing username parameter"}), 400
    if not password:
        return jsonify({"msg": "Missing password parameter"}), 400

    db = DatabaseService()
    subject = db.query_login(username, password)
    if subject:
        access_token = create_access_token(identity=username)
        duser = subject.__dict__
        print(f"============================================= returning ====================== {duser}")
        user = db.serialize_instance(duser,['token'])
        print(user)
        return jsonify(access_token=access_token, subject=user), 200
    else:
        return jsonify({"msg": "Invalid username or password"}), 401        
    


# Protect a view with jwt_required, which requires a valid access token
# in the request to access.
@app.route('/protected', methods=['GET'])
@jwt_required
def protected():
    # Access the identity of the current user with get_jwt_identity
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user), 200


@app.route('/', methods=['GET'])
def home():
    return "<h1>IT Works</h1><p>Yes it works!!!</p>"


@app.route('/registerself', methods = ['POST'])
def api_register_self():
    print("======================= request.data")
    payload = request.json

    print(f' payload === {payload}')

    error = ""
    result ={"error":error,"status":0}

    try:
        db = DatabaseService()
        db.create_login(payload)
        print("return result ==================== ")
        print(result)
        return jsonify(result)
    except  AssertionError as exception_message:
        return jsonify({"error":f'{exception_message}',"status":1})

@app.route('/handle', methods = ['POST'])
def api_handle():
    print("======================= request.data")
    rdata = request.json
    print(rdata)
    action = rdata['action']
    payload = rdata["payload"]

    print(f'action === {action}, payload === {payload}')

    error = ""
    db = DatabaseService()
    
    data={}
    if action == "fetch.users":  
        users = db.list_users() 
        print("return users =========================== ") 
        if len(users) > 0:
            data = users
        else:
            error="ERROR: Invalid username or password."  
    else:
        error= f"ERROR: UNKNOWN Action [{action}] specified"       

    result ={"error":error,"data":data}
    print(rdata)
    print("return result ==================== ")
    print(result)
    
    return jsonify(result)     


if __name__ == '__main__':
    app.run()