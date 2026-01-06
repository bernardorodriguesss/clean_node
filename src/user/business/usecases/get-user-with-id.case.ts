import { Either, failure, success } from '@/src/_lib/either';
import { UseCase } from '@/src/_lib/protocols/case';
import { ModelId } from '@/src/_lib/schemas';
import { NotFound } from '@/src/_lib/errors';

import { UserResponseDTO } from '../dto/user.dto';
import { IUserRepository } from '../../database/user-interface.repo';

type Response = Either<NotFound, UserResponseDTO>;

export class GetUserUseCase implements UseCase<ModelId, Response> {
	constructor(private repository: IUserRepository) {}

	async execute(input: ModelId): Promise<Response> {
		const user = await this.repository.findOne(input.id);

		if (!user) {
			return failure(new NotFound('User not found'));
		}

		return success({
			id: user.id,
			name: user.name,
			email: user.email,
		});
	}
}
