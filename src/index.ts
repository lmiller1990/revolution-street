import { MikroORM } from "@mikro-orm/core";
import { app } from "./app";
import { Song } from "./entities/Song";
import { User } from "./entities/User";

export let orm: MikroORM

(async () => {
  orm = await MikroORM.init({
    entities: [Song, User],
    dbName: "revolution_street",
    type: "postgresql",
    // clientUrl: '...',
  });

  app.listen('8000', () => console.log('Started on port 8000'))
})();