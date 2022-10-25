import React, {useState, useEffect} from 'react'
import { MapContainer } from 'react-leaflet'
import { TileLayer } from 'react-leaflet/TileLayer'
import { useMap } from 'react-leaflet/hooks'
import { ZoomControl } from 'react-leaflet'
import '../components/styles/map.css'
import { Marker, Popup } from 'react-leaflet'

const Map = ({number, data, setData }) => {
    return (
        <MapContainer center={[50.2104, 15.8252]} zoom={13} scrollWheelZoom={true} zoomControl={false}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <ZoomControl position='bottomleft' />
          <MarkerComp number={number} data={data} setData={setData} />
        </MapContainer>
    )
}


export default Map


const MarkerComp = ({number, data, setData }) => {

    useEffect(() => {
      if (!data) {
        fetch("/apidata")
          .then((res) => res.json())
          .then((data) => setData(data.points));
      }
    }, [number]);
        if(data){
            if (number === 0) {
                let markers = data.map( el => {
                    let cordinace = [];
                    cordinace.push(el.coordinates[1]);
                    cordinace.push(el.coordinates[0]);
                    
                    return(
                      <Marker position={cordinace} key={el.id}>
                        <Popup>{el.name}</Popup>
                      </Marker>
                    )
                  })
                  return markers;
            }
            if (number === 1) {
                let markers = data.map( el => {
                    let cordinace = [];
                    cordinace.push(el.coordinates[1]);
                    cordinace.push(el.coordinates[0]);
                    console.log(number);
                    return(
                      <Marker position={cordinace} key={el.id}>
                        <Popup>{el.name}</Popup>
                      </Marker>
                    )
                  })
                  return markers;
            }
            if (number === 2) {
                let markers = data.map( el => {
                    let cordinace = [];
                    cordinace.push(el.coordinates[1]);
                    cordinace.push(el.coordinates[0]);
                    return(
                      <Marker position={cordinace} key={el.id}>
                        <Popup>{el.name}</Popup>
                      </Marker>
                    )
                  })
                  return markers;
            }
            if (number === 3) {
                let markers = data.map( el => {
                    let cordinace = [];
                    cordinace.push(el.coordinates[1]);
                    cordinace.push(el.coordinates[0]);
                    return(
                      <Marker position={cordinace} key={el.id}>
                        <Popup>{el.name}</Popup>
                      </Marker>
                    )
                  })
                  return markers;
            }
        }
    
        

}
