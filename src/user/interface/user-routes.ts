import { app } from '@/src/app';
import { routeAdapter } from '@/src/_infra/http/adapters/router';
import { UserFactories } from '../user-factories';
// middlewares
import { auth } from '@/src/_infra/http/middlewares/auth';

export function UserRoutes() {
	app.post('/users/register', routeAdapter(UserFactories.createUser()));
	app.get(
		'/users/me',
		{ preHandler: auth },
		routeAdapter(UserFactories.getUserProfile()),
	);
}
