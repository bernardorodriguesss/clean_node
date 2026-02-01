import { describe, it, expect, beforeEach } from 'vitest';
import { FakeUserRepository } from '@/test/_doubles/repos/user-fake.repo';
import { CreateUserUseCase } from '@/src/user/business/usecases/create-user.case';
import { Conflict } from '@/src/_lib/errors';
import { makeUser } from '../utils/make-user';
import { UserRole } from '@/src/user/domain/user';

describe('CreateUserUseCase', () => {
	let repository: FakeUserRepository;
	let sut: CreateUserUseCase;

	beforeEach(async () => {
		repository = new FakeUserRepository();
		sut = new CreateUserUseCase(repository);
		await repository.create(makeUser({ email: 'fake_email@email.com' }));
	});

	it.each([
		{ role: UserRole.USER },
		{ role: UserRole.ADMIN },
	])('should be able to create a user with role $role', async ({ role }) => {
		const data = {
			name: 'John Doe',
			email: 'johndoe@email.com',
			password: '1',
			role,
		};

		const result = await sut.execute(data);

		expect(result.isSuccess()).toBe(true);
		if (result.isSuccess()) {
			expect(result.value.id).toBeDefined();
			expect(result.value.role).toBe(role);
		}
	});

	it('should fail with 409 if email address is already taken', async () => {
		const user = {
			name: 'John Doe',
			role: UserRole.USER,
			email: 'fake_email@email.com',
			password: '1',
		};

		const result = await sut.execute(user);

		expect(result.isFailure()).toBe(true);
		if (result.isFailure()) {
			expect(result.error.status).toBe(409);
			expect(result.error).toBeInstanceOf(Conflict);
		}
	});
});
