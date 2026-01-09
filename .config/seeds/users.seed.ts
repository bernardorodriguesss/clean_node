import type { Kysely } from 'kysely';
import { hashPassword } from '../../src/_lib/functions/secure';

export async function seed(db: Kysely<any>): Promise<void> {
	const password = await hashPassword('fake_password');

	await db
		.insertInto('users')
		.values({
			id: '123e4567-e89b-12d3-a456-426614174000',
			name: 'fake_name',
			email: 'fake_email@email.com',
			role: 'user',
			password_hash: password,
		})
		.execute();
}
