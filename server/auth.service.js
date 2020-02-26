
'use strict';


var expressJwt = require('express-jwt');
var compose = require('composable-middleware');
var Profile = require('./api/profile/profile.model');

var validateJwt = expressJwt({
  secret: "secret"
});

 

module.exports.isAuthenticated =  function() {
  return compose()

    // Validate jwt
    .use(function(req, res, next) {
      // allow access_token to be passed through query parameter as well
      if (req.query && req.query.hasOwnProperty('access_token')) {
        req.headers.authorization = 'Bearer ' + req.query.access_token;
      }
      validateJwt(req, res, next);
    })
    // Attach profile to request
    .use(function(req, res, next) {
      console.log("req.user>>>>>>>>>> ", req.user.user);
      Profile.findById({"_id":req.user._id})
        .then(profile => {
          console.log("profile>>>>>>>>>>>>>>>>", profile );
          if (!profile) {
            return res.status(401).end();
          }
          req.user = profile;
          console.log("req.user1>>>>>> ", req.user);
          next();
        })
        .catch(err => next(err));
    });
}