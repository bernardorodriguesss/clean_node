import { afterEach, beforeEach, describe, it } from 'vitest';
import { app } from '@/src/app';
import request from 'supertest';
// utilities
import { hashPassword } from '@/src/_lib/functions/secure';
import { makeUser } from '../../user/utils/make-user';
import { db } from '@/src/_infra/db';

describe('auth integration tests', () => {
	let userId: string;

	beforeEach(async () => {
		const user = makeUser({
			email: 'default@email.com',
			password_hash: await hashPassword('default'),
		});
		userId = user.id;
		await db
			.deleteFrom('users')
			.execute()
			.then(() => {
				db.insertInto('users').values(user).execute();
			});
	});

	afterEach(async () => {
		await db.deleteFrom('users').execute();
	});

	describe('POST /auth', () => {
		it('should be able to sign in', async () => {
			const data = {
				email: 'default@email.com',
				password: 'default',
			};

			await request(app.server).post('/auth/sign-in').send(data).expect(200);
		});
	});
});
