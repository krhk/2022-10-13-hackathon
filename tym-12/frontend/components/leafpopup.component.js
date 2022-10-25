import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";
import 'leaflet/dist/leaflet.css'

export default function LeafPopup({props, children}) {
    return <Popup {...props}>
        {children}
    </Popup>
}