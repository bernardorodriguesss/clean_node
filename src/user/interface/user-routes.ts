import { app } from '@/src/app';
import { routeAdapter } from '@/src/_infra/http/adapters/router';
import { UserFactories } from '../user-factories';
// middlewares
import { auth } from '@/src/_infra/http/middlewares/auth';
import { permission } from '@/src/_infra/http/middlewares/permission';

export function UserRoutes() {
	const prefix = '/api/v1';

	app.post(
		`${prefix}/users/register`,
		routeAdapter(UserFactories.createUser()),
	);
	app.get(
		`${prefix}/users`,
		{ preHandler: [auth, permission(['admin'])] },
		routeAdapter(UserFactories.fetchUsers()),
	);
	app.get(
		`${prefix}/users/me`,
		{ preHandler: auth },
		routeAdapter(UserFactories.getUserProfile()),
	);
	app.delete(
		`${prefix}/users/:id`,
		{ preHandler: auth },
		routeAdapter(UserFactories.deleteUser()),
	);
}
