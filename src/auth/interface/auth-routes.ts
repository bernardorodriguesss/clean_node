import { app } from '@/src/app';
import { routeAdapter } from '@/src/_infra/http/adapters/router';
import { AuthFactories } from '../auth-factories';

export function AuthRoutes() {
	const prefix = '/api/v1';

	app.post(`${prefix}/auth/sign-in`, routeAdapter(AuthFactories.signIn()));
}
