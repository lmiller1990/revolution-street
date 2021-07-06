import { Entity, PrimaryKey, Property } from "@mikro-orm/core";

@Entity({
  tableName: 'users'
})
export class User {

  @PrimaryKey()
  id!: number

  @Property()
  username!: string

  @Property()
  email!: string
}