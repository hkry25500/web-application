import { char, int, longtext, mysqlTable, varchar } from "drizzle-orm/mysql-core";


export const usersTable = mysqlTable('users', {
    uid: int().autoincrement().primaryKey(),
    email: varchar({ length: 255 }).notNull().unique(),
    name: varchar({ length: 255 }).notNull(),
    password: char({ length: 255 }).notNull(),
    avatar: longtext()
})