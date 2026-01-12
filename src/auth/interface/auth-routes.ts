import { app } from '@/src/app';
import { routeAdapter } from '@/src/_infra/http/adapters/router';
import { AuthFactories } from '../auth-factories';

export function AuthRoutes() {
	app.post('/auth/sign-in', routeAdapter(AuthFactories.signIn()));
}
