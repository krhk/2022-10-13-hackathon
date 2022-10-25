import Head from 'next/head'
import Image from 'next/image'
import Layout from '../components/layout.component'
import dynamic from "next/dynamic";

const Map = dynamic(() => import("../components/map.component"), {ssr:false})
const LeafMarker = dynamic(() => import("../components/marker.component"), {ssr:false})
const LeafPopup = dynamic(() => import("../components/popup.component"), {ssr:false})

export default function Home() {

    return <div className="w-screen h-screen">
        <Map>

        </Map>
    </div>
}

