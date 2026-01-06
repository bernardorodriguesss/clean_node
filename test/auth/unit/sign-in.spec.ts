import { describe, it, expect, beforeEach } from 'vitest';
import { FakeUserRepository } from '@/test/_doubles/repos/user-fake.repo';
import { SignInUseCase } from '@/src/auth/business/usecases/sign-in.case';

import { Unauthorized } from '@/src/_lib/errors';
import { hashPassword } from '@/src/_lib/functions/secure';
import { makeUser } from '@/test/user/utils/make-user';

describe('SignInUseCase', () => {
	let repository: FakeUserRepository;
	let sut: SignInUseCase;

	beforeEach(async () => {
		repository = new FakeUserRepository();
		sut = new SignInUseCase(repository);

		await repository.createUser(
			makeUser({
				email: 'fake_email@email.com',
				password_hash: await hashPassword('1'),
			}),
		);
	});

	it('should be able to sign i with valid credentials', async () => {
		const data = {
			email: 'fake_email@email.com',
			password: '1',
		};

		const result = await sut.execute(data);

		expect(result.isSuccess()).toBe(true);
		if (result.isSuccess()) {
			expect(result.value.accessToken).toBeDefined();
		}
	});

	it('should fail with 401 if email is invalid', async () => {
		const data = {
			email: 'invalid_email@email.com',
			password: '1',
		};

		const result = await sut.execute(data);

		expect(result.isFailure()).toBe(true);
		if (result.isFailure()) {
			expect(result.error.status).toBe(401);
			expect(result.error).toBeInstanceOf(Unauthorized);
		}
	});

	it('should fail with 401 if password is invalid', async () => {
		const data = {
			email: 'fake_email@email.com',
			password: 'invalid_password',
		};

		const result = await sut.execute(data);

		expect(result.isFailure()).toBe(true);
		if (result.isFailure()) {
			expect(result.error.status).toBe(401);
			expect(result.error).toBeInstanceOf(Unauthorized);
		}
	});
});
