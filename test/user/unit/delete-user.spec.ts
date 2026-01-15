import { describe, it, expect, beforeEach } from 'vitest';
import { FakeUserRepository } from '@/test/_doubles/repos/user-fake.repo';
import { DeleteUserUseCase } from '@/src/user/business/usecases';

import { makeUser } from '../utils/make-user';
import { UserRole } from '@/src/user/domain/user';
import { Forbidden, NotFound } from '@/src/_lib/errors';

describe('delete user use case', () => {
	let repository: FakeUserRepository;
	let sut: DeleteUserUseCase;

	beforeEach(async () => {
		repository = new FakeUserRepository();
		sut = new DeleteUserUseCase(repository);
		await repository.create(
			makeUser({ id: '1', email: 'fake_email@email.com', role: UserRole.USER }),
		);
	});

	describe('when actor is USER', () => {
		it('should be able to delete own account', async () => {
			const data = {
				userId: { id: '1' },
				actor: { id: '1', role: UserRole.USER },
			};

			const result = await sut.execute(data);
			expect(result.isSuccess()).toBe(true);
		});

		it('should forbids deleting another user account', async () => {
			const data = {
				userId: { id: '1' },
				actor: { id: '2', role: UserRole.USER },
			};

			const result = await sut.execute(data);

			expect(result.isFailure()).toBe(true);
			if (result.isFailure()) {
				expect(result.error.status).toBe(403);
				expect(result.error).toBeInstanceOf(Forbidden);
			}
		});
	});

	describe('when actor is ADMIN', () => {
		it('should be able to delete any user', async () => {
			const data = {
				userId: { id: '1' },
				actor: { id: 'admin_id', role: UserRole.ADMIN },
			};

			const result = await sut.execute(data);
			expect(result.isSuccess()).toBe(true);
		});

		it('should fail with 404 (not found) if user does not exist', async () => {
			const data = {
				userId: { id: 'non_existing_user' },
				actor: { id: 'admin_id', role: UserRole.ADMIN },
			};

			const result = await sut.execute(data);

			expect(result.isFailure()).toBe(true);
			if (result.isFailure()) {
				expect(result.error.status).toBe(404);
				expect(result.error).toBeInstanceOf(NotFound);
			}
		});
	});
});
