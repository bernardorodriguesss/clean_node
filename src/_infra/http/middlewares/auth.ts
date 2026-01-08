import { validateToken } from '@/src/_lib/functions/secure';
import { FastifyReply, FastifyRequest } from 'fastify';

export async function Auth(req: FastifyRequest, res: FastifyReply) {
	const authHeader = req.headers.authorization;

	if (!authHeader) {
		return res.status(401).send({
			message: 'Authorization header is missing',
		});
	}

	const token = authHeader.replace(/^Bearer\s+/i, '');
	const payload = await validateToken(token);

	if (payload) {
		req.user = payload;
	} else {
		return res.status(401).send({ message: 'Invalid or expired token' });
	}
}
