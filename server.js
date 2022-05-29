const path = require('path'); // Setup public folder
const express = require('express'); // Setup server
const session = require('express-session'); // Setup sessions
const exphbs = require('express-handlebars'); // Use handlebars with express
const SequelizeStore = require('connect-session-sequelize')(session.Store); // Use sequelize to handle sessions
const { checkExpiry } = require('./utils/checkExpiry'); // Will check expiry date for medication and send an email notification

const routes = require('./controllers'); // bring routes in from the controllers
const sequelize = require('./config/connection'); // Setup connection to be used
const helpers = require('./utils/helpers'); // Import helper functions from utilities to be used with handlebars

const app = express();
const PORT = process.env.PORT || 3001;

const sess = {
  secret: 'Super secret secret',
  cookie: {
    maxAge: 3000000 // Setup session timeout
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize, // Use sequelize as the method to store information for the session
  }),
};

app.use(session(sess));

const hbs = exphbs.create({ defaultLayout:'index', helpers }); // Create new instance of exphbs with helpers imported into it

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars'); // Set handbars as the view engine

app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
app.use(express.static(path.join(__dirname, 'public'))); // Setup listenner on static home route for JS and CSS

app.use(routes); // Implement any routes that are setup onto the server

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('http://localhost:3001/'));
}).catch((err) => console.log(err)); // activate the server when file is called
