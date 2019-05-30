const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const JwtStrategy = require("passport-jwt").Strategy;
const { ExtractJwt } = require("passport-jwt");

var UserService = require("../services/UserService");
const AuthConstants = require("../constants/AuthConstants");

//JWT Strategy
const JwtOpts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: AuthConstants.JWT_SECRET
};

passport.use(new JwtStrategy(JwtOpts, async (payload,done)=>{
    
    try{
        //find the user specified in token.
        const user = await UserService.findById( payload._id );
        
        // if user dosent esxists, handle it
        if( !user)
           return done(null, false);
        
        //otherwise, return the user
        done(null,user);

    }catch(err){
        done(err,false);
    }
}));

//Local Strategy
const LocalOpts = {
    usernameField: "Username",
    passwordField: "Password"
};

passport.use(new LocalStrategy( LocalOpts, async (username,password,done) => {
    
    try{
        //Find the user given username and password    
        const user = await UserService.findByUsernamePassword(username,password);

        //If username/password does not match with any user. Handle it.
        if( !user )
            return done(null,false);

        done(null,user);

    }catch(err){
        done(err,false);
    }
    
}));