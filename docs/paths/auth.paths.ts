import { api } from '../utils/api';
import {
	signInSchema,
	signInResponseSchema,
} from '@/src/auth/business/dto/sign-in.dto';

api.registerPath({
	path: '/auth/sign-in',
	tags: ['auth'],
	method: 'post',
	summary: 'authenticate user',
	request: {
		body: { content: { 'application/json': { schema: signInSchema } } },
	},
	responses: {
		200: {
			description: 'user authenticated',
			content: { 'application/json': { schema: signInResponseSchema } },
		},
		401: {
			description: 'invalid credentials',
			content: {
				'application/json': {
					schema: { $ref: '#/components/schemas/DefaultError' },
				},
			},
		},
	},
	servers: [{ url: '/api/v1' }],
	security: [],
});
