import { useEffect, useState } from 'react'
import "./plannedRepairs.scss";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { globalData } from '../../global';

var ano = true;
function getJSON(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = function () {
        var status = xhr.status;
        if (status === 200) {
            callback(null, xhr.response);
        } else {
            callback(status, xhr.response);
        }
    };
    xhr.send();
};

var roadData;

async function getData() {
    getJSON('https://services6.arcgis.com/ogJAiK65nXL1mXAW/arcgis/rest/services/Stav_povrchu_silnic/FeatureServer/0/query?outFields=*&where=1%3D1&f=geojson',
        function (err, data) {
            if (err !== null) {
                alert('Something went wrong: ' + err);
            } else {
                roadData = data;
            }
        });
}
// await getData()
// setTimeout(() => {
//     console.log(roadData.features.length)
//     for (let index = 0; index < roadData.features.length; index++) {
//         console.log(index);
//         const feature = roadData.features[index];
//         var road = {};
//         road["name"] = feature.properties.ozn_sil;
//         road["date"] = feature.properties.stav_rok;
//         road["state"] = feature.properties.stav_sil;
//         road["link"] = null;
//         globalData.push(road);
//     }


// }, 1000)

// fetch("https://services6.arcgis.com/ogJAiK65nXL1mXAW/arcgis/rest/services/Stav_povrchu_silnic/FeatureServer/0/query?outFields=*&where=1%3D1&f=geojson").then(async (e) =>{
//     console.log(await e.body);


// })



function PlannedRepairs() {
    const [data, setData] = useState([]);

    
    useEffect(() => {
        getData()
        setTimeout(() => {
            if (ano){
                ano = false;
            console.log(roadData.features.length)
            
            for (let index = 0; index < 20; index++) {
                console.log(index);
                const feature = roadData.features[index];
                var road = {};
                road["name"] = feature.properties.ozn_sil;
                road["date"] = feature.properties.stav_rok;
                road["state"] = feature.properties.stav_sil;
                road["link"] = null;
                globalData.push(road);
            }}

            setData([...globalData]);

        }, 1000)
    }, )

    return (
        <section id='planovane-opravy' className="planned-repairs container">
            <h1>Plánované opravy silnic</h1>
            <p>Seznam úseků plánovaných na budoucí opravu</p>


            <table id="repairs-table">
                <tbody>
                    <tr>
                        <th>Úsek</th>
                        <th>Datum záznamu</th>
                        <th>Aktuální stav</th>
                        <th></th>
                    </tr>

                    {
                        globalData.map((line, i) => (
                            <tr key={i}>
                                <td>{line.name}</td>
                                <td>{line.date}</td>
                                <td>{line.state}</td>
                                <td><a className="blue-link" href="">zobrazit na mapě</a></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>

            <Link to="/opravy" className='show-all'>zobrazit vše</Link>

        </section>
    )
}


export default PlannedRepairs;