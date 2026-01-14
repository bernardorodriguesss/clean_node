import { Controller } from '@/src/_lib/protocols/controller';
import { IHttpContext } from '@/src/_infra/http/adapters/context';
import { GetUserUseCase } from '../../business/usecases/get-user.case';
import { ok, serverError, unauthorized } from '@/src/_infra/http/responses';

export class GetUserProfileController implements Controller {
	constructor(private getUserUseCase: GetUserUseCase) {}

	async handle(ctx: IHttpContext): Promise<void> {
		const user = ctx.request().user;

		if (!user) {
			return unauthorized(ctx, 'User not authenticated');
		}

		try {
			const result = await this.getUserUseCase.execute({ id: user.id });

			if (result.isFailure()) {
				return unauthorized(ctx, result.error);
			}

			return ok(ctx, result.value);
		} catch (err) {
			return serverError(ctx, err);
		}
	}
}
