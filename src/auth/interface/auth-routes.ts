import { app } from '@/src/server';
import { router } from '@/src/_infra/http/router';
import { AuthFactories } from '../auth-factories';

export function AuthRoutes() {
	app.post('/auth/sign-in', router(AuthFactories.signIn()));
}
