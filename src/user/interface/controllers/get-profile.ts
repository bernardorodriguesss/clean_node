import { Controller } from '@/src/_lib/protocols/controller';
import { IHttpContext } from '@/src/_infra/http/adapters/context';
import { GetUserUseCase } from '../../business/usecases/get-user.case';
import { ok, unauthorized } from '@/src/_infra/http/responses';

export class GetUserProfileController implements Controller {
	constructor(private getUserUseCase: GetUserUseCase) {}

	async handle(ctx: IHttpContext): Promise<void> {
		const user = ctx.request().user;

		if (!user) {
			ctx.send(401, { message: 'User not authenticated' });
		}

		const result = await this.getUserUseCase.execute({ id: user.id });

		if (result.isFailure()) {
			return unauthorized(ctx, result.error);
		}

		return ok(ctx, result.value);
	}
}
