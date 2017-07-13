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
const elasticsearch = require('elasticsearch');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false}))
app.set('view engine', 'pug');


  const client = new elasticsearch.Client({
                              host: bonsai_url,
                              log: 'trace'
                          });

  // Test the connection:
  // Send a HEAD request to "/" and allow
  // up to 30 seconds for it to complete.
  client.ping({
    requestTimeout: 30000,
  }, function (error) {
    if (error) {
      console.error('elasticsearch cluster is down!');
    } else {
      console.log('All is well');
    }
  });


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

//use sass
app.use(sassMiddleware({
         src: (__dirname + '/sass'),
         dest: (__dirname + '/public'),
         debug: true,
         })
);

app.use(express.static( path.join( './public' ) ) );

//include basic routes
const routes = require('./routes')
app.use(routes)

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
