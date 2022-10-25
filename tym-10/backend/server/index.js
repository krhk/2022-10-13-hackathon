const express = require("express");
const fetch = require("node-fetch");
const fs = require('fs');
const router = express.Router();

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.get("/api", (req, res) => {
    res.json("Hello from server!");
});

app.get("/apidata", async (req, res) => {
    // URL FOR FETCHING DATA FROM THIRD PARTY API
    let url = "https://services6.arcgis.com/ogJAiK65nXL1mXAW/arcgis/rest/services/Seznam_škol_a_školských_zařízení/FeatureServer/0/query?outFields=*&where=1%3D1&f=geojson";

    // SETTINGS
    let settings = { method: "Get" };

    // FETCH
    let resp =  await fetch(url, settings);
    let data = await resp.json();

    // READ DATA
    let parsed = data.features;

    // EDIT POINTS
    let points = [];
    parsed.forEach(school => {
        points.push({"id" : school.id, "coordinates" : school.geometry.coordinates, "name": school.properties.nazev});
    });
    points = {"points" : points};
    res.json(points);
    });

app.options("*", (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.sendStatus(200);
});

app.post("/update", async (req, res) => {
    let filter = req.query.title;
    let trueFilter = null;

    // URL FOR FETCHING DATA FROM THIRD PARTY API
    let url = "https://services6.arcgis.com/ogJAiK65nXL1mXAW/arcgis/rest/services/Seznam_škol_a_školských_zařízení/FeatureServer/0/query?outFields=*&where=1%3D1&f=geojson";

    // SETTINGS
    let settings = { method: "Get" };

    // FETCH
    let resp =  await fetch(url, settings);
    let data = await resp.json();

    // READ DATA
    let parsed = data.features;

    // EDIT POINTS
    let points = [];

    if(filter === "stredni"){
        trueFilter = "Střední škola";
        parsed.forEach(school => {
            if(trueFilter === school.properties.zarizeni_druh){
                points.push({"id" : school.id, "coordinates" : school.geometry.coordinates, "name": school.properties.nazev});
            }
        });
    } else if(filter === "zakladni"){
        trueFilter = "Základní škola";
        parsed.forEach(school => {
            if(trueFilter === school.properties.zarizeni_druh){
                points.push({"id" : school.id, "coordinates" : school.geometry.coordinates, "name": school.properties.nazev});
            }
        });
    } else if(filter === "vysoke"){
        trueFilter = "vysoká škola";
        parsed.forEach(school => {
            if(trueFilter === school.properties.pravni_forma){
                points.push({"id" : school.id, "coordinates" : school.geometry.coordinates, "name": school.properties.nazev});
            }
        });
    }
    points = {"points" : points};
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.json(points);
});

app.post("/search_bus_stops", async (req, res) => {
    let schoolPositionX = Number(req.query.x);
    let schoolPositionY = Number(req.query.y);

    // URL FOR FETCHING DATA FROM THIRD PARTY API
    let walkingDistance = 0.01; //(+-1km)

    let leftDisctrict = schoolPositionX - walkingDistance;
    let rightDisctrict = schoolPositionX + walkingDistance;
    let topDisctrict = schoolPositionY + walkingDistance;
    let bottomDisctrict = schoolPositionY - walkingDistance;


    // URL FOR FETCHING DATA FROM THIRD PARTY API
    let url = "https://services6.arcgis.com/ogJAiK65nXL1mXAW/arcgis/rest/services/Autobusové_zastávky_IREDO/FeatureServer/0/query?outFields=*&where=1%3D1&f=geojson";

    // SETTINGS
    let settings = { method: "Get" };

    // FETCH
    let resp =  await fetch(url, settings);
    let data = await resp.json();

    // READ DATA
    let parsed = data.features;

    // EDIT POINTS
    let points = [];
    parsed.forEach(busStop => {
        if(busStop.properties.x > leftDisctrict &&
            busStop.properties.x < rightDisctrict &&
            busStop.properties.y > bottomDisctrict &&
            busStop.properties.y < topDisctrict){
            points.push({
                "id" : busStop.id,
                "coordinates" : [busStop.properties.x, busStop.properties.y],
                "name": busStop.properties.nazev
            });
        }
    });

    points = {"points" : points};
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.json(points);
});

// reading position of selected school and selected home and returning bus stop in range
//router.post("/handle",(request,response) => {

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});


