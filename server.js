  // Module dependencies.
  var application_root = __dirname,
    express = require( 'express' ), //Web framework
    path = require( 'path' ), //Utilities for dealing with file paths
    http = require('http');

  //Create server
  var app = express();
  var server = http.createServer(app).listen((3000), function(){
    console.log("Express server on)");
  });

  var mysql      = require('mysql');
  var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'wzh369258147',
    database : 'mobileTemp'
  });

  connection.connect();
  // Configure server
  app.configure( function() {

    app.use(express.cookieParser('That is a secret'));
    app.use(express.session({ secret: 'DasiyTech, mobile template for small enterprise' }));

    app.use( express.bodyParser() );

    //checks request.body for HTTP method overrides
    app.use( express.methodOverride() );

    //perform route lookup based on url and HTTP method
    app.use( app.router );

    //Where to serve static content
    //app.use( express.static( path.join( application_root, '/app') ) );

    //Show all errors in development
    app.use( express.errorHandler({ dumpExceptions: true, showStack: true }));

  });



  // =========================================== APIs ============================================

  app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
  });

  // get all the menu categories
  app.get( '/api/menuCategories', function (req, res, next) {
    console.log('request from: ' + req.connection.remoteAddress);
    
    connection.query('SELECT * FROM MenuCat', function(err, rows, fields) {
      if (err) throw err;
      if (rows.length > 0) {
          console.log(JSON.stringify(rows));
          res.send(rows);
      }
      else
          res.send(null);
    });

  });

  // get all the menus
  app.get( '/api/menus', function (req, res, next) {
    console.log('request from: ' + req.connection.remoteAddress);
    // var catID = req.params.catID;
    connection.query("SELECT * FROM Menu WHERE owner_id=1", function(err, rows, fields) {
      if (err) throw err;
      if (rows.length > 0) {
          console.log(JSON.stringify(rows));
          res.send(rows);
      }
      else
          res.send(null);
    });

  });

  // get all the Ad images
  app.get( '/api/imageAds', function (req, res, next) {
    console.log('request from: ' + req.connection.remoteAddress);

    connection.query('SELECT * FROM Image WHERE (type=0) AND (owner_id=1)', function(err, rows, fields) {
      if (err) throw err;
      if (rows.length > 0) {
          console.log(JSON.stringify(rows));
          res.send(rows);
      }
      else
          res.send(null);
    });

  });

  // get all the feeds from specific owner
  app.get( '/api/feeds', function (req, res, next) {
    console.log('request from: ' + req.connection.remoteAddress);

    connection.query('SELECT * FROM Feed WHERE owner_id=1', function(err, rows, fields) {
      if (err) throw err;
      if (rows.length > 0) {
          console.log(JSON.stringify(rows));
          res.send(rows);
      }
      else
          res.send(null);
    });

  });

  // get all the bottom nav items from specific owner
  app.get( '/api/bottomNavBarItems', function (req, res, next) {
    console.log('request from: ' + req.connection.remoteAddress);

    connection.query('SELECT * FROM BottomNavBar WHERE owner_id=1', function(err, rows, fields) {
      if (err) throw err;
      if (rows.length > 0) {
          console.log(JSON.stringify(rows));
          res.send(rows);
      }
      else
          res.send(null);
    });

  });
