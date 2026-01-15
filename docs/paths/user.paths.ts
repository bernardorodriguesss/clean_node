import { api } from '../utils/api';
import {
	createUserSchema,
	userResponseSchema,
	fetchUsersResponseSchema,
} from '@/src/user/business/dto/user.dto';

api.registerPath({
	path: '/users/register',
	tags: ['users'],
	method: 'post',
	summary: 'create new user',
	request: {
		body: { content: { 'application/json': { schema: createUserSchema } } },
	},
	responses: {
		201: {
			description: 'user created',
			content: { 'application/json': { schema: userResponseSchema } },
		},
		400: {
			description: 'invalid data',
			content: {
				'application/json': {
					schema: { $ref: '#/components/schemas/ValidationError' },
				},
			},
		},
		409: {
			description: 'email conflict',
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

api.registerPath({
	path: '/users',
	tags: ['users'],
	method: 'get',
	summary: 'fetch users',
	responses: {
		200: {
			description: 'returns a list of users',
			content: {
				'application/json': { schema: fetchUsersResponseSchema },
			},
		},
		403: {
			description: 'user does not have permission to access this resource',
			content: {
				'application/json': {
					schema: { $ref: '#/components/schemas/DefaultError' },
				},
			},
		},
	},
	servers: [{ url: '/api/v1' }],
});

api.registerPath({
	path: '/users/me',
	tags: ['users'],
	method: 'get',
	summary: 'get profile',
	responses: {
		200: {
			description: 'returns the profile of authenticated user',
			content: { 'application/json': { schema: userResponseSchema } },
		},
		401: {
			description: 'user not authenticated',
			content: {
				'application/json': {
					schema: { $ref: '#/components/schemas/DefaultError' },
				},
			},
		},
	},
	servers: [{ url: '/api/v1' }],
});

api.registerPath({
	path: '/users/:id',
	tags: ['users'],
	method: 'delete',
	summary: 'delete user',
	responses: {
		204: {
			description: 'user deleted, no content is returned',
			// content: { 'application/json': { schema: userResponseSchema } },
		},
		403: {
			description:
				'forbidden, returned when a non-admin user attempts to delete another user’s account.',
			content: {
				'application/json': {
					schema: { $ref: '#/components/schemas/DefaultError' },
				},
			},
		},
		404: {
			description: 'user not found',
			content: {
				'application/json': {
					schema: { $ref: '#/components/schemas/DefaultError' },
				},
			},
		},
	},
	servers: [{ url: '/api/v1' }],
});
