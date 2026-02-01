import { registerApiPath } from '../utils/helpers';
import {
	signInSchema,
	signInResponseSchema,
} from '@/src/auth/business/dto/sign-in.dto';

/**
 * Sign-in path
 */
registerApiPath({
	path: '/auth/sign-in',
	method: 'post',
	tags: ['auth'],
	request: {
		body: signInSchema,
	},
	responses: {
		200: { description: 'authenticated', content: signInResponseSchema },
		401: {
			description: 'invalid credentials',
			content: { $ref: '#/components/schemas/ValidationError' },
		},
	},
	auth: false,
});
