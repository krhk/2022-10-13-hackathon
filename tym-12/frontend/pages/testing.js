import Head from 'next/head'
import Image from 'next/image'
import Layout from '../components/layout.component'
import Popup from "../components/popup.component";
import Checkbox from "../components/checkbox.component";
import {parseString} from "xml2js";
import {XMLParser} from "fast-xml-parser";
import {useEffect, useState} from "react";
import useSWR from 'swr'

const DATA_URL = 'https://datakhk-khk-gis.hub.arcgis.com/api/feed/rss/2.0';

async function fetcher(url) {
    const parser = new XMLParser();
    const res = await fetch(url);
    const xml = await res.text();
    console.log(xml)
    const obj = parser.parse(xml);
    console.log(obj);
    return obj;
}

export default function Home() {
    const {data, error} = useSWR(DATA_URL, fetcher);

    return <div><Popup id="test">
        <div className="flex flex-row w-full gap-4">
            <div className="grow-0 flex flex-col">
                <div className="form-control">
                    <Checkbox>Kultura a cestovní ruch</Checkbox>
                    <Checkbox>Veřejná doprava a silnice</Checkbox>
                    <Checkbox>Kraj a dotace</Checkbox>
                    <Checkbox>Školství a výzkum</Checkbox>
                    <Checkbox>Ekonomika a trh práce</Checkbox>
                    <Checkbox>Životní prostřední</Checkbox>
                    <Checkbox>Investice kraje</Checkbox>
                </div>
            </div>
            <div className="grow basis-4 flex flex-col w-full h-full align-center text-center">
                <input type="text" placeholder="Hledat" className="input input-bordered mx-auto md:mx-32 mb-4"/>
                <div className="overflow-auto max-h-80">
                {!data ?
                <span>Loading..</span> : <span>{data.rss.channel.item.map((item, i) => {
                    return <li>
                        <span className="label-text">{item.title}</span>
                    </li>
                })}</span>
                }
                </div>
            </div>
        </div>
    </Popup>
    </div>
}

