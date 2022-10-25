
const key = 'pk.eyJ1IjoiYXVzYXNhcyIsImEiOiJjbDk2dDl5dmEwOWY5M25wYTB4dWliNTJ4In0.ajT1rY2pI67iQY_oKHepwA'
//https://services6.arcgis.com/ogJAiK65nXL1mXAW/arcgis/rest/services/Stav_povrchu_silnic/FeatureServer/0/query?outFields=*&where=1%3D1&f=geojson
var w = window.innerWidth;
var h = window.innerHeight;

// Options for map
const options = {
    lat: 50.1085989,
    lng: 16.3838850,
    zoom: 10,
    studio: true,
    style: 'mapbox://styles/ausasas/cl96texl8000615nye9h9bbv0',
};




var getJSON = function (url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = function () {
        var status = xhr.status;
        if (status === 200) {
            callback(null, xhr.response);
        } else {
            callback(status, xhr.response);
        }
    };
    xhr.send();
};

var roadData;
function getData() {
    getJSON('https://services6.arcgis.com/ogJAiK65nXL1mXAW/arcgis/rest/services/Stav_povrchu_silnic/FeatureServer/0/query?outFields=*&where=1%3D1&f=geojson',
        function (err, data) {
            if (err !== null) {
                alert('Something went wrong: ' + err);
            } else {
                roadData = data;
            }
        });
}



const mappa = new Mappa('Mapbox', key);
let myMap;

let canvas;
getData();
var drawing = false;
function setup() {
    console.log("setup");
    canvas = createCanvas(w, h);
    // canvas = document.querySelector("#canvas");

    myMap = mappa.tileMap(options);
    myMap.overlay(canvas);
    
    //gets
    
    myMap.onChange(drawRoads);


    //fill(109, 255, 0);
    //stroke(100);

}


function draw() {
}


function containsPoint(point) {
    var x = point[0];
    var y = point[1];
    var bounds = myMap.map.getBounds();
    var y1 = bounds._northEast.lng
    var x1 = bounds._northEast.lat
    var y2 = bounds._southWest.lng
    var x2 = bounds._southWest.lat
    if (x <= x1 && x >= x2 && y <= y1 && y >= y2)
        return true;
    else
        return false;
}



function getCordOnScreen(cordinate) {
    const pos = myMap.latLngToPixel(cordinate[0], cordinate[1]);
    return pos;
}

function drawRoads() {
    if(!drawing)
    clear();
    drawing = true;
    
    
    stroke(0, 158, 210);
    strokeWeight(10);

    roadData.features.forEach(feature => {
        var cordinates = feature.geometry.coordinates;
        var oldpos;
        var wasOnScreen = false;
        var road = []
        for (let index = 0; index < cordinates.length; index++) {
            const cordinate = cordinates[index];
            cordinate.reverse();
            var isOnScreen = containsPoint(cordinate)
            var pos = getCordOnScreen(cordinate);
            if (index != 0){
            var a = oldpos.x - pos.x;
            var b = oldpos.y - pos.y;
            var distance = Math.sqrt(a * a + b * b);}
            if (isOnScreen) {
                road.push(pos);
            }
            if (index != 0 && distance <= 1)
                road.pop();
            wasOnScreen = isOnScreen;
            oldpos = pos;
        }
        //Drawline
        var oldPoint = road[0];
        for (let index = 1; index < road.length; index++) {
            const point = road[index];
            line(oldPoint.x, oldPoint.y, point.x, point.y);
            oldPoint = point;
        }
    });
    drawing = false;
}
