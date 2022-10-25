from flask import *
import json
#from BeautifulSoup import bs4
import requests
from geopy.geocoders import Nominatim

geolocator = Nominatim(user_agent="geoapiExercises")
app = Flask(__name__)
google_maps_key = "AIzaSyBx--Lm1t7RsMvDEyH6YR42pdjZqdS0uzk"
load_limit = 1
i = 0

jsondata = ""
with open("data.geojson") as data:
    jsondata = json.loads(data.read())
mapdata = ""
for key in jsondata["features"]:
   if i<load_limit:
        coords = key["geometry"]["coordinates"]
        location = geolocator.reverse(str(coords[1])+","+str(coords[0]))
        mapdata += "<div class='ramec'><iframe class='embed' src='https://www.google.com/maps/embed/v1/view?key="+google_maps_key+"&center="+str(coords[1])+","+str(coords[0])+"&zoom=18&maptype=satellite'"
        mapdata += "></iframe><p></p><span>&ensp;"
        mapdata += location.raw['address'].get('city','')
        mapdata += "<br>&ensp;"
        mapdata += location.raw['address'].get('postcode','')
        mapdata += "</span></div><p></p>"
        i+=1

@app.route('/')
def index():
    return render_template("index.html",mapdata=mapdata)

@app.route('/map')
def map():
    return render_template("map.html")

@app.route('/contact')
def contact():
    return render_template("contact.html")

@app.route('/about')
def about():
    return render_template("about.html")

app.run(host='127.0.0.1', port=3945)
