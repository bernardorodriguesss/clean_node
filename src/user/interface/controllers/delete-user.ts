import { Controller } from '@/src/_lib/protocols/controller';
import { validateData } from '@/src/_infra/http/validator';
import { IHttpContext } from '@/src/_infra/http/adapters/context';

import { modelIdSchema } from '@/src/_lib/schemas';
import { DeleteUserUseCase } from '../../business/usecases';
import {
	forbidden,
	noContent,
	notFound,
	serverError,
	validationError,
} from '@/src/_infra/http/responses';

const { params } = validateData({
	params: modelIdSchema,
});

export class DeleteUserController implements Controller {
	constructor(private deleteUserUseCase: DeleteUserUseCase) {}

	async handle(ctx: IHttpContext): Promise<void> {
		const user = ctx.request().user;
		const validation = params(ctx.request());

		if (validation.isFailure()) {
			return validationError(ctx, validation.error);
		}

		try {
			const result = await this.deleteUserUseCase.execute({
				userId: validation.value,
				actor: user,
			});

			if (result.isFailure()) {
				switch (result.error.status) {
					case 403:
						return forbidden(ctx, result.error);
					case 404:
						return notFound(ctx, result.error);
				}
			}

			return noContent(ctx);
		} catch (err) {
			return serverError(ctx, err);
		}
	}
}
