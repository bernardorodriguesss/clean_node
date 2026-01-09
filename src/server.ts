import fastify from 'fastify';
import swagger from '@fastify/swagger';
import openapi from '../docs/openapi';

import { AuthRoutes } from './auth/interface/auth-routes';
import { UserRoutes } from './user/interface/user-routes';

export const app = fastify({
	logger: {
		enabled: true,
		transport: {
			target: 'pino-pretty',
		},
	},
});

// Swagger configuration
app.register(swagger, {
	mode: 'static',
	specification: {
		document: openapi,
	},
});

app.register(import('@scalar/fastify-api-reference'), {
	routePrefix: '/docs',
	configuration: {
		theme: 'elysiajs',
	},
});

app.register(UserRoutes);
app.register(AuthRoutes);

app.listen({ port: 3000, host: '0.0.0.0' }, (err, address) => {
	if (err) {
		app.log.error(err);
		process.exit(1);
	}

	app.log.info(`Swagger listening at ${address}/docs`);
});
