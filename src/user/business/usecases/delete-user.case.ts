import { UseCase } from '@/src/_lib/protocols/case';
import { ModelId } from '@/src/_lib/schemas';
import { UserRole } from '../../domain/user';

import { Either, failure, success } from '@/src/_lib/either';
import { Forbidden, NotFound } from '@/src/_lib/errors';
import { IUserRepository } from '../../repos/user-interface.repo';

interface DeleteUserProps {
	userId: ModelId;
	actor: { id: string; role: string };
}

type Response = Either<Forbidden | NotFound, boolean>;

export class DeleteUserUseCase implements UseCase<DeleteUserProps, Response> {
	constructor(private repository: IUserRepository) {}

	async execute(input: DeleteUserProps): Promise<Response> {
		const userToDelete = await this.repository.findOne(input.userId.id);
		if (!userToDelete) {
			return failure(new NotFound('User not found.'));
		}

		if (
			input.actor.role !== UserRole.ADMIN &&
			input.actor.id !== userToDelete.id
		) {
			return failure(new Forbidden('Access denied'));
		}

		const userDeleted = await this.repository.delete(userToDelete.id);
		return success(userDeleted);
	}
}
