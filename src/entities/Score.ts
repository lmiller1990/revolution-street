import { Entity, ManyToOne, PrimaryKey, Property } from "@mikro-orm/core";
import { Grade } from "../controllers/submitScores";
import { Song } from "./Song";
import { User } from "./User";

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
  grade!: Grade;

  @Property({ name: "user_id" })
  userId!: number;

  @ManyToOne(() => Song, { nullable: false })
  song!: Song;
  
  @ManyToOne(() => User, { nullable: false })
  user!: User;
}
