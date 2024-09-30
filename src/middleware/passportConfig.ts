import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import User from '../models/users.model';
import { logger } from './logger';

// Local strategy for authentication using username and password
passport.use(new LocalStrategy(
  async (username: string, password: string, done: (error: any, user?: any, options?: { message: string }) => void) => {
    try {
      const user = await User.findOne({ username });
      if (!user) return done(null, false, { message: 'Incorrect username.' });
      const isMatch = await user.comparePassword(password);
      if (!isMatch) return done(null, false, { message: 'Incorrect password.' });
      return done(null, user);
    } catch (error) {
      logger.error(error);
      return done(error);
    }
  }
));

// Serialize user information into the session
passport.serializeUser((user: any, done: (error: any, id?: any) => void) => {
  done(null, user.id);
});

// Deserialize user information from the session
passport.deserializeUser(async (id: string, done: (error: any, user?: any) => void) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    logger.error(error);
    done(error);
  }
});

export default passport;