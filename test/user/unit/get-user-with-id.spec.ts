import { describe, it, expect, beforeEach } from 'vitest';
import { FakeUserRepository } from '@/test/_doubles/repos/user-fake.repo';
import { GetUserUseCase } from '@/src/user/business/usecases/get-user-with-id.case';
import { NotFound } from '@/src/_lib/errors';
import { makeUser } from '../utils/make-user';

describe('CreateUserUseCase', () => {
	let repository: FakeUserRepository;
	let sut: GetUserUseCase;

	beforeEach(async () => {
		repository = new FakeUserRepository();
		sut = new GetUserUseCase(repository);
		await repository.create(
			makeUser({ id: 'fake_id', email: 'fake_email@email.com' }),
		);
	});

	it('should be able to get an user by id', async () => {
		const id = 'fake_id';
		const result = await sut.execute({ id });

		expect(result.isSuccess()).toBe(true);
		if (result.isSuccess()) {
			expect(result.value).toMatchObject({
				id: result.value.id,
				name: result.value.name,
				email: result.value.email,
			});
		}
	});

	it('should fail with 404 if ID does not match any user', async () => {
		const id = 'non_existing_user';
		const result = await sut.execute({ id });

		expect(result.isFailure()).toBe(true);
		if (result.isFailure()) {
			expect(result.error.status).toBe(404);
			expect(result.error).toBeInstanceOf(NotFound);
		}
	});
});
