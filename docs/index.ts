import { OpenApiGeneratorV3 } from '@asteasolutions/zod-to-openapi';
import { OpenAPIV3 } from 'openapi-types';
import { api } from './utils/api';

import { bearerAuth } from './components';
import './paths/user.paths';
import './paths/auth.paths';

const generator = new OpenApiGeneratorV3(api.definitions);

export default generator.generateDocument({
	openapi: '3.1.1',
	info: {
		title: 'Clean Node API',
		version: '1.0.0',
	},
	tags: [
		{
			name: 'users',
			description: 'endpoints for user operations',
		},
		{
			name: 'auth',
			description: 'endpoints for authentication operations',
		},
	],
	servers: [
		{ url: 'http://localhost:3000/api/v1', description: 'V1 local server' },
	],
	security: [{ [bearerAuth.name]: [] }],
}) as OpenAPIV3.Document;
