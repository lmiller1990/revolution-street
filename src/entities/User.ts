import { Entity, PrimaryKey, Property } from "@mikro-orm/core";

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

  @Property({ name: "last_active" })
  lastActive!: Date;

  @Property()
  twitter!: string;

  // hashed password with bcrypt
  @Property()
  password!: string;
}
