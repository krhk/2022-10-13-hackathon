import React from "react";
import { GeoJSON, MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import FeedBox from "../../components/FeedBox/FeedBox";

const Map = () => {
  const [geoJson, setGeoJson] = React.useState(null);
  const [feed, setFeed] = React.useState(null);

  React.useEffect(() => {
    fetch("http://localhost:8080/map/geojson").then((res) => {
      res.json().then((json) => {
        setGeoJson(json);
      });
    });
    fetch("http://localhost:8080/feed").then((res) => {
      res.json().then((json) => {
        setFeed(json);
      });
    });
  }, []);

  return (
    <div style={{ height: "100vh", display: "flex", alignItems: "end" }}>
      {geoJson != null && feed != null ? (
        <MapContainer
          style={{ width: "100%", height: "93vh" }}
          center={[50.3098, 15.8337]}
          zoom={10}
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {feed.map((s) => (
            <Marker position={[s.position.lat, s.position.lng]}>
              <Popup>
                <img src={s.base64_image} width="300" height="300" />
                <p>{s.description}</p>
              </Popup>
            </Marker>
          ))}
          <GeoJSON
            key="geo-json-key"
            data={geoJson}
            style={(s) => {
              if (s.properties.stav_sil === "výborný") {
                return { color: "#1FA2FF" };
              } else if (s.properties.stav_sil === "dobrý") {
                return { color: "#0D39FF" };
              } else if (s.properties.stav_sil === "nevyhovující") {
                return { color: "#8B18D8" };
              } else if (s.properties.stav_sil === "havarijní") {
                return { color: "#F35663" };
              } else if (s.properties.stav_sil === "SUPERhavarijní") {
                return { color: "#EC0000" };
              }
            }}
          />
        </MapContainer>
      ) : (
        <></>
      )}
    </div>
  );
};
export default Map;
