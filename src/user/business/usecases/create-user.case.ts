import { Either, failure, success } from '@/src/_lib/either';
import { UseCase } from '@/src/_lib/protocols/case';
import { Conflict } from '@/src/_lib/errors';

import { UserRole } from '../../domain/user';
import { IUserRepository } from '../../repos/user-interface.repo';
import { generateId, hashPassword } from '@/src/_lib/functions/secure';
import { CreateUserDTO, UserResponseDTO } from '../dto/user.dto';

type Response = Either<Conflict, UserResponseDTO>;

export class CreateUserUseCase implements UseCase<CreateUserDTO, Response> {
	constructor(private repository: IUserRepository) {}

	async execute(input: CreateUserDTO): Promise<Response> {
		const userExists = await this.repository.findUserByEmail(input.email);

		if (userExists) {
			return failure(new Conflict('The email address is already in use'));
		}

		const userId = generateId();
		const hashedPassword = await hashPassword(input.password);

		const user = await this.repository.create({
			id: userId,
			name: input.name,
			email: input.email,
			role: UserRole.USER,
			password_hash: hashedPassword,
		});

		return success({
			id: user.id,
			name: user.name,
			email: user.email,
		});
	}
}
