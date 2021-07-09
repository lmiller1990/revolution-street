import { Collection, Entity, OneToMany, PrimaryKey, Property } from "@mikro-orm/core";
import { Score } from "./Score";

@Entity({
  tableName: "users",
})
export class User {
  @PrimaryKey()
  id!: number;

  @Property()
  username!: string;

  @Property()
  email!: string;

  @Property()
  region!: string;

  @Property({ name: "last_active", defaultRaw: 'now' })
  lastActive: Date = new Date();

  @Property()
  twitter!: string;

  // hashed password with bcrypt
  @Property()
  password!: string;

  @OneToMany(() => Score, (score) => score.user)
  scores = new Collection<Score>(this);
}
