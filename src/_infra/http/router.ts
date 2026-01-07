import { Controller } from '@/src/_lib/protocols/controller';
import { HttpAdapter } from './context';
import { FastifyReply, FastifyRequest } from 'fastify';

export function router(controller: Controller) {
	return (req: FastifyRequest, res: FastifyReply) => {
		const ctx = new HttpAdapter(req, res);
		return controller.handle(ctx);
	};
}
