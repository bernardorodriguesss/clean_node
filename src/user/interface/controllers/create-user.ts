import { Controller } from '@/src/_lib/protocols/controller';
import { validateData } from '@/src/_infra/http/validator';
import { IHttpContext } from '@/src/_infra/http/adapters/context';

import { createUserSchema } from '../../business/dto/user.dto';
import { CreateUserUseCase } from '../../business/usecases/create-user.case';
import {
	badRequest,
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
			return badRequest(ctx, validation.error);
		}

		const result = await this.createUserUseCase.execute(validation.value);

		if (result.isFailure()) {
			switch (result.error.status) {
				case 409:
					return conflict(ctx, result.error);
				default:
					return serverError(ctx);
			}
		}

		return created(ctx, result.value);
	}
}
