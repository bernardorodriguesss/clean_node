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
		const data = {
			name: 'created_user',
			email: 'createduser@email.com',
			password: 'created_user',
			role: 'user',
		};

		it('should return 201 when admin creates a user', async () => {
			const token = await generateToken({ id: userId, role: 'admin' });

			await request(app.server)
				.post('/api/v1/users')
				.set('Authorization', `Bearer ${token}`)
				.send(data)
				.expect(201);
		});

		it('should return 401 when no authentication token is provided', async () => {
			await request(app.server).post('/api/v1/users').send(data).expect(401);
		});

		it('should return 403 when a non-admin tries to create a user', async () => {
			const token = await generateToken({ id: userId, role: 'user' });

			await request(app.server)
				.post('/api/v1/users')
				.set('Authorization', `Bearer ${token}`)
				.send(data)
				.expect(403);
		});
	});

	describe('GET /users', () => {
		describe('GET /me', () => {
			it('should return the authenticated user when a valid token is provided', async () => {
				const token = await generateToken({ id: userId, role: 'user' });

				await request(app.server)
					.get('/api/v1/users/me')
					.set('Authorization', `Bearer ${token}`)
					.expect(200);
			});

			it('should return 401 when no authentication token is provided', async () => {
				await request(app.server).get('/api/v1/users/me').expect(401);
			});
		});

		describe('GET / (list of users)', () => {
			it('should allow an admin to fetch the list of users', async () => {
				const token = await generateToken({ id: userId, role: 'admin' });
				await request(app.server)
					.get('/api/v1/users')
					.set('Authorization', `Bearer ${token}`)
					.expect(200);
			});

			it('should forbid non-admin users from fetching the list of users', async () => {
				const token = await generateToken({ id: userId, role: 'user' });
				await request(app.server)
					.get('/api/v1/users')
					.set('Authorization', `Bearer ${token}`)
					.expect(403);
			});
		});
	});

	describe('DELETE /users', () => {
		it('should delete a user and return 204', async () => {
			const token = await generateToken({ id: '1', role: 'admin' });

			const response = await request(app.server)
				.delete(`/api/v1/users/${userId}`)
				.set('Authorization', `Bearer ${token}`)
				.expect(204);

			expect(response.body).toEqual({});

			const result = await db
				.selectFrom('users')
				.selectAll()
				.where('id', '=', userId)
				.executeTakeFirst();

			expect(result).toBe(undefined);
		});
	});
});
