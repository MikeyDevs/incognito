// Requiring our Secret model
var db = require("../models");

//IMPORT NANOID TOKEN GENERATOR AND EXPORT
var nanoid = require('nanoid');

//CALL NANOID AND PLACE VALUE IN VARIABLE
var token= nanoid();

// Routes
// =============================================================
module.exports = function(app) {
    // GET route for getting all of the secrets
    app.get("/secrets", function(req, res) {
        db.Secret.findAll({}).then(function(dbSecret) {
            res.json(dbSecret);
        });
    });

    // GET route for getting the token
    app.get("/index", function(req, res) {
        res.send(token)
    });

    // Get route for returning secrets of a specific category
    app.get("/api/secrets/:username", function(req, res) {
        db.Secret
            .findAll({
                where: {
                    username: req.params.username
                }
            })
            .then(function(dbSecret) {
              res.send(dbSecret);
              res.redirect("/profile");
            });
    });


    // POST route for saving a new secret
    app.post("/api/secrets", function(req, res) {
        

        //FUNCTION TO STRIP HTML TAGS FROM USER INPUT
         function deleteHTML(text){
            return text.replace(/(<([^>]+)>)/ig, "");
         }

         //CONDITIONAL TO ONLY POST IF SECURITY TOKEN MATCHES POST REQUEST
        var securityKey = req.body.tokenid;
        if (securityKey && securityKey === token) {
        db.Secret
            .create({
                secret: deleteHTML(req.body.secret),
                lat: req.body.lat,
                lng: req.body.lng
            })
            .then(function(dbSecret) {
                res.redirect("/");
            })
        }
    })
}