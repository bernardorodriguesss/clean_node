import fastify from 'fastify';
import swagger from '@fastify/swagger';
import openapi from '../docs';

import cors from '@fastify/cors';
import { AuthRoutes } from './auth/interface/auth-routes';
import { UserRoutes } from './user/interface/user-routes';

export const app = fastify({
	logger:
		process.env.NODE_ENV === 'dev'
			? {
					enabled: true,
					transport: {
						target: 'pino-pretty',
					},
				}
			: false,
});

app.register(cors, {
	origin: '*',
});

// Swagger configuration
app.register(swagger, {
	mode: 'static',
	specification: { document: openapi },
});

app.register(import('@scalar/fastify-api-reference'), {
	routePrefix: '/docs',
	configuration: {
		theme: 'elysiajs',
		layout: 'classic',
	},
});

app.register(UserRoutes);
app.register(AuthRoutes);
