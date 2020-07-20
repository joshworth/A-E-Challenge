# A-E-Challenge

Part 1, Design Challenge.
 - The design diagrams are found in the Library System Design.pdf document in the root of t
 
Part 2
  a) Angular SPA, ./factorial-game
    - navigate to factorial-game directory
    - run $ npm install , to install dependencies
    - modify the SERVER_URL variable in environment/environment.prod.ts and environment.ts to set the respective URL of the production and test environment API
    - run $ ng serve ,to test locally
    - run $ ng build --prod , to build for production
    - The api runs on an sqlite database (app_data.db) with preloaded user to be used for initial login (username: admin@system.com, password: changeit), 
       the api/test-orm.py script can be used to load a new user for initial setup by editing and calling the create_users(session) function
       
  b) Rest API webservice, ./api     
    - Implemented using python, flask
    - Install dependencies in the api/requirements.txt file (pip install -r requirement.txt)
    - Local server can be started for testing locally (python app.py)
    - Script api/test-api-client.py can be used to test invocation of the end point for quick verification of the setup
    - Preferably run from within a python virtual environment
    - api/test-orm.py script can be used to load a new user for initial setup by editing and calling the create_users(session) function
    
