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
    database : 'extranger'
  });

  connection.connect();

  connection.query('SELECT * FROM users', function(err, rows, fields) {
    if (err) throw err;

    console.log('The solution is: ', rows);
  });

  connection.end();


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
