import { drizzle } from "drizzle-orm/mysql2";
import { createPool } from "mysql2/promise";


if (!process.env.DATABASE_URL) {
    throw new Error('Missing DATABASE_URL');
}

// Singleton function to ensure only one db instance is created
function singleton<T>(name: string, value: () => T): T {
    const globalAny: any = global;
    globalAny.__singletons = globalAny.__singletons || {};

    if (!globalAny.__singletons[name]) {
      globalAny.__singletons[name] = value();
    }

    return globalAny.__singletons[name];
}

// Function to create the database connection and apply migrations if needed
function createDatabaseConnection() {
    const poolConnection = createPool(process.env.DATABASE_URL!);
    return drizzle(poolConnection);
}

export const db = singleton('db', createDatabaseConnection);