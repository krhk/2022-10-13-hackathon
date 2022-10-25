import {MapContainer, Marker, TileLayer} from "react-leaflet";
import 'leaflet/dist/leaflet.css'

export default function LeafMarker({props, children}) {
    return <Marker {...props}>
        {children}
    </Marker>
}