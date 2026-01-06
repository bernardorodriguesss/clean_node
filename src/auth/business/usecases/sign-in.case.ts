import { Either, failure, success } from '@/src/_lib/either';
import { UseCase } from '@/src/_lib/protocols/case';
import { Unauthorized } from '@/src/_lib/errors';

import { IUserRepository } from '@/src/user/database/user-interface.repo';
import { SignInDTO, SignInResponseDTO } from '../dto/sign-in.dto';
import {
	HASH_DUMMY,
	generateToken,
	comparePassword,
} from '@/src/_lib/functions/secure';

type Response = Either<Unauthorized, SignInResponseDTO>;

export class SignInUseCase implements UseCase<SignInDTO, Response> {
	constructor(private repository: IUserRepository) {}

	async execute(input: SignInDTO): Promise<Response> {
		const user = await this.repository.findUserByEmail(input.email);

		const validPassword = await comparePassword(
			user?.password_hash ?? HASH_DUMMY,
			input.password,
		);

		if (!user || !validPassword) {
			return failure(new Unauthorized('Invalid credentials'));
		}

		return success({
			accessToken: await generateToken({ id: user.id, role: user.role }),
		});
	}
}
