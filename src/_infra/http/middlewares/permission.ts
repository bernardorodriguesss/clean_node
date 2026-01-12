import { validateToken } from '@/src/_lib/functions/secure';
import { FastifyReply, FastifyRequest } from 'fastify';

export function permission(roles: string[]) {
	return async (req: FastifyRequest, res: FastifyReply) => {
		const authHeader = req.headers.authorization;

		if (!authHeader) {
			return res.status(401).send({
				message: 'Authorization header is missing',
			});
		}

		const token = authHeader.replace(/^Bearer\s+/i, '');
		const payload = await validateToken(token);

		if (!payload || !roles.includes(payload.role)) {
			return res.status(403).send({ message: 'Access denied' });
		}
	};
}
