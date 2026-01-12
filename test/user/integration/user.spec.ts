import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { app } from '@/src/app';
import request from 'supertest';
// utilities
import { generateToken } from '@/src/_lib/functions/secure';
import { makeUser } from '../utils/make-user';
import { db } from '@/src/_infra/db';

describe('user controller', () => {
	let userId: string;

	beforeEach(async () => {
		const user = makeUser();
		userId = user.id;
		await db.deleteFrom('users').execute();
		await db.insertInto('users').values(user).execute();
	});

	afterEach(async () => {
		await db.deleteFrom('users').execute();
	});

	describe('POST /users', () => {
		it('should create a new user and return 201 when valid data is provided', async () => {
			const data = {
				name: 'newuser',
				email: 'newuser@email.com',
				password: 'newuser',
			};

			await request(app.server).post('/users/register').send(data).expect(201);
			const result = await db
				.selectFrom('users')
				.where('email', '=', data.email)
				.executeTakeFirst();

			expect(result).not.toBe(null);
		});
	});

	describe('GET /users', () => {
		describe('GET /me', () => {
			it('should return the authenticated user when a valid token is provided', async () => {
				const token = await generateToken({ id: userId, role: 'user' });

				await request(app.server)
					.get('/users/me')
					.set('Authorization', `Bearer ${token}`)
					.expect(200);
			});

			it('should return 401 when no authentication token is provided', async () => {
				await request(app.server).get('/users/me').expect(401);
			});
		});

		describe('GET / (list of users)', () => {
			it('should allow an admin to fetch the list of users', async () => {
				const token = await generateToken({ id: userId, role: 'admin' });
				await request(app.server)
					.get('/users')
					.set('Authorization', `Bearer ${token}`)
					.expect(200);
			});

			it('should forbid non-admin users from fetching the list of users', async () => {
				const token = await generateToken({ id: userId, role: 'user' });
				await request(app.server)
					.get('/users')
					.set('Authorization', `Bearer ${token}`)
					.expect(403);
			});
		});
	});
});
