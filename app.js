require('dotenv').config();

const express = require('express'); 
const expressLayouts = require('express-ejs-layouts');
const methodOverride = require('method-override');
const session = require('express-session');
const passport = require('passport');
const MongoStore = require('connect-mongo');
const path = require('path');



const app = express();

// Session
app.use(session({
  secret: 'keyboard cat',
  resave: false, 
  saveUninitialized: false, 
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URI
  }), 
  cookie: { maxAge: 3600000 }
}));

app.use(passport.initialize()); 
app.use(passport.session()); 

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));

// Static files
app.use(express.static('public'));

// Templating Engine
app.use(expressLayouts);
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');




// Routes
app.use('/', require('./server/routes/auth'));
app.use('/', require('./server/routes/index'));
app.use('/dashboard', require('./server/routes/dashboard'));

// 404
app.use((req, res) => {
  res.status(404).render('404');
});

module.exports = app;
