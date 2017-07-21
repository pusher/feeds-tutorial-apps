const express = require("express");
const bodyParser = require("body-parser");
const Feeds = require("pusher-feeds-server");

const feeds = new Feeds({
  instanceId: YOUR_INSTANCE_ID_HERE,
  key: YOUR_KEY_HERE
});

const app = express();
app.use(express.static("static"));
app.use(bodyParser.json());

app.post("/comments", (req, res) => {
  feeds
    .publish("comments", req.body)
    .then(() => res.sendStatus(204))
    .catch(err => res.status(400).send(err));
});

app.listen(5000);
console.log("Listening on port 5000");
