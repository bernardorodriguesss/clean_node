import { Controller } from '@/src/_lib/protocols/controller';
import { IHttpContext } from '@/src/_infra/http/context';
import { GetUserUseCase } from '../../business/usecases/get-user-with-id.case';
import { ok, unauthorized } from '@/src/_infra/http/helpers';

export class GetUserProfile implements Controller {
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
