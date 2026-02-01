import { paginationSchema } from '@/src/_lib/schemas';
import { registerApiPath } from '../utils/helpers';
import {
	createUserSchema,
	userResponseSchema,
} from '@/src/user/business/dto/user.dto';

/**
 * Create user path
 */
registerApiPath({
	path: '/users',
	method: 'post',
	tags: ['users'],
	request: {
		body: createUserSchema,
	},
	responses: {
		201: { description: 'user created', content: userResponseSchema },
		400: {
			description: 'invalid data',
			content: { $ref: '#/components/schemas/ValidationError' },
		},
		401: {
			description: 'authentication required',
			content: { $ref: '#/components/schemas/ValidationError' },
		},
		403: {
			description: 'no permission',
			content: { $ref: '#/components/schemas/DefaultError' },
		},
		409: {
			description: 'email in use',
			content: { $ref: '#/components/schemas/DefaultError' },
		},
	},
});

/**
 * Get user profile
 */
registerApiPath({
	path: '/users/me',
	method: 'get',
	tags: ['users'],
	responses: {
		200: { description: 'user found', content: userResponseSchema },
		401: {
			description: 'authentication required',
			content: { $ref: '#/components/schemas/DefaultError' },
		},
		404: {
			description: 'not found',
			content: { $ref: '#/components/schemas/DefaultError' },
		},
	},
});

/**
 * Fetch users path
 */
registerApiPath({
	path: '/users',
	method: 'get',
	tags: ['users'],
	request: {
		query: paginationSchema,
	},
	responses: {
		200: { description: '', content: userResponseSchema },
		401: {
			description: 'authentication required',
			content: { $ref: '#/components/schemas/DefaultError' },
		},
		403: {
			description: 'no permission',
			content: { $ref: '#/components/schemas/DefaultError' },
		},
	},
});

/**
 * Delete user path
 */
registerApiPath({
	path: '/users/:id',
	method: 'delete',
	tags: ['users'],
	responses: {
		204: { description: 'No content', content: userResponseSchema },
		401: {
			description: 'authentication required',
			content: { $ref: '#/components/schemas/DefaultError' },
		},
		403: {
			description: 'no permission',
			content: { $ref: '#/components/schemas/DefaultError' },
		},
		404: {
			description: 'not found',
			content: { $ref: '#/components/schemas/DefaultError' },
		},
	},
});
