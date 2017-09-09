    //console.log(util.inspect(sections, {showHidden: false, depth: null}) + 'SECTIONS')
const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const path = require('path');
const session = require('express-session');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);
const sassMiddleware = require('node-sass-middleware');
const bonsai_url    = process.env.BONSAI_URL;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false}))
app.set('view engine', 'pug');

//use Mongoose
if (process.env.MONGODB_URI) {
    mongoose.connect(process.env.MONGODB_URI);
} else {
  mongoose.connect('mongodb://localhost/learnbox');
}

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

//user express-session
app.use(session({
  secret: "This is the secret",
  resave: true,
  saveUninitialized: false,
  store: new MongoStore({
    mongooseConnection: db
  })
}));

//make user-session available in all templates
app.use(function(req, res, next) {
  res.locals.currentUser= req.session.userId;
  next();
})

app.use(express.static( path.join( './assets/dist' ) ) );

//include basic routes
const routes = require('./routes')
app.use(routes)

// favicon requests
app.use((req, res, next) => {
  if (req.url === '/favicon.ico') {
    res.writeHead(200, {'Content-Type': 'image/x-icon'} );
    res.end();
    return;
  }
})

// error handlers
app.use((req, res, next) => {
    const err = new Error("Not found")
    err.status = 404
    next(err)
  })

app.use(function (err, req, res, next) {
  res.locals.err = err;
  res.status(500).render('error')
})

app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
