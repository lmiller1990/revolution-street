import { MikroORM } from "@mikro-orm/core";
import faker from "faker";
import { Score } from "./entities/Score";
import { Song } from "./entities/Song";
import { User } from "./entities/User";

const n = 100

;(async () => {
  const orm = await MikroORM.init({
    entities: [Song, User, Score],
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
        password: 'xxxx',
      })
    );
  }

  try {
    console.log('Persisting...')
    await orm.em.persist(users).flush();
    console.log(`Persisted ${n} users.`)
  } catch (e) {
    console.log(e.message);
  }

  const firstUser = await orm.em.find(User, {})
  const score = orm.em.create(Score, {
    marvelous: 100,
    perfect: 10,
    great: 5,
    miss: 0,
    boo: 0,
    grade: 'AAA',
    good: 0,
    songId: 1,
    userId: firstUser[0]!.id,
  })

  await orm.em.persist(score).flush()

  orm.close()
})();
