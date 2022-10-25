import Head from 'next/head'
import Image from 'next/image'
import Layout from '../components/layout.component'
import dynamic from "next/dynamic";

const Map = dynamic(() => import("../components/map.component"), {ssr:false})

export default function Home() {
  return (
    <Layout>
        <div className="h-full w-full mt-0">
            <Map />
        </div>
    </Layout>
  )
}
