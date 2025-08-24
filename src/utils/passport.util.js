// import passport from "passport";
// import { Strategy as GoogleStrategy } from "passport-google-oauth20";
// import { User } from "../models/user.model.js";

// export const configurePassport = () => {
//   passport.use(
//     new GoogleStrategy(
//       {
//         clientID: process.env.GOOGLE_CLIENT_ID,
//         clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//         callbackURL: "/api/v1/users/google/callback",
//         scope: ["profile", "email"],
//       },
//       async (accessToken, refreshToken, profile, done) => {
//         try {
//           const email = profile.emails[0].value;
//           let user = await User.findOne({ email });

//           if (user) {
//             // If user exists but doesn't have a googleId, add it
//             if (!user.googleId) {
//               user.googleId = profile.id;
//               await user.save({ validateBeforeSave: false });
//             }
//             return done(null, user);
//           } else {
//             // If user doesn't exist, create a new one
//             const newUser = await User.create({
//               googleId: profile.id,
//               fullName: profile.displayName,
//               email: email,
//               avatar: profile.photos[0].value,
//               // ✅ Generate a unique username from the email
//               username:
//                 email.split("@")[0].toLowerCase() +
//                 Math.floor(Math.random() * 1000),
//               // Password is not required because we added the conditional `required` in the model
//             });
//             return done(null, newUser);
//           }
//         } catch (error) {
//           return done(error, false);
//         }
//       }
//     )
//   );
// };
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { User } from "../models/user.model.js";

export const configurePassport = () => {
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/api/v1/users/google/callback",
        scope:["profile","email"]
    },
        async (accessToken, refreshToken, profile, done) => {
            try {
                let user = await User.findOne({
                    $or: [{ googleId: profile.id }, { email: profile.emails[0].value }]
                });

                if (user) {
                    if (!user.googleId) {
                        user.googleId = profile.id;
                        await user.save({ validateBeforeSave: false });
                    }
                    return done(null, user);
                } else {
                    const newUser = await User.create({
                        googleId: profile.id,
                        fullName: profile.displayName,
                        email: profile.emails[0].value,
                        avatar: profile.photos[0].value,
                        username: profile.emails[0].value.split('@')[0] + Math.floor(Math.random() * 1000),
                    });
                    return done(null, newUser);
                }
            } catch (error) {
                return done(error, false);
            }
        }
    ))
}
