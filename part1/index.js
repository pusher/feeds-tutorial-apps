const express = require("express");
const bodyParser = require("body-parser");
const Feeds = require("pusher-feeds-server").Feeds;

const feeds = new Feeds({
  serviceId: "YOUR_SERVICE_ID_HERE",
  serviceKey: 'YOUR_SERVICE_KEY_HERE',
  cluster: "api-ceres.pusherplatform.io"
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
