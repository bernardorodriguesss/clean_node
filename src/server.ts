import { fastify } from 'fastify';

export const app = fastify({
	logger: {
		enabled: true,
		transport: {
			target: 'pino-pretty',
		},
	},
});

app.listen({ port: 3000, host: '0.0.0.0' }, (err, address) => {
	if (err) {
		app.log.error(err);
		process.exit(1);
	}
});
