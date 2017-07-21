const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const Feeds = require("pusher-feeds-server");

const feeds = new Feeds({
  instanceId: YOUR_INSTANCE_ID_HERE,
  key: YOUR_KEY_HERE
});

const app = express();
app.use(express.static("static"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({ secret: 'SOME-SECRET' }));
app.set('views', './views');
app.set('view engine', 'ejs');

app.post("/login", (req, res) => {
  req.session.userId = req.body.user_id;
  res.redirect(`/comments/${req.body.user_id}`);
});

app.get("/comments/:user_id", (req, res) => {
  res.render('comments', { userId: req.params.user_id });
});

app.post("/comments/:user_id", (req, res) => {
  if (req.session.userId === req.params.user_id) {
    feeds
      .publish(req.params.user_id, req.body) // Use the user id as the feed id (CONFUSING???)
      .then(() => res.sendStatus(204))
      .catch(err => res.status(400).send(err));
  } else {
    res.sendStatus(401);
  }
});

app.listen(5000);
console.log("Listening on port 5000");
