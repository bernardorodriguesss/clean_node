import { afterEach, beforeEach, describe, it } from 'vitest';
import { app } from '@/src/app';
import request from 'supertest';
// utilities
import { generateToken } from '@/src/_lib/functions/secure';
import { makeUser } from '../utils/make-user';
import { db } from '@/src/_infra/db';

describe('user controller tests', () => {
	let userId: string;

	beforeEach(async () => {
		const user = makeUser();
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

	describe('POST /users', () => {
		it('should return new user with code 201', async () => {
			const data = {
				name: 'newuser',
				email: 'newuser@email.com',
				password: 'newuser',
			};

			await request(app.server).post('/users/register').send(data).expect(201);
		});

		it('should return 400 if wrong data', async () => {});
	});

	describe('GET /users', () => {
		it('should be able to get authenticated user', async () => {
			const token = await generateToken({ id: userId, role: 'user' });

			await request(app.server)
				.get('/users/me')
				.set('Authorization', `Bearer ${token}`)
				.expect(200);
		});
	});
});
