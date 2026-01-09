import { beforeAll, describe, it } from 'vitest';
import { app } from '@/src/server';
import request from 'supertest';
// utilities
import { generateToken } from '@/src/_lib/functions/secure';

describe('user controller tests', () => {
	const userId = '123e4567-e89b-12d3-a456-426614174000';

	it('POST/ users/register', async () => {
		const data = {
			name: 'John Doe',
			email: 'johndoe@email.com',
			password: '123456',
		};

		await request(app.server).post('/users/register').send(data).expect(201);
	});

	it('GET /me', async () => {
		const token = await generateToken({ id: userId, role: 'user' });

		await request(app.server)
			.get('/users/me')
			.set('Authorization', `Bearer ${token}`)
			.expect(200);
	});
});
