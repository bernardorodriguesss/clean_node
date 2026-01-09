import { afterAll, beforeAll } from 'vitest';
import { Transaction, sql } from 'kysely';
import { db } from '@/src/_infra/db';
import { app } from '@/src/server';

beforeAll(async () => {
	await app.ready();
});

afterAll(async () => {
	await app.close();
	await sql`
	    DO
	    $$
	    DECLARE
	        sql TEXT;
	    BEGIN
	        SELECT 'TRUNCATE TABLE ' || string_agg(quote_ident(tablename), ', ') || ' RESTART IDENTITY CASCADE;'
	        INTO sql
	        FROM pg_tables
	        WHERE schemaname = 'public' AND tablename NOT IN ('migrations_table', 'migrations_lock');

	        EXECUTE sql;
	    END;
	    $$;
	`.execute(db);
});
