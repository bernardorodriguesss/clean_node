import { app } from '@/src/app';
import { routeAdapter } from '@/src/_infra/http/adapters/router';
import { UserFactories } from '../user-factories';
// middlewares
import { auth } from '@/src/_infra/http/middlewares/auth';
import { permission } from '@/src/_infra/http/middlewares/permission';

export function UserRoutes() {
	app.post('/users/register', routeAdapter(UserFactories.createUser()));
	app.get(
		'/users',
		{ preHandler: [auth, permission(['admin'])] },
		routeAdapter(UserFactories.fetchUsers()),
	);
	app.get(
		'/users/me',
		{ preHandler: auth },
		routeAdapter(UserFactories.getUserProfile()),
	);
}
