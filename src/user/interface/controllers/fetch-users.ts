import { Controller } from '@/src/_lib/protocols/controller';
import { validateData } from '@/src/_infra/http/validator';
import { IHttpContext } from '@/src/_infra/http/adapters/context';

import { paginationSchema } from '@/src/_lib/schemas';
import { FetchUsersUseCase } from '../../business/usecases';
import { validationError, ok, serverError } from '@/src/_infra/http/responses';

const { query } = validateData({
	query: paginationSchema,
});

export class FetchUsersController implements Controller {
	constructor(private fetchUsersUseCase: FetchUsersUseCase) {}

	async handle(ctx: IHttpContext): Promise<void> {
		const validation = query(ctx.request());

		if (validation.isFailure()) {
			return validationError(ctx, validation.error);
		}

		try {
			const result = await this.fetchUsersUseCase.execute(validation.value);

			if (result.isFailure()) {
				return serverError(ctx);
			}

			return ok(ctx, result.value);
		} catch (err) {
			return serverError(ctx, err);
		}
	}
}
