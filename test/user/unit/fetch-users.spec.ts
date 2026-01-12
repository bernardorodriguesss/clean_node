import { describe, it, expect, beforeEach } from 'vitest';
import { FakeUserRepository } from '@/test/_doubles/repos/user-fake.repo';
import { FetchUsersUseCase } from '@/src/user/business/usecases';
import { makeUser } from '../utils/make-user';

describe('FetchUsersUseCase', () => {
	let repository: FakeUserRepository;
	let sut: FetchUsersUseCase;

	beforeEach(async () => {
		repository = new FakeUserRepository();
		sut = new FetchUsersUseCase(repository);

		await repository.create(makeUser({ email: 'fake_email@email.com' }));
		await repository.create(makeUser({ email: 'fake_email2@email.com' }));
	});

	it('should be able to fetch all users when no pagination is provided', async () => {
		const result = await sut.execute();
		expect(result.isSuccess()).toBe(true);
		if (result.isSuccess()) {
			expect(result.value.users.length).toBe(2);
		}
	});

	it('should be able to fetch users according to pagination params', async () => {
		const result = await sut.execute({ page: 1, limit: 1 });
		expect(result.isSuccess()).toBe(true);
		if (result.isSuccess()) {
			expect(result.value.users.length).toBe(1);
		}
	});

	it('should return remaining users on last page', async () => {
		const result = await sut.execute({ page: 2, limit: 1 });
		expect(result.isSuccess()).toBe(true);
		if (result.isSuccess()) {
			expect(result.value.users).toHaveLength(1);
			expect(result.value.users[0].email).toBe('fake_email2@email.com');
		}
	});

	it('should return empty array when page exceeds total pages', async () => {
		const result = await sut.execute({ page: 10, limit: 5 });
		expect(result.isSuccess()).toBe(true);
		if (result.isSuccess()) {
			expect(result.value.users).toHaveLength(0);
		}
	});
});
