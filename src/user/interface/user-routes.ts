import { app } from '@/src/app';
import { router } from '@/src/_infra/http/router';
import { UserFactories } from '../user-factories';
import { Auth } from '@/src/_infra/http/middlewares/auth';

export function UserRoutes() {
	app.post('/users/register', router(UserFactories.createUser()));
	app.get(
		'/users/me',
		{ preHandler: Auth },
		router(UserFactories.getUserProfile()),
	);
}
