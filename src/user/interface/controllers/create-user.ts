import { Controller } from '@/src/_lib/protocols/controller';
import { validateData } from '@/src/_infra/http/validator';
import { IHttpContext } from '@/src/_infra/http/adapters/context';

import { createUserSchema } from '../../business/dto/user.dto';
import { CreateUserUseCase } from '../../business/usecases/create-user.case';
import {
	validationError,
	conflict,
	created,
	serverError,
} from '@/src/_infra/http/responses';

const { body } = validateData({
	body: createUserSchema,
});

export class CreateUserController implements Controller {
	constructor(private createUserUseCase: CreateUserUseCase) {}

	async handle(ctx: IHttpContext): Promise<void> {
		const validation = body(ctx.request());

		if (validation.isFailure()) {
			return validationError(ctx, validation.error);
		}

		try {
			const result = await this.createUserUseCase.execute(validation.value);

			if (result.isFailure()) {
				return conflict(ctx, result.error);
			}

			return created(ctx, result.value);
		} catch (err) {
			return serverError(ctx);
		}
	}
}
