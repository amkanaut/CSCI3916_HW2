var passport = require('passport');
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;

var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
opts.secretOrKey = process.env.UNIQUE_KEY;

passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    console.log("PAYLOAD ID: ", jwt_payload.id); // Figure out where payload is saved

    var user = db.find(jwt_payload.id);

    console.log("User found in DB: ", user);

    if (user) {
        done(null, user);
    } else {
        done(null, false);
    }
}));

exports.isAuthenticated = passport.authenticate('jwt', { session : false });
exports.secret = opts.secretOrKey ;