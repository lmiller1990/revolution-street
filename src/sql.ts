import { MikroORM } from "@mikro-orm/core";
import { PostgreSqlDriver } from "@mikro-orm/postgresql";
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
  }) as MikroORM<PostgreSqlDriver>;



  orm.close()
})();
