import { OpenApiGeneratorV3 } from '@asteasolutions/zod-to-openapi';
import { OpenAPIV3 } from 'openapi-types';
import { schemas } from './api';

const generator = new OpenApiGeneratorV3(schemas.definitions);

export default generator.generateDocument({
	openapi: '3.1.0',
	info: {
		title: 'API',
		version: '1.0.0',
		description: 'Base API openapi',
	},
	servers: [{ url: 'http://localhost:3000', description: 'Local server' }],
}) as OpenAPIV3.Document;
