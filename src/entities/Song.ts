import { Entity, PrimaryKey, Property } from "@mikro-orm/core";

@Entity({
  tableName: 'songs'
})
export class Song {

  @PrimaryKey()
  id!: number

  @Property()
  name!: string
}