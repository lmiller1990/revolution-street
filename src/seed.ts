import { MikroORM } from "@mikro-orm/core";
import faker from "faker";
import { Song } from "./entities/Song";
import { User } from "./entities/User";

const n = 100

;(async () => {
  const orm = await MikroORM.init({
    entities: [Song, User],
    dbName: "revolution_street",
    type: "postgresql",
    // clientUrl: '...',
  });

  await orm.em.nativeDelete(User, {})

  let users: any[] = [];
  for (let i = 0; i < n; i++) {
    console.log(`i: ${i}`);
    const username = faker.internet.userName();
    users.push(
      orm.em.create(User, {
        email: faker.internet.email(),
        username: username,
        twitter: `@${username}`,
        region: faker.address.country(),
      })
    );
  }

  try {
    console.log('Persisting...')
    orm.em.persist(users).flush();
    console.log(`Persisted ${n} users.`)
  } catch (e) {
    console.log(e.message);
  }
})();
