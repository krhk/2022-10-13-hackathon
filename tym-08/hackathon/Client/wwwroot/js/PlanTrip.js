var centerMap = SMap.Coords.fromWGS84(14.40, 50.08);
var m = new SMap(JAK.gel("m"), centerMap, 8);
var l = m.addDefaultLayer(SMap.DEF_BASE).enable();
m.addDefaultControls();

var _layers = [];

var car = false;

var nalezeno = function (route) {
    var vrstva = new SMap.Layer.Geometry();
    m.addLayer(vrstva).enable();

    var coords = route.getResults().geometry;
    var cz = m.computeCenterZoom(coords);
    m.setCenterZoom(cz[0], cz[1]);
    var g = new SMap.Geometry(SMap.GEOMETRY_POLYLINE, null, coords);
    vrstva.addGeometry(g);
    _layers.push(vrstva);
}

var coords = [
    SMap.Coords.fromWGS84(15.723, 50.541),
    SMap.Coords.fromWGS84(15.723, 50.541)
];


function addCoord(x, y) {
    x = String(x).replace(",", ".");
    y = String(y).replace(",", ".");

    coords[0] = SMap.Coords.fromWGS84(Number(x), Number(y));
}

//URL
var inputEl = document.querySelector(".start");
var suggest = new SMap.Suggest(inputEl, {
    provider: new SMap.SuggestProvider({
        updateParams: params => {
            /*
                tato fce se vola pred kazdym zavolanim naseptavace,
            params je objekt, staci prepsat/pridat klic a ten se prida
            do url
          */
            let c = m.getCenter().toWGS84();
            params.lon = c[0].toFixed(5);
            params.lat = c[1].toFixed(5);
            params.zoom = m.getZoom();

            // nepovolime kategorie, ale takto bychom mohli
            //params.enableCategories = 1;

            // priorita jazyku, oddelene carkou
            params.lang = "cs,en";
        }
    })
});

var __x;
var __y;

function returnX() {
    return __x;
}
function returnY() {
    return __y;
}

suggest.addListener("suggest", suggestData => {
    let x = document.getElementById("des_x").value;
    let y = document.getElementById("des_y").value;

    addCoord(x, y);

    // vyber polozky z naseptavace
    coords[1] = SMap.Coords.fromWGS84(suggestData["data"]["longitude"], suggestData["data"]["latitude"]);

    route = new SMap.Route(coords, nalezeno);
    createUrl();

    __x = ""+suggestData["data"]["longitude"];
    __y = ""+suggestData["data"]["latitude"];

    if (_layers.length > 0) {
        console.log(_layers);
        m.removeLayer(_layers[0]);
        _layers.shift();
    }
});

function createUrl() {
    var smapUrl1 = new SMap.URL.Route().addStart(coords[0], {
        poi: ["muni", 3468], type: "car"
    })
        .addDestination(coords[1], {
            poi: ["base", 1701792]
        });

    let _url = smapUrl1.toString();
    let date = document.getElementById("date").value ?? new Date.now;

    if (!car) {
        _url = _url.replaceAll('"', "");
        _url = _url.replace(`{c:111}&mrp={c:111}`, "");
        _url += `%7B"c"%3A200%2C"d"%3Atrue%2C"dt"%3A"${date}T8%3A20%3A00"%7D&xc=%5B%5D`
    }

    console.log(_url);

    document.getElementById("url1").setAttribute("href", _url);
}