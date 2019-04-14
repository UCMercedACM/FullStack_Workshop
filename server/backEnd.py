from flask import Flask, request    #import flask, and request for data sent using HTTP requests
import sqlite3 as sql               #import sqlite3 in order to connect to database
import json                         #import json in order for javascript and python to understand each other on data sent back and forth
from flask_cors import CORS         #import CORS to allow frontEnd HTTP calls to this server

app = Flask(__name__)                 # create app
CORS(app)                           # enable cross origin on this app

###ROUTES WILL GO HERE




#####################


if __name__ == '__main__':              
    app.run(debug = True)           #enable debugging so everytime we save, changes are automatically recompiled