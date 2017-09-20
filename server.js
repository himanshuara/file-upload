var express = require('express');
var app = express();
var multer = require('multer');
var bodyParser = require('body-parser');
port = process.argv[2] || 8000;
var Storage = multer.diskStorage({
     destination: function(req, file, callback) {
         callback(null, "./server/files");
     },
     filename: function(req, file, callback) {
         callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
     }
 });
var upload = multer({
     storage: Storage
 }).array("file"); //Field name and max count
app.post("/api/Upload", function(req, res) {
     upload(req, res, function(err) {
         if (err) {
             console.log(err);
             return res.end("Something went wrong!");
         }
         return res.end("File uploaded sucessfully!.");
     });
 });
app.use(bodyParser.json());
app.use(
        "/", //the URL throught which you want to access to you static content
        express.static(__dirname) //where your static content is located in your filesystem
    );

app.listen(port); //the port you want to use
console.log("Express server running");