import express from "express";
import fetch from "node-fetch";
import fs from "fs";
import cors from "cors";
import Feed from "./Feed";

import bodyParser from "body-parser";

const app = express();
const port = 8080;

app.use(cors());
app.use(express.json({ limit: "50mb" }));

const jsonParser = bodyParser.json({ limit: "50mb" });

app.get("/", (req, res) => {
  res.send("Hello world!");
});

function write_feed_arr_to_file(feed: Feed[]) {
  fs.writeFile("./db/feed.json", JSON.stringify(feed), () => {});
}

app.get("/feed", async (req, res) => {
  fs.readFile("./db/feed.json", "utf8", function (err, data) {
    if (err) throw err;
    res.send(data);
  });
});

app.post("/post", jsonParser, async (req, res) => {
  let new_post = req.body as Feed;
  fs.readFile("./db/feed.json", "utf8", function (err, data) {
    if (err) throw err;
    let parsed = JSON.parse(data) as Feed[];
    new_post.id = parsed[parsed.length - 1].id + 1;
    parsed.push(new_post);
    write_feed_arr_to_file(parsed);
    res.sendStatus(200);
  });
});

app.post("/feed/vote", async (req: any, res: any) => {
  fs.readFile("./db/feed.json", "utf8", function (err, data) {
    if (err) throw err;
    let parsed = JSON.parse(data) as Feed[];

    let id = req.query.id;
    let action = req.query.action;

    let post_to_edit = parsed.filter((s) => s.id == id)[0];
    if (action == "upvote") {
      post_to_edit.number_of_upvotes += 1;
    } else if (action == "downvote") {
      post_to_edit.number_of_downvotes += 1;
    }

    write_feed_arr_to_file(parsed);
    res.send(post_to_edit);
  });
});

app.get("/map/geojson", async (req, res) => {
  fs.readFile("./db/routes.geojson", "utf8", function (err, data) {
    if (err) throw err;
    res.send(data);
  });
});

app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
