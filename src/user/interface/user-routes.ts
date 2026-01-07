import { app } from '@/src/server';
import { router } from '@/src/_infra/http/router';
import { UserFactories } from '../user-factories';

export function UserRoutes() {
	app.post('/users/register', router(UserFactories.createUser()));
	app.post('/me', router(UserFactories.getUserProfile()));
}
