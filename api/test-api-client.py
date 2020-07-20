import requests
import json
import sys

class Tester:
    end_point='http://127.0.0.1:5000'

    def __init__(self,mode):
        print("mode === {}".format(mode))
        if mode == "prod":
            self.end_point = 'http://127.0.0.1:5000/'
        elif mode == "test":
            self.end_point = 'http://127.0.0.1:5000/'

    def run(self):
        #self.get_all()
        #self.get_id()
        #self.post_id()
        #self.post_content_list()
        self.authenticate()
        
    def create_login(self):
        #data["email"], data["password"], data["first_name"], data["last_name"], data["role"]
        pdata={
            "email":"jwaserekere@gmail.com",
            "password":"changeit",
            "first_name":"josh",
            "last_name":"wase",
            "role":"Admin"
        }    
    
    def post_content_list(self):
        pdata={"key":"XMLMNSLDKDF", "center_id":1}
        url = "{}content-list".format(self.end_point)
        print("=============================================== calling : {}".format(url))
        post_results = requests.post(url, verify=False, json=pdata)
        print(post_results)
        print(post_results.text)    

    def authenticate(self):
        pdata={"username":"admin@system.com", "password":"changeit"}
        url = "{}login".format(self.end_point)
        print("=============================================== calling : {}".format(url))
        post_results = requests.post(url, verify=False, json=pdata)
        pos = post_results.__dict__
        for key,value in pos.items():
            print(f'      {key} - {value}')

        #handle status_code,reason;  200, OK / 401, UNAUTHORIZED
        print(f'post status_code: {post_results.status_code}') 
        print(f'post reason: {post_results.reason}')
        print(f'post elapsed: {post_results.elapsed}')

        print(f'all text: {post_results.text}')  





def launch(params):  
  nargs = len(params)
  if nargs < 2:
    print("ERROR: Insufficient number of commandline parameters.")
    return 

    
  if params[1] == "prod" or params[1] == "test":
    test = Tester(params[1])
    test.run()
  else:
    print("ERROR: Unknown commandline parameters {}".format(params[1]))  
    return


launch(sys.argv)  


