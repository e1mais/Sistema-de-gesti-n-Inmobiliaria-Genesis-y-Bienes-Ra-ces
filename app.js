const express = require("express"),
  morgan = require("morgan"),
  path = require('path'),
  publicDir = express.static(path.join(__dirname, '/public')),
  viewDir = path.join(__dirname, 'views'),
  routes = require("./routes/index"),
  port = process.env.PORT || 3001
  dotenv = require('dotenv'),
  app = express();

// //middlewares
// app.use(session({
//     secret: 'elmaisConnectsql',
//     resave: false,
//     saveUninitialized: false,
//     store: new MySQLStore(database)
//   }));

  //View engines, views, port
  app.set('view engine', 'hbs')
  app.set('views', viewDir)
  app.set('port', port) 
  
const handlebars = require('express-handlebars').create({
  defaultLayout: 'main',
  layoutsDir: path.join(app.get('views'), 'layouts'),
  partialsDir: path.join(app.get('views'), 'partials'),
  extname: 'hbs'  
})
app.engine('hbs', handlebars.engine)

  //variables de entorno
  dotenv.config({path: './env/.env'})

  //middlewares
  app.use(morgan('dev')) //Salidas HTTP
  app.use(express.urlencoded({ extended:false }))
  app.use(express.json())

  //routes
  app.use("/", routes)
  app.use(require('./routes/auth'))
  //public static dir
  app.use(publicDir)
  

  //Server Listen
  app.listen(app.get("port"), () => {
    console.log(`Server is listen on port: ${app.get("port")}`);
  });
