import { sql, type Kysely } from 'kysely';

export async function up(db: Kysely<any>): Promise<void> {
	await sql`
		CREATE TYPE user_role AS ENUM ('admin', 'user');
	`.execute(db);

	await sql`
		CREATE TABLE users (
			id UUID PRIMARY KEY,
			name VARCHAR NOT NULL,
			email VARCHAR NOT NULL UNIQUE,
			password_hash VARCHAR NOT NULL,
			role user_role NOT NULL,
			created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
		);
	`.execute(db);
}

export async function down(db: Kysely<any>): Promise<void> {
	await sql`DROP TABLE IF EXISTS users`.execute(db);
	await sql`DROP TYPE IF EXISTS user_role`.execute(db);
}
