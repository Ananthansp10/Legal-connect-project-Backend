import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import dotenv from "dotenv";

dotenv.config();

interface User{
  googleId:string;
  name:string;
  email?:string;
}

export default passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: "/api/user/auth/google/callback",
    },
    async (accessToken: string, refreshToken: string, profile, done: any) => {
      try {
        const user:User = {
          googleId: profile.id,
          name: profile.displayName,
          email: profile.emails?.[0]?.value,
          //image: profile.photos?.[0]?.value,
        };

        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

passport.serializeUser((user: Express.User, done) => {
  done(null, user);
});

passport.deserializeUser((user: Express.User, done) => {
  done(null, user);
});
