import { bearerAuth } from '../components';
import { api } from './api';

type Method = 'get' | 'post' | 'delete' | 'put' | 'patch';

interface RegisterPathProps {
	path: string;
	tags?: string[];
	method: Method;
	request?: {
		body?: any;
		query?: any;
	};
	responses: Record<number, { description: string; content?: any }>;
	auth?: boolean;
}

export function registerApiPath(props: RegisterPathProps) {
	const request: typeof props.request = {};

	if (props.request?.body) {
		request.body = {
			content: {
				'application/json': {
					schema: props.request.body,
				},
			},
		};
	}

	if (props.request?.query) {
		request.query = props.request.query;
	}

	const responses: typeof props.responses = {};
	for (const status in props.responses) {
		const res = props.responses[status];
		responses[status] = {
			description: res.description,
			...(res.content
				? { content: { 'application/json': { schema: res.content } } }
				: {}),
		};
	}

	api.registerPath({
		path: props.path,
		tags: props.tags,
		method: props.method,
		request,
		responses,
		security: props.auth === false ? [] : [{ bearerAuth: [] }],
	});
}
