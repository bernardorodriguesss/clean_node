import { z } from 'zod';
import { api } from '../utils/api';
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';

extendZodWithOpenApi(z);

export const bearerAuth = api.registerComponent(
	'securitySchemes',
	'bearerAuth',
	{
		type: 'http',
		scheme: 'bearer',
		bearerFormat: 'JWT',
	},
);

api.register(
	'DefaultError',
	z.object({ message: z.string() }).openapi({ required: [] }),
);

api.register(
	'ValidationError',
	z
		.object({
			errors: z.array(z.any()).optional(),
			message: z.string().optional(),
		})
		.openapi({
			required: [],
		}),
);
