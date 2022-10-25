import axios from "axios"
import express from "express"
import { getSbirky } from "./modules/sbirky"
var app = express()
import querystring from "querystring"
app.listen(5000)
import puppeteer from "puppeteer"

// getSbirky().then(console.log)


app.get("/sbirka/:id", async (req, res) => {
    var sbirky = await getSbirky()
    var sbirka = sbirky.find((f: any) => f.id?.toString() == req.params.id)
    res.json(sbirka)
})

app.get("/sbirky", async (req, res) => {
    if(req.query.x && req.query.y) {
        res.json(await getSbirky({x: req.query.x, y: req.query.y}))
    } else
        res.json(await getSbirky())
})

app.get("/detaily/:ico", async(req, res) => {
    try{
        var response = await axios.get("http://89.187.157.213:443/compdata?" + querystring.stringify({ico: req.params.ico}))
        res.json(response.data)
    }catch{
       res.json([])
    }
})

