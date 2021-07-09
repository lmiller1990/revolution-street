import { Entity, PrimaryKey, Property } from "@mikro-orm/core";

@Entity({
  tableName: "scores",
})
export class Score {
  @PrimaryKey()
  id!: number;

  @Property()
  marvelous!: number;

  @Property()
  perfect!: number;

  @Property()
  great!: number;

  @Property()
  good!: number;

  @Property()
  miss!: number;

  @Property()
  boo!: number;

  @Property({ name: "song_id" })
  songId!: number;

  @Property()
  grade!: string;

  @Property({ name: "user_id" })
  userId!: number;
}
