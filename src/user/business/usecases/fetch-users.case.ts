import { Either, success } from '@/src/_lib/either';
import { UseCase } from '@/src/_lib/protocols/case';

import { Pagination } from '@/src/_lib/schemas';
import { IUserRepository } from '../../repos/user-interface.repo';
import { FetchUsersResponseDTO } from '../dto/user.dto';

type Response = Either<never, FetchUsersResponseDTO>;

export class FetchUsersUseCase implements UseCase<Pagination, Response> {
	constructor(private repository: IUserRepository) {}

	async execute({ page = 1, limit = 10 }: Pagination = {}): Promise<Response> {
		const offset = (page - 1) * limit;
		const { data, total } = await this.repository.findMany(offset, limit);

		return success({
			users: data.map(({ id, name, email }) => ({ id, name, email })),
			page: page,
			limit: limit,
			total: total,
			totalPages: Math.ceil(total / limit),
		});
	}
}
