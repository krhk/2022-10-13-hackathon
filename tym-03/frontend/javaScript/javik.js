const { response } = require('express');
const express = require('express');
const axios = require( "axios")
const app = express();



const port = 420;
const htmlPath = 'S:/coding/VScode/public/';
const index = 'html/index.html';
const css = 'css/custom.css';




app.get("/api/data1", async (req, res) => {
    const res1 = await axios('http://172.21.16.121:8080/api/getobce')
    res.send(res1.data)
})


app.get("/api/result", async (req, res) => {

    const res1 = await axios("http://172.21.16.121:8080/api/retrievedata/" + text + "/" + text2)
    res.send()
})


app.use(express.static("public"));
app.use(express.json());


app.listen(port, () => console.log(`listening on port ${port} lmao...`));



