import json
from models.database import User,DatabaseService, Session, Base, engine
from flask import Flask, jsonify
import os


def load_json_data(filename):
    data = {}
    with open(filename) as json_file:
        data = json.load(json_file)
    # test
    print("================ load_json loading data ==========")    
    #print(data["config"][0]["data"][1])  
    return data    

#Base.metadata.create_all(engine)
session = Session()


 
def create_users(session):
    # email,password,first_name,last_name,role
    users=[
        User("admin2@system.com","changeit","System2","Administrator","Admin"),
        User("josh2@system.com","changeit","Josh2","Wase","Guest")
    ]
    session.add_all(users)
    session.commit()

def query_users_more():
    db=DatabaseService()

    u1= db.query_login('admin@system.com','changeit')
    print('==============================================================================')
    print(u1)
    

    u2=db.query_user(1)
    print(f'user2 : {u2} ----- done!!!')

    u3=db.list_users()
    print(u3)



try:
    query_users_more()
    #create_users(session)
    #setup_db(session)
    #db = DatabaseService()
    #xxx= db.query_login("admin","changeit")
    #print(xxx)
    session.close()
except Exception as exx:
    print("\n!!!!!!!!!!! ORM ERROR !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
    print(str(exx))    



