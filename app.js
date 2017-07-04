const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const sassMiddleware = require('node-sass-middleware')
const path = require('path');

app.use(bodyParser.urlencoded({ extended: false}))
app.set('view engine', 'pug');

//use sass
app.use(sassMiddleware({
         src: __dirname + '/sass',
         dest: __dirname + '/public',
         debug: true,
         })
);

app.use(express.static( path.join( __dirname, 'public' ) ) );

//include basic routes
const routes = require('./routes')
app.use(routes)

//include collections routes
const collections = require('./routes/collections')
app.use('/collections', collections)


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

app.listen(3000);
