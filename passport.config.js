const jwtStrategy = require('passport-jwt').Strategy,
    extractJwt = require('passport-jwt').ExtractJwt;

const userModel = require('./models/userModel');

const opts = {
    jwtFromRequest: extractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
}

module.exports = passport => {
    passport.use(
        new jwtStrategy(opts, (jwt_payload, done) => {
            const user = userModel.find({email: jwt_payload.email});

            if( user ){
                return done(null, user)
            }
            return done(null, false)
        })
    )
}