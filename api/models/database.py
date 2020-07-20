from sqlalchemy import create_engine, ForeignKey,Table, Column, Integer, String,Boolean, UniqueConstraint,and_
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship, validates
from flask import Flask, jsonify


engine = create_engine('sqlite:///app_data.db', echo=True)
Session = sessionmaker(bind=engine)
Base = declarative_base()


# Entity class for user
class User(Base):
    __tablename__='users'
    id = Column(Integer, primary_key=True)
    email = Column(String)
    password = Column(String)
    first_name = Column(String)
    last_name = Column(String)
    role = Column(String)
    __table_args__ = (UniqueConstraint('email', name='_users_email_uc'),)

    def __init__(self, email,password,first_name,last_name,role):
        self.email = email
        self.password = Utils().digest_info(password)
        self.first_name = first_name
        self.last_name = last_name
        self.role = role

    @validates('loginid') 
    def validate_loginid(self, key, loginid):
        if not loginid:
            raise AssertionError('No loginid provided')
        if len(loginid) < 3 or len(loginid) > 20:
            raise AssertionError('Loginid must be between 3 and 20 characters') 
        return loginid 
    

import hashlib
class Utils():

    # generate a SHA1 message digest 
    def digest_info(self, message):
        result = hashlib.sha1(message.encode('utf-8'))
        return result.hexdigest() 


class DatabaseService():

    def serialize_instance(self, item,exclude_fields):
        data={}
        for key in item.keys():
            if key ==   '_sa_instance_state':
                continue
            if any(key in s for s in exclude_fields):    
                continue

            data[key] = item[key]
        return data    

    def create_login(self, data):  
        session = Session()
        # email,password,first_name,last_name,role
        usr = User(data["email"], data["password"], data["first_name"], data["last_name"], data["role"])
        session.add(usr)
        session.commit()

    def query_login(self, email, clear_token):
        session = Session()
        token = Utils().digest_info(clear_token)
        print(f'token :::: {token}')
        result = session.query(User).filter(and_(User.email==email, User.password == token)).all()
        subject =None
        if len(result) > 0:
            subject = result[0]
        session.close()    
        print(subject)
        return subject 


    def query_user(self, id):
        session = Session()
        result = session.query(User).filter(User.id == id).all()
        subject =None
        if len(result) > 0:
            subject = result[0]
        return subject  

    #list system users
    def list_users(self):
        session = Session()
        result = session.query(User).all()
        users=[]
        for user in result:
            users.append(self.serialize_instance(user.__dict__,[]))
        return users     



Base.metadata.create_all(engine)

