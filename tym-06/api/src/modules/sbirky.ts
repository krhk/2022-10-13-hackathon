import axios from "axios"
import querystring from "querystring"

export async function getSbirky(lokace?: {x: any, y: any}) {    
    var data
    if(lokace) 
        data = (await axios.get("http://89.187.157.213:443/query?" + querystring.stringify({y: lokace.x, x: lokace.y, distance: 999999999999, sortBy: "distance"}))).data
    else
        data = (await axios.get("https://services6.arcgis.com/ogJAiK65nXL1mXAW/arcgis/rest/services/Veřejné_sbírky/FeatureServer/0/query?outFields=*&where=1%3D1&f=geojson")).data.features

    

    for(let sbirka of data) {
        var startDate = sbirka.properties.zahajeni
        var startDATE = new Date(`${Number(startDate.split(".")[2]).toLocaleString('en-US', {
            minimumIntegerDigits: 2,
            useGrouping: false
          })}-${Number(startDate.split(".")[1]).toLocaleString('en-US', {
            minimumIntegerDigits: 2,
            useGrouping: false
          })}-${Number(startDate.split(".")[0]).toLocaleString('en-US', {
            minimumIntegerDigits: 2,
            useGrouping: false
          })}T12:00:00.000Z`)
        if(startDATE.toString() == "Invalid Date") {
            sbirka.properties.zahajeniString = sbirka.properties.zahajeni
            delete sbirka.properties.zahajeni
        }else{
            sbirka.properties.zahajeni = startDATE
        }
    }
    
    return data
}