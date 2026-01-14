import { Controller } from '@/src/_lib/protocols/controller';
import { validateData } from '@/src/_infra/http/validator';
import { IHttpContext } from '@/src/_infra/http/adapters/context';

import { signInSchema } from '../../business/dto/sign-in.dto';
import { SignInUseCase } from '../../business/usecases/sign-in.case';
import {
	ok,
	validationError,
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
			return validationError(ctx, validation.error);
		}

		try {
			const result = await this.signInUseCase.execute(validation.value);

			if (result.isFailure()) {
				return unauthorized(ctx, result.error);
			}

			return ok(ctx, result.value);
		} catch (err) {
			return serverError(ctx, err);
		}
	}
}
