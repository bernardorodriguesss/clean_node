import { randomUUID } from 'node:crypto';
import { hash, verify } from 'argon2';
import { SignJWT, JWTPayload } from 'jose';

export function generateId(): string {
	return randomUUID();
}

export const HASH_DUMMY =
	'$argon2id$v=19$m=65536,t=4,p=1$AAAAAAAAAAAAAAAAAAAAAA$AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';

export async function hashPassword(password: string): Promise<string> {
	return hash(password, {
		timeCost: 4,
	});
}

export async function comparePassword(
	hash: string,
	password: string,
): Promise<boolean> {
	const result = await verify(hash, password);
	return result;
}

const secret = new TextEncoder().encode(process.env.JWT_SECRET);
type Payload = { id: string; role: string };

export async function generateToken(payload: Payload) {
	const token = await new SignJWT(payload)
		.setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
		.setExpirationTime('15m')
		.sign(secret);

	return token;
}
