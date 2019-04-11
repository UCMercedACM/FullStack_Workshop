from flask import Flask, request    #import flask, and request for data sent using HTTP requests
import sqlite3 as sql               #import sqlite3 in order to connect to database
import json                         #import json in order for javascript and python to understand each other on data sent back and forth
from flask_cors import CORS         #import CORS to allow frontEnd HTTP calls to this server

app = Flask(__name__)                 # create app
CORS(app)                           # enable cross origin on this app


@app.route("/postStatus", methods = ["GET", "POST"])
#dssdsd
def postStatus():
    if (request.method == "POST"):
        #covert object from frontEnd into dictionary in python
        store = (json.loads(request.data))["truck"]
        #data parsed and stored into single variables
        comment = store["comment"]
        battery = store["battery"]
        truck_id = store["truck_id"]
        date = store["date"]
        time = store["time"]
        starter = store["starter"]
        clutch = store["clutch"]

        #insert data into database tables
        connect = sql.connect("truck.db")
        cursor = connect.cursor()
        cursor.execute("INSERT INTO date (f_date, f_time, f_truckID) VALUES (?,?, ?)", (date, time, truck_id))
        connect.commit()
        cursor.execute('''INSERT INTO inspection (i_truckID, i_battery, i_starter, i_clutch, i_comment)  
                        VALUES(?,?,?,?,?)''', (truck_id, battery, starter, clutch, comment))
        connect.commit()

        return "SUCCESS"

#NOTE fetch truck info that is used in mechanic component
@app.route("/fetchTrucks", methods = ["GET", "POST"])
def fetchTrucks():
    connect = sql.connect("truck.db")
    cursor = connect.cursor()
    if (request.method == "POST"):
        data  = (json.loads(request.data))["data"]
        truckID = data["tID"]
        print "TRUJN ", truckID
        truckInfo = cursor.execute('''SELECT i_battery, i_clutch, i_starter FROM
                                    inspection WHERE i_truckID = ?''', (truckID,) ).fetchall()
        #format it nicely
        data = []
        print "TRUCK INFO", truckInfo
        for x in truckInfo[0]:
            data.append(x)
            #convert into json data and send it to frontEnd
        print "DATA ", data
        data = json.dumps(data)
        return data
        
#f
    if (request.method == "GET"):
        trucks = cursor.execute("SELECT i_truckID FROM inspection").fetchall()
        trucks = json.dumps(trucks)
        return trucks

#MAKE POST REQUEST FOR MECHANIC
@app.route("/postFix", methods = ["GET", "POST"])
def postFix():
    if(request.method == "POST"):
        store = (json.loads(request.data))["condition"]
        starter = store["starter"]
        clutch = store["clutch"]
        battery = store["battery"]
        truckID = store["truckID"]

        connect = sql.connect("truck.db")
        cursor = connect.cursor()
        cursor.execute('''UPDATE inspection SET i_battery = ?, i_starter = ?, i_clutch = ?
                        WHERE i_truckID = ?''', (battery, starter, clutch, truckID))
        connect.commit()

        return "CHANGES MADE!!!!!!!!!"


if __name__ == '__main__':              
    app.run(debug = True)           #enable debugging so everytime we save, changes are automatically recompiled