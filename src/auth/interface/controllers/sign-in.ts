import { Controller } from '@/src/_lib/protocols/controller';
import { validateData } from '@/src/_infra/http/validator';
import { IHttpContext } from '@/src/_infra/http/adapters/context';

import { signInSchema } from '../../business/dto/sign-in.dto';
import { SignInUseCase } from '../../business/usecases/sign-in.case';
import {
	ok,
	badRequest,
	serverError,
	unauthorized,
} from '@/src/_infra/http/responses';

const { body } = validateData({
	body: signInSchema,
});

export class SignInController implements Controller {
	constructor(private signInUseCase: SignInUseCase) {}

	async handle(ctx: IHttpContext): Promise<void> {
		const validation = body(ctx.request());

		if (validation.isFailure()) {
			return badRequest(ctx, validation.error);
		}

		const result = await this.signInUseCase.execute(validation.value);

		if (result.isFailure()) {
			switch (result.error.status) {
				case 401: {
					return unauthorized(ctx, result.error);
				}
				default: {
					return serverError(ctx);
				}
			}
		}

		return ok(ctx, result.value);
	}
}
