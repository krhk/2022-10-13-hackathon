var obrazek = "https://api.mapy.cz/img/api/marker/drop-red.png";

var m = new SMap(JAK.gel("m"));
m.addControl(new SMap.Control.Sync()); /* Aby mapa reagovala na změnu velikosti průhledu */
m.addDefaultLayer(SMap.DEF_BASE).enable(); /* Turistický podklad */
var mouse = new SMap.Control.Mouse(SMap.MOUSE_PAN | SMap.MOUSE_WHEEL | SMap.MOUSE_ZOOM); /* Ovládání myší */
m.addControl(mouse);

console.log(SMap.Coords.fromWGS84(15.723, 50.541));

var vrstva = new SMap.Layer.Marker(); /* Vrstva se značkami */
var souradnice = [];
// data pro markery
function loadMarkers() {
    let markers = []
    let data = JSON.parse(localStorage.getItem("store"));
    for (x in data) {
        for (y of data[x]) {
            markers.push(
                {
                    name: y.Name,
                    id: y.Id,
                    coords: SMap.Coords.fromWGS84(y.XPosition, y.YPosition)
                });
        }
    }

    markers.forEach(function (marker) {
        var options = {
            url: obrazek,
            title: marker.name,
            anchor: { left: 10, bottom: 1 }  /* Ukotvení značky za bod uprostřed dole */
        }

        var c = new SMap.Card();
        c.setSize(200, 190);
        c.getHeader().innerHTML = marker.name;
        c.getHeader().style.borderBottom = "1px solid gray";
        c.getBody().style.margin = "5px 0px";
        c.getBody().style.textAlign = "center";
        c.getBody().innerHTML = `<a href='https://www.hkregion.cz/dr-cs/${marker.id}-.html' style='display: block; background-color: cadetblue; color: white; width: 130px; border-radius: 8px; line-height: 28px; margin: 3px 0; text-align: center; text-decoration: none;'>Detail<a/>`;
        c.getBody().innerHTML += `<a href='/planTrip/${marker.id}' style='display: block; background-color: cadetblue; color: white; width: 130px; border-radius: 8px; line-height: 28px; margin: 3px 0; text-align: center; text-decoration: none;'>Naplánovat<a/>`;

        // duletize je prirazeni id jednotlivemu markeru - vlastni id, jinak se generuje nahodne
        var znacka = new SMap.Marker(marker.coords, marker.id, options);
        souradnice.push(marker.coords);
        znacka.decorate(SMap.Marker.Feature.Card, c);
        vrstva.addMarker(znacka);
    });
    $(".trip").click((event) => {
        for (const m of vrstva.getMarkers()) {
            if (event.target.id == m._id)
                m.click()
        }
    });
}
loadMarkers();
//var markers = [{
//    name: "Šindelářská věž",
//    id: 1,
//    coords: SMap.Coords.fromWGS84(15.815, 50.433)
//}, {
//    name: "Hradiště Kal",
//    id: 2,
//    coords: SMap.Coords.fromWGS84(15.629, 50.448)
//}, {
//    name: "Pevnost Josefov",
//    id: 3,
//    coords: SMap.Coords.fromWGS84(15.924, 50.339)
//}];

// vytvoreni markeru


// zobrazime a povolime vrstvu - pokud by se vrstva povolila pred vkladanim markeru, tak by se s kazdym vlozenym markerem prekreslovala mapa a pocitaly pozice vsech markeru
m.addLayer(vrstva);                          /* Přidat ji do mapy */
vrstva.enable();                         /* A povolit */

var cz = m.computeCenterZoom(souradnice); /* Spočítat pozici mapy tak, aby značky byly vidět */
m.setCenterZoom(cz[0], cz[1]);

/* poslouchani na kliknuti u markeru
m.getSignals().addListener(this, "marker-click", function(e) {
  // vybrany marker
  var marker = e.target;
  var id = marker.getId();
  // zobrazime jeho jmeno - parovani vybraneho markeru pomoci jeho id a nasich vstupnich dat
  for (var i = 0; i < markers.length; i++) {
        if (markers[i].id == id) {
    	
      break;
    }
  }
});*/

