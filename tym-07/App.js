let myLatLng = { lat: 50.2984, lng: 15.9337 };
let start;
let end;
let startPoint;
let endPoint;
let colors = ["orange", "#5c9dff", "red"]
let direction_display_list = [];
let direction_special_list = [];
let map;
let bounds;
let marker;
let marker_list = [];



function initialize() {

    var input = document.getElementById('searchTextField');
    var autocomplete = new google.maps.places.Autocomplete(input);
    google.maps.event.addListener(autocomplete, 'place_changed', function () {
        var place = autocomplete.getPlace();
        document.getElementById('city2').value = place.name;
        document.getElementById('cityLat').value = place.geometry.location.lat();
        document.getElementById('cityLng').value = place.geometry.location.lng();
        myLatLng = { lat: place.geometry.location.lat(), lng: place.geometry.location.lng() };
        main();
    });
}
google.maps.event.addDomListener(window, 'load', initialize);

function main() {
    let table = document.getElementsByClassName("table-of-elements")

    if (table.length > 0) {
        table[0].innerHTML = ""
    }




    const output = document.querySelector('#output');

    end = new google.maps.LatLng(myLatLng.lat, myLatLng.lng);


    var mapOptions = {
        center: myLatLng,
        zoom: 10,
        mapId: "45cff8c27ebe33d0",
        streetViewControl: false,
        disableDefaultUI: true,

    };
    function createTable() {
        section_wrapper1_element = document.createElement("div")
        section_wrapper1_element.setAttribute("class", "table-of-elements")
        section_wrapper1_element.innerHTML = "";
        document.body.appendChild(section_wrapper1_element)



        for (let i = 0; i < data.length; i++) {
            direction_display_list.push([])

            let fastest_route = document.getElementsByClassName("fastest-routes")

            fastest_route[0].onclick = function () {

                generateTop(i)


            }




            section_element = document.createElement("div")
            section_element.setAttribute("class", "section-element " + data[i].data_of)
            section_element.setAttribute("id_data", i)
            section_wrapper1_element.appendChild(section_element)

            section_wrapper3_element = document.createElement("div")
            section_wrapper3_element.setAttribute("class", "section-title-list")
            section_element.appendChild(section_wrapper3_element)



            section_title_element = document.createElement("h2")
            section_title_element.setAttribute("class", "title " + data[i].data_of + "-title")
            section_title_element.setAttribute("id_data", i)
            section_title_element.textContent = data[i].data_of + " stanice";
            section_title_element.style.color = colors[i]
            section_wrapper3_element.appendChild(section_title_element)



            marker_editor_element = document.createElement("h3")
            marker_editor_element.setAttribute("class", "title-small")
            marker_editor_element.textContent = "skrýt na mapě";
            section_wrapper3_element.appendChild(marker_editor_element)

            section_wrapper2_element = document.createElement("div")
            section_wrapper2_element.setAttribute("class", "section-unit-list")
            section_element.appendChild(section_wrapper2_element)



            marker_editor_element.onclick = function () {

                if (this.getAttribute("active") == "false") {
                    for (let j = 0; j < marker_list[this.parentElement.parentElement.getAttribute("id_data")].length; j++) {
                        marker_list[this.parentElement.parentElement.getAttribute("id_data")][j].setVisible(true);
                        this.setAttribute("active", "true")
                        this.textContent = "skrýt na mapě";

                    }

                }
                else {
                    for (let j = 0; j < marker_list[this.parentElement.parentElement.getAttribute("id_data")].length; j++) {
                        marker_list[this.parentElement.parentElement.getAttribute("id_data")][j].setVisible(false);
                        this.setAttribute("active", "false")
                        this.textContent = "zobrazit na mapě";

                    }

                }



            }

            section_title_element.onclick = function () {
                let elementP = this.parentElement.parentElement
                let element = elementP.children[1]
                console.log(this.parentElement)


                if (element.getAttribute("active") == "true") {
                    element.setAttribute("active", "false")
                    this.setAttribute("active", "false")
                    element.classList.remove("active")
                    this.classList.remove("active")

                }


                else {
                    element.setAttribute("active", "true")
                    this.setAttribute("active", "true")
                    element.classList.add("active")
                    this.classList.add("active")
                }


                /*
                console.log(direction_display_list)
                for (let j = 0; j < data.length; j++) {
                    
        
                        for (let k = 0; k < direction_display_list[j].length; k++) {
                            
                            direction_display_list[j][k].setMap(null)
        
            
                        }
                    
                }
                generateTopFive(this.getAttribute("id_data"))*/








            }


            for (let j = 0; j < data[i].features.length; j++) {

                let name_of_station;

                if (data[i].features[j].properties.oblast !== undefined) {
                    name_of_station = data[i].features[j].properties.oblast

                }
                else if (data[i].features[j].properties.oblast == undefined && data[i].features[j].properties.nazev_obvodu == undefined) {
                    name_of_station = data[i].features[j].properties.druh_pracoviste
                }
                else {
                    name_of_station = data[i].features[j].properties.nazev_obvodu

                }



                section_unit_element = document.createElement("p")
                section_unit_element.setAttribute("id_data", j)
                section_unit_element.setAttribute("class", data[i].data_of + "-element section-unit")

                section_unit_element.innerHTML = "<p>" + name_of_station + "</p>" + "<p class='side-info' style='border:2px solid " + colors[i] + "'>" + j + "</p>"


                section_wrapper2_element.appendChild(section_unit_element)



                section_unit_element.onclick = function () {
                    let section_id_this = this.parentElement.parentElement.getAttribute("id_data")
                    let data_id_this = this.getAttribute("id_data")
                    generateOne(section_id_this, data_id_this)




                }



            }
        }
    }
    createTable()

    console.log()



    function generateOne(section_id_this, data_id_this) {
        openOneInfoWindow(section_id_this, data_id_this)





        start = new google.maps.LatLng(data[section_id_this].features[data_id_this].geometry.coordinates[1], data[section_id_this].features[data_id_this].geometry.coordinates[0]);
        startPoint = start;
        endPoint = end;
        console.log(data[section_id_this].features[data_id_this].geometry.coordinates[0])


        for (let j = 0; j < data.length; j++) {



            for (let k = 0; k < direction_display_list[j].length; k++) {

                direction_display_list[j][k].setMap(null)


            }

        }

        for (let e = 0; e < direction_special_list.length; e++) {
            direction_special_list[e].setMap(null);






        }
        directionsDisplayF(colors[section_id_this])


        direction_special_list.push(directionsDisplay)
        let section_id = section_id_this
        let data_id = data_id_this
        let type = "one"

        calcRoute(directionsDisplay, startPoint, endPoint, section_id, data_id, type)

    }

    function openOneInfoWindow(section_id_this, data_id_this) {
        for (let j = 0; j < data.length; j++) {


            for (let k = 0; k < data[j].features.length; k++) {

                marker_list[j][k]['infowindow'].close();


            }

        }

        marker_list[section_id_this][data_id_this]['infowindow'].open(map, marker_list[section_id_this][data_id_this])
    }


    map = new google.maps.Map(document.getElementById('googleMap'), mapOptions);

    var directionsService = new google.maps.DirectionsService();

    var directionsDisplay = new google.maps.DirectionsRenderer();






    function createMarkers() {

        let image_url;
        //home marker
        marker = new google.maps.Marker({
            animation: google.maps.Animation.DROP,
            map: map,
            id: "some-id",
            title: "some-title",
            position: end,
            icon: {
                url: 'home.svg',
                scaledSize: new google.maps.Size(40, 40),
                name: "home",

            },
            height: "10px",
            zIndex: 10,
        });

        for (let i = 0; i < data.length; i++) {
            marker_list.push([]);
            for (let j = 0; j < data[i].features.length; j++) {

                switch (i) {
                    case 0:
                        image_url = "https://www.stromprop.cz/uploads/shop_images/500x500x0/651.jpg";
                        break;
                    case 1:
                        image_url = "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/P%C4%8CR_seal_CMYK.svg/1200px-P%C4%8CR_seal_CMYK.svg.png";
                        break;
                    case 2:
                        image_url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Flag_for_hospital_ship_of_the_Regia_Marina.svg/1024px-Flag_for_hospital_ship_of_the_Regia_Marina.svg.png';
                        break;
                    default:
                        text = "No value found";
                }
                start = new google.maps.LatLng(data[i].features[j].geometry.coordinates[1], data[i].features[j].geometry.coordinates[0])


                let icons = [{
                    url: image_url,
                    scaledSize: new google.maps.Size(30, 30),
                    name: "service",
                    position: start,
                    zIndex: 1
                },
                    /*{
        
        
                        url: 'home.svg',
                        scaledSize: new google.maps.Size(30, 30),
                        name: "home",
                        position: end,
                        zIndex: 10
                    }*/
                ]





                marker = new google.maps.Marker({
                    animation: google.maps.Animation.DROP,
                    map: map,
                    id: "some-id",
                    title: "some-title",
                    position: icons[0].position,
                    icon: icons[0],
                    height: "10px",
                    zIndex: icons[0].zIndex,
                    section_id: i,
                    data_id: j,
                });




                let InfoWindowContent = document.createElement("div");
                let infowindowName = document.createElement("h2");
                let infowindowOkres = document.createElement("h3");
                let infowindowUlice = document.createElement("h3");
                let infowindowCp = document.createElement("h3");
                let infowindowS = document.createElement("h3");
                infowindowS.setAttribute("class", "side-info")
                infowindowS.style.border = "2px solid " + colors[i] + ""



                if (data[i].features[j].properties.oblast !== undefined) {
                    infowindowName.append(data[i].features[j].properties.oblast);

                }
                else if (data[i].features[j].properties.oblast == undefined && data[i].features[j].properties.nazev_obvodu == undefined) {
                    infowindowName.append(data[i].features[j].properties.druh_pracoviste)
                }
                else {
                    infowindowName.append(data[i].features[j].properties.nazev_obvodu)

                }
                infowindowOkres.append("okres " + data[i].features[j].properties.nazev_okresu);
                infowindowUlice.append(data[i].features[j].properties.nazev_ulice + " " + data[i].features[j].properties.cislo_domovni)
                InfoWindowContent.append(infowindowName);
                InfoWindowContent.append(infowindowOkres);
                InfoWindowContent.append(infowindowUlice);
                InfoWindowContent.append(infowindowS)
                infowindowS.append(j)

                for (let y = 0; y < InfoWindowContent.children.length; y++) {
                    InfoWindowContent.children[y].style.color = "black";
                }

                marker['infowindow'] = new google.maps.InfoWindow({

                    content: InfoWindowContent
                })

                google.maps.event.addListener(marker, 'click', function () {
                    let section_id_this = this.section_id
                    let data_id_this = this.data_id
                    generateOne(section_id_this, data_id_this);


                });
                marker_list[i].push(marker);


            }
        }
    }


    function removeMarkers() {
        for (i = 0; i < marker_list.length; i++) {
            marker_list[i].setMap(null);
        }
    }
    createMarkers()

    //bind the DirectionsRenderer to the map
    directionsDisplay.setMap(map);

    //define calcRoute function

    function directionsDisplayF(color) {

        directionsDisplay = new google.maps.DirectionsRenderer({
            map: map,
            preserveViewport: true,
            polylineOptions: {
                strokeColor: color,
                strokeOpacity: 0.9,
                strokeWeight: 2
            },
            suppressMarkers: true,
        });

    }

    function generateTop(section_id) {
        for (let j = 0; j < data.length; j++) {



            for (let k = 0; k < direction_display_list[j].length; k++) {

                direction_display_list[j][k].setMap(null)


            }

        }

        for (let e = 0; e < direction_special_list.length; e++) {
            direction_special_list[e].setMap(null);






        }
        for (let i = 0; i < data.length; i++) {





            let sections_units = document.getElementsByClassName(data[section_id].data_of + "-element")

            console.log(data[2].features[1].geometry.coordinates[1])

            start = new google.maps.LatLng(data[i].features[0].geometry.coordinates[1], data[i].features[0].geometry.coordinates[0])
            startPoint = start;
            endPoint = end;
            directionsDisplayF(colors[i])
            direction_display_list[section_id].push(directionsDisplay)
            console.log(direction_display_list)
            data_id = 0;
            section_id = i;
            let type = "multiple"
            calcRoute(directionsDisplay, startPoint, endPoint, section_id, data_id, type);
        }




    }
    /*function generateAll(section_id){
        for (var i = 12; i < data[section_id].features.length; i++) {
        startPoint = start;
        endPoint = end;
        data_id = i;
        type = "all"
    
    
        start = new google.maps.LatLng(data[section_id].features[i].geometry.coordinates[1], data[section_id].features[i].geometry.coordinates[0])
        calcRoute(directionsDisplay, startPoint, endPoint,section_id, data_id,type);
        }
    }*/

    function calcRoute(directionsDisplay, startPoint, endPoint, section_id, data_id, type) {
        output.innerHTML = "";

        let sections_units = document.getElementsByClassName(data[section_id].data_of + "-element")

        bounds = new google.maps.LatLngBounds();
        //create request


        //pass the request to the route method
        directionsService.route({
            origin: startPoint,
            destination: endPoint,
            travelMode: google.maps.TravelMode.DRIVING
        }, function (result, status) {

            if (status == google.maps.DirectionsStatus.OK) {

                if (type !== "multiple") {

                    output.innerHTML = "<div class='alert-info' style = 'border: 2px " + colors[section_id] + " solid ;'>Vzdálenost<i class=''></i> : " + result.routes[0].legs[0].distance.text + ".<br />Délka <i class=''></i> : " + result.routes[0].legs[0].duration.text + ".</div>";
                }
                if (type !== "one") {
                    /*sections_units[data_id].textContent = " " +  result.routes[0].legs[0].distance.text;*/

                    let html = "<div class='alert-info' style = 'border: 2px " + colors[section_id] + " solid ;'>Vzdálenost<i class=''></i> : " + result.routes[0].legs[0].distance.text + ".<br />Délka <i class=''></i> : " + result.routes[0].legs[0].duration.text + ".</div>";
                    output.innerHTML += html;
                }

                bounds.union(result.routes[0].bounds);
                map.fitBounds(bounds);
                //Get distance and time


                //display route
                if (type == "multiple" || type == "one") {
                    directionsDisplay.setDirections(result);
                }
            } else {
                //delete route from map
                directionsDisplay.setDirections({ routes: [] });
                //center map in London


                //show error message
                output.innerHTML = "<div class='alert-danger'><i class='fas fa-exclamation-triangle'></i> Could not retrieve driving distance.</div>";
            }
        });




    }

    console.log(marker_list)

}


window.onload = main();








