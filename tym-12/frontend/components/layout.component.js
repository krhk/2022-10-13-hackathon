import Navbar from "./navbar.component";
import Dropdown from "./dropdown.component";
import Checkbox from "./checkbox.component";
import useSWR from "swr";
import {XMLParser} from "fast-xml-parser";
import Popup from "./popup.component";
import {fetcher, getCategories} from "../utils/data";

const DATA_URL = 'https://datakhk-khk-gis.hub.arcgis.com/api/feed/rss/2.0';


export default function Layout({children}) {
    const {data, error} = useSWR(DATA_URL, fetcher);
    var categories = [];
    if (data) {
        categories = getCategories(data);
        data.rss.channel.item = [
            {
                "title":"Zábavní centra",
                "guid":"https://services6.arcgis.com/ogJAiK65nXL1mXAW/arcgis/rest/services/Zábavní_centra/FeatureServer/0/query?outFields=*&where=1%3D1"
            },
            {
                "title":"Technické památky",
                "guid":"https://services6.arcgis.com/ogJAiK65nXL1mXAW/arcgis/rest/services/Technické_památky/FeatureServer/0/query?outFields=*&where=1%3D1"
            },
        ]
    }




    return <div className="w-screen h-screen flex flex-col">
        <Navbar/>
        <div className="grow">{children}</div>

        <Popup id="test">
            <div className="flex flex-row w-full gap-4">
                <div className="grow-0 flex flex-col">
                    <div className="form-control">
                        {!data ?
                            <span>Loading..</span> : <span>{categories.map((item, i) => {
                                return <Checkbox>{item}</Checkbox>
                            })}</span>
                        }
                    </div>
                </div>
                <div className="grow basis-4 flex flex-col w-full h-full align-center text-center">
                    <input type="text" placeholder="Hledat" className="input input-bordered mx-auto md:mx-32 mb-4"/>
                    <div className="overflow-auto max-h-80">
                        <ul className="flex">
                        {!data ?
                            <span>Loading..</span> : <span>{data.rss.channel.item.map((item, i) => {
                                return <li className="list-none align-center flex gap-4 mb-2">
                                    <input type="checkbox" className="checkbox" id={item.guid} onChange={saveValue}/>
                                    <span className="label-text">{item.title}
                                    </span>
                                </li>
                            })}</span>
                        }
                            </ul>
                    </div>
                </div>
            </div>
        </Popup>
    </div>
}

const selected = [];
var dataSet = "";

function saveValue(e) {
    if(e.target.value == true) {
        selected.push(e.target.id);
    }
    else {
        selected.splice(selected.indexOf(e.target.id), 1);
    }

    var base64 = "?";
    selected.map((item, i) => {
        base64.push(btoa(item) + "&");
    })

    fetch("http://150.230.20.174/backend/api.php?" + base64);
}