import bcrypt from "bcrypt";
import { orm } from ".";
import { User } from "./entities/User";

export async function localStrategy(
  email: string,
  password: string,
  done: (error: string | null, user?: User | boolean) => void
) {
  const user = await orm.em.findOne(User, { email });

  if (!user) {
    const err = `User with username ${email} not found.`
    console.error(err);
    return done(err);
  }

  const auth = await bcrypt.compare(password, user.password);

  if (!auth) {
    console.error(`Invalid credentials.`)
    return done(null, false);
  }

  return done(null, user);
}
