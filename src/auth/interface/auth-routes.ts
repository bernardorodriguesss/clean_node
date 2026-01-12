import { app } from '@/src/app';
import { router } from '@/src/_infra/http/router';
import { AuthFactories } from '../auth-factories';

export function AuthRoutes() {
	app.post('/auth/sign-in', router(AuthFactories.signIn()));
}
